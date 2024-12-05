import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

const CORS_ORIGIN = process.env.NODE_ENV === 'production'
  ? ['https://spiritz-app.onrender.com', 'https://spiritz-app.pages.dev']
  : 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// Health check endpoint - responds quickly
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve static files in production
app.use(express.static('dist'));

// Data storage paths
const DATA_DIR = process.env.NODE_ENV === 'production' ? '/data' : join(__dirname, 'data');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');
const USERS_FILE = join(DATA_DIR, 'users.json');

// Ensure data directory exists
await fs.mkdir(DATA_DIR, { recursive: true });

// Initialize data files if they don't exist
async function initDataFile(path, defaultData = []) {
  try {
    await fs.access(path);
  } catch {
    await fs.writeFile(path, JSON.stringify(defaultData));
  }
}

await Promise.all([
  initDataFile(ORDERS_FILE),
  initDataFile(USERS_FILE)
]);

// Data handlers
async function readData(file) {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${file}:`, error);
    return [];
  }
}

async function writeData(file, data) {
  try {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to ${file}:`, error);
  }
}

// WebSocket handlers
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('get_orders', async () => {
    const orders = await readData(ORDERS_FILE);
    socket.emit('orders_updated', orders);
  });

  socket.on('new_order', async (order) => {
    console.log('New order received:', order);
    const orders = await readData(ORDERS_FILE);
    orders.push(order);
    await writeData(ORDERS_FILE, orders);
    io.emit('orders_updated', orders);
  });

  socket.on('update_order_status', async ({ orderId, status }) => {
    console.log('Updating order status:', orderId, status);
    const orders = await readData(ORDERS_FILE);
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status };
        // Emit individual order update
        io.emit('order_status_changed', updatedOrder);
        return updatedOrder;
      }
      return order;
    });
    await writeData(ORDERS_FILE, updatedOrders);
    io.emit('orders_updated', updatedOrders);
  });

  socket.on('clear_orders', async () => {
    await writeData(ORDERS_FILE, []);
    io.emit('orders_updated', []);
  });

  socket.on('user_login', async (user) => {
    const users = await readData(USERS_FILE);
    const existingUser = users.find(u => u.mobile === user.mobile);
    if (!existingUser) {
      users.push(user);
      await writeData(USERS_FILE, users);
    }
    socket.emit('login_success', existingUser || user);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});