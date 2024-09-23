import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RedirectPage from "./pages/RedirectPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <></>,
    element: <HomePage />,
  },
  {
    path: "/:shortUrl",
    element: <RedirectPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
