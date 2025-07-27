# Blog Site Frontend

A modern, responsive blog site frontend built with React, Vite, and Tailwind CSS. This application provides a rich user interface for blog creation, management, and user interactions.

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)

## Project Structure

```
frontend/
├── public/                 # Public assets
├── src/
│   ├── assets/            # Static assets
│   └── components/        # Reusable React components
|       ├── CreatePost/     # Create new post
|       ├── DashBoard/      # Dashboard page
|       ├── Login/          # Login page
|       ├── Register/       # Register page
|       ├── MyPosts/        # Users posts
|       ├── Navbar/         # Navbar components
│   ├── lib/              # Utility libraries
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   ├── index.css         # Additional styles
│   └── main.jsx          # Application entry point
├── components.json        # Component configurations
├── eslint.config.js      # ESLint configuration
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies and scripts
```

## Features

- Modern UI with Tailwind CSS
- Responsive design
- User authentication
- Blog post creation and management
- Image upload support
- Rich text editing
- Toast notifications
- Protected routes
- Material UI icons integration

## Tech Stack

- React (v19)
- Vite
- Tailwind CSS
- React Router DOM
- Axios for API calls
- Material UI Icons
- React Toastify
- Styled Components
- JWT handling

## Installation

1. Clone the repository
```bash
git clone https://github.com/sabbir-063/BlogSite_frontend.git
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Development

To start the development server with hot-reload:
```bash
npm run dev
```

## Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Components

The application includes several reusable components:
- Authentication forms
- Blog post editor
- Image upload component
- Navigation bar
- User profile components
- Protected route wrapper

## Styling

- Tailwind CSS for utility-first styling
- CSS modules for component-specific styles
- Material UI icons for consistent iconography
- Responsive design breakpoints

## State Management

- React Context for global state
- Local state with useState
- JWT storage in localStorage
- Axios interceptors for API calls

## Routing

React Router v7 is used for routing with the following main routes:
- `/` - Home page
- `/login` - User login
- `/signup` - User registration
- `/profile` - User profile
- `/blogs` - Blog posts
- `/posts/new-post` - Create new post
- `/posts/:id` - View single post
- `/posts/edit-post/:id` - Edit post

## Error Handling

- Form validation
- API error handling
- Toast notifications for user feedback
- Protected route redirects

## Browser Support

The application is tested and supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Performance Optimization

- Code splitting with React.lazy
- Image optimization
- Cached API responses
- Minimized bundle size
- Optimized dependencies
