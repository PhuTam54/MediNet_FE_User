import ticket1 from "~/assets/images/ticket/ticket-tab01.png"
import ticket2 from "~/assets/images/ticket/ticket-tab02.png"
import ticket3 from "~/assets/images/ticket/ticket-tab03.png"
import city from "~/assets/images/ticket/city.png"
import date from "~/assets/images/ticket/date.png"
import cinema from "~/assets/images/ticket/cinema.png"
import banner from "~/assets/images/banner/banner02.jpg"
import banner1 from "~/assets/images/ticket/ticket-bg01.jpg"
import sidebar1 from "~/assets/images/sidebar/banner/banner01.jpg"
import sidebar2 from "~/assets/images/sidebar/banner/banner02.jpg"
import movie1 from "~/assets/images/movie/movie01.jpg"
import movie2 from "~/assets/images/movie/movie02.jpg"
import movie3 from "~/assets/images/movie/movie03.jpg"
import movie4 from "~/assets/images/movie/movie04.jpg"
import { Link } from 'react-router-dom';
import tomato from "~/assets/images/movie/tomato.png"
import cake from "~/assets/images/movie/cake.png"
import book from "~/assets/images/icons/book.png"
import play from "~/assets/images/icons/play-button.png"
import heart from "~/assets/images/icons/heart.png"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios
        .get(`https://rmallbe20240413154509.azurewebsites.net/api/v1/Movies`)
        .then((response) => {
            setMovies(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(search.toLowerCase())
  );

    return (
        <>
      {/* ==========Banner-Section========== */}
      <section className="banner-section">
        <div
          className="banner-bg bg_img bg-fixed"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className="container">
          <div className="banner-content">
            <h1 className="title bold">
              get <span className="color-theme">movie</span> tickets
            </h1>
            <p>
              Buy movie tickets in advance, find movie times watch trailers, read
              movie reviews and much more
            </p>
          </div>
        </div>
      </section>
      {/* ==========Banner-Section========== */}
      {/* ==========Ticket-Search========== */}
      <section className="search-ticket-section padding-top pt-lg-0">
        <div className="container">
          <div
            className="search-tab bg_img"
            data-background={{ backgroundImage: `url(${banner1})` }}
          >
            <div className="row align-items-center mb--20">
              <div className="col-lg-6 mb-20">
                <div className="search-ticket-header">
                  <h6 className="category">welcome to Boleto </h6>
                  <h3 className="title">what are you looking for</h3>
                </div>
              </div>
              <div className="col-lg-6 mb-20">
                <ul className="tab-menu ticket-tab-menu">
                  <li className="active">
                    <div className="tab-thumb">
                      <img
                        src={ticket1}
                        alt="ticket"
                      />
                    </div>
                    <span>movie</span>
                  </li>
                  <li>
                    <div className="tab-thumb">
                      <img
                        src={ticket2}
                        alt="ticket"
                      />
                    </div>
                    <span>events</span>
                  </li>
                  <li>
                    <div className="tab-thumb">
                      <img
                        src={ticket3}
                        alt="ticket"
                      />
                    </div>
                    <span>sports</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-area">
              <div className="tab-item active">
                <form className="ticket-search-form">
                  <div className="form-group large">
                    <input type="text"  value={search}
                onChange={e => setSearch(e.target.value)} placeholder="Search fo Movies" />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={city} alt="ticket" />
                    </div>
                    <span className="type">city</span>
                    <select className="select-bar">
                      <option value="london">London</option>
                      <option value="dhaka">dhaka</option>
                      <option value="rosario">rosario</option>
                      <option value="madrid">madrid</option>
                      <option value="koltaka">kolkata</option>
                      <option value="rome">rome</option>
                      <option value="khoksa">khoksa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={date} alt="ticket" />
                    </div>
                    <span className="type">date</span>
                    <select className="select-bar">
                      <option value="26-12-19">23/10/2020</option>
                      <option value="26-12-19">24/10/2020</option>
                      <option value="26-12-19">25/10/2020</option>
                      <option value="26-12-19">26/10/2020</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={cinema} alt="ticket" />
                    </div>
                    <span className="type">cinema</span>
                    <select className="select-bar">
                      <option value="Awaken">Awaken</option>
                      <option value="dhaka">dhaka</option>
                      <option value="rosario">rosario</option>
                      <option value="madrid">madrid</option>
                      <option value="koltaka">kolkata</option>
                      <option value="rome">rome</option>
                      <option value="khoksa">khoksa</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="tab-item">
                <form className="ticket-search-form">
                  <div className="form-group large">
                    <input type="text" placeholder="Search fo Events" />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={city} alt="ticket" />
                    </div>
                    <span className="type">city</span>
                    <select className="select-bar">
                      <option value="london">London</option>
                      <option value="dhaka">dhaka</option>
                      <option value="rosario">rosario</option>
                      <option value="madrid">madrid</option>
                      <option value="koltaka">kolkata</option>
                      <option value="rome">rome</option>
                      <option value="khoksa">khoksa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={date} alt="ticket" />
                    </div>
                    <span className="type">date</span>
                    <select className="select-bar">
                      <option value="26-12-19">23/10/2020</option>
                      <option value="26-12-19">24/10/2020</option>
                      <option value="26-12-19">25/10/2020</option>
                      <option value="26-12-19">26/10/2020</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={cinema} alt="ticket" />
                    </div>
                    <span className="type">event</span>
                    <select className="select-bar">
                      <option value="angular">angular</option>
                      <option value="startup">startup</option>
                      <option value="rosario">rosario</option>
                      <option value="madrid">madrid</option>
                      <option value="koltaka">kolkata</option>
                      <option value="Last-First">Last-First</option>
                      <option value="wish">wish</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="tab-item">
                <form className="ticket-search-form">
                  <div className="form-group large">
                    <input type="text" placeholder="Search fo Sports" />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={city} alt="ticket" />
                    </div>
                    <span className="type">city</span>
                    <select className="select-bar">
                      <option value="london">London</option>
                      <option value="dhaka">dhaka</option>
                      <option value="rosario">rosario</option>
                      <option value="madrid">madrid</option>
                      <option value="koltaka">kolkata</option>
                      <option value="rome">rome</option>
                      <option value="khoksa">khoksa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={date} alt="ticket" />
                    </div>
                    <span className="type">date</span>
                    <select className="select-bar">
                      <option value="26-12-19">23/10/2020</option>
                      <option value="26-12-19">24/10/2020</option>
                      <option value="26-12-19">25/10/2020</option>
                      <option value="26-12-19">26/10/2020</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src={cinema} alt="ticket" />
                    </div>
                    <span className="type">sports</span>
                    <select className="select-bar">
                      <option value="football">football</option>
                      <option value="cricket">cricket</option>
                      <option value="cabadi">cabadi</option>
                      <option value="madrid">madrid</option>
                      <option value="gadon">gadon</option>
                      <option value="rome">rome</option>
                      <option value="khoksa">khoksa</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==========Ticket-Search========== */}
      {/* ==========Movie-Section========== */}
      <section className="movie-section padding-top padding-bottom">
        <div className="container">
          <div className="row flex-wrap-reverse justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-3">
              <div className="widget-1 widget-banner">
                <div className="widget-1-body">
                  <a href="#0">
                    <img
                      src={sidebar1}
                      alt="banner"
                    />
                  </a>
                </div>
              </div>
              <div className="widget-1 widget-check">
                <div className="widget-header">
                  <h5 className="m-title">Filter By</h5>{" "}
                  <a href="#0" className="clear-check">
                    Clear All
                  </a>
                </div>
                <div className="widget-1-body">
                  <h6 className="subtitle">Language</h6>
                  <div className="check-area">
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang1" />
                      <label htmlFor="lang1">Tamil</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang2" />
                      <label htmlFor="lang2">Telegu</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang3" />
                      <label htmlFor="lang3">Hindi</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang4" />
                      <label htmlFor="lang4">English</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang5" />
                      <label htmlFor="lang5">Multiple Language</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang6" />
                      <label htmlFor="lang6">Gujrati</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="lang" id="lang7" />
                      <label htmlFor="lang7">Bangla</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget-1 widget-check">
                <div className="widget-1-body">
                  <h6 className="subtitle">experience</h6>
                  <div className="check-area">
                    <div className="form-group">
                      <input type="checkbox" name="mode" id="mode1" />
                      <label htmlFor="mode1">2d</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="mode" id="mode2" />
                      <label htmlFor="mode2">3d</label>
                    </div>
                  </div>
                  <div className="add-check-area">
                    <a href="#0">
                      view more <i className="plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="widget-1 widget-check">
                <div className="widget-1-body">
                  <h6 className="subtitle">genre</h6>
                  <div className="check-area">
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre1" />
                      <label htmlFor="genre1">thriller</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre2" />
                      <label htmlFor="genre2">horror</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre3" />
                      <label htmlFor="genre3">drama</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre4" />
                      <label htmlFor="genre4">romance</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre5" />
                      <label htmlFor="genre5">action</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre6" />
                      <label htmlFor="genre6">comedy</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre7" />
                      <label htmlFor="genre7">romantic</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre8" />
                      <label htmlFor="genre8">animation</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre9" />
                      <label htmlFor="genre9">sci-fi</label>
                    </div>
                    <div className="form-group">
                      <input type="checkbox" name="genre" id="genre10" />
                      <label htmlFor="genre10">adventure</label>
                    </div>
                  </div>
                  <div className="add-check-area">
                    <a href="#0">
                      view more <i className="plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="widget-1 widget-banner">
                <div className="widget-1-body">
                  <a href="#0">
                    <img
                      src={sidebar2}
                      alt="banner"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9 mb-50 mb-lg-0">
              <div className="filter-tab tab">
                <div className="filter-area">
                  <div className="filter-main">
                    <div className="left">
                      <div className="item">
                        <span className="show">Show :</span>
                        <select className="select-bar">
                          <option value={12}>12</option>
                          <option value={15}>15</option>
                          <option value={18}>18</option>
                          <option value={21}>21</option>
                          <option value={24}>24</option>
                          <option value={27}>27</option>
                          <option value={30}>30</option>
                        </select>
                      </div>
                      <div className="item">
                        <span className="show">Sort By :</span>
                        <select className="select-bar">
                          <option value="showing">now showing</option>
                          <option value="exclusive">exclusive</option>
                          <option value="trending">trending</option>
                          <option value="most-view">most view</option>
                        </select>
                      </div>
                    </div>
                    <ul className="grid-button tab-menu">
                      <li className="active">
                        <i className="fas fa-th" />
                      </li>
                      <li>
                        <i className="fas fa-bars" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tab-area">
                  <div className="tab-item active">
                  <div className="row mb-10 justify-content-center">
              {filteredMovies.map((movie, index) => (
                <div key={index} className="col-sm-6 col-lg-4">
                  <div className="movie-grid">
                    <div className="movie-thumb c-thumb">
                    <a key={movie.id}>
                      <Link to={`/moviedetail/${movie.id}`}> 
                        <img style={{ width: 260, height: 370 }} 
                        src={movie.movie_Image} alt={movie.title} />
                      </Link>
                    </a>
                    </div>
                    <div className="movie-content bg-one">
                      <h5 className="title m-0">
                        <Link to={`/moviedetail/${movie.id}`}>{movie.title}</Link>
                      </h5>
                      <ul className="movie-rating-percent">
                        <li>
                          <div className="thumb">
                            <img
                              src={tomato}
                              alt="movie"
                            />
                          </div>
                          <span className="content">88%</span>
                        </li>
                        <li>
                          <div className="thumb">
                            <img
                              src={cake}
                              alt="movie"
                            />
                          </div>
                          <span className="content">88%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
                      

                      {/* end movie */}
                    </div>
                  </div>
                  <div className="tab-item">
                    <div className="movie-area mb-10">
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            style={{ backgroundImage: `url(${movie1})` }}
                          >
                            <img
                              className="d-sm-none"
                              src={movie1}
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">alone</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            style={{ backgroundImage: `url(${movie2})` }}
                          >
                            <img
                              className="d-sm-none"
                              src={movie2}
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">mars</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            style={{ backgroundImage: `url(${movie3})` }}
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie03.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">venus</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            style={{ backgroundImage: `url(${movie4})` }}
                          >
                            <img
                              className="d-sm-none"
                              src={movie4}
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">on watch</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie05.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie05.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">fury</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie06.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie06.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">trooper</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie07.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie07.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">horror night</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie08.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie08.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">the lost name</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie09.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie09.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">calm stedfast</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie10.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie10.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">criminal on party</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie11.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie11.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">halloween party</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="movie-list">
                        <div className="movie-thumb c-thumb">
                          <a
                            href="movie-details.html"
                            className="w-100 bg_img h-100"
                            data-background="assets/images/movie/movie12.jpg"
                          >
                            <img
                              className="d-sm-none"
                              src="assets/images/movie/movie12.jpg"
                              alt="movie"
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title">
                            <a href="movie-details.html">the most wanted</a>
                          </h5>
                          <p className="duration">2hrs 50 min</p>
                          <div className="movie-tags">
                            <a href="#0">action</a>
                            <a href="#0">adventure</a>
                            <a href="#0">fantasy</a>
                          </div>
                          <div className="release">
                            <span>Release Date : </span>{" "}
                            <a href="#0"> November 8 , 2020</a>
                          </div>
                          <ul className="movie-rating-percent">
                            <li>
                              <div className="thumb">
                                <img
                                  src={tomato}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                            <li>
                              <div className="thumb">
                                <img
                                  src={cake}
                                  alt="movie"
                                />
                              </div>
                              <span className="content">88%</span>
                            </li>
                          </ul>
                          <div className="book-area">
                            <div className="book-ticket">
                              <div className="react-item">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={heart}
                                      alt="icons"
                                    />
                                  </div>
                                </a>
                              </div>
                              <div className="react-item mr-auto">
                                <a href="#0">
                                  <div className="thumb">
                                    <img
                                      src={book}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>book ticket</span>
                                </a>
                              </div>
                              <div className="react-item">
                                <a href="#0" className="popup-video">
                                  <div className="thumb">
                                    <img
                                      src={play}
                                      alt="icons"
                                    />
                                  </div>
                                  <span>watch trailer</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pagination-area text-center">
                  <a href="#0">
                    <i className="fas fa-angle-double-left" />
                    <span>Prev</span>
                  </a>
                  <a href="#0">1</a>
                  <a href="#0">2</a>
                  <a href="#0" className="active">
                    3
                  </a>
                  <a href="#0">4</a>
                  <a href="#0">5</a>
                  <a href="#0">
                    <span>Next</span>
                    <i className="fas fa-angle-double-right" />
                  </a>
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

export default MovieList;
