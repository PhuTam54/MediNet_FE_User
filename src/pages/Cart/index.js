// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Cart() {
//   const [cart, setCart] = useState([]);


//   const userId = 2;
//     useEffect(() => {
//       axios.get(`https://localhost:7121/api/v1/Carts?userId=${userId}`)
//       .then(res => {
//         setCart(res.data)
//       })
//       .catch(err => {
//           console.log(err)
//       })
//   }, []) ;

//   return (
//     <>
//       {/* Phần header */}
//       <div className="ttm-page-title-row">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="title-box ttm-textcolor-white">
//                 <div className="page-title-heading">
//                   <h1 className="title">Cart</h1>
//                 </div>
//                 <div className="breadcrumb-wrapper">
//                   <div className="container">
//                     <div className="breadcrumb-wrapper-inner">
//                       <span>
//                         <Link to="/" title="Go to Homepage">
//                           <i className="themifyicon ti-home" />
//                           &nbsp;&nbsp;Home
//                         </Link>
//                       </span>
//                       <span className="ttm-bread-sep">&nbsp; | &nbsp;</span>
//                       <span>Cart</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Phần hiển thị giỏ hàng */}
//       <div className="site-main single">
//         <section className="ttm-row cart-section break-991-colum clearfix">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <form className="ttm-cart-form" action="#" method="post">
//                   <table className="shop_table shop_table_responsive">
//                     <thead>
//                       <tr>
//                         <th className="product-remove">&nbsp;</th>
//                         <th className="product-thumbnail">&nbsp;</th>
//                         <th className="product-name">Product</th>
//                         <th className="product-price">Price</th>
//                         <th className="product-quantity">Quantity</th>
//                         <th className="product-subtotal">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
                    
//                         <tr className="cart_item">
//                           <td className="product-remove">
//                             <a href="#" className="remove">×</a>
//                           </td>
//                           <td className="product-thumbnail">
//                             <a href="#">
//                               <img
//                                 className="img-fluid"
//                                 src={cart.image}
//                                 alt={cart.name}
//                               />
//                             </a>
//                           </td>
//                           <td className="product-name" data-title="Product">
//                             <Link to={`/productdetail/${cart.productId}`}>{cart.name}</Link>
//                           </td>
//                           <td className="product-price" data-title="Price">
//                             <span className="Price-amount">
//                               <span className="Price-currencySymbol">$</span>{cart.price}
//                             </span>
//                           </td>
//                           <td className="product-quantity" data-title="Quantity">
//                             <div className="quantity">
//                               <input
//                                 type="number"
//                                 className="input-text"
//                                 defaultValue={cart.qty}
//                                 min={1}
//                                 title="Qty"
//                                 size={4}
//                               />
//                             </div>
//                           </td>
//                           <td className="product-subtotal" data-title="Total">
//                             <span className="Price-amount">
//                               <span className="Price-currencySymbol">$</span>{cart.subTotal}
//                             </span>
//                           </td>
//                         </tr>
                 
//                     </tbody>
//                   </table>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default Cart;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
  const [data, setData] = useState(null);
  const [productsInfo, setProductsInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Retrieve userId from localStorage
   
     const userId = localStorage.getItem('userId');


    try {
      // Fetch cart data
      const cartResponse = await axios.get(`https://localhost:7121/api/v1/Carts/userid?userid=${userId}`);
      const cartData = cartResponse.data;

      // Prepare cart items with merged products and total quantity
      const mergedItems = mergeCartItems(cartData);

      // Calculate total price
      const total = mergedItems.reduce((acc, item) => acc + item.subTotal, 0);
      setTotalPrice(total);

      // Update state with merged cart items
      setData(mergedItems);

      // Fetch product data for each unique product
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

  // Merge cart items with the same product ID and sum the quantities
  const mergeCartItems = (cartData) => {
    const mergedItems = [];
    cartData.forEach((item) => {
      const existingItemIndex = mergedItems.findIndex(mergedItem => mergedItem.productId === item.productId);
      if (existingItemIndex !== -1) {
        // Update existing item
        mergedItems[existingItemIndex].qtyCart += item.qtyCart;
        mergedItems[existingItemIndex].subTotal += item.subTotal;
      } else {
        // Add new item
        mergedItems.push({ ...item });
      }
    });
    return mergedItems;
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
  
      const userId = localStorage.getItem('userId');
      await axios.put(`https://localhost:7121/api/Carts/id?id=${productId}`, { userId, qtyCart: newQuantity });
      fetchData();
    } catch (error) {
      console.error("Error updating quantity:", error);
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
                {/* ttm-cart-form */}
                <form className="ttm-cart-form" action="#" method="post">
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
                      {data && data.map((item, index) => (
                        <tr className="cart_item" key={index}>
                          <td className="product-remove">
                            <a href="#" className="remove">×</a>
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
                </form>
                {/* ttm-cart-form end */}
                {/* cart-collaterals */}
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
