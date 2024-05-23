import product2 from "~/assets/images/product/product-two.jpg"
import product3 from "~/assets/images/product/product-three.jpg"
import product4 from "~/assets/images/product/product-four.jpg"
import product7 from "~/assets/images/product/product-seven.jpg"
import product8 from "~/assets/images/product/product-eight.jpg"
import comment1 from "~/assets/images/blog/blog-comment-01.jpg"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import { post, del } from '~/utils/httpRequest'; 


function CoursesDetail({ products }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [imageFile, setImageFile] = useState(null); 
  const [vote, setVote] = useState(0);
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPerPage] = useState(2);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://localhost:7121/api/v1/Courses/id?id=${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);


  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`https://localhost:7121/api/v1/Feedbacks/productId?productId=${id}`);
        setFeedback(response.data);
      } catch (error) {
       
        console.error('Failed to fetch feedback', error);
      }
    };

    fetchFeedback();
  }, [id]);
  
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

  const userId = getTokenData();
  if (userId) {
    localStorage.setItem('userId', userId);
  }

  const addToCart = () => {
    const cartItem = {
        courseId: product.id,
        employeeId: userId,
    };
    axios.post('https://localhost:7121/api/v1/Enrollments', cartItem)
      .then(() => {
        toast.success('Product added to cart');
      })
      .catch(error => console.error(error));
  };


  

  // Hàm xử lý khi người dùng chọn hình ảnh
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
  };

  const handleVoteChange = (event) => {
    setVote(parseInt(event.target.value));
  };
  // const deleteFeedback = async (feedbackId) => {
  //   try {
  //     await del(`https://localhost:7121/api/v1/Feedbacks/id?id=${feedbackId}`);
  //     toast.success('Feedback deleted successfully');
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Failed to delete feedback', error);
  //     toast.error('Failed to delete feedback');
  //   }
  // };

  // Hàm xử lý khi người dùng thay đổi description
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Hàm xử lý khi người dùng gửi feedback
  const submitFeedback = async () => {
    const feedbackData = {
      Vote: vote,
      Description: description,
      CustomerId: userId,
      ProductId: product.id,
      ImagesFeedbackFile: imageFile // Hình ảnh feedback
    };

    try {
      await post('https://localhost:7121/api/v1/Feedbacks', feedbackData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Đảm bảo đúng loại nội dung cho việc tải lên tệp
        }
      });
      toast.success('Feedback submitted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Failed to submit feedback', error);
      toast.error('Failed to submit feedback');
    }
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fa fa-star" style={{ color: 'gold' }} />);
      } else {
        stars.push(<i key={i} className="fa fa-star" style={{ color: 'lightgray' }} />);
      }
    }
    return stars;
  };


  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedback = feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <h1 className="title">Single Courses Details</h1>
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
                <span>Single Courses Details</span>
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
                        // src={product.imageSrc}
                        src="https://localhost:7121/images/courses/fb6e6f4e-fd93-42c6-aeef-7370d426c2d7.jpg"
                        alt="product-img"
                      />
                    </div>
                   
                  </figure>
                </div>
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">{product.title}</h1>
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
                   
                    <button
                  
                      id="submit"
                      name="add-to-cart"
                      type="submit"
                      className="cart_button"
                      title="Submit now"
                    >
                      Register the course
                    </button>
                  </form>
                  <div className="add-to-wishlist yith-wcwl-add-to-wishlist">
                    <div className="product_meta">
                      
                      <span className="posted_in">
                        Category:
                        <a href="#" rel="tag">
                          Courses
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
                          Review for <span>{product.name}</span>
                        </h2>
                        <ol className="commentlist">
                          {currentFeedback.map((item, index) => (
                            <li  key={index} className="review">
                              <div className="comment_container">
                                {/* You can use product image here */}
                                <img
                                  className="avatar"
                                  src={comment1}
                                  alt="comment-img"
                                />
                                <div className="comment-text">
                                  <div className="star-rating">
                                    <span>
                                     {renderStars(item.vote)}
                                     
                                    </span>
                                  </div>
                                  <p className="meta">
                                    <strong className="eview__author">
                                      {item.customer.username}
                                    </strong>
                                    <span style={{margin:"0 7px"}} className="review__dash">–</span>
                                    <time style={{fontSize: 13}}
                                      className="woocommerce-review__published-date"
                                      dateTime={new Date().toISOString()}
                                    >
                                      {/* You can format date as needed */}
                                      {new Date().toDateString()}
                                    </time>
                                  </p>
                                  <div className="description">
                                    <p>
                                      {item.description}
                                    </p>
                                  </div>
                                
                                    <img style={{width: "100px"}}
                                      src={item.imagesSrc}
                                      alt="feedback-img"
                                    />
                               
                                </div>
                              </div>
                               {/* <button onClick={() => deleteFeedback(item.id)}>Delete Feedback</button> */}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="ttm-pagination text-center" style={{ display: "flex", justifyContent: "center" }}>

                        <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
                          {Array.from({length: Math.ceil(feedback.length / feedbackPerPage)}, (_, i) => i + 1).map((number) => (
                            <li key={number} className="page-item">
                              <a onClick={() => paginate(number)} href="#!" className="page-link" style={{ textDecoration: "none", color: "#000", padding: "5px 10px", border: "1px solid #ccc" }}>
                                {number}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div id="review_form_wrapper">
                        <div className="comment-respond">
                          <span style={{fontSize: 25}} className="comment-reply-title">
                            Add a review
                            
                          </span>
                          <form encType="multipart/form-data" style={{  margin: "auto" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                              <div style={{ flex: "1", marginRight: "20px" }}>
                                <label htmlFor="vote" style={{ display: "block" }}>Vote:</label>
                                <select id="vote" value={vote} onChange={handleVoteChange} style={{ padding: "11px 10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}>
                                  <option value="">Rate…</option>
                                  <option value={5}>Perfect</option>
                                  <option value={4}>Good</option>
                                  <option value={3}>Average</option>
                                  <option value={2}>Not that bad</option>
                                  <option value={1}>Very poor</option>
                                </select>
                              </div>
                              <div style={{ flex: "1" }}>
                                <label htmlFor="image" style={{ display: "block" }}>Image:</label>
                                <input type="file" id="image" onChange={handleImageChange} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc", width: "calc(100%)" }} />
                              </div>
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                              <label htmlFor="description">Description:</label>
                              <textarea type="text" id="description" value={description} onChange={handleDescriptionChange} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }} />
                            </div>
                            <button type="button" onClick={submitFeedback} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Submit Feedback</button>
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
              <h3 className="widget-title">Featured Courses</h3>
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

export default CoursesDetail;