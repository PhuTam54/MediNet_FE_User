


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
  const [data, setData] = useState([]);
  const [productsInfo, setProductsInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchData = async () => {
    const userId = getUserId();
    console.log(userId);
    try {
      const cartResponse = await axios.get(`https://medinetprj.azurewebsites.net/api/v1/Carts/userid?userid=${userId}`);
      const cartData = cartResponse.data;

      const productIds = cartData.map(item => item.productId);
      const productPromises = productIds.map(productId =>
        axios.get(`https://medinetprj.azurewebsites.net/api/v1/Products/id?id=${productId}`)
      );
      const productsData = await Promise.all(productPromises);
      setProductsInfo(productsData.map(response => response.data));

      const total = cartData.reduce((acc, item) => acc + item.subTotal, 0);
      setTotalPrice(total);

      setData(cartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = token.split('.')[1];
      const decodedToken = atob(tokenData);
      const tokenObject = JSON.parse(decodedToken);
      return tokenObject.userId;
    }
    return null;
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const cartItem = data.find(item => item.productId === productId);
      if (!cartItem) {
        console.error("Cart item not found");
        return;
      }

      const requestData = {
        ...cartItem,
        qtyCart: newQuantity
      };

      await axios.put(`https://medinetprj.azurewebsites.net/api/v1/Carts/id?id=${cartItem.id}`, requestData);
      fetchData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://medinetprj.azurewebsites.net/api/v1/Carts/id?id=${id}`);
      fetchData();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ margin: "50px auto", fontSize: 20, textAlign: "center", border: "1px solid #01d6a3", color: "white", backgroundColor: "#01d6a3", padding: 20, maxWidth: 500 }}>
        You need to log in to view your cart.
      </div>
    );
  }

  return (
    <>
      <div className="ttm-page-title-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-box ttm-textcolor-white">
                <div className="page-title-heading">
                  <h1 className="title">Cart</h1>
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
                      <span>Cart</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-main single">
        <section className="ttm-row cart-section break-991-colum clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {data.length > 0 ? (
                  <table className="shop_table shop_table_responsive">
                    <thead>
                      <tr>
                        <th className="product-remove">&nbsp;</th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr className="cart_item" key={index}>
                          <td className="product-remove">
                            <a type="button" onClick={() => handleRemoveItem(item.id)} style={{ color: "red", fontSize: 25 }}>×</a>
                          </td>
                          <td className="product-thumbnail">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src={productsInfo[index] ? productsInfo[index].imageSrc : ''}
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
                            <div className="quantity">
                              <input
                                type="number"
                                className="input-text"
                                defaultValue={item.qtyCart}
                                min={1}
                                title="Qty"
                                size={4}
                                onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                              />
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
                ) : (
                  <div style={{ margin: "0px auto", fontSize: 20, textAlign: "center", border: "1px solid #01d6a3", color: "white", backgroundColor: "#01d6a3", padding: 20, maxWidth: 1000 }}>
                    No products in cart!
                  </div>
                )}
                {data.length > 0 && (
                  <div className="cart-collaterals">
                    <div className="cart_totals ">
                      <h2>Cart totals</h2>
                      <table className="shop_table shop_table_responsive">
                        <tbody>
                          <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td data-title="Subtotal">
                              <span className="Price-amount">
                                <span className="Price-currencySymbol">$</span>{totalPrice.toFixed(2)}
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th  style={{color: "black"}}>Total</th>
                            <td data-title="Total">
                              <strong>
                                <span className="Price-amount"  style={{color: "black"}}>
                                  <span className="Price-currencySymbol">$</span>{totalPrice.toFixed(2)}
                                </span>
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="proceed-to-checkout">
                        <a href="/checkout" className="checkout-button button">
                          Proceed to checkout
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Cart;
