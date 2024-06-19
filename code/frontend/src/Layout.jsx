import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16 p-4"> {/* Adjust margin-top for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
