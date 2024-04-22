import city from "~/assets/images/ticket/city.png"
import date from "~/assets/images/ticket/date.png"
import cinema from "~/assets/images/ticket/cinema.png"
import exp from "~/assets/images/ticket/exp.png"
import sidebanner from "~/assets/images/sidebar/banner/banner03.jpg"
import seatplan from "~/assets/images/movie/seat-plan.png"
import venus from "~/assets/images/movie/exhuma.jpg"
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieTicket() {
  const movie = JSON.parse(localStorage.getItem('movie')) ?? {};

  const [selectedDate, setSelectedDate] = useState('');
  const [shows, setShows] = useState([{room: {name: ''}}]);
  const { id } = useParams();
  // const [selectedRoomId, setSelectedRoomId] = useState(null); 
  const [selectedShowId, setSelectedShowId] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showDates, setShowDates] = useState([]);
  const [filteredShowsByDate, setFilteredShowsByDate] = useState([]); 


  const handleBookButtonClick = (show) => {
    localStorage.setItem('show', JSON.stringify(show));
    setSelectedShowId(show.id);
    setShowModal(true);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    const filteredShows = shows.filter(show => show.start_Date.split('T')[0] === selectedDate);
    setFilteredShowsByDate(filteredShows);
  };

  useEffect(() => {

    axios.get(`https://rmallbe20240413154509.azurewebsites.net/api/v1/Shows/movieId?movieId=${id}`)
      .then((response) => {
        setShows(response.data);
        const dates = response.data.map(show => show.start_Date.split('T')[0]);
        setShowDates([...new Set(dates)]); 
        if (dates.length > 0) {
          const firstDate = dates[0];
          setSelectedDate(firstDate);
          const filteredShows = response.data.filter(show => show.start_Date.split('T')[0] === firstDate);
          setFilteredShowsByDate(filteredShows);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

 
  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <section className="details-banner hero-area bg_img" style={{ backgroundImage: `url(${venus})` }}>
        <div className="container">
          <div className="details-banner-wrapper">
            <div className="details-banner-content">
              <h3 className="title">{movie.title}</h3>
              <div className="tags">
                <a href="#0">English</a>
                <a href="#0">Hindi</a>
                <a href="#0">Telegu</a>
                <a href="#0">Tamil</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="book-section bg-one">
        <div className="container">
          <form className="ticket-search-form two">
            <div className="form-group">
              <div className="thumb">
                <img src={date} alt="ticket" />
              </div>
              <span className="type">Date</span>
              <select className="select-bar" style={{ backgroundColor: "#032055" }} onChange={handleDateChange} value={selectedDate}>
              {showDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="thumb">
                <img src={exp} alt="ticket" />
              </div>
              <span className="type">Experience</span>
              <select className="select-bar" style={{backgroundColor: "#032055"}}>
                <option value="English-2D">English-2D</option>
                <option value="English-3D">English-3D</option>
                <option value="Hindi-2D">Hindi-2D</option>
                <option value="Hindi-3D">Hindi-3D</option>
                <option value="Telegu-2D">Telegu-2D</option>
                <option value="Telegu-3D">Telegu-3D</option>
              </select>
            </div>
          </form>
        </div>
      </section>

      <div className="ticket-plan-section padding-bottom padding-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 mb-5 mb-lg-0">
              <ul className="seat-plan-wrapper bg-five">
                {filteredShowsByDate.map((show, index) => (
                  <li key={index} style={{display: "flex"}}>
                    <div className="movie-name">
                      <div className="icons">
                        <i className="far fa-heart" />
                        <i className="fas fa-heart" />
                      </div>
                      <a href="#0" className="name" style={{display: "flex"}}>
                        <div>{show.start_Date.split('T')[0]}</div>
                        <span style={{marginRight: 10, marginLeft: 10}}>-</span>
                        <div>{show.start_Date.split('T')[1].split(':')[0]}:{show.start_Date.split('T')[1].split(':')[1]}</div>
                      </a>
                    </div>
                    <div className="movie-name" style={{ maxWidth: "250px" }}>
                      <div>{movie.movieLanguages.map(lang => lang.language.name).join(', ')}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <button onClick={() => handleBookButtonClick( show )} className="custom-button" style={{marginLeft: 20}}>Book</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-10">
              <div className="widget-1 widget-banner">
                <div className="widget-1-body">
                  <a href="#0">
                    <img src={sidebanner} alt="banner" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div style={{width: 560, height: 420}} className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h6 className="vanh">Welcome! </h6>
            <h4 className="select_you_seats">Select Your Seats</h4>
            <div className="thumb">
              <img src={seatplan} alt="movie" />
            </div>
            <Link style={{ maxWidth: 150, margin: "0 auto" }} className="custom-button" to={`/movieseat/${movie.id}/show/${selectedShowId}`}> 
              Seat Plans
              <i className="fas fa-angle-right" />
            </Link>
            <button className="close-button" onClick={handleCloseModal}><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieTicket;