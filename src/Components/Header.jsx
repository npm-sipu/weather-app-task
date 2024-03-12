import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const userData = JSON.parse(sessionStorage.getItem("registerData"));
  useEffect(() => {
    if (userData && userData.firstName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  return (
    <div className='navbar bg-base-100 shadow-lg'>
      <div className='flex-1'>
        <NavLink to='/' className='btn btn-ghost normal-case text-xl'>
          Weather
        </NavLink>
      </div>
      <div className='flex-none hidden md:block sm:block'></div>
    </div>
  );
};

export default Header;
