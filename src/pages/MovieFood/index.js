import banner4 from '~/assets/images/banner/banner04.jpg';
import sidebanner from '~/assets/images/sidebar/banner/banner04.jpg';
import pop1 from '~/assets/images/movie/popcorn/pop1.png';
import pop2 from '~/assets/images/movie/popcorn/pop2.png';
import pop3 from '~/assets/images/movie/popcorn/pop3.png';
import pop4 from '~/assets/images/movie/popcorn/pop4.png';
import venus from '~/assets/images/movie/exhuma.jpg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as orderService from '~/services/orderService';
import * as seatService from '~/services/seatService';

function MovieFood() {
    const showData = JSON.parse(localStorage.getItem('show'));
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) ?? [
        { seatType: { seatPricings: [{ price: 0 }] } },
    ];
    const selectedSeatName = JSON.parse(localStorage.getItem('selectedSeatName')) ?? [];
    const movie = JSON.parse(localStorage.getItem('movie')) ?? {};
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) ?? {};

    const [mySeats, setMySeats] = useState([]);
    const [foods, setFoods] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [roomId, setRoomId] = useState(1);
    const [bill, setBill] = useState([]);

    useEffect(() => {
        axios
            .get(`https://rmallbe20240413154509.azurewebsites.net/api/v1/Foods`)
            .then((response) => {
                setFoods(response.data);
            })
            .catch((error) => {
                console.error('Error fetching food data:', error);
            });

        const { room_Id, start_Date } = showData;
        setRoomId(room_Id);

        const startDateParts = start_Date.split('T');
        const date = startDateParts[0];
        const timeParts = startDateParts[1].split(':');
        const hours = timeParts[0];
        const minutes = timeParts[1];
        const formattedStartTime = `${hours}:${minutes}`;

        setStartTime(formattedStartTime);
        setStartDate(date);

        selectedSeats.forEach((seat) => {
            // seat to object
            seat = JSON.parse(seat);
            setMySeats((prevSeats) => [...prevSeats, seat]);
        });
    }, []);

    const addToBill = (food, qty) => {
        const existingItemIndex = bill.findIndex((item) => item.name === food.name);
        if (existingItemIndex !== -1) {
            const updatedBill = [...bill];
            updatedBill[existingItemIndex].qty += qty;
            setBill(updatedBill);
        } else {
            const newBillItem = {
                id: food.id,
                name: food.name,
                price: food.price,
                qty: qty,
            };
            setBill((prevBill) => [...prevBill, newBillItem]);
        }
    };

    const handleRemoveFromBill = (food) => {
        const existingItemIndex = bill.findIndex((item) => item.name === food.name);
        const updatedBill = [...bill];
        updatedBill.splice(existingItemIndex, 1);
        setBill(updatedBill);
    };

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

    const orderData = {
        order_Code: `ThisIsACodeUnique_${Date.now()}_${Math.random()}`,
        total: totalPrice + bill.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
        discount_Amount: 0,
        discount_Code: 'thisIsADiscountCode',
        payment_Method: '',
    };

    orderData.final_Total = orderData.total - orderData.discount_Amount;
    orderData.qR_Code = orderData.order_Code;

    const orderTicketData = {
        code: `ThisIsATicketCodeUnique_${Date.now()}_${Math.random()}`,
        price: 0,
        is_Used: false,
    };

    const orderFoodData = {
        qty: 0,
        price: 0,
    };

    const seatReservationData = {
        reservation_Expires_At: '',
    };

    const handleCheckout = () => {
        orderService
            .createOrder(orderData, userId, showData.id)
            .then((response) => {
                orderService
                    .getOrder(response.order_Code)
                    .then((orderResponse) => {
                        const orderId = orderResponse.id;
                        localStorage.setItem('orderCode', orderResponse.order_Code);

                        // Add 5 minutes to the current time
                        seatReservationData.reservation_Expires_At = new Date(Date.now() + 5 * 60000).toISOString();

                        const usedSeatIds = [];
                        let seatReservations = [];
                        mySeats.forEach((seat) => {
                            if (!usedSeatIds.includes(seat.id)) {
                                usedSeatIds.push(seat.id);
                                orderTicketData.price = seat.seatType.seatPricings[0].price;
                                orderTicketData.code = orderTicketData.code.concat(`_${seat.id}`);
                                orderService.createOrderTicket(orderTicketData, orderId, seat.id).catch((error) => {
                                    toast.error('Failed to create order ticket', error);
                                });

                                // Bug fixed: created seat reservation for each seat but cannot save to local storage
                                seatService
                                    .createSeatReservation(seatReservationData, seat.id, showData.id)
                                    .then((response) => {
                                        seatReservations.push(response);
                                        localStorage.setItem('seatReservations', JSON.stringify(seatReservations));
                                    })
                                    .catch((error) => {
                                        toast.error('Failed to create seat reservation', error);
                                    });
                            }
                        });

                        let selectedFoods = [];
                        bill.forEach((food) => {
                            selectedFoods.push(food);
                            orderFoodData.qty = food.qty;
                            orderFoodData.price = food.price;
                            orderService.createOrderFood(orderFoodData, orderId, food.id).catch((error) => {
                                toast.error('Failed to create order food', error);
                            });
                        });
                        localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
                    })
                    .then(() => {
                        window.location.href = `/moviecheckout/${movie.id}/show/${showData.id}`;
                        toast.success('Order has been created');
                    })
                    .catch((error) => {
                        toast.error('Failed to get order', error);
                    });
            })
            .catch((error) => {
                toast.error('Failed to create order', error);
            });
    };

    return (
        <>
            <section className="details-banner hero-area bg_img seat-plan-banner">
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

            <section className="page-title bg-one">
                <div className="container">
                    <div className="page-title-area">
                        <div className="item md-order-1">
                            <Link to="/" className="custom-button back-button">
                                <i className="flaticon-double-right-arrows-angles" />
                                back
                            </Link>
                        </div>
                        <div className="item date-item">
                            <span className="date">{startDate}</span>
                            <select className="select-bar" style={{ backgroundColor: '#032055' }}>
                                <option value="sc1">{startTime}</option>
                            </select>
                        </div>
                        <div className="item">
                            <h5 className="title">05:00</h5>
                            <p>Mins Left</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="movie-facility padding-bottom padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="section-header-3">
                                <span className="cate">You're hungry</span>
                                <h2 className="title">we have food</h2>
                                <p>Prebook Your Meal and Save More!</p>
                            </div>
                            <div className="grid--area">
                                <div className="grid-area">
                                    {foods.map((food, index) => (
                                        <div key={index} className="grid-item">
                                            <div className="grid-inner">
                                                <div className="grid-thumb">
                                                    <img src={pop2} alt={`food-${index}`} />
                                                    <div className="offer-tag">${food.price}</div>
                                                </div>
                                                <div className="grid-content">
                                                    <h5 className="subtitle">{food.name}</h5>
                                                    <div className="cart-button">
                                                        <div className="cart-plus-minus">
                                                            <input
                                                                className="cart-plus-minus-box"
                                                                type="number"
                                                                name="qty"
                                                                min={1}
                                                                defaultValue={1}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="custom-button"
                                                            onClick={() =>
                                                                addToBill(
                                                                    food,
                                                                    parseInt(
                                                                        document.getElementsByName('qty')[index].value,
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="booking-summery bg-one">
                                <div className="section-header-3" style={{ margin: 0 }}>
                                    <h6 style={{ textAlign: 'center' }} className="cate">
                                        Room {roomId}
                                    </h6>
                                </div>
                                <h4 className="title">Booking Summary</h4>
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
                                            <span>${totalPrice}</span>
                                        </h6>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6 className="subtitle">
                                            <span>Foods</span>
                                            <span>Price</span>
                                        </h6>
                                        <div>
                                            {bill.map((item, index) => (
                                                <li key={index}>
                                                    <h6 className="info">
                                                        <span>
                                                            {item.name}(${item.price}) X {item.qty}
                                                        </span>
                                                        <span>
                                                            ${item.price * item.qty}{' '}
                                                            <span onClick={() => handleRemoveFromBill(item)}>
                                                                <FontAwesomeIcon
                                                                    className={'times'}
                                                                    icon={faTimesCircle}
                                                                />
                                                            </span>
                                                        </span>
                                                    </h6>
                                                </li>
                                            ))}
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="subtitle mb-0">
                                            <span>Total Price</span>
                                            <span>
                                                $
                                                {totalPrice +
                                                    bill.reduce((acc, curr) => acc + curr.price * curr.qty, 0)}
                                            </span>
                                        </h6>
                                    </li>
                                </ul>
                            </div>
                            <div className="proceed-area  text-center">
                                <h6 className="subtitle">
                                    <span>Amount Payable</span>
                                    <span>
                                        ${totalPrice + bill.reduce((acc, curr) => acc + curr.price * curr.qty, 0)}
                                    </span>
                                </h6>
                                <div
                                    onClick={handleCheckout}
                                    className="custom-button"
                                >
                                    Seat Plans
                                    <i className="fas fa-angle-right" />
                                </div>
                            </div>
                            <div className="note">
                                <h5 className="title">Note :</h5>
                                <p>Please give us 15 minutes for F&B preparation once you're at the cinema</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieFood;
