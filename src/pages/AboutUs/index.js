import clinic from "~/assets/images/team-member/team-img02.jpg"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function AboutUs() {
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
      // Fetch the clinic data from the API
      axios.get('https://medinetprj.azurewebsites.net/api/v1/Clinics')
        .then(response => {
          setClinics(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the clinic data!', error);
        });
    }, []);

  return (
    <>
      <>
  {/* page-title */}
  <div className="ttm-page-title-row">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">About Us</h1>
              <h3 className="subtitle"> About Our Hospital</h3>
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
                  <span>About Us</span>
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
   

    {/*team-section*/}
    <section className="ttm-row team-section clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-10 col-md-10">
            {/* section-title */}
            <div className="section-title with-desc clearfix">
              <div className="title-header">
            
                <h2 className="title">OUR CLINIC LOCATIONS</h2>
              </div>
              <div className="title-desc">
              At our clinic, we provide comprehensive care to all our patients,
               both local and international. Our dedicated team works tirelessly
                to ensure each patient receives the best possible treatment.
                 We take immense pride in the achievements and teamwork of our staff,
                  all focused on your recovery.
              </div>
            </div>
            {/* section-title end */}
          </div>
          <div className="col-lg-2 col-md-2" />
        </div>
        {/* row end */}
        {/* row */}
        <div className="row">
          <div style={{display: 'flex', justifyContent: 'center'}}
            className="wrap-team team-slide "
            data-item={4}
            data-nav="true"
            data-dots="false"
            data-auto="false"
          >
            {/* featured-imagebox-team */}
            {clinics.map((clinic, index) => (
                <div key={index} className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay"  style={{marginRight: 40}}>
                <div className="featured-thumbnail">
                    <img style={{width: 300, height: 300}}
                    className="img-fluid"
                    src={clinic.imagesSrc}
                    alt="image"
                    />
                </div>
                <div className="ttm-box-view-overlay">
                    <div className="featured-iconbox ttm-media-link">
                    <a
                        className="ttm_prettyphoto ttm_image"
                        data-gal="prettyPhoto[gallery1]"
                        title="spring-renovation"
                        href=""
                        data-rel="prettyPhoto"
                    >
                         <Link to={`/clinicdetail/${clinic.id}`}>
                            <i className="ti ti-plus" />
                          </Link>
                       
                    </a>
                    </div>
                </div>
                <div className="featured-content featured-content-team">
                    <div className="ttm-team-position">Clinic</div>
                    <div className="featured-title">
                    <h5>
                        <Link to={`/clinicdetail/${clinic.id}`}>
                            {clinic.name}
                        </Link>
                    </h5>
                    </div>
                </div>
                </div>
            ))}
            {/* featured-imagebox-team end*/}
           
            {/* featured-imagebox-team end*/}
          </div>
        </div>
        {/* row end */}
      </div>
    </section>
    {/*team-section end*/}
    {/* testimonial-section */}

  </div>
  {/*site-main end*/}
</>


      
       
    </>
  );
}

export default AboutUs;
