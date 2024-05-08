



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paypal from '~/assets/images/paypal.png';

function Checkout() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền tính theo USD


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

// Save userId to localStorage
const userId = getTokenData();
if (userId) {
localStorage.setItem('userId', userId);
}
  const [billingInfo, setBillingInfo] = useState({
    billingFirstName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress1: '',
    billingCity: '',
    billingPostcode: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const cartResponse = await axios.get(`https://localhost:7121/api/v1/Carts/userid?userid=${userId}`);
      const cartData = cartResponse.data;

      const mergedItems = mergeCartItems(cartData);
      const total = mergedItems.reduce((acc, item) => acc + item.subTotal, 0);
      setTotalPrice(total); // Tổng tiền tính theo USD
      setData(mergedItems);

      const uniqueProductIds = [...new Set(cartData.map(item => item.productId))];
      const productPromises = uniqueProductIds.map(async productId => {
        const productResponse = await axios.get(`https://localhost:7121/api/v1/Products/id?id=${productId}`);
        return productResponse.data;
      });
      const productsData = await Promise.all(productPromises);
      setProductsInfo(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const mergeCartItems = (cartData) => {
    const mergedItems = [];
    cartData.forEach((item) => {
      const existingItemIndex = mergedItems.findIndex(mergedItem => mergedItem.productId === item.productId);
      if (existingItemIndex !== -1) {
        mergedItems[existingItemIndex].qtyCart += item.qtyCart;
        mergedItems[existingItemIndex].subTotal += item.subTotal;
      } else {
        mergedItems.push({ ...item });
      }
    });
    return mergedItems;
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleCheckout = async () => {
    const { billingFirstName, billingEmail, billingPhone, billingAddress1, billingCity, billingPostcode } = billingInfo;
    if (!billingFirstName || !billingEmail || !billingPhone || !billingAddress1 || !billingCity || !billingPostcode) {
      toast.error("Please fill in all required fields!", { position: toast.POSITION.TOP_CENTER });
      return;
    }
  
    var cartIds = [];
    data.forEach((item, index) => {
      cartIds.push(item.id);
    })
    try {
      const userId = localStorage.getItem('userId');
      const orderPayload = {
        name: billingFirstName,
        email: billingEmail,
        tel: billingPhone,
        address: billingAddress1,
        totalAmount: totalPrice.toFixed(2),
        description: "order product success",
        shipping_method: "Standard", // or any other shipping method
        payment_method: "PayPal",
        is_paid: true,
        orderDate: new Date().toISOString(),
        customerId: parseInt(userId), // Parse to integer
        cartIds: [...cartIds]
      
      };


      const checkoutInfo = {
        orderInfo: orderPayload,
        productsInfo: data.map((item, index) => ({
        productId: item.productId,
        name: productsInfo[index] ? productsInfo[index].name : 'Unknown',
        price: productsInfo[index] ? productsInfo[index].price : 0,
        qtyCart: item.qtyCart,
        subTotal: item.subTotal,
        image: productsInfo[index] ? productsInfo[index].image : ''
      }))
  };
  localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));

      
      // Gửi yêu cầu POST đến API để lưu đơn hàng
      const orderResponse = await axios.post('https://localhost:7121/api/v1/Orders', orderPayload);
      const orderId = orderResponse.data.id + '';
      
      localStorage.setItem('orderId', orderId);
      
      // Tính tổng số tiền và cập nhật dữ liệu cho thanh toán PayPal
      const totalAmount = totalPrice; // Chuyển đổi số tiền sang USD
      localStorage.setItem('totalAmount', totalAmount);
  
      const paymentPayload = {
        orderId: orderId,
        orderType: 'Sandbox', 
        orderDescription: 'Order movie ticket',
        name: billingFirstName,
        amount: totalAmount * 23000,
      };

  
      // Gửi dữ liệu thanh toán PayPal
      const paymentResponse = await axios.post('https://localhost:7121/api/v1/Payments/PayPal', paymentPayload);
  
      // Chuyển hướng sang PayPal để thanh toán
      window.location.href = paymentResponse.data;
      toast.success("Go To PayPal!", { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout!", { position: toast.POSITION.TOP_CENTER });
    }
};

  
  return (
    <>
      <div className="ttm-page-title-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-box ttm-textcolor-white">
                <div className="page-title-heading">
                  <h1 className="title">Checkout</h1>
                </div>
                <div className="breadcrumb-wrapper">
                  <div className="container">
                    <div className="breadcrumb-wrapper-inner">
                      <span>
                        <a title="Go to Delmont." href="index-2.html" className="home">
                          <i className="themifyicon ti-home" />
                          &nbsp;&nbsp;Home
                        </a>
                      </span>
                      <span className="ttm-bread-sep">&nbsp; | &nbsp;</span>
                      <span>Checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-main">
        <section className="ttm-row checkout-section break-991-colum clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
              <form
                name="checkout"
                method="post"
                className="checkout row"
                action="#"
              >
                <div className="col-lg-6">
                  <div className="billing-fields">
                    <h3>Billing details</h3>
                    <p className="form-row">
                      <label>Full name&nbsp;<abbr className="required" title="required">*</abbr></label>
                      <input
                        type="text"
                        className="input-tex"
                        name="billingFirstName"
                        value={billingInfo.billingFirstName}
                        onChange={handleBillingChange}
                        placeholder="Full name"
                        style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                      />
                    </p>
                    <div style={{display: "flex"}}>

                      <span className="form-row">
                        <label>Email address&nbsp;<abbr className="required" title="required">*</abbr></label>
                        <input
                          type="email"
                          className="input-text"
                          name="billingEmail"
                          value={billingInfo.billingEmail}
                          onChange={handleBillingChange}
                          placeholder="nguyenvana@gmail.com"
                          style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                        />
                      </span>
                      <span className="form-row">
                        <label>Phone number&nbsp;<abbr className="required" title="required">*</abbr></label>
                        <input
                          type="tel"
                          className="input-text"
                          name="billingPhone"
                          value={billingInfo.billingPhone}
                          onChange={handleBillingChange}
                          placeholder="12345678..."
                          style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                        />
                      </span>
                    </div>
                    <p className="form-row">
                      <label>Street address&nbsp;<abbr className="required" title="required">*</abbr></label>
                      <input
                        type="text"
                        className="input-text"
                        name="billingAddress1"
                        value={billingInfo.billingAddress1}
                        onChange={handleBillingChange}
                        placeholder="House number and street name"
                        style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                      />
                    </p>
                   <div style={{display: "flex"}}>
                    <span className="form-row">
                        <label>Town / City&nbsp;<abbr className="required" title="required">*</abbr></label>
                        <input
                          type="text"
                          className="input-text"
                          name="billingCity"
                          value={billingInfo.billingCity}
                          onChange={handleBillingChange}
                          placeholder="Ha Noi..."
                          style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                        />
                      </span>
                      <span className="form-row">
                        <label>Postcode / ZIP&nbsp;<abbr className="required" title="required">*</abbr></label>
                        <input
                          type="text"
                          className="input-text"
                          name="billingPostcode"
                          value={billingInfo.billingPostcode}
                          onChange={handleBillingChange}
                          placeholder="7000..."
                          style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                <div className="additional-fields">
                  <h3>Additional information</h3>
                  <div className="additional-fields-wrapper">
                    <p className="form-row" id="order_comments_field">
                      <label>
                        Order notes&nbsp;
                        <span className="optional">(optional)</span>
                      </label>
                      <textarea style={{height: 150}}
                        name="order_comments"
                        className="input-text "
                        id="order_comments"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        defaultValue={""}
                      />
                    </p>
                  </div>
                </div>
              </div>

                <div className="col-lg-12">
                  <h3 id="order_review_heading">Your order</h3>
                  <table className="shop_table shop_table_responsive" style={{ marginBottom: 0 }}>
                    <thead>
                      <tr>
                        
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.map((item, index) => (
                        <tr className="cart_item" key={index}>
                          <td className="product-thumbnail">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src={productsInfo[index] ? productsInfo[index].image : ''}
                                alt={productsInfo[index] ? productsInfo[index].name : ''}
                              />
                            </a>
                          </td>
                          <td className="product-name" data-title="Product">
                            <Link to={`/productdetail/${item.productId}`}>{productsInfo[index] ? productsInfo[index].name : 'Unknown'}</Link>
                          </td>
                          <td className="product-price" data-title="Price">
                            <span className="Price-amount">
                              <span className="Price-currencySymbol">$</span>
                              {productsInfo[index] ? productsInfo[index].price : ''}.00
                            </span>
                          </td>
                          <td className="product-quantity" data-title="Quantity">
                            <div className="quantity" style={{ textAlign: "center" }}>
                              <span>{item.qtyCart}</span>
                            </div>
                          </td>
                          <td className="product-subtotal" data-title="Total">
                            <span className="Price-amount">
                              <span className="Price-currencySymbol">$</span>{item.subTotal}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ textAlign: "right", marginTop: "20px", fontSize: 18, color: "black", marginBottom: 20 }}>
                    <strong>Total:</strong> ${totalPrice.toFixed(2)}
                  </div>
                  <div id="payment" className="checkout-payment">
                    <ul className="payment_methods">
                      <li className="payment_method_ppec_paypal">
                        <label>
                          PayPal <img src={paypal} alt="PayPal" />
                        </label>
                        <div className="payment_box">
                          <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                        </div>
                      </li>
                    </ul>
                    <div className="form-row place-order">
                      <button
                        type="button"
                        className="btn btn-primary"
                        name="checkout_place_order"
                        id="place_order"
                        value="Place order"
                        data-value="Place order"
                        onClick={handleCheckout}
                        style={{ width: "100%" }}
                      >
                        Continue to payment
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Checkout;


