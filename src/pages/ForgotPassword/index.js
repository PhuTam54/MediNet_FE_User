import React, { useState } from 'react';
import { toast } from 'react-toastify';


function ForgotPassword() {
 
    const [email, setEmail] = useState('');

   



const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://medinetaptech.azurewebsites.net/api/v1/LoginRegister/ForgotPwd?email=' + encodeURIComponent(email), {
        method: 'POST',
        headers: {
            'accept': '*/*'
        }
    });

    if (response.ok) { // check if HTTP status is 2xx
        const text = await response.text();
        if (text) { // check if the response body is not empty
            const data = JSON.parse(text);
            console.log(data);
        } else {
            toast.success('Email sent successfully!');
        }
    } else {
        console.log('HTTP error', response.status);
        toast.error('An error occurred while sending the email.');
    }
};

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
                            <form className="account-form" style={{ width: '70%', margin: '0 auto' }} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email<span>*</span></label>
                    <input type="email" placeholder="Enter Your Email" id="email" required="" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group text-center">
                    <button type="submit" style={{ width: '100%', margin: '0 auto', backgroundColor: '#01d6a3', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>Submit Email</button>
                </div>
            </form>
                            
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

export default ForgotPassword;