function SignUp() {
    return ( 
        <>
  {/* ==========Sign-In-Section========== */}
  <section
    className="account-section bg_img"
    style={{ 
        backgroundImage: ``,
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto'
      }}
  >
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <div className="padding-top padding-bottom">
        <div className="account-area">
          <div className="section-header-3" style={{ textAlign: 'center' }}>
            <span className="cate" style={{ fontSize: '40px', color:'#01d6a3' }}>welcome</span>
            <h2 className="title" style={{ fontSize: '50px' }}>to Clinic </h2>
          </div>
          <form className="account-form" style={{ width: '70%', margin: '0 auto',  }}>
            <div className="form-group">
              <label htmlFor="email1">
                Email<span style={{color:'red'}}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Email"
                id="email1"
                required=""
                style={{ height: '45px',border: '1px solid #01d6a3' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass1">
                Password<span style={{color:'red'}}>*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                id="pass1"
                required=""
                style={{ height: '45px' ,border: '1px solid #01d6a3'}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass2">
                Confirm Password<span style={{color:'red'}}>*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                id="pass2"
                required=""
                style={{ height: '45px' ,border: '1px solid #01d6a3'}}
              />
            </div>
            <div className="form-group checkgroup">
              <input type="checkbox" id="bal" required="" defaultChecked="" />
              <label htmlFor="bal">
                I agree to the <a href="#0">Terms, Privacy Policy</a> and{" "}
                <a href="#0">Fees</a>
              </label>
            </div>
            <div className="form-group text-center">
              <input type="submit" style={{ width: '100%', margin: '0 auto', backgroundColor: '#01d6a3', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }} defaultValue="Sign Up" />
            </div>
          </form>
          <div className="option" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', color:'black' }}>
                  Already have an account? <a href="/login">Login</a>
                  </div>
                </div>
                <div className="or" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',paddingTop:'15px' }}>
  
  <div style={{ position: 'absolute', left: '70px', right: '70px', height: '1px', borderTop: '1px solid rgba(1, 214, 163, 0.5)', top: '50%', }}></div>
</div>
<ul className="social-icons" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop:'10px' }}>
  <li style={{ margin: '0 10px' }}>
    <a href="#0">
      <i className="fab fa-facebook-f" />
    </a>
  </li>
  <li style={{ margin: '0 10px' }}>
    <a href="#0" className="active">
      <i className="fab fa-twitter" />
    </a>
  </li>
  <li style={{ margin: '0 1px' }}>
    <a href="#0">
      <i className="fab fa-google" />
    </a>
  </li>
</ul>
        </div>
      </div>
    </div>
  </section>
  {/* ==========Sign-In-Section========== */}
</>
     );
}

export default SignUp;