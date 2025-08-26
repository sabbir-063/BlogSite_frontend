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
|       ├── Home/           # Home page with search and filtering
|       ├── Post/           # Post details and comments
|       ├── ui/             # UI Components
|           ├── markdown-editor/  # Markdown editor component
|           ├── markdown-preview/ # Markdown preview component
|           ├── tabs/            # Tab component for editor
|           ├── button/          # Button components
|           └── card/           # Card components
│   ├── contexts/          # React contexts
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
- Markdown editing and rendering
- Advanced search and filtering
- Post sorting by date, views, and likes
- Post tagging and tag-based filtering
- Pagination for better performance
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
- React Markdown
- Radix UI components
- Rehype for syntax highlighting

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
- Blog post editor with Markdown support
- Image upload component
- Navigation bar
- User profile components
- Protected route wrapper
- Search bar
- Sort and filter controls
- Pagination component
- Markdown editor with live preview
- Markdown renderer with syntax highlighting


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

## Markdown Support

The blog now features a rich Markdown editor with the following capabilities:
- Live preview of Markdown content
- Toolbar for common formatting options
- Support for headings, bold, italic, lists, links, images, and code blocks
- Syntax highlighting for code blocks
- GitHub Flavored Markdown (GFM) with tables and task lists
- Image embedding within Markdown content
