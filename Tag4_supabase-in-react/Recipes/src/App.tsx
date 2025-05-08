import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import HomeOverview from "./pages/HomeOverview";
import RootLayout from "./layouts/RootLayout";
import RecipeCreatePage from "./pages/RecipeCreatePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthContextProvider } from "./components/contexts/auth-context";
import ProfilePage from "./pages/ProfilePage";
const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: HomeOverview },
      { path: "/recipes/:id", Component: RecipeDetailPage },
      { path: "/new-recipe", Component: RecipeCreatePage },
      { path: "/login", Component: LoginPage },
      { path: "/sign-up", Component: SignupPage },
      { path: "/profile", Component: ProfilePage },
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
