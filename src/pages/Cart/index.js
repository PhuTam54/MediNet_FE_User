

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
  const [data, setData] = useState(null);
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
  const fetchData = async () => {
    try {
      
      const cartResponse = await axios.get(`https://localhost:7121/api/v1/Carts/userid?userid=${userId}`);
      const cartData = cartResponse.data;
      

      if (cartData.length === 0) {
        return; // Nếu giỏ hàng trống, không cần gọi API Products và tính toán giá
      }

      const mergedItems = mergeCartItems(cartData);

      const total = mergedItems.reduce((acc, item) => acc + item.subTotal, 0);
      setTotalPrice(total);

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

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const cartItem = data.find(item => item.productId === productId);
      if (!cartItem) {
        console.error("Cart item not found");
        return;
      }
  
      const requestData = {
        ...cartItem, // Sử dụng thông tin đầy đủ của cartItem
        qtyCart: newQuantity // Chỉ cập nhật qtyCart mới
      };
  
      await axios.put(`https://localhost:7121/api/v1/Carts/id?id=${cartItem.id}`, requestData);
      fetchData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://localhost:7121/api/v1/Carts/id?id=${id}`);
      fetchData();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (!isLoggedIn) {
    return <div style={{ margin: "50px auto", fontSize: 20, textAlign: "center", border: "1px solid #01d6a3", color: "white", backgroundColor: "#01d6a3", padding: 20, maxWidth: 500 }}>
      You need to log in to view your cart.
    </div>
  }

  return (
    <>
      {/* page-title */}
      <div className="ttm-page-title-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-box ttm-textcolor-white">
                <div className="page-title-heading">
                  <h1 className="title">Cart</h1>
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
                      <span>Cart</span>
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
      <div className="site-main single">
        {/* cart-section */}
        <section className="ttm-row cart-section break-991-colum clearfix">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-lg-12">
                {data && data.length > 0 ? (
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
                            <a type="button" onClick={() => handleRemoveItem(item.id)}  style={{color: "red", fontSize: 25}}>×</a>
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
                {/* cart-collaterals */}
                {data && data.length > 0 && (
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
                            <th>Total</th>
                            <td data-title="Total">
                              <strong>
                                <span className="Price-amount">
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
                {/* cart-collaterals end*/}
              </div>
            </div>
          </div>
        </section>
        {/* cart-section end*/}
      </div>
      {/*site-main end*/}
    </>
  );
}

export default Cart;


