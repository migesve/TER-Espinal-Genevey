import { Link } from "react-router-dom";

const navItems = [
  { id: 1, text: 'Home', path: '/'},
  { id: 2, text: 'Saisir', path: '/maieutique'},
];

export function Navbar() {
  return (
    <div className="bg-white flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <Link key={item.id} to={item.path}>
            <li className="p-4 hover:bg-blue-600 rounded-md m-2 cursor-pointer duration-100 hover:text-white">
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
