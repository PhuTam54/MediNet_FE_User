import paypal from '~/assets/images/paypal.png';
function Checkout() {
    return ( 
        <>
  {/* page-title */}
  <div className="ttm-page-title-row">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Checkout</h1>
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
                  <span>Checkout</span>
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
    {/* checkout-section */}
    <section className="ttm-row checkout-section break-991-colum clearfix">
      <div className="container">
        {/* row */}
        <div className="row">
          <div className="col-lg-12">
            <div className="ttm-form-coupon-toggle">
              <div className="ttm-form-coupon-info">
                Have a coupon?{" "}
                <a href="#" className="showcoupon">
                  Click here to enter your code
                </a>
              </div>
            </div>
            <form
              name="checkout"
              method="post"
              className="checkout row"
              action="#"
            >
              <div className="col-lg-6">
                <div className="billing-fields">
                  <h3>Billing details</h3>
                  <p className="form-row">
                    <label>
                      First name&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-tex"
                      name="billing_first_name"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Last name&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-text "
                      name="billing_last_name"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Company name&nbsp;
                      <span className="optional">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="input-text "
                      name="billing_company"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Country&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <select
                      name="billing_country"
                      className="country_to_state country_select"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <option value="">Select a country…</option>
                      <option value="AX">Åland Islands</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                    </select>
                  </p>
                  <p className="form-row">
                    <label>
                      Street address&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-text"
                      name="billing_address_1"
                      placeholder="House number and street name"
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Apartment, suite, or unit.&nbsp;
                      <span className="optional">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="input-text "
                      name="billing_address_2"
                      placeholder="Apartment, suite, unit etc. (optional)"
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Town / City&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-text "
                      name="billing_city"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      State / County&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <select
                      name="billing_state"
                      id="billing_state"
                      className="state_select select2-hidden-accessible"
                    >
                      <option value="">Select a state…</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="AR">Arunachal Pradesh</option>
                      <option value="AS">Assam</option>
                      <option value="BR">Bihar</option>
                    </select>
                  </p>
                  <p className="form-row">
                    <label>
                      Postcode / ZIP&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      className="input-text "
                      name="billing_postcode"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Phone&nbsp;<span className="optional">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      className="input-text "
                      name="billing_phone"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                  <p className="form-row">
                    <label>
                      Email address&nbsp;
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="email"
                      className="input-text "
                      name="billing_email"
                      placeholder=""
                      defaultValue=""
                    />
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="additional-fields">
                  <h3>Additional information</h3>
                  <div className="additional-fields-wrapper">
                    <p className="form-row" id="order_comments_field">
                      <label>
                        Order notes&nbsp;
                        <span className="optional">(optional)</span>
                      </label>
                      <textarea
                        name="order_comments"
                        className="input-text "
                        id="order_comments"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        defaultValue={""}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <h3 id="order_review_heading">Your order</h3>
                <div id="order_review" className="checkout-review-order">
                  <table className="shop_table checkout-review-order-table">
                    <thead>
                      <tr>
                        <th className="product-name">Product</th>
                        <th className="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="cart_item">
                        <td className="product-name">
                          Stethoscope&nbsp;
                          <strong className="product-quantity">× 1</strong>
                        </td>
                        <td className="product-total">
                          <span className="Price-amount">
                            <span className="Price-currencySymbol">$</span>18.00
                          </span>
                        </td>
                      </tr>
                      <tr className="cart_item">
                        <td className="product-name">
                          Panthenol&nbsp;
                          <strong className="product-quantity">× 1</strong>
                        </td>
                        <td className="product-total">
                          <span className="Price-amount amount">
                            <span className="Price-currencySymbol">$</span>18.00
                          </span>
                        </td>
                      </tr>
                      <tr className="cart_item">
                        <td className="product-name">
                          Syringe 5ml&nbsp;
                          <strong className="product-quantity">× 1</strong>
                        </td>
                        <td className="product-total">
                          <span className="Price-amount">
                            <span className="Price-currencySymbol">$</span>2.00
                          </span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td>
                          <span className="Price-amount amount">
                            <span className="Price-currencySymbol">$</span>38.00
                          </span>
                        </td>
                      </tr>
                      <tr className="order-total">
                        <th>Total</th>
                        <td>
                          <strong>
                            <span className="woocommerce-Price-amount amount">
                              <span className="woocommerce-Price-currencySymbol">
                                $
                              </span>
                              38.00
                            </span>
                          </strong>{" "}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div id="payment" className="checkout-payment">
                    <ul className="payment_methods">
                      <li className="payment_method_ppec_paypal">
                        <label>
                          PayPal <img src={paypal} alt="PayPal" />
                        </label>
                        <div className="payment_box">
                          <p>
                            Pay via PayPal; you can pay with your credit card if
                            you don’t have a PayPal account.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="form-row place-order">
                      <button
                        type="submit"
                        className="button"
                        name="checkout_place_order"
                        id="place_order"
                        value="Place order"
                        data-value="Place order"
                      >
                        Continue to payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    {/* checkout-section end */}
  </div>
  {/*site-main end*/}
</>

     );
}

export default Checkout;