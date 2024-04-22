import React, { useState } from "react";
import background from "~/assets/images/account/account-bg.jpg";
import { toast } from 'react-toastify';
import axios from "axios";

function SignUp() {
  const url = "https://rmallbe20240413154509.azurewebsites.net/api/v1/LoginRegister/Register";
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
          window.location.href = "/signin";
          toast.success("Sign up successful!");
          
        })
        .catch((error) => {
          console.error("Registration error: ", error);
          toast.error("An error occurred during sign up. Please try again.");
        });
    } else {
      setErrors(validationErrors);
      toast.error("Please fill in the required fields correctly.");
    }
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <>
      <section className="account-section bg_img" style={{ backgroundImage: `url(${background})` }}>
        <div className="container">
          <div className="padding-top padding-bottom">
            <div className="account-area">
              <div className="section-header-3">
                <span className="cate">welcome</span>
                <h2 className="title">to Boleto </h2>
              </div>
              <form className="account-form" onSubmit={(e) => submit(e)}>
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
                    type="text"
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
                  <input type="checkbox" id="bal" required="" defaultChecked="" />
                  <label htmlFor="bal">
                    I agree to the <a href="#0">Terms, Privacy Policy</a> and{" "}
                    <a href="#0">Fees</a>
                  </label>
                </div>
                <button className="btn btn-primary">Sign Up</button>
              </form>
              <div className="option">
                Already have an account? <a href="/signin">Login</a>
              </div>
              <div className="or">
                <span>Or</span>
              </div>
              <ul className="social-icons">
                <li><a href="#0"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="#0" className="active"><i className="fab fa-twitter" /></a></li>
                <li><a href="#0"><i className="fab fa-google" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
