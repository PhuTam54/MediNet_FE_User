import ticket1 from "~/assets/images/ticket/ticket-tab01.png"
import ticket2 from "~/assets/images/ticket/ticket-tab02.png"
import ticket3 from "~/assets/images/ticket/ticket-tab03.png"
import city from "~/assets/images/ticket/city.png"
import date from "~/assets/images/ticket/date.png"
import cinema from "~/assets/images/ticket/cinema.png"
import banner from "~/assets/images/banner/rmall.jpg"
import bg1 from "~/assets/images/ticket/ticket-bg01.jpg"
import side1 from "~/assets/images/sidebar/icons/sidebar01.png"
import side2 from "~/assets/images/sidebar/icons/sidebar02.png"
import side3 from "~/assets/images/sidebar/icons/sidebar03.png"
import sidebanner1 from "~/assets/images/sidebar/banner/banner01.jpg"
import sidebanner2 from "~/assets/images/sidebar/banner/banner02.jpg"
import tomato from "~/assets/images/movie/tomato.png"
import cake from "~/assets/images/movie/cake.png"
import event1 from "~/assets/images/event/event01.jpg"
import event2 from "~/assets/images/event/event02.jpg"
import event3 from "~/assets/images/event/event03.jpg"
import shop1 from "~/assets/images/shop/shop1.png"
import shop2 from "~/assets/images/shop/shop2.png"
import shop3 from "~/assets/images/shop/shop3.png"
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Home() {
  const [movies, setMovies] = useState([]);
  const [shops, setShops] = useState([]);
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
          axios.get('https://rmallbe20240413154509.azurewebsites.net/api/v1/Shops')
      .then(response => {
        setShops(response.data);
      })
      .catch(error => {
        console.error('Error fetching shops', error);
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
        <h1 className="title  cd-headline clip">
          <span className="d-block">book your</span> tickets for
          <span className="color-theme cd-words-wrapper p-0 m-0">
            <b className="is-visible">Movie</b>
            <b>Event</b>
            <b>Sport</b>
          </span>
        </h1>
        <p>
          Safe, secure, reliable ticketing.Your ticket to live entertainment!
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
        style={{ backgroundImage: `url(${bg1})` }}
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
                onChange={e => setSearch(e.target.value)} placeholder="Search for Movies" />
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
                <input type="text" placeholder="Search for Events" />
                <button type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="assets/images/ticket/city.png" alt="ticket" />
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
                  <img src="assets/images/ticket/date.png" alt="ticket" />
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
                  <img src="assets/images/ticket/cinema.png" alt="ticket" />
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
                  <img src="assets/images/ticket/city.png" alt="ticket" />
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
                  <img src="assets/images/ticket/date.png" alt="ticket" />
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
                  <img src="assets/images/ticket/cinema.png" alt="ticket" />
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
  {/* ==========Movie-Main-Section========== */}
  <section className="movie-section padding-top padding-bottom bg-two">
    <div className="container">
      <div className="row flex-wrap-reverse justify-content-center">
      <div className="col-lg-3 col-sm-10  mt-50 mt-lg-0">
          <div className="widget-1 widget-facility">
            <div className="widget-1-body">
              <ul>
                <li>
                  <a href="#0">
                    <span className="img">
                      <img
                        src={side1}
                        alt="sidebar"
                      />
                    </span>
                    <span className="cate">24X7 Care</span>
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <span className="img">
                      <img
                        src={side2}
                        alt="sidebar"
                      />
                    </span>
                    <span className="cate">100% Assurance</span>
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <span className="img">
                      <img
                        src={side3}
                        alt="sidebar"
                      />
                    </span>
                    <span className="cate">Our Promise</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="widget-1 widget-banner">
            <div className="widget-1-body">
              <a href="#0">
                <img
                  src={sidebanner1}
                  alt="banner"
                />
              </a>
            </div>
          </div>
          <div className="widget-1 widget-trending-search">
            <h3 className="title">Trending Searches</h3>
            <div className="widget-1-body">
              <ul>
                <li>
                  <h6 className="sub-title">
                    <a href="#0">mars</a>
                  </h6>
                  <p>Movies</p>
                </li>
                <li>
                  <h6 className="sub-title">
                    <a href="#0">alone</a>
                  </h6>
                  <p>Movies</p>
                </li>
                <li>
                  <h6 className="sub-title">
                    <a href="#0">music event</a>
                  </h6>
                  <p>event</p>
                </li>
                <li>
                  <h6 className="sub-title">
                    <a href="#0">NBA Games 2020</a>
                  </h6>
                  <p>Sports</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="widget-1 widget-banner">
            <div className="widget-1-body">
              <a href="#0">
                <img
                  src={sidebanner2}
                  alt="banner"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="article-section padding-bottom">
            <div className="section-header-1">
              <h2 className="title">movies</h2>
              <a className="view-all" href="/moviegird">
                View All
              </a>
            </div>


            {/* movie */}
            <div className="row mb-10 justify-content-center">
              {movies.slice(0,3).map((movie, index) => (
                <div key={index} className="col-sm-6 col-lg-4">
                  <div className="movie-grid">
                    <div className="movie-thumb c-thumb">
                    <a key={movie.id}>
                      <Link to={`/moviedetail/${movie.id}`}> 
                        <img style={{ width: 260, height: 370 }} 
                        src={movie.movie_Image.includes('/') ? movie.movie_Image : 'Cinema/pixner.net/boleto/demo/assets/images/movie/exhuma.jpg'} alt={movie.title} />
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
            {/* end  */}
          </div>
          <div className="article-section padding-bottom">
            <div className="section-header-1">
              <h2 className="title">events</h2>
              <a className="view-all" href="events.html">
                View All
              </a>
            </div>
            <div className="row mb-30-none justify-content-center">
              <div className="col-sm-6 col-lg-4">
                <div className="event-grid">
                  <div className="movie-thumb c-thumb">
                    <a href="#0">
                      <img src={event1} alt="event" />
                    </a>
                    <div className="event-date">
                      <h6 className="date-title">28</h6>
                      <span>Dec</span>
                    </div>
                  </div>
                  <div className="movie-content bg-one">
                    <h5 className="title m-0">
                      <a href="#0">Digital Economy Conference 2020</a>
                    </h5>
                    <div className="movie-rating-percent">
                      <span>327 Montague Street</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="event-grid">
                  <div className="movie-thumb c-thumb">
                    <a href="#0">
                      <img src={event2} alt="event" />
                    </a>
                    <div className="event-date">
                      <h6 className="date-title">28</h6>
                      <span>Dec</span>
                    </div>
                  </div>
                  <div className="movie-content bg-one">
                    <h5 className="title m-0">
                      <a href="#0">web design conference 2020</a>
                    </h5>
                    <div className="movie-rating-percent">
                      <span>327 Montague Street</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="event-grid">
                  <div className="movie-thumb c-thumb">
                    <a href="#0">
                      <img src={event3} alt="event" />
                    </a>
                    <div className="event-date">
                      <h6 className="date-title">28</h6>
                      <span>Dec</span>
                    </div>
                  </div>
                  <div className="movie-content bg-one">
                    <h5 className="title m-0">
                      <a href="#0">digital thinkers meetup</a>
                    </h5>
                    <div className="movie-rating-percent">
                      <span>327 Montague Street</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="article-section">
            <div className="section-header-1">
              <h2 className="title">shops</h2>
              <a className="view-all" href="/shops">
                View All
              </a>
            </div>
            <div className="row mb-30-none justify-content-center">
              {shops.slice(0,3).map((shop, index) => (
              <div key={index} className="col-sm-6 col-lg-4">
                <div className="sports-grid">
                  <div className="movie-thumb c-thumb">
                  <a key={shop.id}>
                      <Link to={`/shopdetail/${shop.id}`}> 
                        <img style={{ width: 260, height: 370 }} 
                        src={shop.image} alt={shop.name} />
                      </Link>
                    </a>

                    
                  </div>
                  <div className="movie-content bg-one">
                  <h5 className="title m-0">
                        <Link to={`/shopdetail/${shop.id}`}>{shop.name}</Link>
                      </h5>
                    <div className="movie-rating-percent">
                      <span>Address: {shop.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ==========Movie-Main-Section========== */}
</>

    );
}

export default Home;
