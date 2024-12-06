# E1 Spiritz & Smitheen Star Foods

A modern real-time cocktail and food ordering system with personalized recommendations and live order tracking.

## Features

- 🍸 Real-time order tracking and status updates
- 🎯 Personalized cocktail recommendations based on taste profiles
- 📊 Admin dashboard for order management
- 🔔 Push notifications for order status changes
- 🎨 Beautiful, responsive UI with smooth animations
- 🔐 Role-based access control (admin/user)
- 🧪 Interactive taste profile quiz
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Zustand for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Socket.IO client for real-time updates
- React Router v6 for navigation

### Backend
- Node.js with Express
- Socket.IO for WebSocket communication
- File-based JSON storage
- RESTful API endpoints

### Deployment
- Render for hosting and automatic deployment
- Environment variable management
- Health check monitoring

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd e1-spiritz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Development

The application runs on:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:10000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Environment Variables

Required environment variables:

```env
NODE_ENV=production
PORT=10000
VITE_WS_URL=your-websocket-url
VITE_API_URL=your-api-url
```

## Features in Detail

### User Features
- Mobile number-based authentication
- Personalized cocktail recommendations
- Real-time order tracking
- Order history
- Push notifications for order updates
- Interactive taste profile quiz

### Admin Features
- Real-time order management dashboard
- Order status updates with notifications
- Order statistics and metrics
- Bulk order management
- Clear orders functionality

### Menu Management
- Categorized food and drink items
- Availability status
- Detailed item descriptions
- Taste profile indicators
- Special item indicators (spicy, vegetarian)

## Deployment

The application is configured for deployment on Render:

1. Connect your GitHub repository to Render
2. Configure environment variables
3. Enable auto-deployment from main branch

## Architecture

For detailed technical architecture, please refer to [TechArchitecture.md](TechArchitecture.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.