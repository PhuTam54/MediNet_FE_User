import blog1 from "~/assets/images/blog/01.jpg";
import blog2 from "~/assets/images/blog/02.jpg";
import blog3 from "~/assets/images/blog/03.jpg";
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
import { Link } from "react-router-dom";


function Footer() {
  const [clinic, setClinic] = useState('');
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://medinetaptech.azurewebsites.net/api/v1/Clinics/id?id=1")
      .then((response) => response.json())
      .then((data) => {
        setClinic(data);
      });
  
  }, []);
  useEffect(() => {
    fetch("https://medinetaptech.azurewebsites.net/api/v1/Blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  },[]);  
  //giới hạn kí tự of tên
function truncate(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
    return ( 
      <>
  {/*footer start*/}
  <footer className="footer widget-footer clearfix">
    <div className="first-footer ttm-bgcolor-skincolor">
      <div className="container">
        <div className="row">
          <div className="widget-area col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <aside className="widget widget-text">
              {/*featured-icon-box*/}
              <div className="featured-icon-box iconalign-before-heading">
                <div className="featured-icon">
                  <div className="ttm-icon ttm-icon_element-border ttm-icon_element-color-white ttm-icon_element-size-sm ttm-icon_element-style-square">
                    <i className="fa fa-phone" />
                  </div>
                </div>
                <div className="featured-title">
                  <h5>{clinic.phone}</h5>
                  <h4>Have a question? call us now</h4>
                </div>
              </div>
              {/* featured-icon-box end*/}
            </aside>
          </div>
          <div className="widget-area col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <aside className="widget widget-text">
              {/*featured-icon-box*/}
              <div className="featured-icon-box iconalign-before-heading">
                <div className="featured-icon">
                  <div className="ttm-icon ttm-icon_element-border ttm-icon_element-color-white ttm-icon_element-size-sm ttm-icon_element-style-square">
                    <i className="fa fa-envelope-o" />
                  </div>
                </div>
                <div className="featured-title">
                  <h5>{clinic.email}</h5>
                  <h4>Need support? Drop us an email</h4>
                </div>
              </div>
              {/* featured-icon-box end*/}
            </aside>
          </div>
          <div className="widget-area col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <aside className="widget widget-text">
              {/*featured-icon-box*/}
              <div className="featured-icon-box iconalign-before-heading">
                <div className="featured-icon">
                  <div className="ttm-icon ttm-icon_element-border ttm-icon_element-color-white ttm-icon_element-size-sm ttm-icon_element-style-square">
                    <i className="fa fa-clock-o" />
                  </div>
                </div>
                <div className="featured-title">
                  <h5>Mon – Sat 07:00 – 21:00</h5>
                  <h4>We are open on</h4>
                </div>
              </div>
              {/* featured-icon-box end*/}
            </aside>
          </div>
        </div>
      </div>
    </div>
    <div className="second-footer ttm-textcolor-white">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 widget-area">
            <div className="widget widget_text clearfix">
              <h3 className="widget-title">About Delmont</h3>
              <div className="textwidget widget-text">
                Our Clinic has grown to provide a world class facility for the
                clinic advanced restorative dentistry.
                <br />
                <br />
                We are among the most qualified implant providers in the AUS
                with over 30 years of quality training and experience.
                <br />
                <br />
                <div className="social-icons social-hover">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 widget-area">
            <div className="widget widget_nav_menu clearfix">
              <h3 className="widget-title">Quick Links</h3>
              <ul id="menu-footer-quick-links">
                <li>
                  <a href="index-2.html">Make Appointments</a>
                </li>
                <li>
                  <a href="services-1.html">Before &amp; After</a>
                </li>
                <li>
                  <a href="about-1.html">Customer Treatments</a>
                </li>
                <li>
                  <a href="single-style-1.html">Our Doctors Team</a>
                </li>
                <li>
                  <a href="blog.html">Departments Services</a>
                </li>
                <li>
                  <a href="our-team.html">About our Clinic</a>
                </li>
                <li>
                  <a href="faq.html">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 widget-area">
            <div className="widget style2 widget-out-link clearfix">
              <h3 className="widget-title">Latest News</h3>
              <ul className="widget-post ttm-recent-post-list">
              {blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((blog) => (
  <li key={blog.id}>
    <a href=''>
      <Link to={`/blogdetail/${blog.id}`}><img src={blog.imageSrc} alt="post-img" /></Link>
      
    </a>
    <span className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
    <a href=''>
      <Link to={`/blogdetail/${blog.id}`}>{truncate(blog.title, 50)}</Link>
      
    </a>
  </li>
))}
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 widget-area">
            <div className="widget widget_nav_menu menu-footer-services-menu clearfix">
              <h3 className="widget-title">Our Services</h3>
              <ul id="menu-footer-services-menu" className="menu">
                <li>
                  <a href="#">Surgery</a>
                </li>
                <li>
                  <a href="#">Psychological</a>
                </li>
                <li>
                  <a href="#">Cardiology</a>
                </li>
                <li>
                  <a href="#">Orthopedics</a>
                </li>
                <li>
                  <a href="#">Pediatric</a>
                </li>
                <li>
                  <a href="#">Oncology</a>
                </li>
                <li>
                  <a href="#">Anesthesiology</a>
                </li>
                <li>
                  <a href="#">Dermatology</a>
                </li>
              </ul>
            </div>
            <div className="widget widget-text clearfix">
              <h3 className="widget-title">Newsletter</h3>
              <form
                id="subscribe-form"
                method="post"
                action="#"
                data-mailchimp="true"
              >
                <div className="ttm_subscribe_form">
                  <input
                    type="email"
                    name="EMAIL"
                    placeholder="Enter Your Email"
                    required=""
                  />
                  <button className="btn" type="submit">
                    {" "}
                    <i className="fa fa-envelope-o" />{" "}
                  </button>
                </div>
                <div className="subscribe-response" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bottom-footer-text ttm-textcolor-white">
      <div className="container">
        <div className="row copyright">
          <div className="col-md-12">
            <span>
              Copyright © 2019 Delmont Theme by{" "}
              <a href="https://themetechmount.com/">ThemetechMount</a>
            </span>
          </div>
          <div className="col-md-12">
            <ul id="menu-footer-menu" className="footer-nav-menu">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <a id="totop" href="#top">
  <i className="fa fa-angle-up" />
</a>

  {/*footer end*/}
</>

    

     );
}

export default Footer;