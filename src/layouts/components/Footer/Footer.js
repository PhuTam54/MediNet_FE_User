import blog1 from "~/assets/images/blog/01.jpg";
import blog2 from "~/assets/images/blog/02.jpg";
import blog3 from "~/assets/images/blog/03.jpg";

function Footer() {
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
                  <h5>+123 456 78910 / 11</h5>
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
                  <h5>info@domainname.com</h5>
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
                  <ul className="list-inline">
                    <li className="social-facebook">
                      <a
                        className="tooltip-top"
                        target="_blank"
                        href="https://www.facebook.com/preyantechnosys19"
                        rel="noopener"
                        aria-label="facebook"
                        data-tooltip="Facebook"
                      >
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="social-twitter">
                      <a
                        className="tooltip-top"
                        target="_blank"
                        href="https://twitter.com/PreyanTechnosys"
                        rel="noopener"
                        aria-label="twitter"
                        data-tooltip="Twitter"
                      >
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="social-instagram">
                      <a
                        className=" tooltip-top"
                        target="_blank"
                        href="https://www.instagram.com/preyan_technosys/"
                        rel="noopener"
                        aria-label="instagram"
                        data-tooltip="Instagram"
                      >
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li className="social-linkedin">
                      <a
                        className=" tooltip-top"
                        target="_blank"
                        href="https://www.linkedin.com/in/preyan-technosys-pvt-ltd/"
                        rel="noopener"
                        aria-label="linkedin"
                        data-tooltip="LinkedIn"
                      >
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
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
                <li>
                  <a href="single-blog.html">
                    <img
                      width={720}
                      height={544}
                      src={blog1}
                      alt="post-img"
                    />
                  </a>
                  <span className="post-date">April 1, 2019</span>
                  <a href="single-blog.html">
                    How much aspirin to take for stroke
                  </a>
                </li>
                <li>
                  <a href="single-blog.html">
                    <img
                      width={720}
                      height={544}
                      src={blog2}
                      alt="post-img"
                    />
                  </a>
                  <span className="post-date">April 1, 2019</span>
                  <a href="single-blog.html">
                    Implant Surgical equipment technology
                  </a>
                </li>
                <li>
                  <a href="single-blog.html">
                    <img
                      width={720}
                      height={544}
                      src={blog3}
                      alt="post-img"
                    />
                  </a>
                  <span className="post-date">April 05, 2019</span>
                  <a href="single-blog.html">
                    The Benefits of Middle-Age Fitness
                  </a>
                </li>
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