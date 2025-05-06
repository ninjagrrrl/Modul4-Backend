import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import HomeOverview from "./pages/HomeOverview";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomeOverview },
      { path: "/recipes/:id", Component: RecipeDetailPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
