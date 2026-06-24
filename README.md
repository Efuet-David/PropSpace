# PropSpace - Property Listing Application


A full-stack real-time web application  where users can list, browse, search,updade and delete properties for rent,or sale.

## Tech Stack

### Backend
- **Node.js** with **Express** - RESTful API server
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Material-UI (MUI)** - UI component library
- **Axios** - HTTP client with interceptors
- **Context API** - State management

## Features

### User Authentication
- User registration with email, username, and password
- Secure login with JWT tokens
- Password hashing with salt
- Protected routes and API endpoints

### Account Management
- Profile management (username, phone, avatar)
- Secure password change with old password verification
- User profile settings

### Property Listings (CRUD)
- **Create**: Authenticated users can create property listings
- **Read**: 
  - Public feed for all users (including guests)
  - Private "My Listings" dashboard for authenticated users
- **Update**: Authors can modify their own listings
- **Delete**: Authors can delete their own listings
- **Search/Filter**: Filter by city, price range, and property type

### Security Features
- JWT-based authentication
- Route guards on frontend
- Protected API endpoints
- Ownership validation on backend
- Input validation and sanitization
- Proper HTTP status codes

## Architecture

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   ├── User.js              # User schema with password hashing
│   │   └── Property.js          # Property schema
│   ├── repositories/
│   │   ├── userRepository.js   # User data access layer
│   │   └── propertyRepository.js # Property data access layer
│   ├── services/
│   │   ├── authService.js      # Authentication business logic
│   │   └── propertyService.js  # Property business logic
│   ├── controllers/
│   │   ├── authController.js   # Auth request handlers
│   │   └── propertyController.js # Property request handlers
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── propertyRoutes.js    # Property endpoints
│   └── server.js               # Express server setup
├── .env.example
├── package.json
└── .gitignore
```

### Frontend Structure
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js            # Navigation bar
│   │   ├── PropertyCard.js      # Property display card
│   │   └── FilterSidebar.js     # Search/filter component
│   ├── pages/
│   │   ├── Home.js              # Property listing feed
│   │   ├── Login.js             # Login page
│   │   ├── Register.js          # Registration page
│   │   ├── Dashboard.js         # User's listings
│   │   ├── Profile.js           # Account settings
│   │   ├── CreateProperty.js    # Create listing form
│   │   ├── PropertyDetails.js   # Property details view
│   │   └── EditProperty.js      # Edit listing form
│   ├── services/
│   │   ├── api.js               # Axios instance with interceptors
│   │   ├── authService.js       # Auth API calls
│   │   └── propertyService.js   # Property API calls
│   ├── context/
│   │   └── AuthContext.js       # Authentication state management
│   ├── utils/
│   │   └── PrivateRoute.js      # Route guard component
│   ├── App.js                   # Main app with routing
│   └── index.js                 # React entry point
├── package.json
└── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/propspace
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Properties
- `GET /api/properties` - Get all properties (with optional filters)
- `GET /api/properties/:id` - Get property by ID
- `GET /api/properties/user/my-listings` - Get user's properties (protected)
- `POST /api/properties` - Create new property (protected)
- `PUT /api/properties/:id` - Update property (protected)
- `DELETE /api/properties/:id` - Delete property (protected)

### Query Parameters for Properties
- `city` - Filter by city (partial match)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `propertyType` - Property type (Apartment, House, Studio)

## Color Scheme

The application uses a modern color scheme:
- **Spring Green** (#00FF7F) - Primary accent color
- **Deep Onyx** (#1A1A1A) - Secondary/dark color

## Security Features Implemented

### Backend
- Password hashing with bcryptjs and salt
- JWT token authentication
- Protected routes with middleware
- Ownership validation for property operations
- Input validation with express-validator
- Proper HTTP status codes (200, 201, 400, 401, 403, 404)
- Error handling middleware

### Frontend
- Route guards for protected pages
- Global API interceptors for token management
- Automatic redirect on token expiration
- Form validation before submission
- Loading states and error handling

## Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  phone: String,
  avatar: String,
  createdAt: Date
}
```

### Property Model
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  location: {
    city: String (required),
    country: String (required)
  },
  propertyType: String (Apartment|House|Studio),
  images: [String],
  author: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Browse**: View all properties with filters
4. **Create**: Add your own property listings
5. **Manage**: View and edit your listings in the dashboard
6. **Profile**: Update your account settings

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # React development server
```

## Production Considerations

- Change JWT_SECRET in production
- Use environment variables for sensitive data
- Enable HTTPS
- Implement rate limiting
- Add CORS configuration for production domain
- Use MongoDB Atlas for cloud database
- Implement proper logging
- Add comprehensive error monitoring

## License

ISC
