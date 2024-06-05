import comment1 from "~/assets/images/blog/blog-comment-01.jpg"
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import { post, del } from '~/utils/httpRequest'; 
   
function BlogDetail() {
  const { id } = useParams();
const [blog, setBlog] = useState({});
const [blogs, setBlogs] = useState([]);
const [comments, setComments] = useState([]);
const [comment, setComment] = useState('');


useEffect(() => {
  axios.get('https://medinetaptech.azurewebsites.net/api/v1/Blogs')
  .then(res => {
    setBlogs(res.data)
  })
  .catch(err => {
      console.log(err)
  });

  const fetchProduct = async () => {
    const response = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Blogs/id?id=${id}`);
    setBlog(response.data);
  };

  

  fetchProduct();

}, [id]);

useEffect(() => {
  fetch(`https://medinetaptech.azurewebsites.net/api/v1/BlogComments/blogId?blogId=${id}`)
    .then((response) => response.json())
    .then((data) => {
      setComments(data);
    });
},[id]);  

//ngay thang nam
      let createdAt = new Date(blog.createdAt);
      let day = createdAt.getDate();
      let month = createdAt.toLocaleString('default', { month: 'short' });
      let year = createdAt.getFullYear();

//gioi han chu
function truncate(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
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

// Hàm xử lý khi người dùng thay đổi comment
const handleCommentChange = (event) => {
  setComment(event.target.value);
};

// Hàm xử lý khi người dùng gửi comment
const submitComment = async () => {
  const commentData = {
    Comment: comment,
    CustomerId: userId,
    BlogId: blog.id,
  };

  try {
    await post('https://medinetaptech.azurewebsites.net/api/v1/BlogComments', commentData);
    toast.success('Comment submitted successfully');
    window.location.reload();
  } catch (error) {
    console.error('Failed to submit comment', error);
    toast.warning('Failed to submit comment');
  }
};
const [clinic, setClinic] = useState('');
  useEffect(() => {
    fetch("https://medinetaptech.azurewebsites.net/api/v1/Clinics/id?id=1")
      .then((response) => response.json())
      .then((data) => {
        setClinic(data);
      });
  
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
              <h1 className="title">{blog.title}</h1>
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
                  <span>{blog.title} </span>
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
    {/* sidebar */}
    <div className="sidebar ttm-sidebar-right ttm-bgcolor-white break-991-colum clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-9 content-area">
            {/* post */}
            
            <article className="post ttm-blog-classic clearfix">
              {/* post-featured-wrapper */}
              <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                <div className="ttm-post-featured">
                  <img
                    className="img-fluid"
                    src={blog.imageSrc}
                    alt=""
                  />
                </div>
                <div className="ttm-box-post-date">
                  <span className="ttm-entry-date">
                  <time className="entry-date" dateTime={blog.createdAt}>
        {day}
        <span className="entry-month">
          {month}<span className="entry-year">{year}</span>
        </span>
      </time>
                  </span>
                </div>
              </div>
              {/* post-featured-wrapper end */}
              {/* ttm-blog-classic-content */}
              <div className="ttm-blog-classic-content">
                <div className="post-meta">
                  <span className="ttm-meta-line byline">
                    <i className="ti ti-user" />
                    {blog.employee && blog.employee.full_Name}
                  </span>
                  <span className="ttm-meta-line cat-links">
  <i className="ti ti-folder" />
  {blog.disease ? blog.disease.name : ''}
</span>
<span className="ttm-meta-line comments-link">
  <i className="fa fa-comment" />  {blog.blogComments ? blog.blogComments.length : 0}  Comments
</span>
                  
                </div>
                <div className="entry-content">
                <p>
                    {blog.content}</p>
                  <h4>Modern Equipment</h4>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    sta.It has survived not only five centuries, but also the{" "}
                    <span className="tm-textcolor-skincolor">
                      <a href="#">leap into electronic typesetting,</a>
                    </span>{" "}
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets.Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry’s sta.It has survived not
                    only five centuries, but also the leap into electronic
                    typesetting has been the industry’s sta It has survived not
                    only five centuries.
                  </p>
                  <p>
                    <img
                      className="img-fluid alignleft"
                      src={blog.imageSrc}
                      alt=""
                    />
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don’t
                    look even slightly believable if you are going.
                  </p>
                  <p>
                    <strong>
                      “What’s happened to me?” he thought. It wasn’t a dream.
                      His room, a proper human”
                    </strong>{" "}
                    although a little too small, lay peacefully between its four
                  </p>
                  <p>
                    Cicero are also reproducmpanied by English versions from the
                    1914 translation by H. Raby Cicero are also reproducmpanied
                    by Enloons from The standard chunk of Lorem Ipsum used since
                    the 1500s is reproduced below for those interested. Sections
                    1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by
                    Cicero are also reproducmpanied by Enloons
                  </p>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from <u>There are many variations of passages of Lorem</u>{" "}
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal.
                  </p>
                  <h4>Individual Approach</h4>
                  <p>
                    Aenean ac erat nulla. Phasellus et dolor varius,{" "}
                    <b>fermentum nisi quis, blandit nunc.</b> Vestibulum eu
                    feugiat felis. Mauris ut aliquam dui, eget cursus velit. In
                    convallis quam vitae nulla auctor mollis. Nulla sit amet
                    mauris nisi. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Nullam quis eros maximus, fringilla arcu
                    sit amet, consequat purus. Donec dignissim venenatis velit,
                    non scelerisque sapien faucibus quis. Maecenas id urna
                    pulvinar, consectetur nibh ut, sodales ligula. Suspendisse –
                    eleifend tellus act &amp; orci dapibus, ac egestas enim
                    imperdiet. Vestibulum interdum ante non nisi dignissim
                    rhoncus. Nunc a sapien massa. Nulla facilisi.
                  </p>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="pb-15">
                        <img
                          className="img-fluid"
                          src={blog.imageSrc}

                          alt="blog-image"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="pb-15">
                        <img
                          className="img-fluid"
                          src={blog.imageSrc}

                          alt="blog-image"
                        />
                      </div>
                    </div>
                  </div>
                  <p>
                    Aenean ac erat nulla. Phasells. Maecenas id urna pulvinar,
                    consectetur nibh ut, sodales ligula. Suspendisse eleifend
                    tellus ac orci dapibus, ac egestas enim imperdiet.
                    Vestibulum interdum ante non nisi dignissim rhoncus. Nunc a
                    sapien massa. Nulla facilisi.
                  </p>
                  <h4>Example For You List</h4>
                  <ul>
                    <li>
                      <strong>Why do we use it</strong> It is a long established
                      fact that a reader will be distracted.
                    </li>
                    <li>
                      <strong>What is Lorem Ipsum</strong> Contrary to popular
                      belief, Lorem Ipsum is not simply.
                    </li>
                    <li>
                      <strong>Where does it come from</strong> randomised words
                      which don’t look even slightly believable.
                    </li>
                    <li>
                      <strong>Why do we use it</strong> It is a long established
                      fact that a reader will be distracted.
                    </li>
                  </ul>
                  <div className="ttm-blogbox-desc-footer">
                    <div className="ttm-social-share-wrapper">
                      <div className="ttm-social-share-title">Share Post</div>
                      <div className="social-icons circle">
                        <ul>
                          <li className="facebook-icon">
                            <a
                              href="https://www.facebook.com/preyantechnosys19"
                              rel="noopener"
                              aria-label="facebook"
                              target="_blank"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="twitter-icon">
                            <a
                              href="https://twitter.com/PreyanTechnosys"
                              rel="noopener"
                              aria-label="twitter"
                              target="_blank"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="pinterest-icon">
                            <a
                              href="https://in.pinterest.com/preyan_technosys/"
                              rel="noopener"
                              aria-label="pinterest"
                              target="_blank"
                            >
                              <i className="fa fa-pinterest-p" />
                            </a>
                          </li>
                          <li className="linkedin-icon">
                            <a
                              href="https://www.linkedin.com/in/preyan-technosys-pvt-ltd/"
                              rel="noopener"
                              aria-label="linkedin"
                              target="_blank"
                            >
                              <i className="fa fa-linkedin" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="ttm-post-prev-next-buttons">
                      <a
                        className="ttm-btn ttm-btn-size-sm ttm-btn-shape-square ttm-icon-btn-left ttm-btn-style-fill ttm-btn-color-skincolor mb-10"
                        href="#"
                      >
                        <i className="ti ti-angle-double-left" />
                        Previous
                      </a>
                    </div>
                  </div>
                  <div className="ttm-blog-classic-box-comment">
                    <div id="comments" className="comments-area">
                      
                      <ol className="comment-list">
                      {comments.map((comment) => (
  <li key={comment.id}>
    <div className="comment-body">
      <div className="comment-author vcard">
        <img
          src={comment.customer.imageSrc}
          className="avatar"
          alt={comment.customer.username}
        />
      </div>
      <div className="comment-box">
        <div className="comment-meta commentmetadata">
          <cite className="ttm-comment-owner">{comment.customer.username}</cite>
          <a href="#">{new Date(comment.createdAt).toLocaleString()}</a>
        </div>
        <div className="author-content-wrap">
          <p>{comment.comment}</p>
        </div>
        
      </div>
    </div>
  </li>
))}
                        
                      </ol>
                      <div className="comment-respond">
                        <h3 className="comment-reply-title">Leave a Comment</h3>
                        <form encType="multipart/form-data" method="post" id="commentform" className="comment-form">
      
      <p className="comment-form-comment">
        <textarea
          id="comment"
          placeholder="Comment"
          name="comment"
          cols={45}
          rows={8}
          aria-required="true"
          value={comment}
          onChange={handleCommentChange}
        />
      </p>
      <button type="button" onClick={submitComment} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Submit Feedback</button>

    </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ttm-blog-classic-content end */}
            </article>
            {/* post end */}
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
                    placeholder="Search …"
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
            </aside> */}
            
            <aside className="widget widget-recent-post">
              <h3 className="widget-title">Blog Related</h3>
              <ul className="widget-post ttm-recent-post-list">
              {blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((blog) => (
  <li key={blog.id}>
    <a href=''>
      <Link to={`/blogdetail/${blog.id}`}><img src={blog.imageSrc} alt="post-img" /></Link>
    </a>
    <span className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</span>

    <a href=''>
      <Link to={`/blogdetail/${blog.id}`}>{truncate(blog.title, 50)}</Link>
      
    </a>
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

export default BlogDetail;