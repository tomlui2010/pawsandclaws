import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";
import logo from "../../../src/logo512.png";

export default function Navbar() {
  const { searchParam, setSearchParam , handleSubmit } = useContext(GlobalContext);

  console.log(searchParam);

  return (
    <div>
      <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
        <NavLink to={"/"}><img src={logo} alt="Paws & Claws Logo" className="h-25 w-20" /></NavLink>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={searchParam}
            onChange={(event) => setSearchParam(event.target.value)}
            placeholder="Search for a pet ..."
            className="bg-orange-100 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-orange-200"
          />
        </form>
        <ul className="flex gap-5">
          <li>
            <NavLink
              to={"/"}
              className="bg-orange-100 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-orange-200 text-grey hover:text-gray-700 duration-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/pokes"}
              className="bg-orange-100 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-orange-200 text-grey hover:text-gray-700 duration-300"
            >
              Pet Picks
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/register"}
              className=" bg-orange-100 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-orange-200 text-grey hover:text-gray-700 duration-300"
            >
              Register a pet
            </NavLink>
          </li>
        </ul>
    </nav>
    </div>

  );
}
