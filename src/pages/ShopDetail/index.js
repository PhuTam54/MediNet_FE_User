import banner from "~/assets/images/shop/bannershop1.jpg"
import shop1 from "~/assets/images/shop/shop1.png"
import side1 from "~/assets/images/sidebar/offer01.png"
import side2 from "~/assets/images/sidebar/offer02.png"
import side3 from "~/assets/images/sidebar/offer03.png"
import banner01 from "~/assets/images/sidebar/banner/banner01.jpg"
import shop1_2 from "~/assets/images/shop/shop1-2.jpg"
import shop1_1 from "~/assets/images/shop/shop1-1.jpg"
import shop1_3 from "~/assets/images/shop/shop1-3.jpg"
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faDisplay } from "@fortawesome/free-solid-svg-icons"



const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  

  useEffect(() => {
    fetch(`https://rmallbe20240413154509.azurewebsites.net/api/v1/Shops/id?id=${id}`)
    .then((res) => res.json())
    .then((data) => setShop(data))
    .catch((err) => console.log(err));
  }, [id]);
  

  if (!shop) {
    return <div>Loading...</div>;}
    const { name, image, address, phone_Number, description, products } = shop;
    return ( 
        <>
  {/* ==========Banner-Section========== */}
  <section
    className="details-banner bg_img"
    style={{ backgroundImage:   `url(${banner})` }}
  >
    <div className="container">
      <div className="details-banner-wrapper">
        <div className="details-banner-thumb">
          <img src={shop1} alt="movie" />
          
            
        </div>
        <div className="details-banner-content offset-lg-3">
          <h3 className="title">{name}</h3>
          <div className="tags">
            <a href="#0">English</a>
            <a href="#0">Hindi</a>
            <a href="#0">Telegu</a>
            <a href="#0">Tamil</a>
          </div>
          <a href="#0" className="button">
            horror
          </a>
          <div className="social-and-duration">
            <div className="duration-area">
              
            </div>
            <ul className="social-share">
              <li>
                <a href="#0">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ==========Banner-Section========== */}
  {/* ==========Book-Section========== */}
  <section className="book-section bg-one">
    <div className="container">
      <div className="book-wrapper offset-lg-3">
        <div className="left-side">
          <div className="item">
            <div className="item-header">
              <div className="thumb">
                <i class="fa-solid fa-shirt"></i>
              </div>
              <div className="counter-area">
                <span
                  className="counter-item odometer"
                  data-odometer-final={88}
                >
                  0
                </span>
              </div>
            </div>
            <p>tomatometer</p>
          </div>
          <div className="item">
            <div className="item-header">
              <div className="thumb">
                <i class="fa-solid fa-hat-wizard"></i>
              </div>
              <div className="counter-area">
                <span
                  className="counter-item odometer"
                  data-odometer-final={88}
                >
                  0
                </span>
              </div>
            </div>
            <p>audience Score</p>
          </div>
          <div className="item">
            <div className="item-header">
              <h5 className="title">4.5</h5>
              <div className="rated">
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
              </div>
            </div>
            <p>Users Rating</p>
          </div>
          <div className="item">
            <div className="item-header">
              <div className="rated rate-it">
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
                <i className="fas fa-heart" />
              </div>
              <h5 className="title">0.0</h5>
            </div>
            <p>
              <a href="#0">Rate It</a>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  {/* ==========Book-Section========== */}
  {/* ==========Movie-Section========== */}
  <section className="movie-details-section padding-top padding-bottom">
    <div className="container">
      <div className="row justify-content-center flex-wrap-reverse mb--50">
        <div className="col-lg-3 col-sm-10 col-md-6 mb-50">
          <div className="widget-1 widget-tags">
            <ul>
              
            </ul>
          </div>
          <div className="widget-1 widget-offer">
                  <h3 className="title">Applicable offer</h3>
                  <div className="offer-body">
                    <div className="offer-item">
                      <div className="thumb">
                        <img src={side1} alt="sidebar" />
                      </div>
                      <div className="content">
                        <h6>
                          <a href="#0">Amazon Pay Cashback Offer</a>
                        </h6>
                        <p>Win Cashback Upto Rs 300*</p>
                      </div>
                    </div>
                    <div className="offer-item">
                      <div className="thumb">
                        <img src={side2} alt="sidebar" />
                      </div>
                      <div className="content">
                        <h6>
                          <a href="#0">PayPal Offer</a>
                        </h6>
                        <p>
                          Transact first time with Paypal and get 100% cashback up to
                          Rs. 500
                        </p>
                      </div>
                    </div>
                    <div className="offer-item">
                      <div className="thumb">
                        <img src={side3} alt="sidebar" />
                      </div>
                      <div className="content">
                        <h6>
                          <a href="#0">HDFC Bank Offer</a>
                        </h6>
                        <p>
                          Get 15% discount up to INR 100* and INR 50* off on F&amp;B
                          T&amp;C apply
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-1 widget-banner">
                  <div className="widget-1-body">
                    <a href="#0">
                      <img
                        src={banner01}
                        alt="banner"
                      />
                    </a>
                  </div>
                </div>
        </div>
        <div className="col-lg-9 mb-50">
          <div className="movie-details">
            
           
            <div className="widget-1 widget-offer">
              <h3 className="title">Products</h3>
              <div className="offer-body">
                {products.map((product, index ) => (
                  <div key={index} className="offer-item">
                    <div className="thumb">
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <p>${product.price}</p>
                      <img src={product.image} alt={product.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ==========Movie-Section========== */}
</>

     );
}

export default ShopDetail;