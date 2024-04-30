import paypal from '~/assets/images/paypal.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function Checkout() {
  const [data, setData] = useState(null);
    const [productsInfo, setProductsInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

        try {
            // Lấy dữ liệu giỏ hàng từ localStorage
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];

            // Tính tổng giá tiền
            const total = cartData.reduce((acc, item) => acc + (item.price * item.qty), 0);
            setTotalPrice(total);

            // Lưu thông tin sản phẩm và số lượng vào state
            setData(cartData);

            // Lấy thông tin chi tiết của từng sản phẩm
            const productPromises = cartData.map(async item => {
                const productResponse = await axios.get(`https://example.com/api/products/${item.productId}`);
                return productResponse.data;
            });
            const productsData = await Promise.all(productPromises);
            setProductsInfo(productsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

 const handleCheckout = async () => {
    try {
        // Lấy thông tin từ form thanh toán
        const billingFirstName = document.getElementsByName('billing_first_name')[0].value;
        const billingPhone = document.getElementsByName('billing_phone')[0].value;
        const billingAddress1 = document.getElementsByName('billing_address_1')[0].value;
        const billingPostcode = document.getElementsByName('billing_postcode')[0].value;
        const billingEmail = document.getElementsByName('billing_email')[0].value;

        // Kiểm tra thông tin đã nhập đầy đủ chưa
        if (billingFirstName && billingPhone && billingAddress1 && billingPostcode && billingEmail) {
            // Lấy userId từ localStorage
            const userId = localStorage.getItem('userId');

            // Tạo một đối tượng đơn hàng
            const orderPayload = {
                name: billingFirstName,
                email: billingEmail,
                tel: billingPhone,
                totalAmount: 999, // Tổng số tiền
                address: billingAddress1,
                description: "Order description",
                shipping_method: "Standard",
                payment_method: "PayPal",
                is_paid: true,
                orderDate: new Date().toISOString(),
                customerId: userId, // customerId lấy từ localStorage
               
            };
            console.log(orderPayload);
            console.log(userId)

            // Gửi dữ liệu đơn hàng lên API orders
            const orderResponse = await axios.post('https://localhost:7121/api/v1/Orders', orderPayload);

            // Nếu đơn hàng được tạo thành công, thực hiện thanh toán qua PayPal
            const paymentPayload = {
                orderId: orderResponse.data.id,
                orderType: "Sandbox",
                amount: 999, // Số tiền cần thanh toán
                orderDescription: "Order description",
                name: billingFirstName
            };

            // Gửi dữ liệu thanh toán lên API PayPal
            const paymentResponse = await axios.post('https://localhost:7121/api/v1/Payments/PayPal', paymentPayload);

            // Chuyển hướng đến trang thanh toán PayPal
            window.location.href = paymentResponse.data;

            toast.success("Checkout successful!", { position: toast.POSITION.TOP_CENTER });
        } else {
            // Hiển thị thông báo lỗi nếu thiếu thông tin
            toast.error("Please fill in all required fields!", { position: toast.POSITION.TOP_CENTER });
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to process the order!", { position: toast.POSITION.TOP_CENTER });
    }
};

    return ( 
        <>
  {/* page-title */}
  <div className="ttm-page-title-row">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Checkout</h1>
            </div>
            {/* /.page-title-captions */}
            <div className="breadcrumb-wrapper">
              <div className="container">
                <div className="breadcrumb-wrapper-inner">
                  <span>
                    <a
                      title="Go to Delmont."
                      href="index-2.html"
                      className="home"
                    >
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
        {/* /.col-md-12 */}
      </div>
      {/* /.row */}
    </div>
    {/* /.container */}
  </div>
  {/* page-title end*/}
  {/*site-main start*/}
  <div className="site-main">
    {/* checkout-section */}
    <section className="ttm-row checkout-section break-991-colum clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-12">
            <div className="ttm-form-coupon-toggle">
              <div className="ttm-form-coupon-info">
                Have a coupon?{" "}
                <a href="#" className="showcoupon">
                  Click here to enter your code
                </a>
              </div>
            </div>
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
                    <label>
                      Full name&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%"}}
                      type="text"
                      className="input-tex"
                      name="billing_first_name"
                      placeholder="Full name"
                      defaultValue=""
                    />
                  </p>
                  <div style={{display: "flex"}}>
                    <span className="form-row">
                      <label>
                        Email address&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%"}}
                        type="email"
                        className="input-text "
                        name="billing_email"
                        placeholder="nguyenvana@gmail.com"
                        defaultValue=""
                      />
                    </span>
                    <span className="form-row">
                      <label>
                        Phone number&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%",}}
                        type="tel"
                        className="input-text "
                        name="billing_phone"
                        placeholder="12345678..."
                        defaultValue=""
                      />
                    </span>
                  </div>
           
                  <p className="form-row">
                    <label>
                      Street address&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%"}}
                      type="text"
                      className="input-text"
                      name="billing_address_1"
                      placeholder="House number and street name"
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Apartment, suite, or unit.&nbsp;
                      <span className="optional">(optional)</span>
                    </label>
                    <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%"}}
                      type="text"
                      className="input-text "
                      name="billing_address_2"
                      placeholder="Apartment, suite, unit etc. (optional)"
                      defaultValue=""
                    />
                  </p>

                  <div style={{display: "flex"}}>
                    <span className="form-row">
                      <label>
                        Town / City&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%"}}
                        type="text"
                        className="input-text "
                        name="billing_city"
                        placeholder="Ha Noi..."
                        defaultValue=""
                      />
                    </span>
                    <span className="form-row">
                      <label>
                        Postcode / ZIP&nbsp;
                        <abbr className="required" title="required">
                          *
                        </abbr>
                      </label>
                      <input style={{ border: "1px solid #999", borderRadius: 5, width: "100%"}}
                        type="text"
                        className="input-text "
                        name="billing_postcode"
                        placeholder="7000..."
                        defaultValue=""
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
                <form className="ttm-cart-form" action="#" method="post">
                  <table className="shop_table shop_table_responsive" style={{marginBottom:0}}>
                    <thead>
                      <tr>
                        <th className="product-remove">Number</th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.map((item, index) => (
                        <tr className="cart_item" key={index}>
                          <td className="product-remove" >
                            <span style={{marginLeft: 30}}>{productsInfo[index] ? productsInfo[index].id : ''}</span>
                          </td>
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
                              <span className="Price-currencySymbol">$</span>{productsInfo[index] ? productsInfo[index].price : ''}.00
                            </span>
                          </td>
                          <td className="product-quantity" data-title="Quantity">
                            <div className="quantity" style={{textAlign:"center"}}>
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
                  <div style={{ textAlign: "right", marginTop: "20px", fontSize: 18,color: "black", marginBottom: 20 }}>
                    <strong>Total:</strong> ${totalPrice.toFixed(2)}
                  </div>
                  <div id="payment" className="checkout-payment">
                    <ul className="payment_methods">
                      <li className="payment_method_ppec_paypal">
                        <label>
                          PayPal <img src={paypal} alt="PayPal" />
                        </label>
                        <div className="payment_box">
                          <p>
                            Pay via PayPal; you can pay with your credit card if
                            you don’t have a PayPal account.
                          </p>
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
                          >
                            Continue to payment
                          </button>
                    </div>
                  </div>
                </form>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    {/* checkout-section end */}
  </div>
  {/*site-main end*/}
</>

     );
}

export default Checkout;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import paypal from '~/assets/images/paypal.png';

// function Checkout() {
//   const [productsInfo, setProductsInfo] = useState([]);
//   const [data, setData] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [billingInfo, setBillingInfo] = useState({
//     billingFirstName: '',
//     billingEmail: '',
//     billingPhone: '',
//     billingAddress1: '',
//     billingCity: '',
//     billingPostcode: ''
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const userId = 6; // For testing purpose
//     try {
//       const cartResponse = await axios.get(`https://localhost:7121/api/v1/Carts/userid?userid=${userId}`);
//       const cartData = cartResponse.data;

//       const mergedItems = mergeCartItems(cartData);
//       const total = mergedItems.reduce((acc, item) => acc + item.subTotal, 0);
//       setTotalPrice(total);
//       setData(mergedItems);

//       const uniqueProductIds = [...new Set(cartData.map(item => item.productId))];
//       const productPromises = uniqueProductIds.map(async productId => {
//         const productResponse = await axios.get(`https://localhost:7121/api/v1/Products/id?id=${productId}`);
//         return productResponse.data;
//       });
//       const productsData = await Promise.all(productPromises);
//       setProductsInfo(productsData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const mergeCartItems = (cartData) => {
//     const mergedItems = [];
//     cartData.forEach((item) => {
//       const existingItemIndex = mergedItems.findIndex(mergedItem => mergedItem.productId === item.productId);
//       if (existingItemIndex !== -1) {
//         mergedItems[existingItemIndex].qtyCart += item.qtyCart;
//         mergedItems[existingItemIndex].subTotal += item.subTotal;
//       } else {
//         mergedItems.push({ ...item });
//       }
//     });
//     return mergedItems;
//   };

//   const handleBillingChange = (e) => {
//     const { name, value } = e.target;
//     setBillingInfo({ ...billingInfo, [name]: value });
//   };

//   const handleCheckout = async () => {
//     const { billingFirstName, billingEmail, billingPhone, billingAddress1, billingCity, billingPostcode } = billingInfo;
//     if (!billingFirstName || !billingEmail || !billingPhone || !billingAddress1 || !billingCity || !billingPostcode) {
//       toast.error("Please fill in all required fields!", { position: toast.POSITION.TOP_CENTER });
//       return;
//     }

//     try {
//       const orderPayload = {
//         name: billingFirstName,
//         email: billingEmail,
//         tel: billingPhone,
//         address: billingAddress1,
//         shipping_method: "Standard", // or any other shipping method
//         payment_method: "PayPal",
//         is_paid: true,
//         orderDate: new Date().toISOString(),
//         status: 0, // or any other status
//         userId: 6, // For testing purpose
//         cartIds: data.map(item => item.id)
//       };

//       const orderResponse = await axios.post('https://localhost:7121/api/v1/Orders', orderPayload);

//       const paymentPayload = {
//         orderType: 'Sandbox', // Or 'Production' if you want to make payments in production environment
//         orderDescription: 'Order movie ticket',
//         name: billingFirstName,
//         amount: totalPrice.toFixed(2) // Or any other amount you want to charge, e.g., totalPrice
//       };

//       const paymentResponse = await axios.post('https://localhost:7121/api/v1/Payments/PayPal', paymentPayload);

//       window.location.href = paymentResponse.data;
//       toast.success("Checkout successful!", { position: toast.POSITION.TOP_CENTER });
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       toast.error("Failed to checkout!", { position: toast.POSITION.TOP_CENTER });
//     }
//   };

//   return (
//     <>
//       <div className="ttm-page-title-row">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="title-box ttm-textcolor-white">
//                 <div className="page-title-heading">
//                   <h1 className="title">Checkout</h1>
//                 </div>
//                 <div className="breadcrumb-wrapper">
//                   <div className="container">
//                     <div className="breadcrumb-wrapper-inner">
//                       <span>
//                         <a title="Go to Delmont." href="index-2.html" className="home">
//                           <i className="themifyicon ti-home" />
//                           &nbsp;&nbsp;Home
//                         </a>
//                       </span>
//                       <span className="ttm-bread-sep">&nbsp; | &nbsp;</span>
//                       <span>Checkout</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="site-main">
//         <section className="ttm-row checkout-section break-991-colum clearfix">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <form name="checkout" method="post" className="checkout row" action="#">
//                   <div className="col-lg-6">
//                     <div className="billing-fields">
//                       <h3>Billing details</h3>
//                       <p className="form-row">
//                         <label>Full name&nbsp;<abbr className="required" title="required">*</abbr></label>
//                         <input
//                           type="text"
//                           className="input-tex"
//                           name="billingFirstName"
//                           value={billingInfo.billingFirstName}
//                           onChange={handleBillingChange}
//                           placeholder="Full name"
//                         />
//                       </p>
//                       <div className="form-row">
//                         <label>Email address&nbsp;<abbr className="required" title="required">*</abbr></label>
//                         <input
//                           type="email"
//                           className="input-text"
//                           name="billingEmail"
//                           value={billingInfo.billingEmail}
//                           onChange={handleBillingChange}
//                           placeholder="nguyenvana@gmail.com"
//                         />
//                       </div>
//                       <div className="form-row">
//                         <label>Phone number&nbsp;<abbr className="required" title="required">*</abbr></label>
//                         <input
//                           type="tel"
//                           className="input-text"
//                           name="billingPhone"
//                           value={billingInfo.billingPhone}
//                           onChange={handleBillingChange}
//                           placeholder="12345678..."
//                         />
//                       </div>
//                       <p className="form-row">
//                         <label>Street address&nbsp;<abbr className="required" title="required">*</abbr></label>
//                         <input
//                           type="text"
//                           className="input-text"
//                           name="billingAddress1"
//                           value={billingInfo.billingAddress1}
//                           onChange={handleBillingChange}
//                           placeholder="House number and street name"
//                         />
//                       </p>
//                       <div className="form-row">
//                         <label>Town / City&nbsp;<abbr className="required" title="required">*</abbr></label>
//                         <input
//                           type="text"
//                           className="input-text"
//                           name="billingCity"
//                           value={billingInfo.billingCity}
//                           onChange={handleBillingChange}
//                           placeholder="Ha Noi..."
//                         />
//                       </div>
//                       <div className="form-row">
//                         <label>Postcode / ZIP&nbsp;<abbr className="required" title="required">*</abbr></label>
//                         <input
//                           type="text"
//                           className="input-text"
//                           name="billingPostcode"
//                           value={billingInfo.billingPostcode}
//                           onChange={handleBillingChange}
//                           placeholder="7000..."
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <h3 id="order_review_heading">Your order</h3>
//                     <table className="shop_table shop_table_responsive" style={{ marginBottom: 0 }}>
//                       <thead>
//                         <tr>
//                           <th className="product-name">Product</th>
//                           <th className="product-price">Price</th>
//                           <th className="product-quantity">Quantity</th>
//                           <th className="product-subtotal">Total</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data && data.map((item, index) => (
//                           <tr className="cart_item" key={index}>
//                             <td className="product-name" data-title="Product">
//                               <Link to={`/productdetail/${item.productId}`}>
//                                 {productsInfo[index] ? productsInfo[index].name : 'Unknown'}
//                               </Link>
//                             </td>
//                             <td className="product-price" data-title="Price">
//                               <span className="Price-amount">
//                                 <span className="Price-currencySymbol">$</span>
//                                 {productsInfo[index] ? productsInfo[index].price : ''}.00
//                               </span>
//                             </td>
//                             <td className="product-quantity" data-title="Quantity">
//                               <div className="quantity" style={{ textAlign: "center" }}>
//                                 <span>{item.qtyCart}</span>
//                               </div>
//                             </td>
//                             <td className="product-subtotal" data-title="Total">
//                               <span className="Price-amount">
//                                 <span className="Price-currencySymbol">$</span>{item.subTotal}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                     <div style={{ textAlign: "right", marginTop: "20px", fontSize: 18, color: "black", marginBottom: 20 }}>
//                       <strong>Total:</strong> ${totalPrice.toFixed(2)}
//                     </div>
//                     <div id="payment" className="checkout-payment">
//                       <ul className="payment_methods">
//                         <li className="payment_method_ppec_paypal">
//                           <label>
//                             PayPal <img src={paypal} alt="PayPal" />
//                           </label>
//                           <div className="payment_box">
//                             <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
//                           </div>
//                         </li>
//                       </ul>
//                       <div className="form-row place-order">
//                         <button
//                           type="button"
//                           className="btn btn-primary"
//                           name="checkout_place_order"
//                           id="place_order"
//                           value="Place order"
//                           data-value="Place order"
//                           onClick={handleCheckout}
//                         >
//                           Continue to payment
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default Checkout;
