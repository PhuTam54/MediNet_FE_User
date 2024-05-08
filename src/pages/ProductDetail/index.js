

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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
function ProductDetail({ products }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://localhost:7121/api/v1/Products/id?id=${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);
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
                    <p>
                     {product.description}
                    </p>
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
                  <div className="add-to-wishlist yith-wcwl-add-to-wishlist">
                    <div className="product_meta">
                      <span className="sku_wrapper">
                        SKU:
                        <span className="sku">Woo-beanie-logo</span>
                      </span>
                      <span className="posted_in">
                        Category:
                        <a href="#" rel="tag">
                          Medical Devices
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="ttm-tabs tabs-for-single-products"
                data-effect="fadeIn"
              >
                <ul className="tabs clearfix">
                  <li className="tab active">
                    <a href="#">Description</a>
                  </li>
                  <li className="tab">
                    <a href="#">Additional information</a>
                  </li>
                  <li className="tab">
                    <a href="#">Reviews (1)</a>
                  </li>
                </ul>
                <div className="content-tab ttm-bgcolor-white">
                  {/* content-inner */}
                  <div className="content-inner">
                    <h2>Description</h2>
                    <p>
                      {product.description}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                  {/* content-inner end*/}
                  {/* content-inner */}
                  <div className="content-inner">
                    <h2>Additional information</h2>
                    <table className="shop_attributes">
                      <tbody>
                        <tr>
                          <th>Dimensions</th>
                          <td className="product_dimensions">6 × 4 × 1 in</td>
                        </tr>
                        <tr>
                          <th>color</th>
                          <td>
                            <p>Blue</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* content-inner end*/}
                  {/* content-inner */}
                  <div className="content-inner">
                    <div id="reviews" className="woocommerce-Reviews">
                      <div id="comments">
                        <h2 className="woocommerce-Reviews-title">
                          1 review for <span>Ladder</span>
                        </h2>
                        <ol className="commentlist">
                          <li className="review">
                            <div className="comment_container">
                              <img
                                className="avatar"
                                src={comment1}
                                alt="comment-img"
                              />
                              <div className="comment-text">
                                <ul className="star-rating">
                                  <li className="fa fa-star" />
                                  <li className="fa fa-star" />
                                  <li className="fa fa-star" />
                                  <li className="fa fa-star" />
                                  <li className="fa fa-star" />
                                </ul>
                                <p className="meta">
                                  <strong className="eview__author">
                                    Cherie{" "}
                                  </strong>
                                  <span className="review__dash">–</span>
                                  <time
                                    className="woocommerce-review__published-date"
                                    dateTime="2018-11-01T04:58:58+00:00"
                                  >
                                    Apr 1, 2019
                                  </time>
                                </p>
                                <div className="description">
                                  <p>
                                    Vestibulum tortor quam, feugiat vitae,
                                    ultricies eget, tempor sit amet, ante
                                    <br />
                                    Very good product and amazing quality.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div id="review_form_wrapper">
                        <div className="comment-respond">
                          <span className="comment-reply-title">
                            Add a review
                            <small>
                              <a
                                rel="nofollow"
                                id="cancel-comment-reply-link"
                                href="#"
                              >
                                Cancel reply
                              </a>
                            </small>
                          </span>
                          <form
                            action="#"
                            method="post"
                            id="commentform"
                            className="comment-form"
                          >
                            <p className="comment-notes">
                              <span id="email-notes">
                                Your email address will not be published.
                              </span>{" "}
                              Required fields are marked{" "}
                              <span className="required">*</span>
                            </p>
                            <div className="comment-form-rating">
                              <label htmlFor="rating">Your rating</label>
                              <ul className="stars">
                                <li className="fa fa-star-o" />
                                <li className="fa fa-star-o" />
                                <li className="fa fa-star-o" />
                                <li className="fa fa-star-o" />
                                <li className="fa fa-star-o" />
                              </ul>
                              <select
                                name="rating"
                                id="rating"
                                required=""
                                tabIndex={-1}
                              >
                                <option value="">Rate…</option>
                                <option value={5}>Perfect</option>
                                <option value={4}>Good</option>
                                <option value={3}>Average</option>
                                <option value={2}>Not that bad</option>
                                <option value={1}>Very poor</option>
                              </select>
                            </div>
                            <p className="comment-form-comment">
                              <label htmlFor="comment">
                                Your review&nbsp;
                                <span className="required">*</span>
                              </label>
                              <textarea
                                id="comment"
                                name="comment"
                                cols={45}
                                rows={8}
                                required=""
                                defaultValue={""}
                              />
                            </p>
                            <p className="comment-form-author">
                              <label htmlFor="author">
                                Name&nbsp;<span className="required">*</span>
                              </label>
                              <input
                                id="author"
                                name="author"
                                type="text"
                                defaultValue=""
                                required=""
                              />
                            </p>
                            <p className="comment-form-email">
                              <label htmlFor="email">
                                Email&nbsp;<span className="required">*</span>
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue=""
                                required=""
                              />
                            </p>
                            <p className="form-submit">
                              <input
                                name="submit"
                                type="submit"
                                className="submit"
                                defaultValue="Submit"
                              />
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 widget-area sidebar-right ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-grey">
            <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
            <aside className="widget widget-search">
              <form
                role="search"
                method="get"
                className="search-form  box-shadow"
                action="#"
              >
                <label>
                  <span className="screen-reader-text">Search for:</span>
                  <input
                    type="search"
                    className="input-text"
                    placeholder="Search Products…"
                    defaultValue=""
                    name="s"
                  />
                </label>
                <input
                  type="submit"
                  className="search-submit"
                  defaultValue="Search"
                />
              </form>
            </aside>
            <aside className="widget products top-rated-products">
              <h3 className="widget-title">Featured Products</h3>
              <ul className="product-list-widget">
                <li>
                  <a href="#">
                    <img src={product2} alt="" />
                    <span className="product-title">Tonometer</span>
                  </a>
                  <div className="star-ratings">
                    <ul className="rating">
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
                  </div>
                  <span className="product-Price-amount amount">
                    <span className="product-Price-currencySymbol">$</span>90.00
                  </span>
                </li>
                <li>
                  <a href="#">
                    <img src={product4} alt="" />
                    <span className="product-title">Accu Check</span>
                  </a>
                  <div className="star-ratings">
                    <ul className="rating">
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
                  </div>
                  <span className="product-Price-amount amount">
                    <span className="product-Price-currencySymbol">$</span>12.00
                  </span>
                </li>
                <li>
                  <a href="#">
                    <img src={product3} alt="" />
                    <span className="product-title">ECG Machine</span>
                  </a>
                  <div className="star-ratings">
                    <ul className="rating">
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
                  </div>
                  <span className="price">
                    <span className="product-Price-amount">
                      <span className="product-Price-currencySymbol">$</span>
                      20.00
                    </span>
                  </span>
                </li>
                <li>
                  <a href="#">
                    <img src={product7} alt="" />
                    <span className="product-title">Panthenol</span>
                  </a>
                  <div className="star-ratings">
                    <ul className="rating">
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
                  </div>
                  <span className="price">
                    <span className="product-Price-amount">
                      <span className="product-Price-currencySymbol">$</span>
                      18.00
                    </span>
                  </span>
                </li>
                <li>
                  <a href="#">
                    <img src={product8} alt="" />
                    <span className="product-title">Stethoscope</span>
                  </a>
                  <div className="star-ratings">
                    <ul className="rating">
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
                  </div>
                  <span className="price">
                    <del>
                      <span className="product-Price-amount">
                        <span className="product-Price-currencySymbol">$</span>
                        18.00
                      </span>
                    </del>
                    <ins>
                      <span className="product-Price-amount">
                        <span className="product-Price-currencySymbol">$</span>
                        16.00
                      </span>
                    </ins>
                  </span>
                </li>
              </ul>
            </aside>
            <aside className="widget widget-categories">
              <h3 className="widget-title">Product Categories</h3>
              <ul>
                <li>
                  <a href="#">Cardiac Care</a>
                </li>
                <li>
                  <a href="#">Medical Devices</a>
                </li>
                <li>
                  <a href="#">Skin Care</a>
                </li>
                <li>
                  <a href="#">Stomach Care</a>
                </li>
                <li>
                  <a href="#">Thermometer &amp; Mask</a>
                </li>
                <li>
                  <a href="#">Uncategorized</a>
                </li>
                <li>
                  <a href="#">Weight Loss</a>
                </li>
                <li>
                  <a href="#">Women's Care</a>
                </li>
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
