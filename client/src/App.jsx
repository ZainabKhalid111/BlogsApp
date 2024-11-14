import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Blogs from "./pages/Blogs";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "signUp",
      element: <SignUp />,
    },
    {
      path: "blogs",
      element: <ProtectedRoute element={<Blogs />} />,
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
