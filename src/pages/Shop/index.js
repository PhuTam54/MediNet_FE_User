import banner1 from "~/assets/images/banner-one.jpg"
import banner2 from "~/assets/images/banner-two.jpg"
import banner3 from "~/assets/images/banner-three.jpg"
import banner4 from "~/assets/images/banner-four.jpg"
import slider01 from "~/assets/images/slides/slider-mainbg-009.jpg"
import product1 from "~/assets/images/product/product-one.jpg"
import product2 from "~/assets/images/product/product-two.jpg"
import product3 from "~/assets/images/product/product-three.jpg"
import product4 from "~/assets/images/product/product-four.jpg"
import product5 from "~/assets/images/product/product-five.jpg"
import product6 from "~/assets/images/product/product-six.jpg"
import product7 from "~/assets/images/product/product-seven.jpg"
import product8 from "~/assets/images/product/product-eight.jpg"
import testiminal from "~/assets/images/testimonial/02.jpg"
import post1 from "~/assets/images/portfolio/post-one-768x800.jpg"
import post2 from "~/assets/images/portfolio/post-two-768x800.jpg"
import post3 from "~/assets/images/portfolio/post-three-768x800.jpg"
import post4 from "~/assets/images/portfolio/post-four-768x800.jpg"
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
function Shop() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get('https://medinetaptech.azurewebsites.net/api/v1/Products')
    .then(res => {
      setProducts(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, []) ;
useEffect(() => {
  fetch("https://medinetaptech.azurewebsites.net/api/v1/Blogs")
    .then((response) => response.json())
    .then((data) => {
      setBlogs(data);
    });
},[]);  
  //giới hạn kí tự of tên
  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }
    return ( 
        <>
  
  <div className="ttm-page-title-row"  style={{ backgroundImage: `url(${slider01})` , height:"500px"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Shop</h1>
            </div>
            {/* /.page-title-captions */}
            <div className="breadcrumb-wrapper">
              <div className="container">
                <div className="breadcrumb-wrapper-inner">
                  
                  
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
  {/*site-main start*/}
  <div className="site-main">
    {/*banner-box-section*/}
    <div className="ttm-row banner-box-section clearfix">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            {/* banner-image */}
            <div className="banner-image">
              <figure className="ttm-figure mb-30">
                <a href="#">
                  <img
                    className="img-fluid"
                    src={banner1}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            {/* banner-image end */}
          </div>
          <div className="col-sm-4">
            {/* banner-image */}
            <div className="banner-image">
              <figure className="ttm-figure mb-30">
                <a href="#">
                  <img
                    className="img-fluid"
                    src={banner2}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            {/* banner-image end */}
            {/* banner-image */}
            <div className="banner-image">
              <figure className="ttm-figure mb-30">
                <a href="#">
                  <img
                    className="img-fluid"
                    src={banner3}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            {/* banner-image end */}
          </div>
          <div className="col-sm-4">
            {/* banner-image */}
            <div className="banner-image">
              <figure className="ttm-figure mb-30">
                <a href="#">
                  <img
                    className="img-fluid"
                    src={banner4}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            {/* banner-image end */}
          </div>
        </div>
      </div>
    </div>
    {/*banner-box-section end*/}
    {/*only-title-section*/}
    <section className="ttm-row only-title-section ttm-bgcolor-darkgrey clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-9 col-md-12">
            {/* section-title */}
            <div className="section-title with-desc clearfix">
              <div className="title-header">
                <h2 className="title">Our Latest Products</h2>
              </div>
              <div className="title-desc">
                Since its founding Delmont has been providing its patients with
                the full medical care, encompassing outpatients services, is
                neurology, laboratory, imaging diagnostics and more.
              </div>
            </div>
            {/* section-title end */}
          </div>
          <div className="col-lg-3 col-md-12">
            <a
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-white mb-30 mt-45 res-991-mt-0 float-right"
              href="/products"
            >
              MORE PRODUCTS
            </a>
          </div>
        </div>
        {/* row end */}
        <div className="row">
          <div className="col-lg-12">
            <div className="sep_holder_box width-100 mt_15 mb-50 res-991-mt-0">
              <span className="sep_holder">
                <span className="sep_line" />
              </span>
              <span className="sep_holder">
                <span className="sep_line" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*only-title-section*/}
    {/* product-section */}
    <section className="ttm-row product-section mt_90">
      <div className="container">
        <div className="products row">
       
        {products.slice(0,8).map((product, index) => (
          <div key={index} className="product col-md-3 col-sm-6 col-xs-12">
            
              <div className="ttm-product-box">
                {/* ttm-product-box-inner */}
                <div className="ttm-product-box-inner">
                  
                  <div className="ttm-product-image-box">
                    
                    <img
                      className="img-fluid"
                      src={product.imageSrc}
                      alt=""
                    />
                  </div>
                </div>
                {/* ttm-product-box-inner end */}
                <div className="ttm-product-content">
                  <a className="ttm-product-title" href="">
                    <Link to={`/productdetail/${product.id}`}>
                      <h2>{truncate(product.name, 20)}</h2>
                    </Link>
                  </a>
                  {/* <div className="star-ratings">
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
                  </div> */}
                  <span className="price">
                    
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
      </div>
    </section>
    {/* product-section end*/}
    {/* testimonial-section */}
    <section className="ttm-row broken-section bg-layer clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-5">
            {/* col-img-img-seven */}
            <div className="col-bg-img-seven ttm-col-bgimage-yes ttm-bg ttm-left-span mt_60 res-991-mt-0 res-991-ptb-200 ttm-reset-content-center-991">
              <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
              <div className="layer-content">
                <div className="ttm-video-icon ttm-center-video-icon mt_30">
                  <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-white ttm-icon_element-background-skincolor ttm-icon_element-size-md ttm-icon_element-style-rounded">
                    <i className="fa fa-play" />
                  </div>
                </div>
              </div>
            </div>
            {/* col-img-bg-img-seven end*/}
          </div>
          <div className="col-lg-7">
            {/* testimonial-box */}
            <div className="testimonial-box">
              <div className="ttm-col-bgcolor-yes ttm-right-span ttm-bg ttm-bgcolor-skincolor spacing-3">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
                <div className="layer-content">
                  {/* section title */}
                  <div className="section-title clearfix">
                    <div className="title-header">
                      <h5>HAPPY CLIENTS</h5>
                      <h2 className="title">Our Customers &amp; Clients</h2>
                    </div>
                    <div className="testimonials ttm-testimonial-box-view-style1">
                      <div className="testimonial-avatar">
                        <div className="testimonial-img">
                          <img
                            className="img-fluid"
                            src={testiminal}
                            alt="testimonial-img"
                          />
                        </div>
                        <div className="testimonial-caption">
                          <h5>RAshley Foster</h5>
                          <label>Patient</label>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <blockquote className="ttm-testimonial-text">
                          Prior to my stay at Delmont, I was aware of their
                          stellar reputation and multiple friends commented
                          about how lucky I was to have my surgery scheduled
                          there. As a result my expectations were high and yet
                          the kind and professional staff with excellent patient
                          care surpassed them.
                        </blockquote>
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
                      </div>
                    </div>
                  </div>
                  {/* section title end */}
                  
                </div>
              </div>
            </div>
            {/* testimonial-box end*/}
          </div>
        </div>
        {/* row end*/}
      </div>
    </section>
    {/* testimonial-section end*/}
    {/*client-section*/}
    
    {/*client-section end*/}
    
    {/* blog-section */}
    <section className="ttm-row blog-section ttm-bgcolor-grey clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-9 col-md-9">
            {/* section-title */}
            <div className="section-title with-desc clearfix">
              <div className="title-header">
                <h5>OUR BLOG</h5>
                <h2 className="title">Recent Articles and News</h2>
              </div>
              <div className="title-desc">
                Since its founding Delmont has been providing its patients with
                the full medical care, encompassing outpatients services, is
                neurology, laboratory, imaging diagnostics and more.
              </div>
            </div>
            {/* section-title end */}
          </div>
          <div className="col-lg-3 col-md-3"> </div>
        </div>
        {/* row end */}
        <div className="row">
          <div className="col-lg-12">
            <div className="sep_holder_box width-100 mt_15 mb-35">
              <span className="sep_holder">
                <span className="sep_line" />
              </span>
              <span className="sep_holder">
                <span className="sep_line" />
              </span>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          {/* post-slide */}
          <div
            className="post-slide owl-carousel owl-theme owl-loaded"
            data-item={2}
            data-nav="true"
            data-dots="false"
            data-auto="false"
          >
            {/* featured-imagebox-post */}
            {blogs.slice(0,3).map((blog, index) => {
              let createdAt = new Date(blog.createdAt);
              let day = createdAt.getDate();
              let month = createdAt.toLocaleString('default', { month: 'short' });
              let year = createdAt.getFullYear();
        
              return (
            <div className="featured-imagebox featured-imagebox-post ttm-box-view-left-image row box-shadow">
              <div className="col-lg-5 col-md-12 ttm-featured-img-left">
                <div className="ttm-post-thumbnail featured-thumbnail" style={{width:'100%', height:'100%'}}>
                  <img
                    className="img-fluid"
                    src={blog.imageSrc}
                    alt="image"
                    style={{width:'100%', height:'300px'}}
                  />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                    <time className="entry-date">
            {day}<span className="entry-month">{month}<span className="entry-year">{year}</span></span>
          </time>  
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 featured-content featured-content-post">
                <div className="post-title featured-title">
                  <h5>
                    <a href="single-blog.html">
                      <Link to={`/blogdetail/${blog.id}`}>
                      {truncate(blog.title, 50)}
                      </Link>
                    </a>
                  </h5>
                </div>
                <div className="post-meta">
                  {/* <span className="ttm-meta-line comments-link">
                    <i className="fa fa-comment" /> 3 Comments
                  </span> */}
                  <span className="ttm-meta-line byline">
                    <i className="fa fa-user" /> {blog.employee.full_Name}
                  </span>
                  <span className="ttm-meta-line cat-links">
            <i className="ti ti-folder" />
            {blog.disease.name}
          </span>
          <span className="ttm-meta-line comments-link">
  <i className="fa fa-comment" />  {blog.blogComments ? blog.blogComments.length : 0}  Comments
</span>
                </div>
                <div className="post-desc featured-desc">
                  <p>
                    {truncate(blog.content, 150)}
                  </p>
                </div>
              </div>
            </div>
);
})}
            {/* featured-imagebox-post end*/}
            
          </div>
        </div>
        {/* row end*/}
      </div>
    </section>
    {/* multi-section end */}
  </div>
  {/*site-main end*/}
</>

     );
}

export default Shop;