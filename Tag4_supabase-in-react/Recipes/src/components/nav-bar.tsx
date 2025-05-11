import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuthContext } from "../contexts/auth-context";

export default function NavBar() {
  const { signOut, session } = useAuthContext();
  return (
    <>
      <nav>
        <Link to="/">CookBook</Link>
        <Link to="/new-recipe">Rezept erstellen</Link>
        {!session && <Link to="/login">Login</Link>}
        {!session && <Link to="/sign-up">Registrieren</Link>}
        {session && <Button onClick={signOut}>Sign Out</Button>}
        {session && <Link to="/dashboard">Dashboard</Link>}
      </nav>
    </>
  );
}
