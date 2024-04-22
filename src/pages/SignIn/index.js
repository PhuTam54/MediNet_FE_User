import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import background from "~/assets/images/account/account-bg.jpg";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "~/context/UserContext";

function SignIn() {
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingAPI, setLoadingAPI] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    let token  = localStorage.getItem("token");
    if(token) {
      navigate("/");
    }
  })


  const handleLogin = async (e) => {
    setLoadingAPI(true);
    e.preventDefault();
    try {
      const response = await axios.post('https://rmallbe20240413154509.azurewebsites.net/api/v1/LoginRegister/Login', {
        email,
        password
      });
      loginContext(email,response.data.token);
      // localStorage.setItem('token', response.data.token);
      console.log('Login successful!', response.data.token);
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      setError('Invalid email or password');
      toast.error("Login error!!");
      console.error('Login error:', error);
    }
    setLoadingAPI(false);
  };

  return (
    
    <>
      <section
        className="account-section bg_img"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container">
          <div className="padding-top padding-bottom">
            <div className="account-area">
              <div className="section-header-3">
                <span className="cate">hello</span>
                <h2 className="title">welcome back</h2>
              </div>
              <form className="account-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email2">
                    Email<span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    id="email2"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass3">
                    Password<span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="pass3"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div style={{ color: 'red', marginBottom:10 }}>{error}</div>}
                <div className="form-group checkgroup">
                  <input type="checkbox" id="bal2" required="" defaultChecked="" />
                  <label htmlFor="bal2">remember password</label>
                  <a href="#0" className="forget-pass">
                    Forget Password
                  </a>
                </div>
                <div className="form-group text-center">
                  <button type="submit" style={{color: "#032055"}}> 
                  {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
                   &nbsp; Login
                  </button>
                </div>
              </form>
              <div className="option">
                Don't have an account? <a href="/signup">sign up now</a>
              </div>
              <div className="or">
                <span>Or</span>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="#0">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#0" className="active">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
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

export default SignIn;
