import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import del1 from '~/assets/images/movie/movie-bg-proceed.jpg';
import { toast } from 'react-toastify';
import * as orderService from '~/services/orderService';
import * as seatService from '~/services/seatService';

function Thanks() {
    const movie = JSON.parse(localStorage.getItem('movie')) ?? {};
    const order = JSON.parse(localStorage.getItem('order')) ?? { id: 0 };
    const selectedFoods = JSON.parse(localStorage.getItem('selectedFoods')) ?? [];
    const selectedSeatName = JSON.parse(localStorage.getItem('selectedSeatName')) ?? [];
    const VAT = JSON.parse(localStorage.getItem('VAT')) ?? 0;
    const amountAfterVAT = JSON.parse(localStorage.getItem('amountAfterVAT')) ?? 0;
    let ticketsPrice = JSON.parse(localStorage.getItem('totalPrice')) ?? 0;
    let foodsPrice = JSON.parse(localStorage.getItem('foodsPrice')) ?? 0;
    const startTime = localStorage.getItem('startTime') ?? '';
    const startDate = localStorage.getItem('startDate') ?? '';

    const show = JSON.parse(localStorage.getItem('show')) ?? {};
    const seatReservations = JSON.parse(localStorage.getItem('seatReservations')) ?? [];

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    const payment_method = params.get('payment_method');
    const success = params.get('success');

    const convertTimeToSeconds = (time) => {
        // 3hrs 20mins 10secs
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        let parts = movie.duration.split(' ');

        parts.forEach((part) => {
            if (part.endsWith('hrs')) {
                hours = parseFloat(part.replace('hrs', ''));
            } else if (part.endsWith('mins')) {
                minutes = parseFloat(part.replace('mins', ''));
            } else if (part.endsWith('secs')) {
                seconds = parseFloat(part.replace('secs', ''));
            }
        });

        let totalMinutes = hours * 60 + minutes + seconds / 60;
        let totalSeconds = totalMinutes * 60; // Convert total minutes to seconds

        return totalSeconds;
    };

    const handlePaymentSuccess = () => {
        order.is_Paid = true;
        order.payment_Method = payment_method;
        orderService
            .updateOrder(order, order.id)
            .then((response) => {
                toast.success('Payment successfully');
                console.log(response);
            })
            .catch((error) => {
                toast.error('Payment failed');
                console.log(error);
            });

        // Update seat reservation when payment is successful
        seatReservations.forEach((seatReservation) => {
            const movieDuration = convertTimeToSeconds(movie.duration);
            const reservationExpiresAt = new Date(new Date(show.start_Date).getTime() + movieDuration * 60000);
            seatReservation.reservation_Expires_At = reservationExpiresAt.toISOString();
            seatService
                .updateSeatReservation(seatReservation, seatReservation.id)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    if (payment_method && +success === 1) {
        handlePaymentSuccess();
    } else {
        toast.error('Payment failed');
    }

    setTimeout(() => {
        localStorage.removeItem('movie');
        localStorage.removeItem('show');
        localStorage.removeItem('selectedSeats');
        localStorage.removeItem('selectedFoods');
        localStorage.removeItem('selectedSeatName');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('foodsPrice');
        localStorage.removeItem('orderCode');
        localStorage.removeItem('order');
        localStorage.removeItem('VAT');
        localStorage.removeItem('amountAfterVAT');
        localStorage.removeItem('startTime');
        localStorage.removeItem('startDate');
        localStorage.removeItem('seatReservations');
    }, 1000 * 60);


    const componentRef = useRef();
    const handleDownloadPDF = () => {
        html2canvas(componentRef.current, { backgroundColor: '#ffffff' }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('hoa-don.pdf');
        });
    };
    return (
        <>
            <section
                className="details-banner hero-area bg_img seat-plan-banner"
                style={{ backgroundImage: `url(${del1})` }}
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content style-two">
                            <h3 className="title">Thank You</h3>
                            <div className="tags">
                                <span href="#0">
                                    We confirm that your payment has been successfully processed and tickets have been
                                    booked. A detailed confirmation email will be sent to you shortly, including ticket
                                    details.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
            <section className="page-title bg-one">
                <div className="container"></div>
            </section>


            <div ref={componentRef} className="col-lg-4" style={{ background:"white",margin: 'auto', marginBottom: 20, marginTop: 100 }}>
                <div className="booking-summery bg-one" style={{background:"white"}}>
                    <h4 style={{color:"black"}} className="title"> cinema ticket</h4>
                    <ul>
                        <li>
                            <h6 style={{color:"black"}} className="subtitle">{movie.title}</h6>
                            <span style={{color:"black"}} className="info">English-2d</span>
                        </li>
                        <li>
                            <h6 style={{color:"black"}} className="subtitle">
                                <span>Time</span>
                                <span>Seats</span>
                            </h6>
                            <div style={{color:"black"}} className="info">
                                <span>
                                    {startDate}, {startTime}
                                </span>
                                <div style={{color:"black"}}>{selectedSeatName.join(', ')}</div>
                            </div>
                        </li>
                        <li>
                            <h6 style={{color:"black"}} className="subtitle mb-0">
                                <span>Tickets Price</span>
                                <span>${ticketsPrice}</span>
                            </h6>
                        </li>
                    </ul>
                    <ul style={{backgroundColor:"white"}} className="side-shape">
                        <li>
                            <h6 style={{color:"black"}} className="subtitle">
                                <span>combos</span>
                                <span>${foodsPrice}</span>
                            </h6>
                            <span style={{color:"black"}} className="info">
                                {order &&
                                    order.orderFoods &&
                                    order.orderFoods?.map((orderFood, index) => (
                                        <div key={index}>
                                            <span>
                                                {orderFood.qty} x{' '}
                                                {selectedFoods.find((food) => food.id === orderFood.food_Id)?.name}
                                            </span>
                                            <br></br>
                                        </div>
                                    ))}
                            </span>
                        </li>
                        <li>
                            <h6 style={{color:"black"}} className="subtitle">
                                <span style={{color:"black"}}>food &amp; bevarage</span>
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
                            <span style={{color:"black"}} className="info">
                                <span style={{color:"black"}}>Total price</span>
                                <span>${order && order.final_Total}</span>
                            </span>
                            <span style={{color:"black"}} className="info">
                                <span>vat</span>
                                <span>${VAT}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div style={{background:"white", color:"black"}} className="proceed-area  text-center">
                    <h6 style={{color:"black"}} className="subtitle">
                        <span>Amount Payable</span>
                        <span>${amountAfterVAT}</span>
                    </h6>
                    <hr />
                    <div style={{color:"black"}}>
                        <p>Thank you for choosing our services. We appreciate your trust in our products.</p>
                        <p style={{ color: 'red' }}>NOTE: Please present your bill at the ticket counter.</p>
                        <span>--QR Code-- </span>
                    </div>
                </div>
            </div>
            <div className="text-center" style={{ marginBottom: 80 }}>
                <button className="custom-button" style={{ width: 185 }} onClick={handleDownloadPDF}>
                Download Bill
                </button>
             </div>
        </>
    );
}

export default Thanks;