import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import HomeOverview from "./pages/HomeOverview";
import RootLayout from "./layouts/RootLayout";
import RecipeCreatePage from "./pages/RecipeCreatePage";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomeOverview },
      { path: "/recipes/:id", Component: RecipeDetailPage },
      { path: "/new-recipe", Component: RecipeCreatePage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
