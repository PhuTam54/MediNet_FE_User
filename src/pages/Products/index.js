import product1 from "~/assets/images/product/product-one.jpg"
import product2 from "~/assets/images/product/product-two.jpg"
import product3 from "~/assets/images/product/product-three.jpg"
import product4 from "~/assets/images/product/product-four.jpg"
import product5 from "~/assets/images/product/product-five.jpg"
import product6 from "~/assets/images/product/product-six.jpg"
import product7 from "~/assets/images/product/product-seven.jpg"
import product8 from "~/assets/images/product/product-eight.jpg"
import product9 from "~/assets/images/product/product-nine.jpg"
import product10 from "~/assets/images/product/product-ten.jpg"
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link ,useLocation} from 'react-router-dom';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Products() {
  const [productsBuyQty, setProductsBuyQty] = useState(0);
  const [products, setProducts] = useState([]);
  const [categoryParents, setCategoryParents] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [search, setSearch] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const ProductsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
const [selectedCategory, setSelectedCategory] = useState(null);

  
 
const query = useQuery();


useEffect(() => {
  const categoryChildId = query.get("categoryChild");
  axios.get(`https://localhost:7121/api/v1/Products/categoryChildId?categoryChildId=${categoryChildId}`)
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}, []);

useEffect(() => {
  let filteredProducts = products;

  if (selectedManufacturer) {
    filteredProducts = filteredProducts.filter(product => product.manufacturer === selectedManufacturer);
  }

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }

  setDisplayedProducts(filteredProducts);
}, [products, selectedManufacturer, selectedCategory]);
  // Now you can use these variables in your code
  

  

  useEffect(() => {
    axios
  .get('https://localhost:7121/api/v1/Products')
  .then((response) => {
    setProducts(response.data);
    const manufacturers = [...new Set(response.data.map(product => product.manufacturer))];
    setManufacturers(manufacturers);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
  axios
  .get('https://localhost:7121/api/v1/Products/buyQty')
  .then((response) => {
    setProductsBuyQty(response.data);
    
    
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
    axios.get('https://localhost:7121/api/v1/CategoryParents')
    .then(res => {
      setCategoryParents(res.data)
    })
    .catch(err => {
        console.log(err)
    });

}, []) ;
const filterByCategoryParent = (categoryParentId) => {
  axios
    .get(`https://localhost:7121/api/v1/Products/categoryParentId?categoryParentId=${categoryParentId}`)
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error('Error fetching products by category:', error);
    });
};
const filterByCategory = (categoryId) => {
  axios
    .get(`https://localhost:7121/api/v1/Products/categoryId?categoryId=${categoryId}`)
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error('Error fetching products by category:', error);
    });
};
const filterByCategoryChild = (categoryChildId) => {
  axios
    .get(`https://localhost:7121/api/v1/Products/categoryChildId?categoryChildId=${categoryChildId}`)
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error('Error fetching products by category:', error);
    });
};



useEffect(() => {
  let filteredProducts = products;

  if (selectedManufacturer) {
    filteredProducts = filteredProducts.filter(product => product.manufacturer === selectedManufacturer);
  }

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }

  // Thêm lọc sản phẩm dựa trên giá trị tìm kiếm
  if (search) {
    filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
  }

  setDisplayedProducts(filteredProducts);
}, [products, selectedManufacturer, selectedCategory, search]); // Thêm search vào mảng dependencies


const handleSortChange = (event) => {
  const sortValue = event.target.value;
  let sortedProducts;

  if (sortValue === 'price') {
    sortedProducts = [...displayedProducts].sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    sortedProducts = [...displayedProducts].sort((a, b) => b.price - a.price);
  } else if (sortValue === 'default') {
    sortedProducts = getDefaultList(); // This function should return the default list
  } else {
    sortedProducts = [...displayedProducts];
  }

  setDisplayedProducts(sortedProducts);
};
function getDefaultList() {
  
  return [...products];
}
//giới hạn kí tự of tên
function truncate(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

const indexOfFirstItem = (currentPage - 1) * ProductsPerPage;
const indexOfLastItem = indexOfFirstItem + ProductsPerPage;

const productsToShow = displayedProducts.slice(indexOfFirstItem, indexOfLastItem);
const handleClick = (pageNumber) => {
  setCurrentPage(pageNumber);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
// This function should be called whenever you perform a filter operation
const handleFilter = (filterCriteria) => {
  // Reset the current page
  setCurrentPage(1);

  // Perform the filter operation (this is just a placeholder, replace it with your actual filter logic)
  const filteredProducts = products.filter(product => product.criteria === filterCriteria);

  // Update the products state
  setProducts(filteredProducts);
};
//hover dropdown
const [isHovered, setIsHovered] = useState(Array(categoryParents.length).fill(false));
const [isHoveredCategory, setIsHoveredCategory] = useState(null);
//


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
              <h1 className="title">Products</h1>
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
                <span>Products</span>
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
  {/* dropdowncategoryparent */}
  
  {/*site-main start*/}
  <div className="site-main" >
    
    {/* sidebar */}
    <div className="sidebar ttm-sidebar-right ttm-bgcolor-white clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
        <div className="col-lg-9 content-area" style={{ position: 'relative' }}>
  <nav style={{ position: 'absolute', top: '0', zIndex: 9999 }}>
  <ul className="dropdown" style={{ 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden', 
      display: 'flex',
      position: 'relative',
      zIndex:1000
    }}>

      
      <li 
    style={{ 
      float: 'left', 
      listStyleType: 'none' 
    }} 
    
  >
    <a href="#0" style={{ 
      display: 'block', 
      textAlign: 'center', 
      padding: '14px 16px', 
      textDecoration: 'none' 
    }}
    onClick={(e) => {
      e.preventDefault();
      axios
        .get('https://localhost:7121/api/v1/Products')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }}
    
    >
      All
    </a>
    
    
  </li>
      {categoryParents.map((categoryParent, index) => (
        <li 
          style={{ 
            float: 'left', 
            listStyleType: 'none' 
          }} 
          onMouseEnter={() => setIsHovered(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          })} 
          onMouseLeave={() => setIsHovered(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
          })}
          onClick={(e) => {
            e.preventDefault();
           
            
          }}
        >
          <a href="#0" style={{ 
            display: 'block', 
            
            textAlign: 'center', 
            padding: '14px 16px', 
            textDecoration: 'none' 
          }}
          onClick={(e) => {
            e.preventDefault();
            filterByCategoryParent(categoryParent.id);
          }}
          
          >
            {categoryParent.name}
          </a>
          <ul style={{ 
  display: isHovered[index] ? 'block' : 'none',
  backgroundColor: '#f9fafa' 
}}>
  {categoryParent.categories.map((category) => (
    <li 
    style={{ 
      listStyleType: 'none' // Apply to <li> instead of <ul>
    }}
    onMouseEnter={() => setIsHoveredCategory(category.id)}
    onMouseLeave={() => setIsHoveredCategory(null)}
    
  >
    <a href="#"
    onClick={(e) => {
      e.preventDefault();
      filterByCategory(category.id);
    }}
    >{category.name}</a>
    {isHoveredCategory === category.id && (
      <ul style={{ 
        display: 'block',
        backgroundColor: '#f9fafa' 
      }}>
        {category.categoryChilds.map((child) => (
          <li style={{ 
            listStyleType: 'none' // Apply to <li> instead of <ul>
            
          }}
          
          >
            <a href="#"
            onClick={(e) => {
              e.preventDefault();
              filterByCategoryChild(child.id);
            }}
            >{child.name}</a>
          </li>
          
        ))}
      </ul>
    )}
  </li>
  ))}
</ul>
        </li>
        
        
      ))}
      
    </ul>
</nav>
<p className="products-result-count"></p>

            <form className="products-ordering" method="get">
              <div className="orderby">
              <select name="orderby" className="select2-hidden-accessible" onChange={handleSortChange}>
  
              <option value="default">Default</option>
  <option value="price">Sort by price: low to high</option>
  <option value="price-desc">Sort by price: high to low</option>
</select>
              </div>
            </form>
            <div className="products row">
              {/* product */}
              {productsToShow.map((product, index) => (
                <div key={index} className="product col-md-4 col-sm-6 col-xs-12">
                  
                    <div className="ttm-product-box">
                      {/* ttm-product-box-inner */}
                      <div className="ttm-product-box-inner">
                        <div className="ttm-shop-icon">
                          <div className="product-btn">
                            <a href="#" className="add-to-cart-btn">
                              <i className="ti ti-shopping-cart" />
                            </a>
                          </div>
                          <div className="product-btn">
                            <a href="#" className="search-btn">
                              <i className="ti ti-search" />
                            </a>
                          </div>
                          <div className="product-btn">
                            <a href="#" className="wishlist-btn">
                              <i className="ti ti-heart" />
                            </a>
                          </div>
                        </div>
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
                              20.00
                            </span>
                          </del>
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
            <div className="col-lg-12">
      <div className="ttm-pagination text-center">
      <a className="next page-numbers" href="#" onClick={() => handleClick(currentPage - 1)}>
          <i className="ti ti-arrow-left " />
        </a>
        {[...Array(Math.ceil(products.length / ProductsPerPage))].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={pageNumber}
              aria-current="page"
              className={`page-numbers ${currentPage === pageNumber ? 'current' : ''}`}
              onClick={() => handleClick(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        })}
        <a className="next page-numbers" href="#" onClick={() => handleClick(currentPage + 1)}>
          <i className="ti ti-arrow-right" />
        </a>
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
            </aside>
            <aside className="widget products top-rated-products">
              <h3 className="widget-title">Featured Products</h3>
              <ul className="product-list-widget">
              {Array.isArray(productsBuyQty) && productsBuyQty.slice(0,3).map(productbuyqty  => (
    <li>
      <a>
        <Link to={`/productdetail/${productbuyqty.id}`}>
          <img src={productbuyqty.imageSrc} alt="" />
          <span className="product-title">{productbuyqty.name}</span>
        </Link>
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
        <span className="product-Price-currencySymbol">$</span>{productbuyqty.price}.00
      </span>
    </li>
))}
              </ul>
            </aside>
            
            <aside className="widget widget-categories">
              <h3 className="widget-title">Manufacturers</h3>
              <ul>
              <li>
  <a
    href="#0"
    className="clear-check"
    onClick={(e) => {
      e.preventDefault();
      setSelectedManufacturer(null); // Reset the selected manufacturer
    }}
  >
    All
  </a>
</li>
              {manufacturers.map((manufacturer, index) => (

  <li key={index}>
    <a
      href="#0"
      onClick={(e) => {
        e.preventDefault();
        setSelectedManufacturer(manufacturer);
      }}
    >
      {manufacturer}
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

export default Products;