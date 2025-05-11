import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetailPage from "./pages/recipe-detail-page";
import HomeOverview from "./pages/home-page";
import RootLayout from "./layouts/root-layout";
import RecipeCreatePage from "./pages/recipe-create-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/sign-up-page";
import { AuthContextProvider } from "./contexts/auth-context";
import Dashboard from "./pages/dashboard";
const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomeOverview },
      { path: "/recipes/:id", Component: RecipeDetailPage },
      { path: "/new-recipe", Component: RecipeCreatePage },
      { path: "/login", Component: LoginPage },
      { path: "/sign-up", Component: SignupPage },
      { path: "/dashboard", Component: Dashboard },
    ],
  },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}
