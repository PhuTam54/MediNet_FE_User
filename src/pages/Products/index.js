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
function Products() {
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
              <h1 className="title">Products</h1>
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
                <span>Products</span>
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
  <div className="site-main">
    {/* sidebar */}
    <div className="sidebar ttm-sidebar-right ttm-bgcolor-white clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-9 content-area">
            <p className="products-result-count">Showing 1–9 of 23 results</p>
            <form className="products-ordering" method="get">
              <div className="orderby">
                <select name="orderby" className="select2-hidden-accessible">
                  <option value="menu_order" selected="selected">
                    Default sorting
                  </option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="date">Sort by newness</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                </select>
              </div>
            </form>
            <div className="products row">
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <img
                        className="img-fluid"
                        src={product5}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Accu Check</h2>
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
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <img
                        className="img-fluid"
                        src={product6}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Asthma inhaler</h2>
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
                        25.00
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <img
                        className="img-fluid"
                        src={product7}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Calendula Pills</h2>
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
                        45.00
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <img
                        className="img-fluid"
                        src={product8}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Consonantia</h2>
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
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <div className="onsale">Sale!</div>
                      <img
                        className="img-fluid"
                        src={product9}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Cosmetic Oil</h2>
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
                          <span className="product-Price-currencySymbol">
                            $
                          </span>
                          50.00
                        </span>
                      </del>
                      <ins>
                        <span className="product-Price-amount">
                          <span className="product-Price-currencySymbol">
                            $
                          </span>
                          60.00
                        </span>
                      </ins>
                    </span>
                  </div>
                </div>
              </div>
              {/* product end*/}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <img
                        className="img-fluid"
                        src={product4}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>ECG Machine</h2>
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
                        15.00
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <div className="onsale">Sale!</div>
                      <img
                        className="img-fluid"
                        src={product10}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>First aid kit</h2>
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
                          <span className="product-Price-currencySymbol">
                            $
                          </span>
                          50.00
                        </span>
                      </del>
                      <ins>
                        <span className="product-Price-amount">
                          <span className="product-Price-currencySymbol">
                            $
                          </span>
                          60.00
                        </span>
                      </ins>
                    </span>
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <div className="onsale">Sale!</div>
                      <img
                        className="img-fluid"
                        src={product3}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Syringe 5ml</h2>
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
                          <span className="product-Price-currencySymbol">
                            $
                          </span>
                          3.00
                        </span>
                      </del>
                      <ins>
                        <span className="product-Price-amount">
                          <span className="product-Price-currencySymbol">
                            $
                          </span>
                          2.00
                        </span>
                      </ins>
                    </span>
                  </div>
                </div>
              </div>
              {/* product end */}
              {/* product */}
              <div className="product col-md-4 col-sm-6 col-xs-12">
                <div className="ttm-product-box">
                  {/* ttm-product-box-inner */}
                  <div className="ttm-product-box-inner">
                    <div className="ttm-shop-icon">
                      <div className="product-btn">
                        <a href="#" className="add-to-cart-btn">
                          <i className="ti ti-shopping-cart" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="search-btn">
                          <i className="ti ti-search" />
                        </a>
                      </div>
                      <div className="product-btn">
                        <a href="#" className="wishlist-btn">
                          <i className="ti ti-heart" />
                        </a>
                      </div>
                    </div>
                    <div className="ttm-product-image-box">
                      <img
                        className="img-fluid"
                        src={product2}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* ttm-product-box-inner end */}
                  <div className="ttm-product-content">
                    <a
                      className="ttm-product-title"
                      href="product-details.html"
                    >
                      <h2>Panthenol</h2>
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
                  </div>
                </div>
              </div>
              {/* product end */}
            </div>
            <div className="col-lg-12">
              <div className="ttm-pagination text-center">
                <span aria-current="page" className="page-numbers current">
                  1
                </span>
                <a className="page-numbers" href="#">
                  2
                </a>
                <a className="next page-numbers" href="#">
                  <i className="ti ti-arrow-right" />
                </a>
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
                    <img src={product4} alt="" />
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
                    <img src={product5} alt="" />
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
                    <img src={product4}alt="" />
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
                    <img src={product1} alt="" />
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

export default Products;