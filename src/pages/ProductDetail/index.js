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
  const [productDetail, setProductDetail] = useState([]);
  const [stockQuantity, setStockQuantity] = useState(0);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [imageFile, setImageFile] = useState(null); 
  const [vote, setVote] = useState(0);
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPerPage] = useState(2);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [averageStars, setAverageStars] = useState(0);
const [totalFeedback, setTotalFeedback] = useState(0);

useEffect(() => {
  axios.get('https://medinetaptech.azurewebsites.net/api/v1/Products')
  .then(res => {
    setProducts(res.data)
  })
  .catch(err => {
      console.log(err)
  });

  const fetchProduct = async () => {
    const response = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Products/id?id=${id}`);
    setProduct(response.data);
  };

  const fetchProductDetails = async () => {
    const response = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/ProductDetails/productId?productId=${id}`);
    setProductDetail(response.data);
  };

  fetchProduct();
  fetchProductDetails();
}, [id]);
  const currentProductCategoryChildId = product.categoryChildId;
  //feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Feedbacks/productId?productId=${id}`);
        setTotalFeedback(response.data.length);
        // Calculate average star rating
     const totalStars = response.data.reduce((total, feedback) => total + feedback.vote, 0);
     const averageStars = totalStars / response.data.length;
     setAverageStars(averageStars);
        setFeedback(response.data);
        setTotalFeedback(response.data.length);
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
  // Kiểm tra xem người dùng đã chọn phòng khám chưa
  if (!selectedClinic) {
    toast.error('Please select a clinic');
    return;
  }

  // Kiểm tra xem số lượng muốn mua có vượt quá số lượng trong kho không
  if (quantity > stockQuantity) {
    toast.error('The quantity exceeds the available stock quantity!');
    return;
  }

  const cartItem = {
    qtyCart: quantity,
    productID: product.id,
    customerID: userId,
    clinicID: selectedClinic
  };

  console.log(cartItem);

  axios.post('https://medinetaptech.azurewebsites.net/api/v1/Carts', cartItem)
    .then(() => {
      toast.success('Product added to cart');
    })
    .catch(error => console.error(error));
};


  const addToFavorites = async (product) => {
    try {
      // Fetch the token from local storage
      const token = localStorage.getItem('token');
  
      // Get the current list of favorite products
      const favoritesResponse = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/FavoriteProducts/customerId?customerId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the product is already in the favorites
      const isAlreadyFavorited = favoritesResponse.data.some(favProduct => favProduct.productId === product.id);
  
      if (isAlreadyFavorited) {
        toast.error('This product is already in your favorites!');
        return;
      }
  
      const favoriteProduct = {
        customerId: userId, // Assuming userId is defined in your component
        productId: product.id
      };
  
      const response = await axios.post('https://medinetaptech.azurewebsites.net/api/v1/FavoriteProducts', favoriteProduct, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      toast.success('Product added to favorites');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to favorites');
    }
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
  //     await del(`https://medinetaptech.azurewebsites.net/api/v1/Feedbacks/id?id=${feedbackId}`);
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
      await post('https://medinetaptech.azurewebsites.net/api/v1/Feedbacks', feedbackData, {
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

useEffect(() => {
  // Fetch clinics
  const fetchClinics = async () => {
    try {
      const response = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/Clinics/productId?productId=${id}`);
      setClinics(response.data);
    } catch (error) {
      console.error('Failed to fetch clinics', error);
    }
  };

  fetchClinics();
}, [id]);


const [clinic, setClinic] = useState('');
  useEffect(() => {
    fetch("https://medinetaptech.azurewebsites.net/api/v1/Clinics/id?id=1")
      .then((response) => response.json())
      .then((data) => {
        setClinic(data);
      });

  }, []);


// open modal image
const openModal = (imageSrc) => {
  setSelectedImage(imageSrc);
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};
//modal image
const nextImage = () => {
  setCurrentImageIndex((currentImageIndex + 1) % productDetail[0].imagesSrc.length);
};

const prevImage = () => {
  setCurrentImageIndex((currentImageIndex - 1 + productDetail[0].imagesSrc.length) % productDetail[0].imagesSrc.length);
};


const fetchStockQuantity = async (productId, clinicId) => {
  try {
    const response = await axios.get(`https://medinetaptech.azurewebsites.net/api/v1/InStocks/productIdAndClinicId?productId=${productId}&clinicId=${clinicId}`);
    setStockQuantity(response.data.stockQuantity);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (selectedClinic) {
    fetchStockQuantity(product.id, selectedClinic);
  }
}, [selectedClinic]);

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
                  <div className="product-gallery" style={{marginBottom:'200px'}}>
                  <div className="product-gallery__image" style={{ display: 'flex', justifyContent: 'space-between' }} >
    {productDetail && productDetail[0] && productDetail[0].imagesSrc && productDetail[0].imagesSrc.slice(0, 3).map((image, index) => (
        <div style={{ position: 'relative', flex: 1, margin: '3px' }}>
            <img
                className="img-fluid"
                src={image}
                alt={`product-img-${index + 1}`}
                style={{ border: '2px solid #e4e8ed', width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px'}}
                onClick={() => openModal(image)}
                key={index}
            />
            {index === 2 && productDetail[0].imagesSrc.length > 3 && (
                <div 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',borderRadius: '10px' }}
                    onClick={() => openModal(image)}
                >
                    Xem thêm ảnh
                </div>
            )}
        </div>
    ))}
</div>

</div>

                </div>
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">{product.name}</h1>
                  <div className="product-rating clearfix">
                  <div className="star-rating">
  <span>
    {renderStars(averageStars)}
  </span>
</div>
                    <a href="#reviews" className="review-link" rel="nofollow">
                      (<span className="count">{totalFeedback}</span> customer review{totalFeedback > 1 ? 's' : ''})                    
                    </a>
                  </div>
<p className="price">
                    
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
      <tr style={{ border: '1px solid transparent' }}>
        <th style={{ border: '1px solid transparent', verticalAlign: 'top' }}>Description:</th>
        <td style={{ border: '1px solid transparent', verticalAlign: 'top' }}>{product.description}</td>
      </tr>
    </tbody>
  </table>
</div>
                  
<label htmlFor="clinic">Select Clinic: </label>
        <select
          id="clinic"
          value={selectedClinic}
          onChange={(e) => setSelectedClinic(e.target.value)}
        >
          <option value="">Select a clinic</option>
          {clinics.map(clinic => (
            <option key={clinic.id} value={clinic.id}>{clinic.name} - {stockQuantity || '0'} Quantity</option>
          ))}
        </select>
                  <div className="add-to-wishlist yith-wcwl-add-to-wishlist">
                    <div className="product_meta">
                      
                    </div>
                  </div>
                  <div style={{display: "flex"}}>

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
                    <form style={{marginLeft: "10px"}}
                      className="cart"
                      action="#"
                      method="post"
                      encType="multipart/form-data"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addToFavorites(product);
                      }}
                    >
                      <button
                        type="submit"
                        className="cart_button"
                      >
                        <i class="fa-solid fa-heart"></i>
                      </button>
                    </form>
                  </div>
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
<a href="#">Reviews ({totalFeedback})</a>
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
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <span

                            key={index}
                            onClick={() => setVote(index + 1)}
                            style={{
                              fontSize: "30px",
                              cursor: 'pointer',
                              color: index < vote ? 'gold' : 'lightgray',
                            }}
                          >
                            ★
                          </span>
                        ))}
                       
                      </div>

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
  {modalIsOpen && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: modalIsOpen ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: '0px', left: 0, right: 0, bottom: '', zIndex: 1000000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    <div style={{width: '60%', height: '100%', padding: 30, paddingLeft: 70, paddingRight: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: "black", padding: 10 }}>
        <i style={{ fontSize: 18}} className="fa-solid fa-xmark"></i>
      </button>

      <h5 style={{paddingBottom:'50px'}}>{product.name}</h5>
     
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <button onClick={prevImage} style={{backgroundColor:"#01d6a3", borderRadius: '50%'}}><i className="ti ti-arrow-left" /></button>
  <div style={{ width: '500px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
    <img
      src={productDetail[0].imagesSrc[currentImageIndex]}
      alt="Selected"
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        border: '2px solid #e4e8ed',
        borderRadius: '10px',
        margin: '3px'
      }}
    />
  </div>
  <button onClick={nextImage} style={{backgroundColor:"#01d6a3", borderRadius: '50%'}}><i className="ti ti-arrow-right" /></button>
</div>
    </div>
    

  </div>
)}

</>

     );
}

export default ProductDetail;
