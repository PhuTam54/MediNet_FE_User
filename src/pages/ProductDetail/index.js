

import product1 from "~/assets/images/product/product-one.jpg"
import product2 from "~/assets/images/product/product-two.jpg"
import product3 from "~/assets/images/product/product-three.jpg"
import product4 from "~/assets/images/product/product-four.jpg"
import product5 from "~/assets/images/product/product-five.jpg"
import product6 from "~/assets/images/product/product-six.jpg"
import product7 from "~/assets/images/product/product-seven.jpg"
import product8 from "~/assets/images/product/product-eight.jpg"
import product9 from "~/assets/images/product/product-nine.jpg"
import product10 from "~/assets/images/product/product-ten.jpg"
import comment1 from "~/assets/images/blog/blog-comment-01.jpg"
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
function ProductDetail({  }) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios.get('https://localhost:7121/api/v1/Products')
    .then(res => {
      setProducts(res.data)
    })
    .catch(err => {
        console.log(err)
    });
    const fetchProduct = async () => {
      const response = await axios.get(`https://localhost:7121/api/v1/Products/id?id=${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);
  const currentProductCategoryChildId = product.categoryChildId;
// get token from local storage
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
  // add to cart


  const addToCart = () => {
    const cartItem = {
      qtyCart: quantity,
      productID: product.id,
      customerID: userId,
      clinicID: 1
    };

   
    axios.post('https://localhost:7121/api/v1/Carts', cartItem)
    .then( )
    .catch(error => console.error(error));
    toast.success('Product added to cart');
};
// tab thong tin
const [activeTab, setActiveTab] = useState('Description');

    return ( 
        <>
  {/* page-title */}
  <div className="ttm-page-title-row">
    <div className="ttm-page-title-row-bg-layer ttm-bg-layer" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Single Product Details</h1>
            </div>
            {/* /.page-title-captions */}
            <div className="breadcrumb-wrapper">
              <span>
                <a title="Go to Delmont." href="index-2.html" className="home">
                  <i className="themifyicon ti-home" />
                  &nbsp;&nbsp;Home
                </a>
              </span>
              <span className="ttm-bread-sep">&nbsp; | &nbsp;</span>
              <span>
                <span>Single Product Details</span>
              </span>
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
    {/* sidebar */}
    <div className="sidebar ttm-sidebar-right products ttm-bgcolor-white break-991-colum clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-9 content-area">
            <div className="ttm-single-product-details product">
              <div className="ttm-single-product-info clearfix">
                <div className="onsale">Sale!</div>
                <div className="product-gallery images">
                  <figure className="ttm-product-gallery__wrapper">
                    <div className="product-gallery__image">
                      <img
                        className="img-fluid"
                        src={product.imageSrc}
                        alt="product-img"
                      />
                    </div>
                   
                  </figure>
                </div>
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">{product.name}</h1>
                  <div className="product-rating clearfix">
                    <ul className="star-rating clearfix">
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
                    </ul>
                    <a href="#reviews" className="review-link" rel="nofollow">
                      (<span className="count">1</span> customer review)
                    </a>
                  </div>
                  <p className="price">
                    <del>
                      <span className="product-Price-amount">
                        <span className="product-Price-currencySymbol">$</span>
                        70.00
                      </span>
                    </del>
                    <ins>
                      <span className="product-Price-amount">
                        <span className="product-Price-currencySymbol">$</span>
                        {product.price}.00
                      </span>
                    </ins>
                  </p>
                  <div className="product-details__short-description">
  <table style={{ border: '1px solid transparent' }}>
    <tbody>
      <tr style={{ border: '1px solid transparent' }}>
        <th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Description:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>{product.description}</td>
      </tr>
      <tr style={{ border: '1px solid transparent' }}>
        <th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Category:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>
        {product.categoryChild && product.categoryChild.name && (
  <a href={`/Products?categoryChild=${product.categoryChild.id}`} rel="tag">
    {product.categoryChild.name}
  </a>
)}
        </td>
      </tr>
      <tr style={{ border: '1px solid transparent' }}>
        <th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Manufacturer:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>{product.manufacturer}</td>
      </tr>
    </tbody>
  </table>
</div>
                  
                  <div className="add-to-wishlist yith-wcwl-add-to-wishlist">
                    <div className="product_meta">
                      
                    </div>
                  </div>
                  <form
                    className="cart"
                    action="#"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                      e.preventDefault();
                      addToCart(product, quantity);
                    }}
                  >
                    <div className="quantity">
                      <label className="screen-reader-text">Quantity</label>
                      <input
                        type="number"
                        id="quantity_5c357ca137d75"
                        className="input-text qty text"
                        step={1}
                        min={1}
                        max={50}
                        name="quantity"
                        defaultValue={1}
                        title="Qty"
                        size={4}
                        value={quantity} onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <button
                      id="submit"
                      name="add-to-cart"
                      type="submit"
                      className="cart_button"
                      title="Submit now"
                    >
                      Add to cart
                    </button>
                  </form>
                </div>
              </div>
              <div className="ttm-tabs tabs-for-single-products" data-effect="fadeIn">
      <ul className="tabs clearfix">
      <li className="tab" onClick={(event) => {event.preventDefault(); setActiveTab('Description');}}>
  <a href="#">Description</a>
</li>
<li className="tab" onClick={(event) => {event.preventDefault(); setActiveTab('Additional information');}}>
  <a href="#">Additional information</a>
</li>
<li className="tab" onClick={(event) => {event.preventDefault(); setActiveTab('Reviews');}}>
  <a href="#">Reviews (1)</a>
</li>
      </ul>
      <div className="content-tab ttm-bgcolor-white">
        {activeTab === 'Description' && (
          <div className="content-inner">
          {product && Array.isArray(product.productDetails) && product.productDetails.map((detail, index) => (
            <div key={index}>
              <h2>Description</h2>
              <p> {detail.description}</p>
            </div>
          ))}
        </div>
        )}
        {activeTab === 'Additional information' && (
  <div className="content-inner">
    {product && Array.isArray(product.productDetails) && product.productDetails.map((detail, index) => (
      <div key={index}>
        <h2>Ingredient</h2>
        <p> {detail.ingredient}</p>
        <h2>Usage</h2>
        <p> {detail.usage}</p>
        <h2>Usage Instructions</h2>
        <p> {detail.usageInstructions}</p>
        <h2>Side Effects</h2>
        <p>{detail.sideEffects}</p>
        <h2>Precautions</h2>
        <p> {detail.precautions}</p>
        <h2>Storage</h2>
        <p> {detail.storage}</p>
      </div>
    ))}
  </div>
)}
        {activeTab === 'Reviews' && (
          <div className="content-inner">
            {/* Reviews content goes here */}
          </div>
        )}
      </div>
    </div>
            </div>
          </div>
          <div className="col-lg-3 widget-area sidebar-right ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-grey">
            <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
            
            <aside className="widget products top-rated-products">
  <h3 className="widget-title">Related Products</h3>
  <ul className="product-list-widget">
  {products
    .filter(product => product.categoryChildId === currentProductCategoryChildId && product.id !== Number(id))
    .slice(0, 3)
    .map(product => (
      <li>
        <a>
          <Link to={`/productdetail/${product.id}`}>
            <img src={product.imageSrc} alt="" />
            <span className="product-title">{product.name}</span>
          </Link>
        </a>
        <div className="star-ratings">
          {/* Star ratings content goes here */}
        </div>
        <span className="product-Price-amount amount">
          <span className="product-Price-currencySymbol">$</span>{product.price}.00
        </span>
      </li>
  ))}
  </ul>
</aside>
            
            <aside className="widget widget-text">
              <div className="ttm_info_widget">
                <div className="icon">
                  <i className="themifyicon ti-headphone" />
                </div>
                <div className="title">
                  <h3>Let's Help You!</h3>
                </div>
                <div className="content">
                  14 Tottenham Court Road
                  <br />
                  Bulls Stadium, Califorina <br />
                  1234, USA <br />
                  <a href="mailto:info@example.com.com">info@example.com</a>
                </div>
                <br />
                <a className="view_more" href="#">
                  View More
                </a>
              </div>
            </aside>
          </div>
        </div>
        {/* row end */}
      </div>
    </div>
    {/* sidebar end */}
  </div>
  {/*site-main end*/}
</>

     );
}

export default ProductDetail;