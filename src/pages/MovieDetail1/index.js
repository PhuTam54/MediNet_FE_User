import vdbutton from "~/assets/images/movie/video-button.png"
import banner03 from "~/assets/images/banner/banner03.jpg"
import venus from "~/assets/images/movie/exhuma.jpg"
import tomato from "~/assets/images/movie/tomato2.png"
import cake from "~/assets/images/movie/cake2.png"
import banner01 from "~/assets/images/sidebar/banner/banner01.jpg"
import side1 from "~/assets/images/sidebar/offer01.png"
import side2 from "~/assets/images/sidebar/offer02.png"
import side3 from "~/assets/images/sidebar/offer03.png"
import del1 from "~/assets/images/movie/movie-details01.jpg"
import del2 from "~/assets/images/movie/movie-details02.jpg"
import del3 from "~/assets/images/movie/movie-details03.jpg"
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieDetail1 = ({ match }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://rmallbe20240413154509.azurewebsites.net/api/v1/Movies/id?id=${id}`)
    .then(response => response.json())
    .then(data => 
      setMovie(data)
    )
    .catch(error => console.error('Error fetching movie detail:', error));
}, []);

localStorage.setItem('movie', JSON.stringify(movie))

const handleBook = () => {
  window.location.href = `/movieticket/${movie.id}`;
}

  if (!movie) {
    return <div className="">404 NOT FOUND</div>;
  }

    return (
        <>
        
       
          <section
            className="details-banner bg_img"
            style={{ backgroundImage: `url(${venus})` }}
          >
            <div className="container">
              <div className="details-banner-wrapper">
                <div className="details-banner-thumb">
                  <img src={venus} alt="movie" />
                  <a
                    href="https://www.youtube.com/embed/KGeBMAgc46E"
                    className="video-popup"
                  >
                    <img src={vdbutton} alt="movie" />
                  </a>
                </div>
                <div className="details-banner-content offset-lg-3">
                  <h3 className="title">{movie.title}</h3>
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
                      <div className="item">
                        <i className="fas fa-calendar-alt" />
                        <span>06 Dec, 2020</span>
                      </div>
                      <div className="item">
                        <i className="far fa-clock" />
                        <span>{movie.duration}</span>
                      </div>
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
         
         {/* ))} */}
          <section className="book-section bg-one">
            <div className="container">
              <div className="book-wrapper offset-lg-3">
                <div className="left-side">
                  <div className="item">
                    <div className="item-header">
                      <div className="thumb">
                        <img src={tomato} alt="movie" />
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
                        <img src={cake} alt="movie" />
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
                <a className="custom-button" onClick={handleBook}>book tickets</a>
                {/* <Link className="custom-button" to={`/movieticket/${movie.id}`} onClick={() => window.location.href = `/movieticket/${movie.id}`}>book tickets</Link> */}


              </div>
            </div>
          </section>
         
          <section className="movie-details-section padding-top padding-bottom">
            <div className="container">
              <div className="row justify-content-center flex-wrap-reverse mb--50">
                <div className="col-lg-3 col-sm-10 col-md-6 mb-50">
                  <div className="widget-1 widget-tags">
                    <ul>
                      <li>
                        <a href="#0">2D</a>
                      </li>
                      <li>
                        <a href="#0">imax 2D</a>
                      </li>
                      <li>
                        <a href="#0">4DX</a>
                      </li>
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
                    <h3 className="title">photos</h3>
                    <div className="details-photos owl-carousel">
                      <div className="thumb">
                        <a
                          href={del1}
                          className="img-pop"
                        >
                          <img
                            src={del1}
                            alt="movie"
                          />
                        </a>
                      </div>
                      <div className="thumb">
                        <a
                          href={del2}
                          className="img-pop"
                        >
                          <img
                            src={del2}
                            alt="movie"
                          />
                        </a>
                      </div>
                      <div className="thumb">
                        <a
                          href={del3}
                          className="img-pop"
                        >
                          <img
                            src={del3}
                            alt="movie"
                          />
                        </a>
                      </div>
                      <div className="thumb">
                        <a
                          href={del1}
                          className="img-pop"
                        >
                          <img
                            src={del1}
                            alt="movie"
                          />
                        </a>
                      </div>
                      <div className="thumb">
                        <a
                          href={del2}
                          className="img-pop"
                        >
                          <img
                            src={del2}
                            alt="movie"
                          />
                        </a>
                      </div>
                      <div className="thumb">
                        <a
                          href={del3}
                          className="img-pop"
                        >
                          <img
                            src={del3}
                            alt="movie"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="tab summery-review">
                      <ul className="tab-menu">
                        <li className="active">summery</li>
                        <li>
                          user review <span>147</span>
                        </li>
                      </ul>
                      <div className="tab-area">
                        <div className="tab-item active">
                          <div className="item">
                            <h5 className="sub-title">Synopsis</h5>
                            <p>
                              {movie.description}{" "}
                            </p>
                          </div>
                          <div className="item">
                            <div className="header">
                              <h5 className="sub-title">cast</h5>
                              <div className="navigation">
                                <div className="cast-prev">
                                  <i className="flaticon-double-right-arrows-angles" />
                                </div>
                                <div className="cast-next">
                                  <i className="flaticon-double-right-arrows-angles" />
                                </div>
                              </div>
                            </div>
                            <div className="casting-slider owl-carousel">
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast01.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">Bill Hader</a>
                                  </h6>
                                  <span className="cate">actor</span>
                                  <p>As Richie Tozier</p>
                                </div>
                              </div>
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast02.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">nora hardy</a>
                                  </h6>
                                  <span className="cate">actor</span>
                                  <p>As raven</p>
                                </div>
                              </div>
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast03.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">alvin peters</a>
                                  </h6>
                                  <span className="cate">actor</span>
                                  <p>As magneto</p>
                                </div>
                              </div>
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast04.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">josh potter</a>
                                  </h6>
                                  <span className="cate">actor</span>
                                  <p>As quicksilver</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <div className="header">
                              <h5 className="sub-title">crew</h5>
                              <div className="navigation">
                                <div className="cast-prev-2">
                                  <i className="flaticon-double-right-arrows-angles" />
                                </div>
                                <div className="cast-next-2">
                                  <i className="flaticon-double-right-arrows-angles" />
                                </div>
                              </div>
                            </div>
                            <div className="casting-slider-two owl-carousel">
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast05.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">pete warren</a>
                                  </h6>
                                  <span className="cate">actor</span>
                                </div>
                              </div>
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast06.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">howard bass</a>
                                  </h6>
                                  <span className="cate">executive producer</span>
                                </div>
                              </div>
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast07.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">naomi smith</a>
                                  </h6>
                                  <span className="cate">producer</span>
                                </div>
                              </div>
                              <div className="cast-item">
                                <div className="cast-thumb">
                                  <a href="#0">
                                    <img
                                      src="assets/images/cast/cast08.jpg"
                                      alt="cast"
                                    />
                                  </a>
                                </div>
                                <div className="cast-content">
                                  <h6 className="cast-title">
                                    <a href="#0">tom martinez</a>
                                  </h6>
                                  <span className="cate">producer</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-item">
                          <div className="movie-review-item">
                            <div className="author">
                              <div className="thumb">
                                <a href="#0">
                                  <img src="assets/images/cast/cast02.jpg" alt="cast" />
                                </a>
                              </div>
                              <div className="movie-review-info">
                                <span className="reply-date">13 Days Ago</span>
                                <h6 className="subtitle">
                                  <a href="#0">minkuk seo</a>
                                </h6>
                                <span>
                                  <i className="fas fa-check" /> verified review
                                </span>
                              </div>
                            </div>
                            <div className="movie-review-content">
                              <div className="review">
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                              </div>
                              <h6 className="cont-title">Awesome Movie</h6>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Integer volutpat enim non ante egestas vehicula.
                                Suspendisse potenti. Fusce malesuada fringilla lectus
                                venenatis porttitor.{" "}
                              </p>
                              <div className="review-meta">
                                <a href="#0">
                                  <i className="flaticon-hand" />
                                  <span>8</span>
                                </a>
                                <a href="#0" className="dislike">
                                  <i className="flaticon-dont-like-symbol" />
                                  <span>0</span>
                                </a>
                                <a href="#0">Report Abuse</a>
                              </div>
                            </div>
                          </div>
                          <div className="movie-review-item">
                            <div className="author">
                              <div className="thumb">
                                <a href="#0">
                                  <img src="assets/images/cast/cast04.jpg" alt="cast" />
                                </a>
                              </div>
                              <div className="movie-review-info">
                                <span className="reply-date">13 Days Ago</span>
                                <h6 className="subtitle">
                                  <a href="#0">rudra rai</a>
                                </h6>
                                <span>
                                  <i className="fas fa-check" /> verified review
                                </span>
                              </div>
                            </div>
                            <div className="movie-review-content">
                              <div className="review">
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                              </div>
                              <h6 className="cont-title">Awesome Movie</h6>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Integer volutpat enim non ante egestas vehicula.
                                Suspendisse potenti. Fusce malesuada fringilla lectus
                                venenatis porttitor.{" "}
                              </p>
                              <div className="review-meta">
                                <a href="#0">
                                  <i className="flaticon-hand" />
                                  <span>8</span>
                                </a>
                                <a href="#0" className="dislike">
                                  <i className="flaticon-dont-like-symbol" />
                                  <span>0</span>
                                </a>
                                <a href="#0">Report Abuse</a>
                              </div>
                            </div>
                          </div>
                          <div className="movie-review-item">
                            <div className="author">
                              <div className="thumb">
                                <a href="#0">
                                  <img src="assets/images/cast/cast01.jpg" alt="cast" />
                                </a>
                              </div>
                              <div className="movie-review-info">
                                <span className="reply-date">13 Days Ago</span>
                                <h6 className="subtitle">
                                  <a href="#0">rafuj</a>
                                </h6>
                                <span>
                                  <i className="fas fa-check" /> verified review
                                </span>
                              </div>
                            </div>
                            <div className="movie-review-content">
                              <div className="review">
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                              </div>
                              <h6 className="cont-title">Awesome Movie</h6>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Integer volutpat enim non ante egestas vehicula.
                                Suspendisse potenti. Fusce malesuada fringilla lectus
                                venenatis porttitor.{" "}
                              </p>
                              <div className="review-meta">
                                <a href="#0">
                                  <i className="flaticon-hand" />
                                  <span>8</span>
                                </a>
                                <a href="#0" className="dislike">
                                  <i className="flaticon-dont-like-symbol" />
                                  <span>0</span>
                                </a>
                                <a href="#0">Report Abuse</a>
                              </div>
                            </div>
                          </div>
                          <div className="movie-review-item">
                            <div className="author">
                              <div className="thumb">
                                <a href="#0">
                                  <img src="assets/images/cast/cast03.jpg" alt="cast" />
                                </a>
                              </div>
                              <div className="movie-review-info">
                                <span className="reply-date">13 Days Ago</span>
                                <h6 className="subtitle">
                                  <a href="#0">bela bose</a>
                                </h6>
                                <span>
                                  <i className="fas fa-check" /> verified review
                                </span>
                              </div>
                            </div>
                            <div className="movie-review-content">
                              <div className="review">
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                                <i className="flaticon-favorite-heart-button" />
                              </div>
                              <h6 className="cont-title">Awesome Movie</h6>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Integer volutpat enim non ante egestas vehicula.
                                Suspendisse potenti. Fusce malesuada fringilla lectus
                                venenatis porttitor.{" "}
                              </p>
                              <div className="review-meta">
                                <a href="#0">
                                  <i className="flaticon-hand" />
                                  <span>8</span>
                                </a>
                                <a href="#0" className="dislike">
                                  <i className="flaticon-dont-like-symbol" />
                                  <span>0</span>
                                </a>
                                <a href="#0">Report Abuse</a>
                              </div>
                            </div>
                          </div>
                          <div className="load-more text-center">
                            <a href="#0" className="custom-button transparent">
                              load more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
      </>
      

    );
}

export default MovieDetail1;
