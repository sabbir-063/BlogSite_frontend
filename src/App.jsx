import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import './App.css'
import { decodeToken } from './utils/decode_token'
import { useEffect, useState } from 'react'
import ProtectedRoute from './utils/protectedRoute'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = decodeToken(token);
    if (decoded) {
      setUser(decoded);
      console.log("User decoded from token: ", user._id, user.firstname, user.lastname, user.username, user.email);
    } else {
      localStorage.removeItem('token');
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Landing setUser={setUser}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
