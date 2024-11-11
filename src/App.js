import './styles/App.css';
import AuthForm from "./components/AuthFormView";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadView from "./components/UploadView";
import FeedView from "./components/FeedView";
import React from "react";
import Profile from "./components/ProfileView";

import {addRxPlugin} from 'rxdb';
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';
import {createLobenDB} from "./logic/setup-database";

addRxPlugin(RxDBDevModePlugin);

export const rxLobenDatabase = createLobenDB()
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthForm/>,
    },
    {
        path: "/upload",
        element: <UploadView/>,
    },
    {
      path: "/home",
      element: <FeedView/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
        path: "/*",
        element: <AuthForm/>
    }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}
export default App;
