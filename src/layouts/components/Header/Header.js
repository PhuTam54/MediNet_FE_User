


import logo from "~/assets/images/logo/logo.png"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "~/context/UserContext";

function Header() {
  const [isLoggedIn] = useState(!!localStorage.getItem('token'));
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = ()=> {
   logout();
    navigate("/");
    toast.success("Logout succsess!");
    console.log("Log out succsess!");                                     
   
  
  }
    return (
      <header className="header-section">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <ul className="menu">
            <li>
              <a href="#0" className="active">
                Home
              </a>
              <ul className="submenu">
                <li>
                  <a href="/" className="active">
                    Home One
                  </a>
                </li>
                <li>
                  <a href="/">Home Two</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">movies</a>
              <ul className="submenu">
                <li>
                  <a href="/moviegird">Movie Grid</a>
                </li>
                <li>
                  <a href="/movielist">Movie List</a>
                </li>
                
              </ul>
            </li>
            <li>
              <a href="#0">events</a>
              <ul className="submenu">
                <li>
                  <a href="events.html">Events</a>
                </li>
                <li>
                  <a href="event-details.html">Event Details</a>
                </li>
                <li>
                  <a href="event-speaker.html">Event Speaker</a>
                </li>
                <li>
                  <a href="event-ticket.html">Event Ticket</a>
                </li>
                <li>
                  <a href="event-checkout.html">Event Checkout</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">shops</a>
              <ul className="submenu">
                <li>
                  <a href="/shops">Shops</a>
                </li>
                
              </ul>
            </li>
            <li>
              <a href="#0">pages</a>
              <ul className="submenu">
                <li>
                  <a href="about.html">About Us</a>
                </li>
                <li>
                  <a href="/myorder">My Order</a>
                </li>
                <li>
                  <a href="/signin">Sign In</a>
                </li>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
                <li>
                  <a href="404.html">404</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">blog</a>
              <ul className="submenu">
                <li>
                  <a href="blog.html">Blog</a>
                </li>
                <li>
                  <a href="blog-details.html">Blog Single</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="contact.html">contact</a>
            </li>


           <li className="header-button pr-0">
  <div className="container" style={{ textAlign: 'center' }}>
    {/* Hiển thị biểu tượng người dùng nếu đã đăng nhập */}
    {isLoggedIn ? (
      <a href="#0" style={{ margin: '0' }}>
        <i className="fa fa-user"></i> {/* Thay biểu tượng này bằng biểu tượng người dùng của bạn */}
      </a>
    ) : (
      // Hiển thị "Join Us" nếu chưa đăng nhập
      <a href="#0" style={{ margin: '0' }}>Join Us</a>
    )}
    <br />
  </div>
  <ul className="submenu">
    {/* Check if user is logged in, if yes, display logout option */}
    {isLoggedIn ? (
      <li>
        <a href="#0" onClick={() => handleLogout()}>Log Out</a>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {user && user.email && (
            <span style={{ margin: '0', color: 'black' }}>
              {user.email}
            </span>
          )}
        </div>
      </li>
    ) : (
      // If user is not logged in, display login option
      <li>
        <a href="/signin">Log In</a>
      </li>
    )}
  </ul>
</li>

          </ul>
          <div className="header-bar d-lg-none">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </header>
    
      
    );
}

export default Header;
