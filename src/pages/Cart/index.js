import product1 from "~/assets/images/product/product-one.jpg"
import product2 from "~/assets/images/product/product-two.jpg"
import product3 from "~/assets/images/product/product-three.jpg"
function Cart() {
    return ( 
        <>
  {/* page-title */}
  <div className="ttm-page-title-row">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Cart</h1>
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
                  <span>Cart</span>
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
    {/* cart-section */}
    <section className="ttm-row cart-section break-991-colum clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-12">
            {/* ttm-cart-form */}
            <form className="ttm-cart-form" action="#" method="post">
              <table className="shop_table shop_table_responsive">
                <thead>
                  <tr>
                    <th className="product-remove">&nbsp;</th>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cart_item">
                    <td className="product-remove">
                      <a href="#" className="remove">
                        ×
                      </a>
                    </td>
                    <td className="product-thumbnail">
                      <a href="product-details.html">
                        <img
                          className="img-fluid"
                          src={product1}
                          alt="product-img"
                        />
                      </a>
                    </td>
                    <td className="product-name" data-title="Product">
                      <a href="product-details.html">Stethoscope</a>
                    </td>
                    <td className="product-price" data-title="Price">
                      <span className="Price-amount">
                        <span className="Price-currencySymbol">$</span>18.00
                      </span>
                    </td>
                    <td className="product-quantity" data-title="Quantity">
                      <div className="quantity">
                        <input
                          type="number"
                          className="input-text"
                          defaultValue={1}
                          min={0}
                          title="Qty"
                          size={4}
                        />
                      </div>
                    </td>
                    <td className="product-subtotal" data-title="Total">
                      <span className="Price-amount">
                        <span className="Price-currencySymbol">$</span>18.00
                      </span>
                    </td>
                  </tr>
                  <tr className="cart_item">
                    <td className="product-remove">
                      <a href="#" className="remove">
                        ×
                      </a>
                    </td>
                    <td className="product-thumbnail">
                      <a href="product-details.html">
                        <img
                          className="img-fluid"
                          src={product2}
                          alt="product-img"
                        />
                      </a>
                    </td>
                    <td className="product-name" data-title="Product">
                      <a href="product-details.html">Panthenol</a>
                    </td>
                    <td className="product-price">
                      <span className="Price-amount" data-title="Price">
                        <span className="Price-currencySymbol">$</span>18.00
                      </span>
                    </td>
                    <td className="product-quantity" data-title="Quantity">
                      <div className="quantity">
                        <input
                          type="number"
                          className="input-text"
                          defaultValue={1}
                          min={0}
                          title="Qty"
                          size={4}
                        />
                      </div>
                    </td>
                    <td className="product-subtotal" data-title="Total">
                      <span className="Price-amount">
                        <span className="Price-currencySymbol">$</span>18.00
                      </span>
                    </td>
                  </tr>
                  <tr className="cart_item">
                    <td className="product-remove">
                      <a href="product-details.html" className="remove">
                        ×
                      </a>
                    </td>
                    <td className="product-thumbnail">
                      <a href="product-details.html">
                        <img
                          className="img-fluid"
                          src={product3}
                          alt="product-img"
                        />
                      </a>
                    </td>
                    <td className="product-name" data-title="Product">
                      <a href="product-details.html">Syringe 5ml</a>
                    </td>
                    <td className="product-price" data-title="Price">
                      <span className="Price-amount">
                        <span className="Price-currencySymbol">$</span>2.00
                      </span>
                    </td>
                    <td className="product-quantity" data-title="Quantity">
                      <div className="quantity">
                        <label className="screen-reader-text">Quantity</label>
                        <input
                          type="number"
                          className="input-text"
                          defaultValue={1}
                          min={0}
                          title="Qty"
                          size={4}
                        />
                      </div>
                    </td>
                    <td className="product-subtotal" data-title="Total">
                      <span className="Price-amount">
                        <span className="Price-currencySymbol">$</span>2.00
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className="actions">
                      <div className="coupon">
                        <input
                          type="text"
                          name="coupon_code"
                          className="input-text"
                          defaultValue=""
                          placeholder="Coupon code"
                        />
                        <button
                          type="submit"
                          className="button"
                          name="apply_coupon"
                          value="Apply coupon"
                        >
                          Apply coupon
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="button"
                        name="update_cart"
                        value="Update cart"
                        disabled="disabled"
                      >
                        Update cart
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            {/* ttm-cart-form end */}
            {/* cart-collaterals */}
            <div className="cart-collaterals">
              <div className="cart_totals ">
                <h2>Cart totals</h2>
                <table className="shop_table shop_table_responsive">
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td data-title="Subtotal">
                        <span className="Price-amount">
                          <span className="Price-currencySymbol">$</span>38.00
                        </span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th>Total</th>
                      <td data-title="Total">
                        <strong>
                          <span className="Price-amount">
                            <span className="Price-currencySymbol">$</span>38.00
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-to-checkout">
                  <a href="#" className="checkout-button button">
                    Proceed to checkout
                  </a>
                </div>
              </div>
            </div>
            {/* cart-collaterals end*/}
          </div>
        </div>
      </div>
    </section>
    {/* cart-section end*/}
  </div>
  {/*site-main end*/}
</>

     );
}

export default Cart;