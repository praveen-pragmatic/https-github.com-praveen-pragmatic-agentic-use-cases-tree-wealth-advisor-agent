# E1 Spiritz & Smitheen Star Foods - Technical Architecture

## Overview
A real-time cocktail and food ordering system built with modern web technologies, featuring live order tracking, personalized recommendations, and seamless admin management.

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Zustand for global state
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth transitions
- **Real-time**: Socket.IO client for WebSocket connections
- **Routing**: React Router v6 for navigation
- **Icons**: Lucide React for consistent iconography

### Backend
- **Runtime**: Node.js with Express
- **WebSocket**: Socket.IO server for real-time communication
- **Data Storage**: File-based JSON storage (orders.json, users.json)
- **API**: RESTful endpoints + WebSocket events
- **Deployment**: Render for hosting and automatic deployment

## System Architecture

### Data Flow
```
[Client] <--WebSocket--> [Server] <--> [File Storage]
   ↑          ↑             ↑
   |          |             |
   └--HTTP----┴-------------┘
```

### Real-time Communication
- WebSocket connections for:
  - Order status updates
  - New order notifications
  - User authentication events
  - Admin dashboard updates

### Request/Response Flow

1. **User Authentication**
   ```
   Client -> Server: User login data
   Server -> Storage: Save user data
   Server -> Client: Login success/failure
   ```

2. **Order Creation**
   ```
   Client -> Server: New order data
   Server -> Storage: Save order
   Server -> All Clients: Broadcast order update
   ```

3. **Order Status Updates**
   ```
   Admin -> Server: Status change request
   Server -> Storage: Update order status
   Server -> All Clients: Broadcast status change
   Server -> Customer: Push notification
   ```

## Key Features

### Authentication & Authorization
- Mobile number-based authentication
- Role-based access (admin/user)
- Persistent sessions with local storage

### Order Management
- Real-time order tracking
- Status progression: Accepted -> Brewing -> PickUp -> Delivered
- Push notifications for status changes
- Order history tracking

### Personalization
- Taste profile quiz
- Cocktail recommendations based on preferences
- Match percentage calculation
- Persistent user preferences

### Admin Dashboard
- Real-time order monitoring
- Status management with visual indicators
- Order statistics and metrics
- Bulk order management capabilities

## Data Models

### User
```typescript
{
  id: string;
  name: string;
  mobile: string;
  role: 'admin' | 'user';
  preferences: {
    tasteProfile?: {
      sweet: number;
      sour: number;
      bitter: number;
      strong: number;
    };
  };
}
```

### Order
```typescript
{
  id: string;
  userId: string;
  userName: string;
  cocktailId?: string;
  cocktailName?: string;
  menuItemId?: string;
  menuItemName?: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  timestamp: string;
}
```

## Deployment Architecture

### Production Environment
- **Platform**: Render
- **Configuration**: 
  - Auto-deployment from main branch
  - Environment variables for API endpoints
  - Health check endpoint monitoring
  - Automatic SSL/TLS
  - Static file serving

### Development Environment
- Local development server
- Hot module replacement
- WebSocket development proxy
- Environment variable management

## Performance Optimizations

- Efficient WebSocket connection management
- Optimized real-time updates
- Lazy loading of components
- Persistent data caching
- Optimistic UI updates

## Security Measures

- CORS configuration
- WebSocket authentication
- Rate limiting
- Input validation
- Secure data storage
- Environment variable protection

## Monitoring & Maintenance

- Health check endpoints
- Error logging
- Connection monitoring
- Automatic reconnection handling
- Session management