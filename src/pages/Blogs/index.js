import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import axios from 'axios'; // Import axios


function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [diseases, setDiseases] = useState([]);
  const [doctors, setDoctors] = useState([]);
 
  


  useEffect(() => {
    fetch("https://medinetprj.azurewebsites.net/api/v1/Blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  },[]);  
  useEffect(() => {
    fetch("https://medinetprj.azurewebsites.net/api/v1/Diseases")
      .then((response) => response.json())
      .then((data) => {
        setDiseases(data);
      });
  
  }, []);
  useEffect(() => {
    fetch("https://medinetprj.azurewebsites.net/api/v1/Employees")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
      });
  
  }, []);


  //gioi han noi dung chung
  //giới hạn kí tự of tên
function truncate(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
//ngay thang nam
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return formattedDate;
};
// phan trang
// Get current blogs
const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

//
const [clinic, setClinic] = useState('');
  useEffect(() => {
    fetch("https://medinetprj.azurewebsites.net/api/v1/Clinics/id?id=1")
      .then((response) => response.json())
      .then((data) => {
        setClinic(data);
      });
  
  }, []);
//filter disease
const fetchBlogByDiseases = async (diseaseId) => {
  try {
    const response = await axios.get(`https://medinetprj.azurewebsites.net/api/v1/Blogs/diseaseId?diseaseId=${diseaseId}`);
    setBlogs(response.data);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }
};
// Filter by employee
const fetchBlogByEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`https://medinetprj.azurewebsites.net/api/v1/Blogs/employeeId?employeeId=${employeeId}`);
    setBlogs(response.data);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
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
                  <h1 className="title">Blog</h1>
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
                      <span>Blog Classic</span>
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
        {/* sidebar */}
        <div className="sidebar ttm-sidebar-right ttm-bgcolor-white break-991-colum clearfix">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-lg-9 content-area">
              {currentBlogs.map((blog) => {
      let createdAt = new Date(blog.createdAt);
      let day = createdAt.getDate();
      let month = createdAt.toLocaleString('default', { month: 'short' });
      let year = createdAt.getFullYear();

      return (
                
  <article className="post ttm-blog-classic clearfix">
    {/* post-featured-wrapper */}
    <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
      <div className="ttm-post-featured" style={{width:'100%', height:'100%'}}>
        <img
          className="img-fluid"
          src={blog.imageSrc}
          alt={blog.title}
          style={{width:'100%', height:'500px'}}
        />
      </div>
      <div className="ttm-box-post-date">
      <span class="ttm-entry-date">
      <time className="entry-date">
            {day}<span className="entry-month">{month}<span className="entry-year">{year}</span></span>
          </time>                                   
           </span>
      </div>
    </div>
    {/* post-featured-wrapper end */}
    {/* ttm-blog-classic-content */}
    <div className="ttm-blog-classic-content">
      <div className="ttm-post-entry-header">
        <div className="post-meta">
          <span className="ttm-meta-line byline">
            <i className="ti ti-user" />
            {blog.employee.full_Name}
          </span>
          <span className="ttm-meta-line cat-links">
            <i className="ti ti-folder" />
            {blog.disease.name}
          </span>
          {/* <span className="ttm-meta-line comments-link">
            <i className="fa fa-comment" /> {blog.comments.length} Comments
          </span> */}
          {/* <span className="ttm-meta-line tags-links">
            <i className="fa fa-tag" />
            {blog.tags.join(', ')}
          </span> */}
        </div>
        <header className="entry-header">
          <h2 className="entry-title">
            <a href=''>
              <Link to={`/blogdetail/${blog.id}`}>
              {blog.title}
              </Link>
            </a>
          </h2>
        </header>
      </div>
      <div className="entry-content">
        <div className="ttm-box-desc-text">
          <p>
            {truncate(blog.content, 200)}
          </p>
        </div>
        <div className="ttm-blogbox-desc-footer">
          <div className="ttm-blogbox-footer-readmore">
            <div className="ttm-blogbox-footer-left">
              <a
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-black"
                href={blog.link}
              >
                READ MORE
              </a>
            </div>
          </div>
          {/* Add your social share links here */}
        </div>
      </div>
    </div>
    {/* ttm-blog-classic-content end */}
  </article>
);
})}
               
                {/* Render the pagination */}
      <div className="ttm-pagination">
        {[...Array(Math.ceil(blogs.length / blogsPerPage))].map((e, i) => (
          <span key={i} className={`page-numbers ${i + 1 === currentPage ? 'current' : ''}`} onClick={() => paginate(i + 1)}>
            {i + 1}
          </span>
        ))}
        <a className="next page-numbers" href="#" onClick={() => paginate(currentPage + 1)}>
          <i className="ti ti-arrow-right" />
        </a>
      </div>
              </div>
              <div className="col-lg-3 widget-area sidebar-right ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-grey">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
                {/* <aside className="widget widget-search">
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
                </aside> */}
                <aside className="widget widget-categories">
                  <h3 className="widget-title">Diseases</h3>
                  <ul>
                    {diseases.map((disease) => (
                    <li>
                    <a href="#" onClick={() => fetchBlogByDiseases(disease.id)}>
                      {disease.name}
                    </a>
                  </li>
                    ))}
                  </ul>
                </aside>
                <aside className="widget widget-categories">
                  <h3 className="widget-title">Doctors</h3>
                  <ul>
                  {doctors.filter(doctor => doctor.role === 4).map((doctor) => (
  <li>
    <a href="#" onClick={() => fetchBlogByEmployee(doctor.id)}>{doctor.full_Name}</a>
  </li>
))}
                  </ul>
                </aside>
                <aside className="widget widget-recent-post">
                  <h3 className="widget-title">Popular News</h3>
                  <ul className="widget-post ttm-recent-post-list">
                  {blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((blog) => (
  <li key={blog.id}>
    <a href=''>
      <Link to={`/blogdetail/${blog.id}`}><img  src={blog.imageSrc} alt="post-img" /></Link>
      
    </a>
    <span className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
    <a href=''>
      <Link to={`/blogdetail/${blog.id}`}>{truncate(blog.title, 50)}</Link>
      
    </a>
  </li>
))}
    </ul>
                </aside>
                {/* <aside className="widget widget-latest-tweets">
                  <h3 className="widget-title">Latest Tweets</h3>
                  <div className="latest-tweets">
                    <ul>
                      <li>
                        <p className="tweet-text">
                          Good news for mutli-language site creators. Our Boldman
                          theme is now officially compatible with WPML plugin.
                          Check…{" "}
                          <a href="#" target="_blank" rel="nofollow">
                            twitter.com/i/web/status/11191…
                          </a>
                        </p>
                        <p className="tweet-details">
                          <a href="#" target="_blank">
                            <time dateTime="2019-04-19 05:40:29+0000">
                              April 19, 2019 5:40 am
                            </time>
                          </a>
                        </p>
                      </li>
                      <li>
                        <p className="tweet-text">
                          Presenting our new WordPress theme Fixtech on
                          <a
                            className="twitter-hashtag"
                            href="#"
                            target="_blank"
                            rel="nofollow"
                          >
                            #EnvatoMarket
                          </a>
                          ,
                          <a
                            className="twitter-hashtag"
                            href="#"
                            target="_blank"
                            rel="nofollow"
                          >
                            #themeforest
                          </a>{" "}
                          ... Specially created for Computer &amp; Mobi…
                          <a href="#" target="_blank" rel="nofollow">
                            twitter.com/i/web/status/11125…
                          </a>
                        </p>
                        <p className="tweet-details">
                          <a href="#" target="_blank">
                            <time dateTime="2019-04-01 06:11:28+0000">
                              April 1, 2019 6:11 am
                            </time>
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                </aside> */}
                <aside className="widget calender-widget">
                  <h3 className="widget-title">Book Appointment </h3>
                  <div id="calendar" className="calendar small" />
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
                  {clinic.name} <br />
                  {clinic.phone} <br />
                  <a href="mailto:info@example.com.com">{clinic.email}</a>
                </div>
                <br />
                <a className="view_more" href="#">
                  View More
                </a>
              </div>
            </aside>
                <aside className="widget tagcloud-widget">
                  <h3 className="widget-title">Tags</h3>
                  <div className="tagcloud">
                    <a href="#" className="tag-cloud-link">
                      doctor
                    </a>
                    <a href="#" className="tag-cloud-link">
                      health
                    </a>
                    <a href="#" className="tag-cloud-link">
                      hospital
                    </a>
                    <a href="#" className="tag-cloud-link">
                      medical
                    </a>
                    <a href="#" className="tag-cloud-link">
                      medicines
                    </a>
                    <a href="#" className="tag-cloud-link">
                      pain
                    </a>
                    <a href="#" className="tag-cloud-link">
                      physician
                    </a>
                    <a href="#" className="tag-cloud-link">
                      psychology
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

export default Blogs;