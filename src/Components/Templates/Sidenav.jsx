import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {/* Button for toggling the sidebar on small screens */}
    <button 
        className = "lg:hidden fixed top-8 left-4 z-50 text-white text-2xl"
        onClick = {() => setIsOpen(!isOpen)}
    >
      <i className="ri-menu-line"></i>
    </button>

      {/* <div className="w-[20%] h-full border-r-2 border-zinc-400 p-10"> */}
      <div className={`fixed top-0 lg:right-0 h-full bg-[#1F1E24] transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%] w-64 border-r-2 border-zinc-400 p-10 z-40`}
      >
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556cd] ri-tv-fill mr-3"></i>
          <span className="text-2xl">SCSDB</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-7 mb-5">
            New Feeds
          </h1>
          <Link to='/trending' className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="ri-fire-fill"></i> Trending
          </Link>
          <Link to='/popular' className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="mr-1 ri-bard-fill"></i> Popular
          </Link>
          <Link to='/tv' className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="mr-1 ri-tv-2-fill"></i> Tv Shows
          </Link>
          <Link to='/movie' className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="mr-1 ri-movie-2-fill"></i> Movies
          </Link>
          <Link to='/person' className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="mr-1 ri-team-fill"></i> People
          </Link>
        </nav>
        <hr className="border-none h-[2px] bg-zinc-400 mt-5" />
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-5">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="mr-1 ri-information-fill"></i> About
          </Link>
          <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-1">
            <i className="mr-1 ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </div>

    </>
  );
};

export default SideNav;
