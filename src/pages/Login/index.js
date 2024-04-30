import React, {  useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "~/context/UserContext";

function Login() {
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ setError] = useState('');
  const [loadingAPI, setLoadingAPI] = useState(false);
  const navigate = useNavigate();


  // useEffect(() => {
  //   let token  = localStorage.getItem("token");
  //   if(token) {
  //     navigate("/");
  //   }
  // })


  const handleLogin = async (e) => {
    setLoadingAPI(true);
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7121/api/v1/LoginRegister/Login', {
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
          style={{ 
            backgroundImage: ``,
            backgroundAttachment: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto'
          }}
        >
          <div className="container" style={{ paddingTop: '60px', paddingBottom: '30px' }}>
            <div className="padding-top padding-bottom">
              <div className="account-area">
              <div className="section-header-3" style={{ textAlign: 'center' }}>
              <span className="cate" style={{ fontSize: '40px', color:'#01d6a3' }}>hello</span>
              <h2 className="title" style={{ fontSize: '50px' }}>welcome back</h2>
              </div>
                <form onSubmit={handleLogin} className="account-form" style={{ width: '70%', margin: '0 auto',  }}>
                  <div className="form-group">
                    <label htmlFor="email2">
                      Email<span style={{color:'red'}}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      id="email2"
                      required=""
                      className="form-control"
                      style={{ height: '45px' ,border: '1px solid #01d6a3'}}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass3">
                      Password<span style={{color:'red'}}>*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      id="pass3"
                      required=""
                      className="form-control"
                      style={{ height: '45px' , border: '1px solid #01d6a3'}}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group checkgroup" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <input type="checkbox" id="bal2" required="" defaultChecked="" />
                      <label htmlFor="bal2" style={{color: "black"}}>remember password</label>
                    </div>
                    <div>
                      <a href="#0" className="forget-pass">
                        Forget Password
                      </a>
                    </div>
                  </div>
                 
                  <div className="form-group text-center">
                  <button type="submit" style={{ width: '100%', margin: '0 auto', backgroundColor: '#01d6a3', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}> 
                  {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
                   &nbsp; Login
                  </button>
                </div>
                </form>
                <div className="option" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', color:'black' }}>
                     Don't have an account? <a href="/signup">Sign up now</a>
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

export default Login;
