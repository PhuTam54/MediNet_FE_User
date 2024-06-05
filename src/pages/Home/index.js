import slider01 from "~/assets/images/slides/slider-mainbg-001.jpg";
import singletwel from "~/assets/images/single-img-twel.jpg";
import testimonial from "~/assets/images/testimonial/01.jpg";
import member1 from "~/assets/images/team-member/team-img01.jpg";
import member2 from "~/assets/images/team-member/team-img02.jpg";
import member3 from "~/assets/images/team-member/team-img03.jpg";
import member4 from "~/assets/images/team-member/team-img04.jpg";
import member5 from "~/assets/images/team-member/team-img05.jpg";
import client1 from "~/assets/images/client/client-01.png";
import client2 from "~/assets/images/client/client-02.png";
import client3 from "~/assets/images/client/client-03.png";
import blog1 from "~/assets/images/blog/01.jpg"
import blog2 from "~/assets/images/blog/02.jpg"
import blog3 from "~/assets/images/blog/03.jpg"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import axios from 'axios'; // Import axios



function Home() {

  const [blogs, setBlogs] = useState([]);
  

  useEffect(() => {
    fetch("https://medinetaptech.azurewebsites.net/api/v1/Blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
    
      });
  },[]);  
  
    return(
      <>
      
      {/* END REVOLUTION SLIDER */}
        {/* page-title */}
  <div className="ttm-page-title-row"  style={{ backgroundImage: `url(${slider01})` , height:"500px"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title-box ttm-textcolor-white">
            <div className="page-title-heading">
              <h1 className="title">Home</h1>
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
      <div className="site-main" style={{paddingTop: "55px"}}>
        {/*row-top-section*/}
        <section className="ttm-row row-top-section clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mt_45 res-991-mt-50 ttm-bgcolor-white">
                  <div className="row no-gutters">
                    <div className="col-lg">
                      {/* featured-icon-box */}
                      <div className="featured-icon-box top-icon style4 text-center">
                        <div className="featured-icon-box-inner">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-care" />
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h5>Oral Care</h5>
                            </div>
                            <div className="featured-desc">
                              <p>The Stronger Teeth</p>
                            </div>
                            <div className="ttm-di_links">
                              <a href="#" className="di_link">
                                <i className="fa fa-angle-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-lg">
                      {/* featured-icon-box */}
                      <div className="featured-icon-box top-icon style4 text-center">
                        <div className="featured-icon-box-inner">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-heart-3" />
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h5>Heal Body</h5>
                            </div>
                            <div className="featured-desc">
                              <p>A small carebear</p>
                            </div>
                            <div className="ttm-di_links">
                              <a href="#" className="di_link">
                                <i className="fa fa-angle-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-lg">
                      {/* featured-icon-box */}
                      <div className="featured-icon-box top-icon style4 text-center">
                        <div className="featured-icon-box-inner">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-ambulance" />
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h5>Ambulance</h5>
                            </div>
                            <div className="featured-desc">
                              <p>Shipping Via Air</p>
                            </div>
                            <div className="ttm-di_links">
                              <a href="#" className="di_link">
                                <i className="fa fa-angle-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-lg">
                      {/* featured-icon-box */}
                      <div className="featured-icon-box top-icon style4 text-center">
                        <div className="featured-icon-box-inner">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-medicines" />
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h5>Drug store</h5>
                            </div>
                            <div className="featured-desc">
                              <p>A retailer shop</p>
                            </div>
                            <div className="ttm-di_links">
                              <a href="#" className="di_link">
                                <i className="fa fa-angle-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-lg">
                      {/* featured-icon-box */}
                      <div className="featured-icon-box top-icon style4 text-center">
                        <div className="featured-icon-box-inner">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-eye" />
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h5>Eye Care</h5>
                            </div>
                            <div className="featured-desc">
                              <p>Sharping vision</p>
                            </div>
                            <div className="ttm-di_links">
                              <a href="#" className="di_link">
                                <i className="fa fa-angle-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                  </div>
                </div>
              </div>
              {/* row end */}
            </div>
          </div>
        </section>
        {/* row-top-section end */}
        {/*introduction-section*/}
        <section className="ttm-row introduction-section clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xs-12">
                <div className="pt-50 res-991-pt-0">
                  {/* section title */}
                  <div className="section-title clearfix">
                    <div className="title-header">
                      <h5>OUR MEDICAL</h5>
                      <h2 className="title">
                        We’re Setting the Standards in Research &amp; Clinical Care
                      </h2>
                    </div>
                  </div>
                  {/* section title end */}
                  <div className="mb-30 clearfix">
                    <p>
                      We provide the most full medical services, so every person
                      could have the opportunity to receive qualitative medical
                      help. Our Clinic has grown to provide a world class facility
                      for the treatment of tooth loss, dental cosmetics and bore
                      advanced restorative dentistry. We are among the most
                      qualified implant providers in the USA with over 35 years of
                      quality training and experience.
                    </p>
                  </div>
                  <h5>Delmont Special Features</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                        <li>
                          <i className="fa fa-arrow-circle-right" />
                          <span className="ttm-list-li-content">
                            Adult Trauma Center
                          </span>
                        </li>
                        <li>
                          <i className="fa fa-arrow-circle-right" />
                          <span className="ttm-list-li-content">
                            Birthing and Lactation Classes
                          </span>
                        </li>
                        <li>
                          <i className="fa fa-arrow-circle-right" />
                          <span className="ttm-list-li-content">
                            Dental and Oral Surgery
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                        <li>
                          <i className="fa fa-arrow-circle-right" />
                          <span className="ttm-list-li-content">
                            Children's Trauma Center
                          </span>
                        </li>
                        <li>
                          <i className="fa fa-arrow-circle-right" />
                          <span className="ttm-list-li-content">
                            Heart and Vascular Institute
                          </span>
                        </li>
                        <li>
                          <i className="fa fa-arrow-circle-right" />
                          <span className="ttm-list-li-content">
                            Plastic Surgery
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-12">
                      <div className="mt-25 res-991-mt-0 res-991-mb-40">
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-black mr-15 mt-15"
                          href="#"
                        >
                          VIEW MORE
                        </a>
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor mt-15"
                          href="#"
                        >
                          CONTACT US!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12">
                {/* ttm_single_image-wrapper */}
                <div className="ttm_single_image-wrapper text-right">
                  <img
                    className="img-fluid"
                    src={singletwel}
                    alt=""
                  />
                </div>
                <div className="about-overlay-shape">
                  <div className="row">
                    <div className="col-lg-2 col-sm-3" />
                    <div className="col-lg-10 col-sm-6">
                      <div className="about-content ttm-col-bgcolor-yes ttm-bg ttm-bgcolor-darkgrey mt_50 pl-35 pb-10  pt-15 ttm-textcolor-white">
                        <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
                        <div className="layer-content">
                          <h5 className="font-weight-normal mb-0">
                            We{" "}
                            <span className="ttm-textcolor-skincolor">
                              {" "}
                              &nbsp;
                              <i className="fa fa-heart-o" />
                              &nbsp;{" "}
                            </span>{" "}
                            To Care our{" "}
                            <span className="ttm-textcolor-skincolor">
                              {" "}
                              Patients !
                            </span>
                          </h5>
                        </div>
                      </div>
                      {/* ttm_single_image-wrapper end */}
                    </div>
                    <div className="col-sm-3" />
                  </div>
                </div>
              </div>
            </div>
            {/* row end */}
          </div>
        </section>
        {/*introduction-section end*/}
        {/*broken-section*/}
        <section className="ttm-row broken-section bg-img6 bg-layer bg-layer-equal-height clearfix">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-lg-5" />
              <div className="col-lg-7">
                {/* ttm-fid-border */}
                <div className="ttm-fid-border ttm-col-bgcolor-yes ttm-bg ttm-right-span ttm-bgcolor-skincolor spacing-1">
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
                  <div className="layer-content">
                    {/* section title */}
                    <div className="section-title clearfix">
                      <div className="title-header">
                        <h5>ABOUT MEDICAL</h5>
                        <h2 className="title">
                          Powered By Over 1,503 Patients Trust Us With Their Sweet
                          Love.
                        </h2>
                      </div>
                    </div>
                    {/* section title end */}
                    <div className="pt-10">
                      <div className="row">
                        <div className="col-sm-4">
                          {/* ttm-fid */}
                          <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon">
                            <div className="ttm-fid-icon-wrapper">
                              <i className="themifyicon ti-cup" />
                            </div>
                            <div className="ttm-fid-contents">
                              <h4 className="ttm-fid-inner">
                                <span
                                  data-appear-animation="animateDigits"
                                  data-from={0}
                                  data-to={201}
                                  data-interval={5}
                                  data-before=""
                                  data-before-style="sup"
                                  data-after=""
                                  data-after-style="sub"
                                >
                                  201
                                </span>
                              </h4>
                              <h3 className="ttm-fid-title">
                                <span>
                                  Award Win
                                  <br />
                                </span>
                              </h3>
                            </div>
                          </div>
                          {/* ttm-fid end */}
                        </div>
                        <div className="col-sm-4">
                          {/* ttm-fid */}
                          <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon">
                            <div className="ttm-fid-icon-wrapper">
                              <i className="themifyicon ti-user" />
                            </div>
                            <div className="ttm-fid-contents">
                              <h4 className="ttm-fid-inner">
                                <span
                                  data-appear-animation="animateDigits"
                                  data-from={0}
                                  data-to={354}
                                  data-interval={5}
                                  data-before=""
                                  data-before-style="sup"
                                  data-after=""
                                  data-after-style="sub"
                                >
                                  354
                                </span>
                              </h4>
                              <h3 className="ttm-fid-title">
                                <span>
                                  Qualified Staff
                                  <br />
                                </span>
                              </h3>
                            </div>
                          </div>
                          {/* ttm-fid end */}
                        </div>
                        <div className="col-sm-4">
                          {/* ttm-fid */}
                          <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon">
                            <div className="ttm-fid-icon-wrapper">
                              <i className="themifyicon ti-heart-broken" />
                            </div>
                            <div className="ttm-fid-contents">
                              <h4 className="ttm-fid-inner">
                                <span
                                  data-appear-animation="animateDigits"
                                  data-from={0}
                                  data-to={124}
                                  data-interval={5}
                                  data-before=""
                                  data-before-style="sup"
                                  data-after=""
                                  data-after-style="sub"
                                >
                                  124
                                </span>
                              </h4>
                              <h3 className="ttm-fid-title">
                                <span>
                                  Machines
                                  <br />
                                </span>
                              </h3>
                            </div>
                          </div>
                          {/* ttm-fid end */}
                        </div>
                        <div className="col-sm-4">
                          {/* ttm-fid */}
                          <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon">
                            <div className="ttm-fid-icon-wrapper">
                              <i className="themifyicon ti-blackboard" />
                            </div>
                            <div className="ttm-fid-contents">
                              <h4 className="ttm-fid-inner">
                                <span
                                  data-appear-animation="animateDigits"
                                  data-from={0}
                                  data-to={4012}
                                  data-interval={5}
                                  data-before=""
                                  data-before-style="sup"
                                  data-after=""
                                  data-after-style="sub"
                                >
                                  4012
                                </span>
                              </h4>
                              <h3 className="ttm-fid-title">
                                <span>
                                  Hospital Rooms
                                  <br />
                                </span>
                              </h3>
                            </div>
                          </div>
                          {/* ttm-fid end */}
                        </div>
                        <div className="col-sm-4">
                          {/* ttm-fid */}
                          <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon">
                            <div className="ttm-fid-icon-wrapper">
                              <i className="themifyicon ti-thumb-up" />
                            </div>
                            <div className="ttm-fid-contents">
                              <h4 className="ttm-fid-inner">
                                <span
                                  data-appear-animation="animateDigits"
                                  data-from={0}
                                  data-to={7015}
                                  data-interval={5}
                                  data-before=""
                                  data-before-style="sup"
                                  data-after=""
                                  data-after-style="sub"
                                >
                                  7015
                                </span>
                              </h4>
                              <h3 className="ttm-fid-title">
                                <span>
                                  Happy Patients
                                  <br />
                                </span>
                              </h3>
                            </div>
                          </div>
                          {/* ttm-fid end */}
                        </div>
                        <div className="col-sm-4">
                          {/* ttm-fid */}
                          <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon">
                            <div className="ttm-fid-icon-wrapper">
                              <i className="themifyicon ti-eraser" />
                            </div>
                            <div className="ttm-fid-contents">
                              <h4 className="ttm-fid-inner">
                                <span
                                  data-appear-animation="animateDigits"
                                  data-from={0}
                                  data-to={254}
                                  data-interval={5}
                                  data-before=""
                                  data-before-style="sup"
                                  data-after=""
                                  data-after-style="sub"
                                >
                                  254
                                </span>
                              </h4>
                              <h3 className="ttm-fid-title">
                                <span>
                                  Suppliers
                                  <br />
                                </span>
                              </h3>
                            </div>
                          </div>
                          {/* ttm-fid end */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ttm-fid-border end*/}
              </div>
            </div>
            {/* row end */}
          </div>
        </section>
        {/*broken-section end*/}
        {/*services-section*/}
        <div className="ttm-row services-section ttm-bgcolor-darkgrey bg-img5 ttm-bg ttm-bgimage-yes ttm-bgcolor-darkgrey clearfix">
          <div className="ttm-row-wrapper-bg-layer ttm-bg-layer" />
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-lg-9 col-md-12">
                {/* section-title */}
                <div className="section-title with-desc clearfix">
                  <div className="title-header">
                    <h5>WE OFFER SERVICES</h5>
                    <h2 className="title">Special High-quality Services</h2>
                  </div>
                  <div className="title-desc">
                    Since its founding Delmont has been providing its patients with
                    the full medical care, encompassing outpatients services, is
                    neurology, laboratory, imaging diagnostics and more.
                  </div>
                </div>
                {/* section-title end */}
              </div>
              <div className="col-lg-3 col-md-12">
                <a
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-white mb-30 mt-45 res-991-mt-0 float-right"
                  href="#"
                >
                  MORE SERVICES
                </a>
              </div>
            </div>
            {/* row end */}
            <div className="row">
              <div className="col-lg-12">
                <div className="mt-10">
                  <div className="row no-gutters">
                    <div className="col-md-3 col-sm-6">
                      {/*featured-icon-box*/}
                      <div className="featured-icon-box style5">
                        <div className="featured-content">
                          <div className="featured-title">
                            <h5>Internists</h5>
                          </div>
                          <div className="featured-desc">
                            <p>
                              For normal &amp; complex disease. subspecialties in
                              sleep medicine, cancer etc.
                            </p>
                          </div>
                        </div>
                        <div className="featured-icon">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-doctor-1" />
                          </div>
                        </div>
                        <a
                          className="ttm-btn ttm-btn-size-sm ttm-btn-color-white btn-inline mb-20"
                          href="#"
                        >
                          VIEW MORE
                        </a>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-md-3 col-sm-6">
                      {/*featured-icon-box*/}
                      <div className="featured-icon-box style5">
                        <div className="featured-content">
                          <div className="featured-title">
                            <h5>Osteopaths</h5>
                          </div>
                          <div className="featured-desc">
                            <p>
                              DOs are just like MDs. Recommend for a "whole body”
                              approach.
                            </p>
                          </div>
                        </div>
                        <div className="featured-icon">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-first-aid-kit" />
                          </div>
                        </div>
                        <a
                          className="ttm-btn ttm-btn-size-sm ttm-btn-color-white btn-inline mb-20"
                          href="#"
                        >
                          VIEW MORE
                        </a>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-md-3 col-sm-6">
                      {/*featured-icon-box*/}
                      <div className="featured-icon-box style5">
                        <div className="featured-content">
                          <div className="featured-title">
                            <h5>Oncologists</h5>
                          </div>
                          <div className="featured-desc">
                            <p>
                              An Internists! to cure cancer, work with radiation
                              oncologists &amp; surgeons.
                            </p>
                          </div>
                        </div>
                        <div className="featured-icon">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-patient-1" />
                          </div>
                        </div>
                        <a
                          className="ttm-btn ttm-btn-size-sm ttm-btn-color-white btn-inline mb-20"
                          href="#"
                        >
                          VIEW MORE
                        </a>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                    <div className="col-md-3 col-sm-6">
                      {/*featured-icon-box*/}
                      <div className="featured-icon-box style5">
                        <div className="featured-content">
                          <div className="featured-title">
                            <h5>Podiatrists</h5>
                          </div>
                          <div className="featured-desc">
                            <p>
                              The specialists who help with problems that affect
                              your feet or lower legs.
                            </p>
                          </div>
                        </div>
                        <div className="featured-icon">
                          <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-orthopedics" />
                          </div>
                        </div>
                        <a
                          className="ttm-btn ttm-btn-size-sm ttm-btn-color-white btn-inline mb-20"
                          href="#"
                        >
                          VIEW MORE
                        </a>
                      </div>
                      {/* featured-icon-box end*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="mt-50 mb-50 text-center res-991-mt-30 res-991-mb-0">
                  <strong>
                    Don’t hesitate, contact us for better help and services.{" "}
                    <span className="ttm-textcolor-white">
                      <u>Let’s get started</u>
                    </span>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*services-section end*/}
        {/*team-section*/}
        <section className="ttm-row team-section clearfix">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-lg-10 col-md-10">
                {/* section-title */}
                <div className="section-title with-desc clearfix">
                  <div className="title-header">
                    <h5>MEET OUR EXPERIENCED TEAM</h5>
                    <h2 className="title">Our Dedicated Doctors Team</h2>
                  </div>
                  <div className="title-desc">
                    We offer extensive medical procedures to outbound and inbound
                    patients what it is and we are very proud of achievement of our
                    staff, We are all work together to help our all patients for
                    recovery
                  </div>
                </div>
                {/* section-title end */}
              </div>
              <div className="col-lg-2 col-md-2" />
            </div>
            {/* row end */}
            {/* row */}
            <div className="row">
              <div
                className="wrap-team team-slide owl-carousel"
                data-item={4}
                data-nav="true"
                data-dots="false"
                data-auto="false"
              >
                {/* featured-imagebox-team */}
                <div className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay">
                  <div className="featured-thumbnail">
                    <img
                      className="img-fluid"
                      src={member1}
                      alt="image"
                    />
                  </div>
                  <div className="ttm-box-view-overlay">
                    <div className="featured-iconbox ttm-media-link">
                      <a href="team-details.html">
                        <i className="ti ti-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="featured-content featured-content-team">
                    <div className="ttm-team-position">Senior Dr. at Delmont</div>
                    <div className="featured-title">
                      <h5>
                        <a href="team-details.html">Dr. Metthew Wood</a>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* featured-imagebox-team end*/}
                {/* featured-imagebox-team */}
                <div className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay">
                  <div className="featured-thumbnail">
                    <img
                      className="img-fluid"
                      src={member2}
                      alt="image"
                    />
                  </div>
                  <div className="ttm-box-view-overlay">
                    <div className="featured-iconbox ttm-media-link">
                      <a href="team-details.html">
                        <i className="ti ti-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="featured-content featured-content-team">
                    <div className="ttm-team-position">Cardiologist Specialist</div>
                    <div className="featured-title">
                      <h5>
                        <a href="team-details.html">Dr. Roy Coleman</a>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* featured-imagebox-team end*/}
                {/* featured-imagebox-team */}
                <div className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay">
                  <div className="featured-thumbnail">
                    <img
                      className="img-fluid"
                      src={member3}
                      alt="image"
                    />
                  </div>
                  <div className="ttm-box-view-overlay">
                    <div className="featured-iconbox ttm-media-link">
                      <a href="team-details.html">
                        <i className="ti ti-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="featured-content featured-content-team">
                    <div className="ttm-team-position">Neurology Specialist</div>
                    <div className="featured-title">
                      <h5>
                        <a href="team-details.html">Dr. Andrew Bert</a>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* featured-imagebox-team end*/}
                {/* featured-imagebox-team */}
                <div className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay">
                  <div className="featured-thumbnail">
                    <img
                      className="img-fluid"
                      src={member4}
                      alt="image"
                    />
                  </div>
                  <div className="ttm-box-view-overlay">
                    <div className="featured-iconbox ttm-media-link">
                      <a href="team-details.html">
                        <i className="ti ti-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="featured-content featured-content-team">
                    <div className="ttm-team-position">Senior Рathologist</div>
                    <div className="featured-title">
                      <h5>
                        <a href="team-details.html">Dr. Teresa Mayer</a>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* featured-imagebox-team end*/}
                {/* featured-imagebox-team */}
                <div className="featured-imagebox featured-imagebox-team ttm-team-box-view-overlay">
                  <div className="featured-thumbnail">
                    <img
                      className="img-fluid"
                      src={member5}
                      alt="image"
                    />
                  </div>
                  <div className="ttm-box-view-overlay">
                    <div className="featured-iconbox ttm-media-link">
                      <a href="team-details.html">
                        <i className="ti ti-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="featured-content featured-content-team">
                    <div className="ttm-team-position">Senior Dr. at Delmont</div>
                    <div className="featured-title">
                      <h5>
                        <a href="team-details.html">Dr. Robert Burton</a>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* featured-imagebox-team end*/}
              </div>
            </div>
            {/* row end */}
          </div>
        </section>
        {/*team-section end*/}
        {/*cta-section*/}
        <section className="ttm-row cta-section bg-img1 clearfix">
          <div className="container">
            {/*container*/}
            <div className="row">
              {/*row*/}
              <div className="col-lg-12">
                <div className="pt-70 pb-140 mt-50 row-title res-991-mt-0 res-991-pb-30 text-center">
                  <div className="ttm-video-btn">
                    <div className="ttm-play-btn ttm_prettyphoto">
                      <span className="ttm-btn-play">
                        <i className="fa fa-play" />
                      </span>
                    </div>
                  </div>
                  {/* section title */}
                  <div className="section-title clearfix">
                    <div className="title-header">
                      <h5>Time can't be Resisted, But Aging Can</h5>
                      <h2 className="title">
                        Commited To Trusted Health Care Delmont
                      </h2>
                    </div>
                  </div>
                  {/* section title end */}
                  <h4>
                    Get Your Quote or Call:
                    <span className="ttm-textcolor-skincolor">
                      {" "}
                      (0080 123-453-789)
                    </span>{" "}
                  </h4>
                  <div className="mt-50 res-991-mt-30">
                    <a
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-black mr-15 mb-20"
                      href="#"
                    >
                      APPOINTMENT!
                    </a>
                    <a
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor mb-20"
                      href="#"
                    >
                      SEE HOW WE CAN HELP
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*cta-section end*/}
        {/* testimonial-section */}
        <section className="ttm-row broken-section break-991-colum bg-layer clearfix">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-5">
                <div className="ttm-col-bgcolor-yes ttm-bg ttm-left-span ttm-bgcolor-skincolor spacing-2">
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
                  <div className="layer-content">
                    {/* section title */}
                    <div className="section-title with-desc clearfix">
                      <div className="title-header">
                        <h5>CLIENTS</h5>
                        <h2 className="title">Happy Patients &amp; Clients</h2>
                      </div>
                      <div className="title-desc">
                        If you need any medical help we are available for you. Lorem
                        ipsum dolor sit amet, sectetur adipiscing elit, sed do
                        eiusmod tempor the incididunt ut labore et dolore.
                      </div>
                    </div>
                    {/* section title end */}
                    <a
                      className="ttm-btn ttm-btn-size-sm ttm-icon-btn-right ttm-btn-color-white btn-inline mt_25"
                      href="#"
                    >
                      VIEW MORE DETAILS
                      <i className="ti ti-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="ttm-col-bgcolor-yes ttm-right-span ttm-bg ttm-bgcolor-darkgrey spacing-3">
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer" />
                  <div className="layer-content">
                    {/* section title */}
                  <div className="section-title clearfix">
                    
                    <div className="testimonials ttm-testimonial-box-view-style1">
                        <div className="testimonial-avatar">
                          <div className="testimonial-img">
                            <img
                              className="img-fluid"
                              src={testimonial}
                              alt="testimonial-img"
                            />
                          </div>
                          <div className="testimonial-caption">
                            <h5>RAshley Foster</h5>
                            <label>Patient</label>
                          </div>
                        </div>
                        <div className="testimonial-content">
                          <blockquote className="ttm-testimonial-text">
                            Prior to my stay at Delmont, I was aware of their
                            stellar reputation and multiple friends commented about
                            how lucky I was to have my surgery scheduled there. As a
                            result my expectations were high and yet the kind and
                            professional staff with excellent patient care surpassed
                            them.
                          </blockquote>
                          <div className="star-ratings">
                            <ul className="rating">
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* section title end */}
                    {/* wrap-testimonial */}
                    <div
                      className="testimonial-slide owl-carousel"
                      data-item={1}
                      data-nav="true"
                      data-dots="false"
                      data-auto="false"
                    >
                      {/* testimonials */}
                      <div className="testimonials ttm-testimonial-box-view-style1">
                        <div className="testimonial-avatar">
                          <div className="testimonial-img">
                            <img
                              className="img-fluid"
                              src="images/testimonial/01.jpg"
                              alt="testimonial-img"
                            />
                          </div>
                          <div className="testimonial-caption">
                            <h5>RAshley Foster</h5>
                            <label>Patient</label>
                          </div>
                        </div>
                        <div className="testimonial-content">
                          <blockquote className="ttm-testimonial-text">
                            Prior to my stay at Delmont, I was aware of their
                            stellar reputation and multiple friends commented about
                            how lucky I was to have my surgery scheduled there. As a
                            result my expectations were high and yet the kind and
                            professional staff with excellent patient care surpassed
                            them.
                          </blockquote>
                          <div className="star-ratings">
                            <ul className="rating">
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* testimonials end */}
                      {/* testimonials */}
                      <div className="testimonials ttm-testimonial-box-view-style1">
                        <div className="testimonial-avatar">
                          <div className="testimonial-img">
                            <img
                              className="img-fluid"
                              src="images/testimonial/02.jpg"
                              alt="testimonial-img"
                            />
                          </div>
                          <div className="testimonial-caption">
                            <h5>Alan Sears</h5>
                            <label>Patient</label>
                          </div>
                        </div>
                        <div className="testimonial-content">
                          <blockquote className="ttm-testimonial-text">
                            Great co workers, really good environment and excellent
                            patient care. They are continuously innovating
                            themselves which is why they remain a premier dental
                            clinic.This was the cleanest medical establishment I've
                            ever been in. They just loved the welcoming and warm
                            atmosphere in there.
                          </blockquote>
                          <div className="star-ratings">
                            <ul className="rating">
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* testimonials end */}
                      {/* testimonials */}
                      <div className="testimonials ttm-testimonial-box-view-style1">
                        <div className="testimonial-avatar">
                          <div className="testimonial-img">
                            <img
                              className="img-fluid"
                              src="images/testimonial/03.jpg"
                              alt="testimonial-img"
                            />
                          </div>
                          <div className="testimonial-caption">
                            <h5>Raymon Myers</h5>
                            <label>Patient</label>
                          </div>
                        </div>
                        <div className="testimonial-content">
                          <blockquote className="ttm-testimonial-text">
                            The doctors and nurses and aides were excellent. The
                            food was excellent. I am feeling fine and very lucky,
                            back to my old self again and it feels great. Thank God
                            for clinics such as yours. I appreciate all your
                            kindness and good care you gave me is beyond my
                            expectations they wonder for me.
                          </blockquote>
                          <div className="star-ratings">
                            <ul className="rating">
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* testimonials end */}
                    </div>
                    {/* wrap-testimonial end*/}
                  </div>
                </div>
              </div>
            </div>
            {/* row end*/}
          </div>
        </section>
        {/* testimonial-section end*/}
        {/*client-section*/}
        <div className="ttm-row client-section ttm-bgcolor-grey mt_70 res-991-mt-0 clearfix">
          <div className="container">
            {/* row */}
            <div className="row text-center">
              <div className="col-md-12">
                {/* ttm-client */}
                <div
                  className="ttm-client clients-slide owl-carousel owl-theme owl-loaded"
                  data-item={5}
                  data-nav="false"
                  data-dots="false"
                  data-auto="false"
                >
                  <div className="client-box ttm-box-view-separator-logo">
                    <div
                      className="ttm-client-logo-tooltip"
                      data-tooltip="client-01"
                    >
                      <div className="client-thumbnail">
                        <img
                          width={116}
                          height={81}
                          src={client1}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="client-box ttm-box-view-separator-logo">
                    <div
                      className="ttm-client-logo-tooltip"
                      data-tooltip="client-02"
                    >
                      <div className="client-thumbnail">
                        <img
                          width={82}
                          height={80}
                          src={client2}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="client-box ttm-box-view-separator-logo">
                    <div
                      className="ttm-client-logo-tooltip"
                      data-tooltip="client-03"
                    >
                      <div className="client-thumbnail">
                        <img
                          width={116}
                          height={81}
                          src={client3}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="client-box ttm-box-view-separator-logo">
                    <div
                      className="ttm-client-logo-tooltip"
                      data-tooltip="client-01"
                    >
                      <div className="client-thumbnail">
                        <img
                          width={116}
                          height={81}
                          src={client1}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="client-box ttm-box-view-separator-logo">
                    <div
                      className="ttm-client-logo-tooltip"
                      data-tooltip="client-02"
                    >
                      <div className="client-thumbnail">
                        <img
                          width={82}
                          height={80}
                          src={client2}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="client-box ttm-box-view-separator-logo">
                    <div
                      className="ttm-client-logo-tooltip"
                      data-tooltip="client-03"
                    >
                      <div className="client-thumbnail">
                        <img
                          width={116}
                          height={81}
                          src={client3}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ttm-client end */}
              </div>
            </div>
            {/* row end */}
          </div>
        </div>
        {/*client-section end*/}
        {/*blog-section*/}
        <section className="ttm-row blog-section clearfix">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-lg-9 col-md-12">
                {/* section-title */}
                <div className="section-title with-desc clearfix">
                  <div className="title-header">
                    <h5>OUR BLOG</h5>
                    <h2 className="title">Recent Articles and News</h2>
                  </div>
                  <div className="title-desc">
                    Since its founding Delmont has been providing its patients with
                    the full medical care, encompassing outpatients services, is
                    neurology, laboratory, imaging diagnostics and more.
                  </div>
                </div>
                {/* section-title end */}
              </div>
              <div className="col-lg-3 col-md-12">
                <a
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-border ttm-btn-color-black mb-30 mt-45 res-991-mt-0 float-right"
                  href="/blogs"
                >
                  MORE ARTICLES
                </a>
              </div>
            </div>
            {/* row end */}
            <div className="row">
              <div className="col-lg-12">
                <div className="sep_holder_box width-100 mt_15 mb-35 res-991-mt-0">
                  <span className="sep_holder">
                    <span className="sep_line" />
                  </span>
                  <span className="sep_holder">
                    <span className="sep_line" />
                  </span>
                </div>
              </div>
            </div>
            {/* row */}
            <div className="row">
              {/* post-slide */}
              <div
                className="post-slide owl-carousel owl-theme owl-loaded mt-5"
                data-item={3}
                data-nav="false"
                data-dots="false"
                data-auto="false"
              >
                
                {/* featured-imagebox-post */}
                {blogs.map((blog) => {
      let createdAt = new Date(blog.createdAt);
      let day = createdAt.getDate();
      let month = createdAt.toLocaleString('default', { month: 'short' });
      let year = createdAt.getFullYear();

      return (
                <div className="featured-imagebox featured-imagebox-post ttm-box-view-top-image">
                  <div className="ttm-post-featured-outer">
                    <div className="ttm-post-format-icon">
                      <i className="ti ti-pencil" />
                    </div>
                    <div className="ttm-post-thumbnail featured-thumbnail">
                      <img className="img-fluid" src={blog.imageSrc}
          alt={blog.title}
          style={{width:'100%', height:'500px'}}/>
                    </div>
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                      <time className="entry-date">
            {day}<span className="entry-month">{month}<span className="entry-year">{year}</span></span>
          </time> 
                      </span>
                    </div>
                  </div>
                  <div className="featured-content featured-content-post box-shadow">
                    <div className="post-meta">
                    <span className="ttm-meta-line byline">
            <i className="ti ti-user" />
            {blog.employee.full_Name}
          </span>
          <span className="ttm-meta-line cat-links">
            <i className="ti ti-folder" />
            {blog.disease.name}
          </span>
          <span className="ttm-meta-line comments-link">
  <i className="fa fa-comment" />  {blog.blogComments ? blog.blogComments.length : 0}  Comments
</span>
                    </div>
                    <div className="post-title featured-title">
                      <h5>
                        <Link to={`/blogdetail/${blog.id}`}>
                        <a href="single-blog.html">
                          {blog.title}
                        </a>
                        </Link>
                      </h5>
                    </div>
                    <div className="post-desc featured-desc">
                      <p>
                        {blog.content.substring(0, 100) + "..."}
                      </p>
                      <Link to={`/blogdetail/${blog.id}`}>
                      <a
                        className="ttm-btn ttm-btn-size-sm ttm-icon-btn-right ttm-btn-color-skincolor btn-inline mb-15"
                        href="#"
                      >
                        READ MORE
                        <i className="ti ti-arrow-right" />
                      </a>
                      </Link>
                    </div>
                  </div>
                </div>
               );
              })}
                {/* featured-imagebox-post end */}
                
              </div>
            </div>
            {/* row end*/}
          </div>
        </section>
        {/*blog-section end*/}
      </div>
      {/*site-main end*/}
    </>
    

    )

    
}

export default Home;
