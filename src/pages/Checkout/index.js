import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import paypal from '~/assets/images/paypal.png';
import momo from '~/assets/images/MoMo_Logo.png';
import vnpay from '~/assets/images/Vnpay.png';
import cod from '~/assets/images/cod.jpg';

const getTokenData = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const tokenData = token.split('.')[1];
    const decodedToken = atob(tokenData);
    const tokenObject = JSON.parse(decodedToken);
    const userId = tokenObject.userId;
    const userRole = tokenObject.userRole;
    return { userId, userRole, token };
  }
  return null;
};

const isAllowedToCheckout = (userRole) => {
  const allowedRoles = ['Customer', 'Admin'];
  return allowedRoles.includes(userRole);
};

function Checkout() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền tính theo USD
  const [billingInfo, setBillingInfo] = useState({
    billingFirstName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress1: '',
    billingCity: '',
    billingPostcode: '',
    billingCountry: '',
    billingDistrict: ''
  });
  const [paymentMethod, setPaymentMethod] = useState("");


  const { userId, userRole, token } = getTokenData();

  useEffect(() => {
    if (userId && isAllowedToCheckout(userRole)) {
      fetchData();
    } else {
      toast.error("You are not authorized to access this page", { position: toast.POSITION.TOP_CENTER });
    }
  }, [userId, userRole]);

  const fetchData = async () => {
    try {
      const cartResponse = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Carts/userid?userid=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const cartData = cartResponse.data;
      setData(cartData);

      const uniqueProductIds = [...new Set(cartData.map(item => item.productId))];
      const productPromises = uniqueProductIds.map(async productId => {
        const productResponse = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Products/id?id=${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return productResponse.data;
      });
      const productsData = await Promise.all(productPromises);
      setProductsInfo(productsData);

      const total = cartData.reduce((acc, item) => acc + item.subTotal, 0);
      setTotalPrice(total); // Tổng tiền tính theo USD
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = async () => {
    const { billingCountry, billingDistrict, billingFirstName, billingEmail, billingPhone, billingAddress1, billingCity, billingPostcode } = billingInfo;
    if (
      !billingFirstName.trim() ||
      !billingEmail.trim() ||
      !billingPhone.trim() ||
      !billingAddress1.trim() ||
      !billingCity.trim() ||
      !billingPostcode.trim() ||
      !billingCountry.trim() ||
      !billingDistrict.trim() ||
      !validateEmail(billingEmail.trim()) || // Kiểm tra định dạng email
      !validatePhone(billingPhone.trim()) // Kiểm tra định dạng số điện thoại
    ) {
      toast.error("Please fill in all required fields correctly!", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    const cartIds = data.map(item => item.id);

    try {
      const orderPayload = {
        name: billingFirstName,
        email: billingEmail,
        tel: billingPhone,
        address: billingAddress1,
        totalAmount: totalPrice.toFixed(2),
        zip_Code: billingPostcode,
        district: billingDistrict,
        city: billingCity,
        country: "Vietnam",
        description: "order product success",
        shipping_method: "Standard", // or any other shipping method
        payment_method: paymentMethod, // Sử dụng paymentMethod được chọn từ state
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
          imageSrc: productsInfo[index] ? productsInfo[index].imageSrc : ''
        }))
      };
      localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));

      const orderResponse = await axios.post('https://medinetaptech.azurewebsites.net/api/v1/Orders', orderPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const orderId = orderResponse.data + ''; // Lấy mã đơn hàng
      localStorage.setItem('orderId', orderId);
      
      const totalAmount = totalPrice; // Chuyển đổi số tiền sang USD
      localStorage.setItem('totalAmount', totalAmount);

      if (paymentMethod === "PayPal") {
        await payWithPayPal(orderId, billingFirstName, totalAmount);
      } else if (paymentMethod === "VNPay") {
        await payWithVNPay(orderId, billingFirstName, totalAmount);
      } else if (paymentMethod === "Momo") {
        await payWithMoMo(orderId, billingFirstName, totalAmount);
      } else if (paymentMethod === "COD") {
         payWithCod();
      }
      
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout!", { position: toast.POSITION.TOP_CENTER });
    }
  };

  const payWithCod =  () => {
    window.location.href = "/thankyou";
   }

  const payWithPayPal = async (orderId, billingFirstName, totalAmount) => {
    try {
      const paymentPayload = {
        orderId: orderId,
        orderType: 'Sandbox',
        orderDescription: 'Order movie ticket',
        name: billingFirstName,
        amount: totalAmount * 23000,
      };

      const paymentResponse = await axios.post('https://medinetaptech.azurewebsites.net/api/v1/Payments/PayPal', paymentPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.location.href = paymentResponse.data;
      toast.success("Go To PayPal!", { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error("Error during PayPal checkout:", error);
      toast.error("Failed to checkout with PayPal!", { position: toast.POSITION.TOP_CENTER });
    }
  };

  const payWithVNPay = async (orderId, billingFirstName, totalAmount) => {
    try {
      const vnpayPayload = {
        orderId: orderId,
        description: 'Order movie ticket',
        fullName: billingFirstName,
        amount: totalAmount ,
        createdDate: new Date().toISOString(),
      };

      const paymentResponse = await axios.post('https://medinetaptech.azurewebsites.net/api/v1/Payments/VNPay', vnpayPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.location.href = paymentResponse.data;
      toast.success("Redirecting to VNPay!", { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error("Error during VNPay checkout:", error);
      toast.error("Failed to checkout with VNPay!", { position: toast.POSITION.TOP_CENTER });
    }
  };

  const payWithMoMo = async (orderId, billingFirstName, totalAmount) => {
    try {
      const momoPayload = {
        orderId: orderId,
        orderInfo: 'Order movie ticket',
        fullName: billingFirstName,
        amount: totalAmount * 23000,
      };

      const paymentResponse = await axios.post('https://medinetaptech.azurewebsites.net/api/v1/Payments/MoMo', momoPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.location.href = paymentResponse.data;
      toast.success("Redirecting to MoMo!", { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error("Error during MoMo checkout:", error);
      toast.error("Failed to checkout with MoMo!", { position: toast.POSITION.TOP_CENTER });
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10,}$/;
    return re.test(phone);
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
                      <div style={{ display: "flex" }}>
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
                      <div style={{ display: "flex" }}>
                        <span className="form-row">
                          <label>District&nbsp;<abbr className="required" title="required">*</abbr></label>
                          <input
                            type="text"
                            className="input-text"
                            name="billingDistrict"
                            value={billingInfo.billingDistrict}
                            onChange={handleBillingChange}
                            placeholder="Nam Tu Liem..."
                            style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                          />
                        </span>
                        <span className="form-row">
                          <label>City&nbsp;<abbr className="required" title="required">*</abbr></label>
                          <input
                            type="text"
                            className="input-text"
                            name="billingCity"
                            value={billingInfo.billingCity}
                            onChange={handleBillingChange}
                            placeholder="HaNoi..."
                            style={{ border: "1px solid #999", borderRadius: 5, width: "100%" }}
                          />
                        </span>
                      </div>

                      <div style={{ display: "flex" }}>
                       
                        <span className="form-row">
                          <label>Country&nbsp;<abbr className="required" title="required">*</abbr></label>
                          <input
                            type="text"
                            className="input-text"
                            name="billingCountry"
                            value={billingInfo.billingCountry}
                            onChange={handleBillingChange}
                            placeholder="Vietnam..."
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
                          <textarea style={{ height: 150 }}
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
                          <th className="product-subtotal">Clinic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data && data.map((item, index) => (
                          <tr className="cart_item" key={index}>
                            <td className="product-thumbnail">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src={productsInfo[index] ? productsInfo[index].imageSrc : ''}
                                
                                />
                              </a>
                            </td>
                            <td className="product-name" data-title="Product">
                              <span>{productsInfo[index] ? productsInfo[index].name : ''}</span>
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
                            <td className="product-subtotal" data-title="Total">
                              <span className="Price-amount">
                                <span className="Price-currencySymbol">{item.clinic.name}</span>
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
                        <li className="payment_method_ppec_paypal" style={{ marginBottom: "20px", display: "flex", justifyContent: 'space-between' }}>
                          {/* COD */}
                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#01d6a3", fontSize: 18  }}>
                          
                            <input style={{width: "20px", height: "20px", marginRight: "10px"}}
                              type="radio"
                              name="paymentMethod"
                              value="COD"
                              checked={paymentMethod === "COD"}
                              onChange={() => handlePaymentMethodChange("COD")}
                            />
                            <strong> COD</strong> <img src={cod} alt="COD" style={{ marginLeft: "10px", width: 70, borderRadius: 10 }} />
                          </label>
                          {/* PayPal */}
                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#01d6a3", fontSize: 18 }}>
                            <input style={{width: "20px", height: "20px", marginRight: "10px"}}
                              type="radio"
                              name="paymentMethod"
                              value="PayPal"
                              checked={paymentMethod === "PayPal"}
                              onChange={() => handlePaymentMethodChange("PayPal")}
                            />
                              <strong> PayPal</strong> <img src={paypal} alt="PayPal" style={{ marginLeft: "10px", width: 70, height: 65, borderRadius: 10 }} />
                          </label>
                          {/* MoMo */}
                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#01d6a3", fontSize: 18  }}>
                          
                          <input style={{width: "20px", height: "20px", marginRight: "10px"}}
                            type="radio"
                            name="paymentMethod"
                            value="Momo"
                            checked={paymentMethod === "Momo"}
                            onChange={() => handlePaymentMethodChange("Momo")}
                          />
                          <strong> MoMo</strong> <img src={momo} alt="PayPal" style={{ marginLeft: "10px", width: 70, borderRadius: 10 }} />
                          </label>
                          {/* VNPay */}
                          <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#01d6a3", fontSize: 18  }}>
                          
                            <input style={{width: "20px", height: "20px", marginRight: "10px"}}
                              type="radio"
                              name="paymentMethod"
                              value="VNPay"
                              checked={paymentMethod === "VNPay"}
                              onChange={() => handlePaymentMethodChange("VNPay")}
                            />
                            <strong> VNPay</strong> <img src={vnpay} alt="PayPal" style={{ marginLeft: "10px", width: 70, borderRadius: 10 }} />
                          </label>
                        
                        </li>
                        <div className="payment_box">
                            <p>Pay via PayPal, MoMo, VNPay; You can pay with your credit card if you don’t have a PayPal, MoMo, VNPay account.</p>
                          </div>
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
                          style={{ width: "100%", marginTop: "20px" }}
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