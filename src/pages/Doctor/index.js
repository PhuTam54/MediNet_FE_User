import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Doctors() {
    const [doctors, setDoctors] = useState([]);


    useEffect(() => {
        axios.get('https://medinetprj.azurewebsites.net/api/v1/Employees')
        .then(response => {
            const doctors = response.data.filter(doctor => doctor.role === 4);
      setDoctors(doctors);
        })
    }, []);

    return ( 

        <>
  {/* page-title */}
  <div className="ttm-page-title-row">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Our Team</h1>
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
                  <span>Our Team</span>
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
    <section className="ttm-row pb-70 res-991-pb-20 clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-10 col-md-10">
            {/* section-title */}
            <div className="section-title with-desc clearfix">
              <div className="title-header">
                <h5>MEET OUR EXPERIENCED TEAM</h5>
                <h2 className="title">Our Dedicated Doctors Team</h2>
              </div>
              <div className="title-desc">
                We offer extensive medical procedures to outbound and inbound
                patients what it is and we are very proud of achievement of our
                staff, We are all work together to help our all patients for
                recovery
              </div>
            </div>
            {/* section-title end */}
          </div>
          <div className="col-lg-2 col-md-2" />
        </div>
        {/* row end */}
        {/* row */}
        <div className="row multi-columns-row ttm-boxes-row-wrapper">
        {doctors.map(doctor => (
          <div className="ttm-box-col-wrapper col-lg-3 col-md-4 col-xs-12">
            {/* featured-imagebox-team */}
           
            <div className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay">
            <div className="featured-thumbnail">
  <img
    className="img-fluid"
    src={`https://medinetprj.azurewebsites.net/${doctor.image}`}
    alt="image"
    style={{ width: '200px', height: '250px', objectFit: 'cover' }}
  />
</div>
              <div className="ttm-box-view-overlay">
                <div className="featured-iconbox ttm-media-link">
                  <a href="team-details.html">
                    <i className="ti ti-plus" />
                  </a>
                </div>
              </div>
              <div className="featured-content featured-content-team">
              <div className="ttm-team-position">{doctor.clinic && doctor.clinic.name}</div>
                <div className="featured-title">
                  <h5>
                    <Link to={`/doctordetail/${doctor.id}`}>{doctor.full_Name}</Link>
                    
                  </h5>
                </div>
              </div>
            </div>
            
            {/* featured-imagebox-team end*/}
          </div>
          ))}
        </div>
        {/* row end */}
      </div>
    </section>
  </div>
  {/*site-main end*/}
</>


     );
}

export default Doctors;