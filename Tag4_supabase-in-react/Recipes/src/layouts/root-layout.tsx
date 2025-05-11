import { Outlet } from "react-router-dom";
import NavBar from "@/components/nav-bar";

function RootLayout() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
