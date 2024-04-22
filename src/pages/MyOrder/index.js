import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import footer from '~/assets/images/banner/banner09.jpg';
import sidebanner from '~/assets/images/sports/sports04.jpg';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function MyOrder() {
    const getTokenData = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenData = token.split('.')[1];
            const decodedToken = atob(tokenData);
            const tokenObject = JSON.parse(decodedToken);
            return tokenObject;
        }
        return null;
    };

    const userId = getTokenData().userId;

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [selectedShowId, setSelectedShowId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showData, setShowData] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [ordersPerPage] = useState(5);
    useEffect(() => {
        axios
            .get(`https://rmallbe20240413154509.azurewebsites.net/api/v1/Orders/userId?userId=${userId}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log(orders);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleEditClick = (showId) => {
        setSelectedShowId(showId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedShowId(null);
        setShowModal(false);
        setShowData(null);
    };
    const indexOfLastOrder = currentPage * ordersPerPage;
    // Tính index của đơn hàng đầu tiên trên mỗi trang
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    // Cắt ra mảng đơn hàng cho từng trang
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const componentRef = useRef();
    const handleDownloadPDF = () => {
        html2canvas(componentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('hoa-don.pdf');
        });
    };

    const handleOrderClick = (order) => {
        setOrder(order);
        setShowModal(true);
    };

    return (
        <>
            {/* Modal */}
            {showModal && order && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div
                        style={{ width: 800, height: 500, padding: 30, paddingLeft: 70, paddingRight: 70 }}
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h6 style={{ marginTop: 30 }} className="select_you_seats">
                            Details
                        </h6>
                        <h5 style={{ color: 'black', marginBottom: 10 }}>Show details</h5>
                        {/* <table class="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th style={{textAlign: "center"}}>Movie</th>
                                    <th style={{textAlign: "center"}}>Time</th>
                                    <th style={{textAlign: "center"}}>Date</th>
                                    <th>Room</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{showData.id}</td>
                                    <td style={{textAlign: "center"}}>
                                        <img style={{ width: 100 }} src={movieData ? movieData.movie_Image : ''}  />
                                          <br /> 
                                        {movieData ? movieData.title : ''}</td>
                                    <td style={{textAlign: "center"}}>{new Date(showData.start_Date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</td>
                                    <td style={{textAlign: "center"}}>
                                        {new Date(showData.start_Date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </td>
                                    <td>{roomData ? roomData.name : ''}</td>
                                </tr>
                                

                                </tbody>
                            </table> */}
                        <div>
                            <div
                                ref={componentRef}
                                className="col-lg-4"
                                style={{ margin: 'auto', marginBottom: 20, marginTop: 100 }}
                            >
                                <div className="booking-summery bg-one">
                                    <h4 className="title"> cinema ticket</h4>
                                    <ul>
                                        <li>
                                            <h6 className="subtitle">{order.show.movie.title}</h6>
                                            <span className="info">English-2d</span>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>Time</span>
                                                <span>Seats</span>
                                            </h6>
                                            <div className="info">
                                                <span>{/* {startDate}, {startTime} */}</span>
                                                {/* <div>{selectedSeatName.join(', ')}</div> */}
                                            </div>
                                        </li>
                                        <li>
                                            <h6 className="subtitle mb-0">
                                                <span>Tickets Price</span>
                                                {/* <span>${ticketsPrice}</span> */}
                                            </h6>
                                        </li>
                                    </ul>
                                    <ul className="side-shape">
                                        <li>
                                            <h6 className="subtitle">
                                                <span>combos</span>
                                                {/* <span>${foodsPrice}</span> */}
                                            </h6>
                                            <span className="info">
                                                {order &&
                                                    order.orderFoods &&
                                                    order.orderFoods?.map((orderFood, index) => (
                                                        <div key={index}>
                                                            <span>
                                                                {orderFood.qty} x{' '}
                                                                {/* {selectedFoods.find((food) => food.id === orderFood.food_Id)?.name} */}
                                                            </span>
                                                            <br></br>
                                                        </div>
                                                    ))}
                                            </span>
                                        </li>
                                        <li>
                                            <h6 className="subtitle">
                                                <span>food &amp; bevarage</span>
                                            </h6>
                                            {/* <span className="info">
                                            {order.orderFoods.map((orderFood) => (
                                                <span>{orderFood.qty} x {orderFood.food.name}</span>
                                            ))}
                                        </span> */}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <span className="info">
                                                <span>Total price</span>
                                                <span>${order && order.final_Total}</span>
                                            </span>
                                            <span className="info">
                                                <span>vat</span>
                                                {/* <span>${VAT}</span> */}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="proceed-area  text-center">
                                    <h6 className="subtitle">
                                        <span>Amount Payable</span>
                                        {/* <span>${amountAfterVAT}</span> */}
                                    </h6>
                                    <hr />
                                    <div>
                                        <p>
                                            Thank you for choosing our services. We appreciate your trust in our
                                            products.
                                        </p>
                                        <p style={{ color: 'red' }}>
                                            NOTE: Please present your bill at the ticket counter.
                                        </p>
                                        <span>--QR Code-- </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center" style={{ marginBottom: 80 }}>
                                <button className="custom-button" style={{ width: 185 }} onClick={handleDownloadPDF}>
                                    Download Bill
                                </button>
                            </div>
                        </div>
                        <button className="close-button" onClick={handleCloseModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            )}

            <section className="details-banner hero-area bg_img">
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content">
                            <h3 className="title">My Order</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="book-section bg-one"></section>

            <div className="ticket-plan-section padding-bottom padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 mb-5 mb-lg-0">
                            <ul className="seat-plan-wrapper bg-five">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ color: 'white' }}>ID</th>
                                            <th style={{ color: 'white' }}>Final Total</th>
                                            <th style={{ color: 'white' }}>Show</th>
                                            <th style={{ color: 'white' }}>Payment </th>
                                            <th style={{ color: 'white', textAlign: 'center' }}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map((order, index) => (
                                            <tr key={index}>
                                                {/* Bug index + 1 voi tat ca trang */}
                                                <td style={{ color: 'white' }}>{index + 1}</td>
                                                <td style={{ color: 'white' }}>${order.final_Total}</td>
                                                <td style={{ color: 'white' }}>{order.show?.movie.title}</td>
                                                <td style={{ color: 'white' }}>{order.payment_Method}</td>
                                                <td style={{ color: 'white', textAlign: 'center' }}>
                                                    <button
                                                        className="custom-button"
                                                        style={{ width: 100 }}
                                                        onClick={() => handleOrderClick(order)}
                                                    >
                                                        <i className="fa-regular fa-pen-to-square" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ul>
                            <div
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                className="pagination"
                            >
                                {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <a onClick={() => paginate(i + 1)} href="#0" className="page-link">
                                            {i + 1}
                                        </a>
                                    </li>
                                ))}
                            </div>
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
        </>
    );
}

export default MyOrder;
