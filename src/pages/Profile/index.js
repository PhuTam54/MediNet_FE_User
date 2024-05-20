import React, { useEffect, useState } from 'react';
import blog3 from '~/assets/images/blog/03.jpg';

const getTokenData = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const tokenData = token.split('.')[1];
    const decodedToken = atob(tokenData);
    const tokenObject = JSON.parse(decodedToken);
    const userId = tokenObject.userId; // Lấy userId từ token
    return userId;
  }
  return null;
};

function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = getTokenData();
    if (userId) {
      const token = localStorage.getItem('token');
      fetch(`https://localhost:7121/api/v1/Customers/id?id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="ttm-page-title-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-box ttm-textcolor-white">
                <div className="page-title-heading">
                  <h1 className="title">My Profile</h1>
                </div>
                <div className="breadcrumb-wrapper">
                  <div className="container">
                    <div className="breadcrumb-wrapper-inner">
                      <span>
                        <a title="Go to Delmont." href="index-2.html" className="home">
                          <i className="themifyicon ti-home" />
                          &nbsp;&nbsp;Home
                        </a>
                      </span>
                      <span className="ttm-bread-sep">&nbsp; | &nbsp;</span>
                      <span>My Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-main single">
        <section className="ttm-row overview-section clearfix">
          <div className="ttm-team-member-single-content-wrapper ttm-team-member-view-default">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ttm-team-member-single-content">
                    <div className="ttm-social-links-wrapper"></div>
                    <div className="row">
                      <div className="col-lg-5 col-md-12">
                        <div className="ttm-featured-wrapper">
                          <div className="featured-thumbnail">
                            <img className="img-fluid" src={blog3} alt="image" />
                          </div>
                        </div>
                      </div>
                      <div className="ttm-team-member-single-content-area col-md-12 col-lg-7">
                        <div className="ttm-team-member-content shadow-box">
                          <div className="ttm-team-member-single-list">
                            <h2 className="ttm-team-member-single-title">{user.username}</h2>
                          
                            <div className="ttm-team-data">
                              <div className="ttm-team-details-wrapper">
                                <ul className="ttm-team-details-list clearfix">
                                  <li>
                                    <div className="ttm-team-list-title">
                                      <i className="fa fa-phone" /> Phone :
                                    </div>
                                    <div className="ttm-team-list-value">
                                      <a href={`tel:${user.phone}`}>123456789</a>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="ttm-team-list-title">
                                      <i className="ti ti-email" /> Email :
                                    </div>
                                    <div className="ttm-team-list-value">
                                      <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="ttm-team-list-title">
                                      <i className="ti ti-location-pin" /> Address Info :
                                    </div>
                                    <a href={`mailto:${user.address}`}>8A Ton That Thuyet, Nam Tu Liem, Ha Noi.</a>
                                    
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MyProfile;
