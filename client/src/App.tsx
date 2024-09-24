import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <>
        <p>ERROR</p>
      </>
    ),
    element: <HomePage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
