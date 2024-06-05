import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import clinicImage from "~/assets/images/team-member/team-img02.jpg"
import product2 from "~/assets/images/product/product-two.jpg"
import product3 from "~/assets/images/product/product-three.jpg"
import product4 from "~/assets/images/product/product-four.jpg"
import product7 from "~/assets/images/product/product-seven.jpg"
import product8 from "~/assets/images/product/product-eight.jpg"
function ClinicDetail({}) {
  const [clinic, setClinic] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchClinic = async () => {
      const response = await axios.get(`https://medinetprj.azurewebsites.net/api/v1/Clinics/id?id=${id}`);
      setClinic(response.data);
    };

    fetchClinic();
  }, [id]);


 
 

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
              <h1 className="title">Single Clinic Details</h1>
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
                <span>Single Clinic Details</span>
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
              
                <div className="product-gallery images">
                  <figure className="ttm-product-gallery__wrapper">
                    <div className="product-gallery__image">
                      <img
                        className="img-fluid"
                        src={clinic.imagesSrc}
                        alt="product-img"
                      />
                    </div>
                   
                  </figure>
                </div>
                <div className="summary entry-summary">
                    <h1 className="product_title entry-title">
                        {clinic.name}  
                    </h1>
                    <div className="product-details__short-description" style={{display: "flex",fontSize: 18, marginTop: 0, marginBottom: 0}}> 
                    <p style={{marginRight: 5}}><strong> Email:</strong></p>
                    <p>
                     {clinic.email} - Phone: {clinic.phone}
                    </p>
                  </div>
                  <div className="product-details__short-description" style={{display: "flex",fontSize: 18,marginTop: 0,  marginBottom: 0}}> 
                    <p style={{marginRight: 10}}><strong> Address:</strong></p>
                    <p>
                     {clinic.address}
                    </p>
                  </div>
                  <div className="product-details__short-description" style={{display: "flex",fontSize: 18, marginTop: 0, marginBottom: 0}}> 
                    <p style={{marginRight: 10}}><strong> Description:</strong></p>
                    <p>
                     {clinic.description}
                    </p>
                  </div>
                 
                   
               
                  <div className="add-to-wishlist yith-wcwl-add-to-wishlist">
                    <div className="product_meta">
                      
                      <span className="posted_in">
                        Open Hours: <span style={{marginLeft: 5, fontWeight: 300}}>{clinic.openingHours}</span>
                       
                      </span> <br />
                      <span className="posted_in">
                        Close Hours: <span style={{marginLeft: 5, fontWeight: 300}}>{clinic.closingHours}</span>
                       
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
                    <a href="#">Reviews</a>
                  </li>
                </ul>
                <div className="content-tab ttm-bgcolor-white">
                  {/* content-inner */}
                  <div className="content-inner">
                    <p>{clinic.name} General Clinic is committed to providing comprehensive health care services with a team of experienced doctors and modern equipment. We provide general examination, internal medicine, pediatrics, obstetrics and gynecology, dermatology and imaging services, ensuring a safe and effective medical examination and treatment experience. With a comfortable and friendly space, we always put patient benefits and satisfaction first. In addition, the clinic also provides advanced medical products and quality drugs at reasonable prices, helping you feel secure in taking care of your health and that of your family.</p>
                 
                  </div>
                  {/* content-inner end*/}
                  {/* content-inner */}
                
                  {/* content-inner end*/}
                 
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
              <h3 className="widget-title">Products Clinic</h3>
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
                  {clinic.address}
                  <br />
                  {clinic.description} <br />
                  <a href="mailto:info@example.com.com">{clinic.email}</a>
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

export default ClinicDetail;
