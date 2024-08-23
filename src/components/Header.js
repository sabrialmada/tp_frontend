import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, setUser, setWorkspaces }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      localStorage.removeItem('loggedInUser');
      setUser(null);
      setWorkspaces([]); 

      navigate('/');
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button className="logout" onClick={handleLogout}>Logout</button>
            <button className="menu-toggle" onClick={toggleDropdown}>
              <i className="bi bi-list"></i>
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <span>{user.email}</span>
                <button className="logout-dropdown" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
