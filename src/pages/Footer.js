import React from 'react';
import Newsletter from './Newsletter';
const Footer = () => (
    <><Newsletter /><footer className="ftco-footer ftco-bg-dark ftco-section">
        <div className="container">
            <div className="row mb-5">
                <div className="col-md">
                    <div className="ftco-footer-widget mb-4">
                        <h2 className="ftco-heading-2">Royalestate</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                            <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                            <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                            <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md">
                    <div className="ftco-footer-widget mb-4 ml-md-5">
                        <h2 className="ftco-heading-2">Buy</h2>
                        <ul className="list-unstyled">
                            <li><a href="#" className="py-2 d-block">Home For Sale</a></li>
                            <li><a href="#" className="py-2 d-block">Open Houses</a></li>
                            <li><a href="#" className="py-2 d-block">New Listing</a></li>
                            <li><a href="#" className="py-2 d-block">Recently Reduced</a></li>
                            <li><a href="#" className="py-2 d-block">Off-Market Homes</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md">
                    <div className="ftco-footer-widget mb-4">
                        <h2 className="ftco-heading-2">Sell</h2>
                        <ul className="list-unstyled">
                            <li><a href="#" className="py-2 d-block">Sell Your Home</a></li>
                            <li><a href="#" className="py-2 d-block">Get A Home Valuation</a></li>
                            <li><a href="#" className="py-2 d-block">Local Home Prices</a></li>
                            <li><a href="#" className="py-2 d-block">Guides &amp; Rules</a></li>
                            <li><a href="#" className="py-2 d-block">Others</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md">
                    <div className="ftco-footer-widget mb-4">
                        <h2 className="ftco-heading-2">Have a Question?</h2>
                        <div className="block-23 mb-3">
                            <ul>
                                <li><span className="icon icon-map-marker"></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                <li><a href="#"><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
                                <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@yourdomain.com</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                    </p>
                </div>
            </div>
        </div>
    </footer></>
);

export default Footer;
