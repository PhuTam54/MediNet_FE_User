import comment1 from "~/assets/images/blog/blog-comment-01.jpg"
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import { post, del } from '~/utils/httpRequest'; 
function ProductDetail({  }) {
  const [products, setProducts] = useState([]);
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
    axios.get('https://localhost:7121/api/v1/Products')
    .then(res => {
      setProducts(res.data)
    })
    .catch(err => {
        console.log(err)
    });
    const fetchProduct = async () => {
      const response = await axios.get(`https://localhost:7121/api/v1/Products/id?id=${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);
  const currentProductCategoryChildId = product.categoryChildId;
  //feedback
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
  // add to cart


  const addToCart = () => {
    const cartItem = {
      qtyCart: quantity,
      productID: product.id,
      customerID: userId,
      clinicID: 1
    };

    axios.post('https://localhost:7121/api/v1/Carts', cartItem)
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
// tab thong tin
const [activeTab, setActiveTab] = useState('Description');

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
              <h1 className="title">Single Product Details</h1>
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
                <span>Single Product Details</span>
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
                        src={product.imageSrc}
                        alt="product-img"
                      />
                    </div>
                   
                  </figure>
                </div>
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">{product.name}</h1>
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
  <table style={{ border: '1px solid transparent' }}>
    <tbody>
      <tr style={{ border: '1px solid transparent' }}>
        <th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Description:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>{product.description}</td>
      </tr>
      <tr style={{ border: '1px solid transparent' }}>
<th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Category:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>
        {product.categoryChild && product.categoryChild.name && (
  <a href={`/Products?categoryChild=${product.categoryChild.id}`} rel="tag">
    {product.categoryChild.name}
  </a>
)}
        </td>
      </tr>
      <tr style={{ border: '1px solid transparent' }}>
        <th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Manufacturer:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>{product.manufacturer}</td>
      </tr>
    </tbody>
  </table>
</div>
                  
                  <div className="add-to-wishlist yith-wcwl-add-to-wishlist">
                    <div className="product_meta">
                      
                    </div>
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
                    <div className="quantity">
                      <label className="screen-reader-text">Quantity</label>
                      <input
                        type="number"
                        id="quantity_5c357ca137d75"
                        className="input-text qty text"
                        step={1}
                        min={1}
                        max={50}
                        name="quantity"
                        defaultValue={1}
                        title="Qty"
                        size={4}
                        value={quantity} onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <button
                      id="submit"
                      name="add-to-cart"
                      type="submit"
                      className="cart_button"
                      title="Submit now"
                    >
                      Add to cart
                    </button>
                  </form>
                </div>
              </div>
              <div className="ttm-tabs tabs-for-single-products" data-effect="fadeIn">
      <ul className="tabs clearfix">
      <li className="tab" onClick={(event) => {event.preventDefault(); setActiveTab('Description');}}>
  <a href="#">Description</a>
</li>
<li className="tab" onClick={(event) => {event.preventDefault(); setActiveTab('Additional information');}}>
  <a href="#">Additional information</a>
</li>
<li className="tab" onClick={(event) => {event.preventDefault(); setActiveTab('Reviews');}}>
  <a href="#">Reviews (1)</a>
</li>
      </ul>
      <div className="content-tab ttm-bgcolor-white">
        {activeTab === 'Description' && (
<div className="content-inner">
          {product && Array.isArray(product.productDetails) && product.productDetails.map((detail, index) => (
            <div key={index}>
              <h2>Description</h2>
              <p> {detail.description}</p>
            </div>
          ))}
        </div>
        )}
        {activeTab === 'Additional information' && (
  <div className="content-inner">
    {product && Array.isArray(product.productDetails) && product.productDetails.map((detail, index) => (
      <div key={index}>
        <h2>Ingredient</h2>
        <p> {detail.ingredient}</p>
        <h2>Usage</h2>
        <p> {detail.usage}</p>
        <h2>Usage Instructions</h2>
        <p> {detail.usageInstructions}</p>
        <h2>Side Effects</h2>
        <p>{detail.sideEffects}</p>
        <h2>Precautions</h2>
        <p> {detail.precautions}</p>
        <h2>Storage</h2>
        <p> {detail.storage}</p>
      </div>
    ))}
  </div>
)}
        {activeTab === 'Reviews' && (
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
        )}
      </div>
    </div>
            </div>
          </div>
          <div className="col-lg-3 widget-area sidebar-right ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-grey">
            <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
            
            <aside className="widget products top-rated-products">
  <h3 className="widget-title">Related Products</h3>
  <ul className="product-list-widget">
  {products
    .filter(product => product.categoryChildId === currentProductCategoryChildId && product.id !== Number(id))
    .slice(0, 3)
    .map(product => (
      <li>
        <a>
          <Link to={`/productdetail/${product.id}`}>
            <img src={product.imageSrc} alt="" />
            <span className="product-title">{product.name}</span>
          </Link>
        </a>
        <div className="star-ratings">
          {/* Star ratings content goes here */}
        </div>
        <span className="product-Price-amount amount">
          <span className="product-Price-currencySymbol">$</span>{product.price}.00
        </span>
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

export default ProductDetail;