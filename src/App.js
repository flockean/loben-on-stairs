import './styles/App.css';
import AuthForm from "./components/AuthFormView";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import UploadView from "./components/UploadView";
import FeedView from "./components/FeedView";
import React from "react";
import Profile from "./components/ProfileView";
import {UserService} from "./logic/userService";

export const userService = new UserService();
// Geschützte Route, die nur für authentifizierte Benutzer zugänglich ist
const ProtectedRoute = ({ children }) => {
    const isLoggedIn = userService.isLoggedIn();

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export const backendurl = {
    BACKEND_URL: "http://localhost:5000",
}

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthForm />,
    },
    {
        path: "/upload",
        element: (
            <ProtectedRoute>
                <UploadView />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <FeedView />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "/*",
        element: <AuthForm />,
    },
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}
export default App;
