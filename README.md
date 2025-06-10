# Just Do It - Real-time Chat Application

A modern, full-stack real-time chat application built with React, Node.js, Express, and MongoDB.

## Features

### 🚀 Core Features
- **Real-time messaging** - Send and receive messages instantly
- **User authentication** - Secure login and registration with JWT
- **Profile management** - Upload and manage profile pictures with Cloudinary
- **Responsive design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS

### 🛡️ Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Secure cookie handling
- Input validation and sanitization

### 🎨 UI/UX Features
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Toast notifications for user feedback
- Error boundary for graceful error handling
- Custom scrollbars
- Loading states and spinners

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image upload and management
- **Multer** - File upload middleware

## Project Structure

```
Just-Do-It/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── configs/         # Configuration files
│   └── package.json         # Backend dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zarjin/Just-Do-It.git
   cd Just-Do-It
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/Js-App
   JWT_SECRET=your_jwt_secret_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   NODE_ENV=development
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/user/get-user` - Get current user
- `GET /api/user/get-all-user` - Get all users
- `GET /api/user/get-other-user/:userId` - Get specific user

### Messages
- `POST /api/message/send-message/:receiver` - Send a message
- `GET /api/message/get-messages/:receiver` - Get conversation messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Zarjin Islam Jewel**
- GitHub: [@zarjin](https://github.com/zarjin)
- Email: zarjinislamjewel@gmail.com

## Acknowledgments

- Thanks to the React and Node.js communities for excellent documentation
- Tailwind CSS for making styling enjoyable
- MongoDB for providing a flexible database solution
