import {
  faCartArrowDown,
  faSearch,
  faTimes,
  faBars,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "./Slider";
import logo from "../assets/HS&DV/DVW.png";
import hoverLogo from "../assets/DV.PNG";
import VideoHome from "./VideoHome";
import { HiOutlineUserCircle } from "react-icons/hi2";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const searchBarRef = useRef(null);
  const menuRef = useRef(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://bcom-backend.onrender.com/api/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://bcom-backend.onrender.com/api/collections"
        );
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCategories();
    fetchCollections();
  }, []);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  }, [cartCount]);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const toggleCollections = () => {
    setShowCollections(!showCollections);
  };
  return (
    <>
      <div className="relative w-full overflow-x-hidden font-semibold font-indif">
        {/* slider "/" */}
        {location.pathname === "/" ? (
          <div className="">
            <VideoHome />
            {/* <Slider /> */}
          </div>
        ) : (
          <div className="h-0"></div> // Add a class with no height on non-home pages to avoid empty space
        )}

        {/* Navbar */}
        <div
          className={`${
            isScrolled || location.pathname !== "/"
              ? "bg-white shadow-md text-black"
              : "bg-transparent text-white"
          } fixed top-0 left-0 w-full z-50 transition-colors duration-200 hover:bg-white hover:text-black`}
          onMouseEnter={handleMouseEnter} // Handle mouse enter
          onMouseLeave={handleMouseLeave} // Handle mouse leave
        >
          {/* Only show the search bar when search is clicked */}
          {!showSearchBar && (
            <>
              {/* Hamburger menu (Mobile) */}
              <div className="absolute left-5 top-5 md:hidden">
                <FontAwesomeIcon
                  icon={faBars}
                  className={`text-2xl mt-1 cursor-pointer ${
                    showMenu || location.pathname !== "/"
                      ? "text-black"
                      : isHovered
                      ? "text-black"
                      : isScrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                  onClick={toggleMenu}
                  onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
                  onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
                />
              </div>

              <div className="flex justify-around items-center text-center uppercase">
                <div className="flex">
                  <a
                    href="#search"
                    onClick={handleSearchClick}
                    className="hover:border-b-2 font-indif hover:border-black cursor-pointer"
                  >
                    <span className="hidden uppercase ">Search</span>
                  </a>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="mt-1 hidden lg:block cursor-pointer text-xl "
                    onClick={handleSearchClick}
                  />
                </div>

                <Link to={"/"}>
                  <img
                    src={
                      location.pathname === "/"
                        ? isScrolled || isHovered
                          ? hoverLogo
                          : logo
                        : hoverLogo
                    }
                    alt="Logo"
                    className="h-16 p-2 w-48 ml-14 lg:mr-12 lg:w-72 lg:ml-40 transition-opacity duration-300"
                  />
                  {/* <p className="mt-6 h-12 ml-12 text-2xl lg:text-4xl font-light font-corm uppercase">
                    Dev and Viv
                  </p> */}
                </Link>
                <div className="flex ">
                  <Link
                    to="/cart"
                    className="hover:border-b-2 relative hover:border-black font-indif"
                  >
                    <span className="hidden uppercase mt-2">Bag</span>
                    {cartCount > 0 && (
                      <span className="mb-2 ml-5 bottom-3 bg-red-500 absolute rounded-full px-2 text-md text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="ml-2 text-xl mt-2 cursor-pointer"
                    />
                  </Link>
                  <Link to="/login">
                    <HiOutlineUserCircle className="ml-10 mt-1 text-3xl cursor-pointer " />
                  </Link>
                </div>
              </div>

              {/* Navbar content (links and logo) */}
              <div
                className={`flex justify-center items-center px-10 ${
                  showMenu ? "hidden" : "" // Hide navbar content when menu is open
                }`}
              >
                {/* Links for desktop */}

                <ul className="md:flex text-lg mt-2 gap-10 items-center  hidden uppercase">
                  <li>
                    <Link
                      to="/"
                      className="hover:border-b-2 hover:border-black font-indif uppercase"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link
                      to=""
                      className="hover:border-b-2 hover:border-black font-indif uppercase"
                    >
                      Shop
                    </Link>
                    {/* Dynamic Shop Dropdown with Categories and Collections */}
                    <div className="fixed inset-0 top-[50px] w-full h-96 bg-white shadow-lg hidden group-hover:flex p-5 gap-10 z-50">
                      {/* Categories Column */}
                      <div className="flex-grow ">
                        <h3 className="text-lg text-center font-semibold mb-3 font-indif">
                          Categories
                        </h3>
                        <div className="font-indif font-semibold">
                          <ul>
                            {categories.map((category) => (
                              <li
                                key={category.id}
                                className="hover:bg-gray-100 px-3 py-2 text-center"
                              >
                                <Link to={`/category/${category._id}`}>
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* Collections Column */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold mb-3 font-indif">
                          Collections
                        </h3>
                        <div className="font-indif font-semibold">
                          <ul>
                            {collections.map((collection) => (
                              <li
                                key={collection.id}
                                className="hover:bg-gray-100 px-3 py-2"
                              >
                                <Link to={`/collection/${collection._id}`}>
                                  {collection.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative group">
                    <Link
                      to="/about"
                      className="hover:border-b-2 hover:border-black font-indif uppercase"
                    >
                      About
                    </Link>
                    <div className="absolute left-0 top-full bg-white shadow-lg hidden group-hover:block">
                      <ul className="p-5">
                        <li className="hover:bg-gray-100 px-3 py-2 font-indif">
                          <Link to="#founder">Founder</Link>
                        </li>
                        <li className="hover:bg-gray-100 px-3 py-2 font-indif">
                          <Link to="#legacy">Legacy</Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      className="hover:border-b-2 hover:border-black font-indif uppercase"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 px-3 py-2 font-indif uppercase">
                    <Link
                      to="https://heetesh-shah.vercel.app/"
                      onClick={toggleMenu}
                      target="_blank"
                    >
                      Heetesh Shah
                    </Link>
                  </li>

                  <li></li>
                </ul>
              </div>
            </>
          )}

          {/* Search Bar */}
          {showSearchBar && (
            <div
              className="flex h-[100px] justify-center bg-white"
              ref={searchBarRef}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border h-[50px] mt-5 ml-5 rounded-md border-gray-300 p-1 w-[580px]"
                placeholder="Search products..."
              />
              <button className="ml-2  h-[50px] mt-5  rounded-md px-4 bg-[#cdac99] text-black font-indif ">
                Search
              </button>
              <FontAwesomeIcon
                icon={faTimes}
                className="lg:ml-10 mt-8 text-2xl cursor-pointer text-black "
                onClick={() => setShowSearchBar(false)}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-start z-50"
            ref={menuRef}
          >
            <div className="bg-white w-64 h-full p-5">
              <FontAwesomeIcon
                icon={faTimes}
                className="text-2xl cursor-pointer ml-[170px] mt-2 text-black "
                onClick={toggleMenu}
              />
              <div className="flex justify-between items-center text-xl font-bold font-indif">
                <h1 className="mt-10">Menu</h1>
              </div>
              <ul className="mt-5">
                <li className="hover:bg-gray-100 px-3 py-2 font-indif uppercase">
                  <Link to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li className="hover:bg-gray-100 px-3 py-2 font-indif uppercase">
                  <Link to="" onClick={toggleMenu}>
                    Shop
                  </Link>

                  {/* Categories Section */}
                  <ul className="ml-4 mt-2">
                    <li
                      className="font-bold text-lg flex items-center justify-between cursor-pointer"
                      onClick={toggleCategories}
                    >
                      <span>Categories:</span>
                      <span className="text-xl">
                        {showCategories ? "-" : "+"}
                      </span>
                    </li>

                    {/* Conditionally render categories based on state */}
                    {showCategories && (
                      <ul className="mt-2">
                        {categories.map((category) => (
                          <li
                            key={category._id}
                            className="hover:bg-gray-200 px-3 py-1 font-indif"
                          >
                            <Link
                              to={`/category/${category._id}`}
                              onClick={toggleMenu}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Collections Section */}
                    <li
                      className="font-bold text-lg mt-4 flex items-center justify-between cursor-pointer"
                      onClick={toggleCollections}
                    >
                      <span>Collections:</span>
                      <span className="text-xl">
                        {showCollections ? "-" : "+"}
                      </span>
                    </li>

                    {/* Conditionally render collections based on state */}
                    {showCollections && (
                      <ul className="mt-2">
                        {collections.map((collection) => (
                          <li
                            key={collection._id}
                            className="hover:bg-gray-200 px-3 py-1 font-indif"
                          >
                            <Link
                              to={`/collection/${collection._id}`}
                              onClick={toggleMenu}
                            >
                              {collection.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </li>
                <li className="hover:bg-gray-100 px-3 py-2 font-indif uppercase">
                  <Link to="/about" onClick={toggleMenu}>
                    About
                  </Link>
                </li>

                <li className="hover:bg-gray-100 px-3 py-2 font-indif uppercase">
                  <Link to="/contact" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
                <li className="hover:bg-gray-100 px-3 py-2 font-indif uppercase">
                  <Link
                    to="https://heetesh-shah.vercel.app/"
                    onClick={toggleMenu}
                    target="_blank"
                  >
                    Heetesh Shah
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
