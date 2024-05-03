




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
import comment1 from "~/assets/images/blog/blog-comment-01.jpg"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
function MyOrder() {


    return ( 
        <>
            <div className="ttm-page-title-row">
              <div className="ttm-page-title-row-bg-layer ttm-bg-layer" />
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="title-box ttm-textcolor-white">
                      <div className="page-title-heading">
                        <h1 className="title">My Order</h1>
                        
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
                          <span>My Order</span>
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

        <div className="site-main" style={{paddingBottom: '50px',paddingTop: '30px' }}>
            {/* sidebar */}
        <div className="sidebar ttm-sidebar-right ttm-bgcolor-white clearfix">
        <div className="container">
            {/* row */}
            
            <div style={{marginTop: 50}}>
                <h2>Order Details</h2>
                <table style={{width: '100%', marginBottom: '1rem', color: '#212529'}}>
                <thead>
                <tr>
                    <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Order ID</th>
                    <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Name</th>
                    <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Image</th>
                    <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Quantity</th>
                    <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Price</th>
                    <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Total</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>1</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Product 1</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}><img src={product1} alt="Product 1" style={{width: '50px', height: '50px'}} /></td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>2</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>$100</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>$200</td>
                </tr>
                <tr>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>2</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Product 2</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}><img src={product2} alt="Product 2" style={{width: '50px', height: '50px'}} /></td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>1</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>$150</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>$150</td>
                </tr>

                <tr>
                    <td colSpan="5" style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Total</td>
                    <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>$350</td>
                </tr>
                </tbody>
                </table>
   
            </div>

            </div>
            {/* row end */}
        </div>
        </div>
  
 
</>

     );
}

export default MyOrder;