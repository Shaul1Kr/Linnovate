import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UrlAnalytics from "./pages/UrlAnalytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/analytics", element: <UrlAnalytics /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
