import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { mapStatusFromEnum, getStatusColor } from '../../utils/index';

function MyCourses() {
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
console.log(userId);
    useEffect(() => {
        if (isLoggedIn) {
            const userId = getTokenData();
            if (userId) {
                localStorage.setItem('userId', userId);
                axios.get(`https://medinetprj.azurewebsites.net/api/v1/Courses/employeeId?employeeId=${userId}`)
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
    const handleModalClick = (e) => {
      // Kiểm tra xem phần tử được nhấn có phải là modal content hay không
      if (e.target.classList.contains('modal-content')) {
          return; // Nếu là modal content, không làm gì cả
      } else {
          closeModal(); // Nếu không phải, đóng modal
      }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
        axios.delete(`https://medinetprj.azurewebsites.net/api/v1/Courses/id?id=${id}`)
            .then(response => {
                setOrders(orders.filter(order => order.id !== id));
                toast.success('Course deleted successfully');
            })
            .catch(error => {
                toast.error('Failed to delete course');
                console.error('Error deleting course:', error);
            });
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
                                    <h1 className="title">My Courses</h1>
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
                                        <span>My Courses</span>
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
                            <h2>Courses Details</h2>
                            <div className="products-ordering" style={{ display: "flex"}}>
                                <span style={{marginRight: 10, marginTop: 10}}><i style={{fontSize: 25, color: "#01d6a3"}} className="fa-solid fa-arrow-down-short-wide"></i></span>
                                <select
                                    
                                >
                                    <option value="all">All</option>
                                  
                                </select>
                            </div>
                            <table style={{ width: '100%', marginBottom: '1rem', color: '#212529' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Courses ID</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Name</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Image</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Price</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>Location</th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}></th>
                                        <th style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map(order => (
                                        <tr key={order.id}>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{order.id}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{order.title}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}><img style={ {width: 100}}
                                              className="img-fluid"
                                              // src={course.imagesCourse}
                                              src="https://medinetprj.azurewebsites.net/images/courses/fb6e6f4e-fd93-42c6-aeef-7370d426c2d7.jpg"
                                              alt=""
                                            /></td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>${order.price}</td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>{order.location} </td>
                                            
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>
                                                <a style={{padding: 5}} href="#" onClick={() => openModal(order)}><i style={{ fontSize: 20 }} className="fa-solid fa-eye"></i></a>
                                            </td>
                                            <td style={{ padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6', textAlign: "center" }}>
                                                <a style={{padding: 5}} href="#" onClick={() => handleDelete(order.id)}><i style={{ fontSize: 20, color: "red" }} className="fa-solid fa-trash"></i></a>
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
                <div className={`modal ${modalOpen ? 'show' : ''}`} onClick={handleModalClick} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 1000, padding: 30, display: 'flex', backgroundColor: '#fff', borderRadius: 8, position: 'relative' }} className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: "black", padding: 10 }}>
                            <i style={{ fontSize: 18 }} className="fa-solid fa-xmark"></i>
                        </button>
                        <h3 style={{ marginBottom: 20, textAlign: "center", color: "#01d6a3" }} className="select_you_seats">My Courses</h3>
                        <div style={{display: "flex", marginTop: 20, padding: "0 50px"}}>
                          <div style={{display: "flex"}}>
                            
                            <div style={{ flex: 1,  alignItems: 'center' }}>
                                <img
                                    style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                                    src="https://medinetprj.azurewebsites.net/images/courses/fb6e6f4e-fd93-42c6-aeef-7370d426c2d7.jpg"
                                    alt={selectedOrder.title}
                                />
                              
                            </div>
                            <div style={{ flex: 1, paddingLeft: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              
                                <div style={{ marginTop: 20 }}>
                                  <p style={{ fontSize: 18, color: "black"}}><strong><i style={{color:"#01d6a3", fontSize: 20}} class="fa-solid fa-pen"></i> {selectedOrder.title}</strong></p>
                                  <hr/>
                                  <div style={{display: "flex", justifyContent:"space-between"}}>
                                    {/* <span style={{ fontSize: 16, color: "#01d6a3" }}> ${selectedOrder.price}.00</span> */}
                                    <span className="price" style={{ fontSize: 16, display:"flex"}}>
                                      <del>
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">$</span>
                                          70.00
                                        </span>
                                      </del>
                                      <p style={{marginLeft: 5}}>
                                        <span className="product-Price-amount" style={{ color: "#01d6a3" }}>
                                          <span className="product-Price-currencySymbol">$</span>
                                          {selectedOrder.price}.00
                                        </span>
                                      </p>
                                    </span>
                                      <span  style={{display: "flex",listStyle: "none", color:"#01d6a3" }}>
                                        <li>
                                          <i className="fa fa-star" />
                                        </li>
                                        <li>
                                          <i className="fa fa-star" />
                                        </li>
                                        <li>
                                          <i className="fa fa-star" />
                                        </li>
                                        <li>
                                          <i className="fa fa-star" />
                                        </li>
                                        <li>
                                          <i className="fa fa-star" />
                                        </li>
                                      </span>
                                    
                                  </div>
                                  <p style={{ fontSize: 16, display: "flex", justifyContent: "space-between"}}><strong>Description:</strong> <p style={{marginLeft:60}}>{selectedOrder.description}</p></p>
                                  <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <p style={{ fontSize: 16}}><strong><i style={{color:"#01d6a3", fontSize: 20}} class="fa-regular fa-clock"></i> Time:</strong> {selectedOrder.duration}</p>
                                    <p style={{ fontSize: 16}}><strong><i style={{color:"#01d6a3", fontSize: 20}} class="fa-solid fa-earth-asia"></i> Courses:</strong> {selectedOrder.location}</p>
                                  </div>
                                </div>
                                <p style={{ fontSize: 16,display: "flex", justifyContent:"space-between"}}><strong>Topics:</strong><p style={{marginLeft: 40}}>{selectedOrder.topics}</p></p>
                                <p style={{ fontSize: 16,display: "flex", justifyContent:"space-between"}}><strong>Object:</strong><p style={{marginLeft: 40}}>{selectedOrder.targetAudience}</p></p>

                            </div> 

                    
                          </div>
                        </div>
                       
                    </div>
                </div>
            )}
        </>
    );
}

export default MyCourses;
