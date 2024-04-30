
import product1 from "~/assets/images/product/product-one.jpg"
import product2 from "~/assets/images/product/product-two.jpg"
function EmailThankyou() {
    return ( 
        <>
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
  <p>Thank you for your purchase!</p>
</div>
          <div className="col-lg-3 widget-area sidebar-right ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-grey">
  <h2>Buyer Information</h2>
  <table style={{width: '100%', marginBottom: '1rem', color: '#212529'}}>
    <tbody>
      <tr>
        <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Name</th>
        <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>John Doe</td>
      </tr>
      <tr>
        <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Phone Number</th>
        <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>123-456-7890</td>
      </tr>
      <tr>
        <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Email</th>
        <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>johndoe@example.com</td>
      </tr>
      <tr>
        <th style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>Address</th>
        <td style={{padding: '0.75rem', verticalAlign: 'top', borderTop: '1px solid #dee2e6'}}>123 Main St, Anytown, USA</td>
      </tr>
    </tbody>
  </table>
</div></>
     );
}

export default EmailThankyou;