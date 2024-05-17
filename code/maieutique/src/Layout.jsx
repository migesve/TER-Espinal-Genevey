import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
      <>
        <Navbar />
        <main>
          <div className="flex-grow mt-24 mb-24 p-4">
            <Outlet />
          </div>
        </main>
        <Footer />
      </>
    );

}