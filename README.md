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

## Tech Stack

- React (v19)
- Vite
- Tailwind CSS
- React Router DOM
- Axios for API calls
- React Toastify
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



## Components

The application includes several reusable components:
- Authentication forms
- Blog post editor
- Image upload component
- Navigation bar
- User profile components
- Protected route wrapper


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
