import { Link } from "react-router-dom";

// const navItems = [
//   { id: 1, text: 'Home', path: '/'},
// ];

export function Footer() {
  return (
    <div className="inset-x-0 bottom-0 bg-white flex justify-between items-center h-18 mx-auto px-4 text-white z-50">
      <ul className="md:flex">
        {/* {navItems.map((item) => ( */}
          {/* <Link key={item.id} to={item.path}> */}
            <li className="p-4 hover:bg-blue-600 rounded-md m-2 cursor-pointer duration-100 hover:text-white">
              Crée par ESPINAL, Miguelangel et GENEVEY, Coemgen
            </li>
          {/* </Link> */}
        {/* ))} */}
      </ul>
    </div>
  );
}
