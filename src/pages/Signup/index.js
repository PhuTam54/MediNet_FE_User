import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

function SignUp() {
  const url = "https://medinetaptech.azurewebsites.net/api/v1/LoginRegister/Register";
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  function validate(data) {
    let errors = {};
    if (!data.userName.trim()) {
      errors.userName = "Username is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }

  function submit(e) {
    e.preventDefault();
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(url, {
          userName: data.userName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
        .then((res) => {
          console.log(res.data);
          window.location.href = "/login";
          toast.success("Sign up successful!");
        })
        .catch((error) => {
          console.error("Registration error: ", error.response.data);
          toast.warning("An error occurred during sign up. Please try again.");
        });
    } else {
      setErrors(validationErrors);
      toast.warning("Please fill in the required fields correctly.");
    }
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <>
      <section className="account-section bg_img" style={{ backgroundImage: '', backgroundAttachment: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="padding-top padding-bottom">
            <div className="account-area">
              <div className="section-header-3" style={{ textAlign: 'center' }}>
                <span className="cate" style={{ fontSize: '40px', color:'#01d6a3' }}>welcome</span>
                <h2 className="title" style={{ fontSize: '50px' }}>to Clinic </h2>
              </div>
              <form className="account-form" style={{ width: '70%', margin: '0 auto',  }} onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="userName">Username<span>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Your Username"
                    id="userName"
                    required=""
                    onChange={(e) => handle(e)}
                    value={data.userName}
                  />
                  {errors.userName && <p style={{marginTop: 5, color: "red"}} className="error-message">{errors.userName}</p>}
                </div>

 

                <div className="form-group">
                  <label htmlFor="email">Email<span>*</span></label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    required=""
                    onChange={(e) => handle(e)}
                    value={data.email}
                  />
                  {errors.email && <p style={{marginTop: 5, color: "red"}} className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password<span>*</span></label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    required=""
                    onChange={(e) => handle(e)}
                    value={data.password}
                  />
                  {errors.password && <p style={{marginTop: 5, color: "red"}} className="error-message">{errors.password}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password<span>*</span></label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    required=""
                    onChange={(e) => handle(e)}
                    value={data.confirmPassword}
                  />
                  {errors.confirmPassword && <p style={{marginTop: 5, color: "red"}} className="error-message">{errors.confirmPassword}</p>}
                </div>
                <div className="form-group checkgroup">
                  <input type="checkbox" id="agree" required="" defaultChecked="" />
                  <label htmlFor="agree">
                    I agree to the <a href="#0">Terms, Privacy Policy</a> and{" "}
                    <a href="#0">Fees</a>
                  </label>
                </div>
                <div className="form-group text-center">
                  <button type="submit" style={{ width: '100%', margin: '0 auto', backgroundColor: '#01d6a3', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>Sign Up</button>
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
    </>
  );
}

export default SignUp;
