import logo from "~/assets/images/logo-img.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "~/context/UserContext";
import { useEffect } from 'react';
import axios from "axios";

function Header() {
  const [isLoggedIn,setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cartItemCount, setCartItemCount] = useState(0);
  const [uniqueProductCount, setUniqueProductCount] = useState(0); // Đếm số sản phẩm khác nhau
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = token.split('.')[1];
      const decodedToken = atob(tokenData);
      const tokenObject = JSON.parse(decodedToken);
      const userId = tokenObject.userId;
      const userRole = tokenObject.userRole;
      localStorage.setItem('userId', userId); // Lưu userId vào localStorage
      localStorage.setItem('userRole', userRole);
     // Lưu userRole vào localStorage
      setUserId(userId);
      setUserRole(userRole);
      fetch(`https://medinetaptech.azurewebsites.net/api/v1/Carts/userid?userid=${userId}`)
        .then(response => response.json())
        .then(data => {
          let totalProductsInCart = 0;
          let uniqueProducts = new Set(); // Sử dụng Set để lưu các sản phẩm duy nhất
          data.forEach(item => {
            totalProductsInCart += item.qtyCart;
            uniqueProducts.add(item.productId); // Thêm id sản phẩm vào Set
          });
          setCartItemCount(totalProductsInCart);
          setUniqueProductCount(uniqueProducts.size); // Lấy kích thước của Set để đếm số sản phẩm khác nhau
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });

      // Đặt isLoggedIn thành true khi đã có token
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Nếu không có token, đặt isLoggedIn thành false
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success("Logout success!");
  };
  const [clinic, setClinic] = useState('');
  useEffect(() => {
    fetch("https://medinetaptech.azurewebsites.net/api/v1/Clinics/id?id=1")
      .then((response) => response.json())
      .then((data) => {
        setClinic(data);
      });

  }, []);
  const openingTime = new Date(clinic.openingHours).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
const closingTime = new Date(clinic.closingHours).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); 
    return (
      <>
      

  {/*header start*/}
  <header id="masthead" className="header ttm-header-style-classicinfo">
    {/* ttm-fbar-main-w */}
    <div className="ttm-fbar-main-w ttm-fbar-position-right">
      <div className="ttm-fbar-box-w ttm-textcolor-white ttm-bgcolor-darkgrey ttm-bg ttm-bgimage-yes">
        <span className="ttm-fbar-btn">
          <a href="javascript:void(0)" className="ttm-fbar-btn-link">
            <span className="ttm-fbar-open-icon">
              <i className="fa fa-bars" />
            </span>
            <span className="ttm-fbar-close-icon">
              <i className="fa fa-times" />
            </span>
          </a>
        </span>
        <div className="ttm-fbar-bg-layer ttm-bg-layer" />
        {/* ttm-fbar-content-wrapper */}
        <div className="ttm-fbar-content-wrapper">
          <div className="ttm-fbar-box">
            {/* ttm_widget_team_search-2 */}
            <aside
              id="ttm_widget_team_search-2"
              className="widget-even widget-4 widget ttm_widget_team_search"
            >
              <div className="team-search-form-w">
                <form method="get" className="team-search-form " action="#">
                  <div className="ttm-team-search-title">
                    <h2>Doctors Search:</h2>
                  </div>
                  <div className="team-search-form-before-text">
                    We provide the most full medical services, so every person
                    could have the opportunity
                  </div>
                  <div className="ttm-fbar-input">
                    <div className="search_field by_name">
                      <i className="fa fa-user-md" />
                      <input
                        type="text"
                        placeholder="Search By Name"
                        name="s"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="ttm-fbar-input">
                    <div className="search_field selectbox">
                      <i className="fa fa-tags" />
                      <select
                        name="team_group"
                        tabIndex={-1}
                        className="select2-hidden-accessible"
                        aria-hidden="true"
                      >
                        <option value="" className="select-empty">
                          All Sections
                        </option>
                        <option value="dental">Dental</option>
                        <option value="dermatologist">Dermatologist</option>
                        <option value="health-care">Health Care</option>
                        <option value="ophthalmology">Ophthalmology</option>
                        <option value="psychological">Psychological</option>
                        <option value="surgery">Surgery</option>
                      </select>
                    </div>
                  </div>
                  <div className="submit_field">
                    <button type="submit">Search</button>
                  </div>
                </form>
              </div>
            </aside>
            {/* ttm_widget_team_search-2 end */}
            {/* enhanced-text-widget */}
            <aside
              id="enhancedtextwidget-10"
              className="widget-odd widget-5 widget widget_text enhanced-text-widget"
            >
              <h3 className="widget-title">Opening Hours:</h3>
              <div className="textwidget widget-text">
                These are our normal opening hours. When we are closed can be
                found here.
                <br />
                <div className="ttm-pricelistbox-wrapper ">
                  <ul className="ttm-pricelist-block">
                    <li>
                      Monday - Saturday
                      <span className="service-price">8.30 – 17.00</span>
                    </li>
                    <li>
                      Sunday
                      <span className="service-price">
                        <strong>Closed</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
            {/* enhanced-text-widget end */}
            {/* enhanced-text-widget */}
            <aside
              id="enhancedtextwidget-11"
              className="widget-even widget-6 widget widget_text enhanced-text-widget"
            >
              <div className="textwidget widget-text">
                <div className="featured-icon-box left-icon icon-align-top">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-border ttm-icon_element-color-white ttm-icon_element-size-sm ttm-icon_element-style-square">
                      <i className="fa fa-phone" />
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h5>+123 456 78910 / 11</h5>
                    </div>
                    <div className="featured-desc">
                      <p>Have a question? call us now</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            {/* enhanced-text-widget end */}
          </div>
        </div>
        {/* ttm-fbar-content-wrapper end */}
      </div>
    </div>
    {/* ttm-fbar-main-w end */}
    {/* ttm-topbar-wrapper */}
    <div className="ttm-topbar-wrapper ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
      <div className="container">
        <div className="ttm-topbar-content">
          <ul className="top-contact text-left">
            <li>
              <i className="themifyicon ti-location-pin" />
              {clinic && clinic.address}
            </li>
            <li>
  <i className="themifyicon ti-timer" />
  Mon - Sat {openingTime} - {closingTime}. Sunday CLOSED
</li>
            <li>
              <i className="themifyicon ti-email" />
              {clinic && clinic.email}
            </li>
            <li>
              <i className="themifyicon ti-mobile" />
              {clinic && clinic.phone}
            </li>
          </ul>
          <div className="topbar-right text-right">
            <div className="ttm-social-links-wrapper list-inline">
            
            </div>
            <a
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
              href="#"
            >
              {clinic && clinic.name}
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* ttm-topbar-wrapper end */}
    {/* ttm-header-wrap */}
    <div className="ttm-header-wrap">
      {/* ttm-stickable-header-w */}
      <div
        id="ttm-stickable-header-w"
        className="ttm-stickable-header-w ttm-bgcolor-white clearfix"
      >
        <div id="site-header-menu" className="site-header-menu">
          <div className="site-header-menu-inner ttm-stickable-header">
            <div className="container">
              {/* site-branding */}
              <div className="site-branding">
                <a
                  className="home-link"
                  href="/"
                  title="Delmont"
                  rel="home"
                >
                  <img
                    width={151}
                    height={33}
                    id="logo-img"
                    className="img-center"
                    src={logo}
                    alt="logo-img"
                  />
                </a>
              </div>
              {/* site-branding end */}
              {/*site-navigation */}
              <div id="site-navigation" className="site-navigation">
                {/* header-icons */}
                <div className="ttm-header-icons ">
                  <span className="ttm-header-icon ttm-header-cart-link">
                    <a href="/cart">
                      <i className="fa fa-shopping-cart" />
                      <span className="number-cart">{uniqueProductCount}</span>
                    </a>
                  </span>
                
                  {/* <div className="ttm-header-icon ttm-header-search-link">
                    <a href="#">
                      <i className="ti ti-search" />
                    </a>
                    <div className="ttm-search-overlay">
                      <div className="ttm-search-outer">
                        <div className="ttm-form-title">
                          Hi, How Can We Help You?
                        </div>
                        <form
                          method="get"
                          className="ttm-site-searchform"
                          action="#"
                        >
                          <div className="w-search-form-h">
                            <div className="w-search-form-row">
                              <div className="w-search-input">
                                <input
                                  type="search"
                                  className="field searchform-s"
                                  name="s"
                                  placeholder="Type Word Then Enter..."
                                />
                                <button type="submit">
                                  <i className="ti ti-search" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* header-icons end */}
                <div className="ttm-menu-toggle">
                  <input type="checkbox" id="menu-toggle-form" />
                  <label
                    htmlFor="menu-toggle-form"
                    className="ttm-menu-toggle-block"
                  >
                    <span className="toggle-block toggle-blocks-1" />
                    <span className="toggle-block toggle-blocks-2" />
                    <span className="toggle-block toggle-blocks-3" />
                  </label>
                </div>
                <nav id="menu" className="menu">
                  <ul className="dropdown">
                    <li className="active">
                      <a href="/">Home</a>
                      <ul>
                        
                      </ul>
                    </li>
                    {userRole === "Employee" && (
                      <li>
                        <a href="#">Course</a>
                          <ul>
                            <li>
                              <a href="/courses">Courses</a>
                            </li>
                            <li>
                              <a href="/mycourses">My Courses</a>
                            </li>
                          </ul>
                    </li>
                    )}
                    {/* <li>
                      <a href="#">Pages</a>
                      <ul>
                      
                       
                        <li>
                          <a href="services.html">Services</a>
                        </li>
                        <li>
                          <a href="contact-us.html">Contact Us</a>
                        </li>
                       
                        <li>
                          <a href="our-team.html">Our Doctors</a>
                        </li>
                        <li>
                          <a href="#">Shop</a>
                          <ul>
                            <li>
                              <a href="/shop">Home Shop</a>
                            </li>
                            <li>
                              <a href="/products">Products</a>
                            </li>
                            <li>
                              <a href="/productdetail">
                                 Product Details
                              </a>
                            </li>
                            <li>
                              <a href="/cart">Cart</a>
                            </li>
                            <li>
                              <a href="/checkout">Checkout</a>
                            </li>
                            <li>
                              <a href="/thankyou">Thankyou</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="#">Features</a>
                          <ul>
                            <li>
                              <a href="before-after.html">Before &amp; After</a>
                            </li>
                            <li>
                              <a href="our-events.html">Our Events</a>
                            </li>
                            <li>
                              <a href="book-appointment.html">
                                Book Appointment
                              </a>
                            </li>
                            <li>
                              <a href="team-details.html">Doctor Details</a>
                            </li>
                            <li>
                              <a href="forums.html">bbPress</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="faq.html">FAQs</a>
                        </li>
                        <li>
                          <a href="error.html">Error Page</a>
                        </li>
                        <li>
                          <a href="element.html">Elements</a>
                        </li>
                      </ul>
                    </li> */}
                    <li>
                          <a href="/doctors ">Doctors</a>
                          
                        </li>
                    <li>
                          <a href="/shop ">Shop</a>
                          <ul>
                           
                            <li>
                              <a href="/products">Products</a>
                            </li>
                            
                          </ul>
                        </li>
                    {/* <li>
                      <a href="#">Services</a>
                      <ul>
                        <li>
                          <a href="neurology-services.html">
                            Neurology Services
                          </a>
                        </li>
                        <li>
                          <a href="cardiology-services.html">
                            Cardiology Services
                          </a>
                        </li>
                        <li>
                          <a href="x-ray-rmi-services.html">
                            X-Ray &amp; RMI Services
                          </a>
                        </li>
                        <li>
                          <a href="eye-care-services.html">Eye Care Services</a>
                        </li>
                        <li>
                          <a href="dental-services.html">Dental Services</a>
                        </li>
                        <li>
                          <a href="orthopaedics-services.html">
                            Orthopaedics Services
                          </a>
                        </li>
                      </ul>
                    </li> */}
                    <li>
                      <a href="/blogs">Blog</a>
                      
                    </li>
                    <li>
                      <a href="/aboutus">About Us</a>
                      
                    </li>
                                        <li className="header-button pr-0">
                      <div className="container" style={{ textAlign: 'center' }}>

                        {isLoggedIn ? (
                          <a href="#">
                          <FontAwesomeIcon style={{color: "#01d6a3"}} icon={faUser} />
                        </a>
                        ) : (
                         
                          <a href="#0" style={{ margin: '0' }}><strong>Join Us</strong></a>
                        )}
                        <br />
                      </div>
                      <ul className="submenu">

                        
                        {isLoggedIn ? (
                          
                          <li>
                              <div className="vanh_hover">
                                <a style={{fontSize: 15, color: "black"}} href="/profile">My Profile</a>
                              </div>
                             
                              <div className="vanh_hover">
                                <a style={{fontSize: 15, color: "black"}} href="/myOrder">My Order</a>
                              </div>
                              <div className="vanh_hover">
                                <a href="#0" style={{fontSize: 15, color: "black"}} onClick={() => handleLogout()}>Log Out</a>
                                
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  {user && user.email && (
                                    <span style={{ margin: 20, color: 'black' }}>
                                      {user.email}
                                    </span>
                                  )}
                                </div>
                          </li>
                        ) : (
                          // If user is not logged in, display login option
                          <li>
                            <a style={{fontSize: 15}} href="/login">Log In</a>
                          </li>
                        )}
                      </ul>
                    </li>
                                      </ul>
                                    </nav>
                                  </div>
                                  {/* site-navigation end*/}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ttm-stickable-header-w end*/}
                        </div>
                        {/*ttm-header-wrap end */}
                        <div className="ttm-content-wrapper">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-12">
                                {/* ttm-info-widget*/}
                                <div className="ttm-info-widget">
                                  <div className="header-widget">
                                    <div className="header-icon">
                                      <i className="fa fa-hospital-o" />
                                    </div>
                                    <div className="header-content">
                                      <h3>Number 1 Hospital</h3>
                                      <p>In United States</p>
                                    </div>
                                  </div>
                                  <div className="header-widget">
                                    <div className="header-icon">
                                      <i className="fa fa-user-md" />
                                    </div>
                                    <div className="header-content">
                                      <h3>Personal Cabinet</h3>
                                      <p>Qualified Staff</p>
                                    </div>
                                  </div>
                                  <div className="header-widget">
                                    <div className="header-icon">
                                      <i className="fa fa-thumbs-o-up" />
                                    </div>
                                    <div className="header-content">
                                      <h3>Get Result Online</h3>
                                      <p>Satisfied Patients</p>
                                    </div>
                                  </div>
                                </div>
                                {/* ttm-info-widget end */}
                                <div className="ttm-contact">
                                  <span className="icon">
                                    <i className="fa fa-phone" />
                                  </span>
                                  Toll Free : 1 123 456 78910
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </header>
                      {/*header end*/}
                    </>

                        

                        
                          
                        );
                    }

                    export default Header;
