import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { location, useLocation } from 'react-router-dom';

import venus from '~/assets/images/movie/exhuma.jpg';
import banner4 from '~/assets/images/banner/banner04.jpg';
import card from '~/assets/images/payment/card.png';
import paypal from '~/assets/images/payment/paypal.png';
import * as orderService from '~/services/orderService';
import * as paymentService from '~/services/paymentService';

function MovieCheckout() {
    const movie = JSON.parse(localStorage.getItem('movie')) ?? {};
    const showData = JSON.parse(localStorage.getItem('show'));
    const selectedFoods = JSON.parse(localStorage.getItem('selectedFoods')) ?? [];
    const orderCode = localStorage.getItem('orderCode') ?? '';
    const selectedSeatName = JSON.parse(localStorage.getItem('selectedSeatName')) ?? [];
    let ticketsPrice = JSON.parse(localStorage.getItem('totalPrice')) ?? 0;
    let foodsPrice = 0;
    selectedFoods.map((selectedFood) => (foodsPrice += selectedFood.price * (selectedFood.qty || 1)));

    const [order, setOrder] = useState({
        orderFoods: [{ name: 'food', price: 0, qty: 0, food_Id: 0 }],
        tickets: [{ price: 0 }],
    });
    const [VAT, setVAT] = useState(0);
    const [amountAfterVAT, setAmountAfterVAT] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const [startTime, setStartTime] = useState('');
    const [startDate, setStartDate] = useState('');

    const paymentMethodList = ['VnPay', 'Momo', 'Paypal', 'Credit card'];

    useEffect(() => {
        orderService
            .getOrder(orderCode)
            .then((response) => {
                setOrder(response);
                if (response.final_Total > 50) {
                    setVAT(parseFloat((0.1 * response.final_Total).toFixed(2)));
                } else if (response.final_Total > 10) {
                    setVAT(parseFloat((0.05 * response.final_Total).toFixed(2)));
                } else {
                    setVAT(parseFloat((0.01 * response.final_Total).toFixed(2)));
                }
                setAmountAfterVAT(ticketsPrice + foodsPrice + VAT);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        const { start_Date } = showData;

        const startDateParts = start_Date.split('T');
        const date = startDateParts[0];
        const timeParts = startDateParts[1].split(':');
        const hours = timeParts[0];
        const minutes = timeParts[1];
        const formattedStartTime = `${hours}:${minutes}`;

        localStorage.setItem('startTime', formattedStartTime);
        localStorage.setItem('startDate', date);
        setStartTime(formattedStartTime);
        setStartDate(date);
    }, [startTime, startDate, VAT, amountAfterVAT]);

    const paymentData = {
        amount: 1,
    };

    const handleMethod = (paymentMethodItem) => {
        console.log(paymentMethodItem);
        setPaymentMethod(paymentMethodItem);
    };

    const handleCheckout = () => {
        localStorage.setItem('VAT', JSON.stringify(VAT));
        localStorage.setItem('amountAfterVAT', JSON.stringify(amountAfterVAT));
        localStorage.setItem('foodsPrice', JSON.stringify(foodsPrice));
        localStorage.setItem('order', JSON.stringify(order));

        // paymentService
        //     .paymentPaypal(paymentData)
        if (paymentMethod === 'Paypal') {
            paymentData.orderType = 'Sandbox';
            paymentData.orderDescription = 'Order movie ticket';
            paymentData.name = 'Customer';
            paymentData.amount = amountAfterVAT * 23000;
            axios
                .post('https://rmallbe20240413154509.azurewebsites.net/api/v1/Payments/PayPal', paymentData)
                .then((response) => {
                    window.location.href = response.data;
                    toast.success(`Go to ${paymentMethod}`);
                })
                .catch((error) => {
                    toast.error('Failed to payment', error);
                });
        } else if (paymentMethod === 'VnPay') {
            paymentData.OrderId = order?.id;
            paymentData.Description = 'Order movie ticket';
            paymentData.FullName = 'Customer';
            paymentData.amount = amountAfterVAT * 23000;
            paymentData.CreatedDate = new Date();
            console.log(paymentData);
            axios
                .post('https://rmallbe20240413154509.azurewebsites.net/api/v1/Payments/VnPay', paymentData)
                .then((response) => {
                    window.location.href = response.data;
                    toast.success(`Go to ${paymentMethod}`);
                })
                .catch((error) => {
                    toast.error('Failed to payment', error);
                });
        } else if (paymentMethod === 'Momo') {
            paymentData.OrderId = order?.id + '';
            paymentData.OrderInfo = 'Order movie ticket';
            paymentData.FullName = 'Customer';
            paymentData.amount = amountAfterVAT * 23000;
            axios
                .post('https://rmallbe20240413154509.azurewebsites.net/api/v1/Payments/Momo', paymentData)
                .then((response) => {
                    window.location.href = response.data;
                    toast.success(`Go to ${paymentMethod}`);
                })
                .catch((error) => {
                    toast.error('Failed to payment', error);
                });
        } else {
            toast.error('Not supported payment method');
        }
    };

    return (
        <>
            {/* ==========Banner-Section========== */}
            <section
                className="details-banner hero-area bg_img seat-plan-banner"
                style={{ backgroundImage: `url(${venus})` }}
            >
                <div className="container">
                    <div className="details-banner-wrapper">
                        <div className="details-banner-content style-two">
                            <h3 className="title">{movie.title}</h3>
                            <div className="tags">
                                <a href="#0">City Walk</a>
                                <a href="#0">English - 2D</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========Banner-Section========== */}
            {/* ==========Page-Title========== */}
            <section className="page-title bg-one">
                <div className="container">
                    <div className="page-title-area">
                        <div className="item md-order-1">
                            <a href="/moviefood" className="custom-button back-button">
                                <i className="flaticon-double-right-arrows-angles" />
                                back
                            </a>
                        </div>
                        <div className="item date-item">
                            <span className="date">MON, SEP 09 2020</span>
                            <select className="select-bar" style={{ backgroundColor: '#032055' }}>
                                <option value="sc1">09:40</option>
                                <option value="sc2">13:45</option>
                                <option value="sc3">15:45</option>
                                <option value="sc4">19:50</option>
                            </select>
                        </div>
                        <div className="item">
                            <h5 className="title">05:00</h5>
                            <p>Mins Left</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ==========Page-Title========== */}
            {/* ==========Movie-Section========== */}
            <div className="movie-facility padding-bottom padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="checkout-widget checkout-contact">
                                <h5 className="title">Promo Code </h5>
                                <form className="checkout-contact-form">
                                    <div className="form-group">
                                        <input type="text" placeholder="Please enter promo code" />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" defaultValue="Verify" className="custom-button" />
                                    </div>
                                </form>
                            </div>
                            <div className="checkout-widget checkout-card mb-0">
                                <h5 className="title">Payment Option </h5>
                                <ul className="payment-option">
                                    {paymentMethodList.map((paymentMethodItem, index) => (
                                        <li
                                            onClick={() => handleMethod(paymentMethodItem)}
                                            key={index}
                                            className={paymentMethod === paymentMethodItem ? 'active' : ''}
                                        >
                                            <a href="#0">
                                                {paymentMethodItem === 'Paypal' ? (
                                                    <img src={paypal} alt="payment" />
                                                ) : (
                                                    <img src={card} alt="payment" />
                                                )}
                                                <span>{paymentMethodItem}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                {paymentMethod === 'Credit card' && (
                                    <div>
                                        <h6 className="subtitle">Enter Your Card Details (Not supported)</h6>
                                        <form className="payment-card-form">
                                            <div className="form-group w-100">
                                                <label htmlFor="card1">Card Details</label>
                                                <input type="text" id="card1" />
                                                <div className="right-icon">
                                                    <i className="flaticon-lock" />
                                                </div>
                                            </div>
                                            <div className="form-group w-100">
                                                <label htmlFor="card2"> Name on the Card</label>
                                                <input type="text" id="card2" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="card3">Expiration</label>
                                                <input type="text" id="card3" placeholder="MM/YY" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="card4">CVV</label>
                                                <input type="text" id="card4" placeholder="CVV" />
                                            </div>
                                            <div className="form-group check-group">
                                                <input id="card5" type="checkbox" defaultChecked="" />
                                                <label htmlFor="card5">
                                                    <span className="title">QuickPay</span>
                                                    <span className="info">
                                                        Save this card information to my Boleto account and make faster
                                                        payments.
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="submit"
                                                    className="custom-button"
                                                    defaultValue="make payment"
                                                />
                                            </div>
                                        </form>
                                        <p className="notice">
                                            By Clicking "Make Payment" you agree to the{' '}
                                            <a href="#0">terms and conditions</a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="booking-summery bg-one">
                                <h4 className="title">booking summery</h4>
                                <ul>
                                    <li>
                                        <h6 className="subtitle">{movie.title}</h6>
                                        <span className="info">English-2d</span>
                                    </li>
                                    <li>
                                        <h6 className="subtitle">
                                            <span>Time</span>
                                            <span>Seats</span>
                                        </h6>
                                        <div className="info">
                                            <span>
                                                {startDate}, {startTime}
                                            </span>
                                            <div>{selectedSeatName.join(', ')}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="subtitle mb-0">
                                            <span>Tickets Price</span>
                                            <span>${ticketsPrice}</span>
                                        </h6>
                                    </li>
                                </ul>
                                <ul className="side-shape">
                                    <li>
                                        <h6 className="subtitle">
                                            <span>combos</span>
                                            <span>${foodsPrice}</span>
                                        </h6>
                                        <span className="info">
                                            {order &&
                                                order.orderFoods &&
                                                order.orderFoods?.map((orderFood, index) => (
                                                    <div key={index}>
                                                        <span>
                                                            {orderFood.qty} x{' '}
                                                            {
                                                                selectedFoods.find(
                                                                    (food) => food.id === orderFood.food_Id,
                                                                )?.name
                                                            }
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
                                            <span>${VAT}</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="proceed-area  text-center">
                                <h6 className="subtitle">
                                    <span>Amount Payable</span>
                                    <span>${amountAfterVAT}</span>
                                </h6>
                                <a href="#0" onClick={handleCheckout} className="custom-button back-button">
                                    proceed
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ==========Movie-Section========== */}
        </>
    );
}

export default MovieCheckout;
