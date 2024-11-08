import './styles/App.css';
import AuthForm from "./components/AuthFormView";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadView from "./components/UploadView";
import FeedView from "./components/FeedView";
import React from "react";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthForm/>,
    },
    {
        path: "/upload",
        element: <UploadView/>
    },
    {
        path: "/home",
        element: <FeedView/>
    }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
