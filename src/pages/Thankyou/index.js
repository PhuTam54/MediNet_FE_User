import React, { useEffect, useState } from 'react';
function Thankyou() {
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  useEffect(() => {
    // Lấy thông tin từ localStorage
    const storedCheckoutInfo = localStorage.getItem('checkoutInfo');
    if (storedCheckoutInfo) {
      const checkoutData = JSON.parse(storedCheckoutInfo);
      setCheckoutInfo(checkoutData);
    }
  }, []);


  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    const storedTotalAmount = localStorage.getItem('totalAmount');

    setOrderId(storedOrderId);
    setTotalAmount(storedTotalAmount);
  }, []);
    return ( 
        <>
            <div className="ttm-page-title-row">
              <div className="ttm-page-title-row-bg-layer ttm-bg-layer" />
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="title-box ttm-textcolor-white">
                      <div className="page-title-heading">
                        <h1 className="title">Thankyou</h1>
                        <p>Thank you for your order!</p>
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
                          <span>Thankyou</span>
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
        {checkoutInfo && (
          <div className="site-main" style={{paddingBottom: '50px',paddingTop: '30px' }}>
            {/* sidebar */}
            <div className="sidebar ttm-sidebar-right ttm-bgcolor-white clearfix">
              <div className="container">
                {/* row */}
                <div className="row">
                <div className="col-lg-9 content-area">
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
            {checkoutInfo.productsInfo.map((product, index) => (
              <tr key={index}>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{orderId}</td>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{product.name}</td>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}><img src={product.imageSrc} alt={product.name} style={{width: '50px', height: '50px'}} /></td>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{product.qtyCart}</td>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>${product.price}</td>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>${product.subTotal}</td>
              </tr>
            ))}

              <tr>
                <td colSpan="5" style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Total</td>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>${totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <p>Thank you for your purchase!</p>
          <a href="/emailthankyou">Email</a>
        </div>
                  <div className="col-lg-3 widget-area sidebar-right ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-grey">
          <h2>Buyer Information</h2>
          <table style={{width: '100%', marginBottom: '1rem', color: '#212529'}}>
            <tbody>
              <tr>
                <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Name</th>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{checkoutInfo.orderInfo.name}</td>
              </tr>
              <tr>
                <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Phone Number</th>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{checkoutInfo.orderInfo.tel}</td>
              </tr>
              <tr>
                <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Email</th>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{checkoutInfo.orderInfo.email}</td>
              </tr>
              <tr>
                <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Address</th>
                <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>{checkoutInfo.orderInfo.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
                </div>
                {/* row end */}
              </div>
            </div>
            {/* sidebar end */}
          </div>
        )}
        </>
     );
}

export default Thankyou;