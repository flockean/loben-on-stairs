import './styles/App.css';
import AuthForm from "./components/AuthFormView";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadView from "./components/UploadView";
import React from "react";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthForm/>,
    },
    {
        path: "/upload",
        element: <UploadView/>
    }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
