import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Get the navigate function
    const navigate = useNavigate();

    // Get the query parameters from the URL
    const searchParams = new URLSearchParams(useLocation().search);
    const email = searchParams.get('email');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        const response = await fetch(`https://medinetaptech.azurewebsites.net/api/v1/LoginRegister/ResetPwd?email=${encodeURIComponent(email)}&pwd=${password}&confirmpwd=${confirmPassword}`, {
            method: 'POST',
            headers: {
                'accept': '*/*'
            }
        });
        if (response.ok) {
            toast.success('Password reset successfully!');
            navigate('/login');
        } else {
            toast.error('An error occurred while resetting the password.');
        }
    };

    return (
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
                                <label htmlFor="password">Password<span>*</span></label>
                                <input type="password" placeholder="Password" id="password" required="" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password<span>*</span></label>
                                <input type="password" placeholder="Confirm Password" id="confirmPassword" required="" onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" style={{ width: '100%', margin: '0 auto', backgroundColor: '#01d6a3', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResetPassword;