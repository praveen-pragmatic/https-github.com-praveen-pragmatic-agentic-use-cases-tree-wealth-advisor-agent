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
  ? 'https://spiritz-app.onrender.com'
  : 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

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
  const data = await fs.readFile(file, 'utf8');
  return JSON.parse(data);
}

async function writeData(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// WebSocket handlers
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('new_order', async (order) => {
    const orders = await readData(ORDERS_FILE);
    orders.push(order);
    await writeData(ORDERS_FILE, orders);
    io.emit('orders_updated', orders);
  });

  socket.on('update_order_status', async ({ orderId, status }) => {
    const orders = await readData(ORDERS_FILE);
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    await writeData(ORDERS_FILE, updatedOrders);
    io.emit('orders_updated', updatedOrders);
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

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.get('/api/orders', async (req, res) => {
  const orders = await readData(ORDERS_FILE);
  res.json(orders);
});

app.get('/api/users', async (req, res) => {
  const users = await readData(USERS_FILE);
  res.json(users);
});

// Serve index.html for all other routes in production
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});