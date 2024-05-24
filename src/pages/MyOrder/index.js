import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { mapStatusFromEnum, getStatusColor } from '../../utils/index';

function MyOrder() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [filterStatus, setFilterStatus] = useState(null);
    const [cancelConfirmation, setCancelConfirmation] = useState(false);
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [viewOrder, setViewOrder] = useState(false); // State cho việc xem đơn hàng

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

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

    const userId = getTokenData();
    if (userId) {
        localStorage.setItem('userId', userId);
    }

    useEffect(() => {
        if (isLoggedIn) {
            const userId = getTokenData();
            if (userId) {
                localStorage.setItem('userId', userId);
                axios.get(`https://medinetprj.azurewebsites.net/api/v1/Orders/userId?userId=${userId}`)
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
        setCancelConfirmation(false); // Ẩn xác nhận hủy khi mở modal
        setViewOrder(true); // Khi mở modal, đặt state xem đơn hàng thành true
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setModalOpen(false);
        setCancelConfirmation(false);
        setViewOrder(false); // Khi đóng modal, đặt state xem đơn hàng thành false
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    let filteredOrders = orders;
    if (filterStatus !== null) {
        filteredOrders = orders.filter(order => order.status === filterStatus);
    }
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePaginationClick = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        setCurrentPage(1);
    };

    const cancelOrder = (orderId) => {
        const token = localStorage.getItem('token');
        if (token) {
            const apiUrl = `https://medinetprj.azurewebsites.net/api/v1/Orders/id`;
            const config = {
                params: {
                    id: orderId,
                    status: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            axios.put(apiUrl, null, config)
                .then(response => {
                    toast.success('Order cancelled successfully');
                    const userId = getTokenData();
                  
                })
                .catch(error => {
                    toast.error('Failed to cancel order');
                    console.error('Error cancelling order:', error);
                });
        } else {
            console.error('Token not found');
        }
    };

    const handleCancelOrder = (orderId) => {
        setSelectedOrder(orders.find(order => order.id === orderId));
        setCancelOrderId(orderId);
        setCancelConfirmation(true); // Hiện xác nhận hủy khi nhấn nút Cancel
        setViewOrder(false); // Ẩn thông tin xem đơn hàng
    };

    const confirmCancelOrder = () => {
        cancelOrder(cancelOrderId);
        setModalOpen(false);
        setCancelConfirmation(false);
        // window.location.reload(); cho load lại trang sau khi hủy đơn hàng cảm thấy cần thiết thì dùng nhưng không nên dùng
    };
    const handleModalClick = (e) => {
        // Kiểm tra xem phần tử được nhấn có phải là modal content hay không
        if (e.target.classList.contains('modal-content')) {
            return; // Nếu là modal content, không làm gì cả
        } else {
            closeModal(); // Nếu không phải, đóng modal
        }
    };

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
                            <div className="products-ordering" style={{ display: "flex"}}>
                                <span style={{marginRight: 10, marginTop: 10}}><i style={{fontSize: 25, color: "#01d6a3"}} className="fa-solid fa-arrow-down-short-wide"></i></span>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => handleFilterChange(parseInt(e.target.value))}
                                >
                                    <option value="all">All</option>
                                    <option value={0}>PENDING</option>
                                    <option value={1}>CONFIRMED</option>
                                    <option value={2}>SHIPPING</option>
                                    <option value={3}>SHIPPED</option>
                                    <option value={4}>COMPLETE</option>
                                    <option value={5}>CANCEL</option>
                                </select>
                            </div>
                            <table style={{ width: '100%', marginBottom: '1rem', color: '#212529' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Order ID</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Name</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Email</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Time</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Status</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}></th>
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
                                                <span style={{ backgroundColor: getStatusColor(order.status), padding: 8, borderRadius: 10, color: "white"}}>{mapStatusFromEnum(order.status)}</span>
                                            </td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>
                                                <a style={{padding: 5}} href="#" onClick={() => openModal(order)}><i style={{ fontSize: 20 }} className="fa-solid fa-eye"></i></a>
                                            </td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>
                                                {order.status !== 2 && order.status !== 3 && order.status !== 4 &&  order.status !== 5 &&  (
                                                    <span style={{ cursor: "pointer" ,padding: 8, borderRadius: 10, color: "white", backgroundColor: "red"}} onClick={() => handleCancelOrder(order.id)}>Cancel</span>
                                                )}
                                                {order.status === 5 &&  (
                                                     <Link to={`/productdetail/${order.orderProducts[0].id}`} className="btn-sm btn-primary" style={{ marginRight: 10,cursor: "pointer" ,padding: 8, borderRadius: 10, color: "white", }}>Repurchase</Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="ttm-pagination text-center" style={{ display: "flex", justifyContent: "center" }}>
                                <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
                                    {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
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
                <div onClick={handleModalClick} className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                            <td style={{textAlign: "center"}}><img style={{width: 50}} src={product.product.imageSrc} alt={product.product.name}/></td>
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
                            {cancelConfirmation && ( // Hiện thông tin xác nhận hủy khi nhấn nút Cancel
                                <div style={{textAlign: "center", marginTop: 20}}>
                                    <span style={{color: "black", fontSize: 19}}>Are you sure you want to cancel your order?</span>
                                    <div style={{display: "flex", marginTop: 20,  justifyContent: "space-between"}}>
                                        <button onClick={closeModal} style={{ padding: 10, background: "#01d6a3", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>No Cancel</button>
                                        <button onClick={confirmCancelOrder} style={{ padding: 10, background: "#ff0000", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>Cancel Order</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOrder;
