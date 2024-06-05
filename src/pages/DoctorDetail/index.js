import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import { post, del } from '~/utils/httpRequest'; 

function DoctorDetail() {

    const { id } = useParams();
    const [doctor, setDoctor] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Employees/id?id=${id}`)
        .then(response => {
            setDoctor(response.data);
        })
    }, [id]);
     useEffect(() => {
        axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Blogs/employeeId?employeeId=${id}`)
        .then(response => {
            setBlogs(response.data);
        })
    }, [id]);
    useEffect(() => {
        axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Courses/employeeId?employeeId=${id}`)
        .then(response => {
            setCourses(response.data);
        })
    }, [id]);

    //giới hạn kí tự of tên
  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
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
              <h1 className="title">{doctor.full_Name}</h1>
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
                  <span>{doctor.full_Name}</span>
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
    <section className="ttm-row overview-section clearfix">
      <div className="ttm-team-member-single-content-wrapper ttm-team-member-view-default">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ttm-team-member-single-content">
                <div className="ttm-social-links-wrapper">
                  
                </div>
                <div className="row">
                  <div className="col-lg-5 col-md-12">
                    {/* ttm-featured-wrapper */}
                    <div className="ttm-featured-wrapper">
                      <div className="featured-thumbnail">
                        <img
                          className="img-fluid"
                          src={`https://medinetaptech.azurewebsites.net/${doctor.image}`}
                          alt="image"
                        />
                      </div>
                    </div>
                    {/* ttm-featured-wrapper end*/}
                  </div>
                  <div className="ttm-team-member-single-content-area col-md-12 col-lg-7">
                    <div className="ttm-team-member-content shadow-box">
                      <div className="ttm-team-member-single-list">
                        <h2 className="ttm-team-member-single-title">
                         {doctor.full_Name}
                        </h2>
                        <h5 className="ttm-team-member-single-position">
                        {doctor.clinic && doctor.clinic.name}
                        </h5>
                        
                        <div className="ttm-team-data">
                          <div className="ttm-team-details-wrapper">
                            <ul className="ttm-team-details-list clearfix">
                              <li>
                                <div className="ttm-team-list-title">
                                  <i className="fa fa-phone" /> Phone :
                                </div>
                                <div className="ttm-team-list-value">
                                  <a href="tel:(123)456-7890">
                                    {" "}
                                    {doctor.phoneNumber}
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="ttm-team-list-title">
                                  <i className="ti ti-email" /> Email :
                                </div>
                                <div className="ttm-team-list-value">
                                  <a
                                    href="mailto:info@example.com"
                                    tabIndex={0}
                                  >
                                    {" "}
                                    {doctor.email}
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="ttm-team-list-title">
                                  <i className="ti ti-location-pin" /> Address
                                  Info :
                                </div>
                                <div className="ttm-team-list-value">
                                  {" "}
                                  {doctor.address}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ttm-team-member-single-content">
                
              </div>
            </div>

          </div>
          <div className="row" style={{marginTop:'100px'}}>
          {/* post-slide */}
          <div
            className="post-slide owl-carousel owl-theme owl-loaded"
            data-item={2}
            data-nav="true"
            data-dots="false"
            data-auto="false"
          >
            <h2>Blogs of {doctor.full_Name}</h2>
            {/* featured-imagebox-post */}
            {blogs.slice(0,4).map((blog, index) => {
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
       
        </div>
      </div>
    </section>
    {/* expertise-section */}
    
    
  </div>
  {/*site-main end*/}
</>

     );
}

export default DoctorDetail;