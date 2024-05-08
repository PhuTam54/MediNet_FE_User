import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import { mapStatusFromEnum, getStatusColor } from '../../utils/index';

function MyOrder() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const userId = getTokenData();
            if (userId) {
                localStorage.setItem('userId', userId);
                axios.get(`https://localhost:7121/api/v1/Orders/userId?userId=${userId}`)
                    .then(response => {
                        setOrders(response.data);
                    })
                    .catch(error => {
                        toast.error('Failed to fetch orders');
                        console.error('Error fetching orders:', error);
                    });
            }
        }
    }, [isLoggedIn]);

    const getTokenData = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const tokenData = token.split('.')[1];
            const decodedToken = atob(tokenData);
            const tokenObject = JSON.parse(decodedToken);
            const userId = tokenObject.userId; // Lấy userId từ token
            return userId;
        }
        return null;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
        return formattedTime;
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setModalOpen(false);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePaginationClick = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    if (!isLoggedIn) {
        return (
            <div style={{ margin: "50px auto", fontSize: 20, textAlign: "center", border: "1px solid #01d6a3", color: "white", backgroundColor: "#01d6a3", padding: 20, maxWidth: 500 }}>
                You need to log in to view my order!
            </div>
        );
    }

    return (
        <>
            <div className="ttm-page-title-row">
                <div className="ttm-page-title-row-bg-layer ttm-bg-layer" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-box ttm-textcolor-white">
                                <div className="page-title-heading">
                                    <h1 className="title">My Order</h1>
                                </div>
                                <div className="breadcrumb-wrapper">
                                    <span>
                                        <a title="Go to Delmont." href="index-2.html" className="home">
                                            <i className="themifyicon ti-home" />
                                            &nbsp;&nbsp;Home
                                        </a>
                                    </span>
                                    <span className="ttm-bread-sep">&nbsp; | &nbsp;</span>
                                    <span>
                                        <span>My Order</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-main" style={{ paddingBottom: '50px', paddingTop: '30px' }}>
                <div className="sidebar ttm-sidebar-right ttm-bgcolor-white clearfix">
                    <div className="container">
                        <div style={{ marginTop: 50 }}>
                            <h2>Order Details</h2>
                            <table style={{ width: '100%', marginBottom: '1rem', color: '#212529' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Order ID</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Name</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Email</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Time</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Status</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map(order => (
                                        <tr key={order.id}>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{order.id}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{order.name}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{order.email}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{formatTime(order.orderDate)} <br /> {formatDate(order.orderDate)}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>
                                                <span style={{backgroundColor: getStatusColor(order.status), padding: 8, borderRadius: 10, color: "white"}}>{mapStatusFromEnum(order.status)}</span>
                                            </td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>
                                                <a style={{padding: 5}} href="#" onClick={() => openModal(order)}><i style={{ fontSize: 20 }} className="fa-solid fa-eye"></i></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <div className="ttm-pagination text-center" style={{ display: "flex", justifyContent: "center" }}>
                                <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
                                    {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
                                        <li key={index} style={{ margin: "0 2px" }}>
                                            <a href="#!" className={index + 1 === currentPage ? 'page-numbers current' : 'page-numbers'} onClick={(e) => handlePaginationClick(index + 1, e)} style={{ textDecoration: "none", color: "#000", padding: "5px 10px", border: "1px solid #ccc" }}>
                                                {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {selectedOrder && (
                <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{width: 800, height: 500,padding: 30, paddingLeft: 70, paddingRight: 70, }} className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: "black", padding: 10 }}><i style={{ fontSize: 18}} className="fa-solid fa-xmark"></i></button>
                        <h3 style={{marginTop: 30, textAlign: "center", color: "#01d6a3"}} className="select_you_seats">My Order </h3>
                        <div style={{marginTop: 30}}>
                            <h5 style={{color: "black",marginBottom: 10}}>Order details</h5>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>ID</th>
                                    <th style={{textAlign: "center"}}>Products</th>
                                    <th style={{textAlign: "center"}}>Thumbnail</th>
                                    <th style={{textAlign: "center"}}>Quantity</th>
                                    <th style={{textAlign: "center"}}>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.orderProducts.map(product => (
                                        <tr key={product.id}>
                                            <td style={{textAlign: "center"}}>{product.id}</td>
                                            <td style={{textAlign: "center"}}>{product.product.name}</td>
                                            <td style={{textAlign: "center"}}><img style={{width: 50}} src={product.product.image}/></td>
                                            <td style={{textAlign: "center"}}>{product.quantity}</td>
                                            <td style={{textAlign: "center"}}>{product.subtotal}.00</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="4"><strong>Total</strong></td>
                                        <td style={{textAlign: "center"}}> <strong> {selectedOrder.totalAmount}.00</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOrder;
