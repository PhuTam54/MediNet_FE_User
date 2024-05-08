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
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
function Products() {
  const [products, setProducts] = useState([]);
  const [categoryChilds, setCategoryChilds] = useState([]);
  const [search, setSearch] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const ProductsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
 
  
  // Now you can use these variables in your code
  

  

  useEffect(() => {
    axios.get('https://localhost:7121/api/v1/Products')
    .then(res => {
      setProducts(res.data)
    })
    .catch(err => {
        console.log(err)
    });
    axios.get('https://localhost:7121/api/v1/CategoryChilds')
    .then(res => {
      setCategoryChilds(res.data)
    })
    .catch(err => {
        console.log(err)
    });

}, []) ;
const filterByCategory = (categoryId) => {
  axios
    .get(`https://localhost:7121/api/v1/Products/categorychild?categorychildId=${categoryId}`)
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error('Error fetching products by category:', error);
    });
};




useEffect(() => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  setDisplayedProducts(filteredProducts);
}, [products, search]);

const handleSortChange = (event) => {
  const sortValue = event.target.value;
  let sortedProducts;

  if (sortValue === 'price') {
    sortedProducts = [...displayedProducts].sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    sortedProducts = [...displayedProducts].sort((a, b) => b.price - a.price);
  } else {
    sortedProducts = [...displayedProducts];
  }

  setDisplayedProducts(sortedProducts);
};

const indexOfFirstItem = (currentPage - 1) * ProductsPerPage;
const indexOfLastItem = indexOfFirstItem + ProductsPerPage;

const productsToShow = displayedProducts.slice(indexOfFirstItem, indexOfLastItem);
const handleClick = (pageNumber) => {
  setCurrentPage(pageNumber);
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <select name="orderby" className="select2-hidden-accessible" onChange={handleSortChange}>
  <option value="menu_order" selected="selected">
    Default sorting
  </option>
  
  <option value="price">Sort by price: low to high</option>
  <option value="price-desc">Sort by price: high to low</option>
</select>
              </div>
            </form>
            <div className="products row">
              {/* product */}
              {productsToShow.map((product, index) => (
                <div key={index} className="product col-md-4 col-sm-6 col-xs-12">
                  
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
                            src={product.image}
                            alt=""
                          />
                        </div>
                      </div>
                      {/* ttm-product-box-inner end */}
                      <div className="ttm-product-content">
                        <a className="ttm-product-title" href="">
                          <Link to={`/productdetail/${product.id}`}>
                            <h2>{product.name}</h2>
                          </Link>
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
                              20.00
                            </span>
                          </del>
                          <ins>
                            <span className="product-Price-amount">
                              <span className="product-Price-currencySymbol">$</span>
                              {product.price}.00
                            </span>
                          </ins>
                        </span>
                      </div>
                    </div>
                
                </div>
                  
              ))}
            </div>
            <div className="col-lg-12">
      <div className="ttm-pagination text-center">
      <a className="next page-numbers" href="#" onClick={() => handleClick(currentPage - 1)}>
          <i className="ti ti-arrow-left " />
        </a>
        {[...Array(Math.ceil(products.length / ProductsPerPage))].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={pageNumber}
              aria-current="page"
              className={`page-numbers ${currentPage === pageNumber ? 'current' : ''}`}
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        })}
        <a className="next page-numbers" href="#" onClick={() => handleClick(currentPage + 1)}>
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
                    value={search}
                    onChange={e => setSearch(e.target.value)}
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
              {products
  .sort((a, b) => b.price - a.price)
  .slice(0, 3)
  .map(product => (
    <li>
      <a>
        <Link to={`/productdetail/${product.id}`}>
          <img src={product.image} alt="" />
          <span className="product-title">{product.name}</span>
        </Link>
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
        <span className="product-Price-currencySymbol">$</span>{product.price}.00
      </span>
    </li>
))}
              </ul>
            </aside>
            <aside className="widget widget-categories">
              <h3 className="widget-title">Product Categories</h3>
              <ul>
                <li><a
                href="#0"
                className="clear-check"
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .get('https://localhost:7121/api/v1/Products')
                    .then((response) => {
                      setProducts(response.data);
                    })
                    .catch((error) => {
                      console.error('Error fetching data:', error);
                    });
                }}>All</a></li>
            {categoryChilds.map((categoryChild, index) => (
                <li onClick={() => filterByCategory(categoryChild.id)}>
                <a href="#0">{categoryChild.name}</a>
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

export default Products;