import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";

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
