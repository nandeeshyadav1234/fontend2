import React from 'react';
import ProductGrid from './ProductGrid';

const Property = () => {
      
  return (
    <>
      <div className="hero-wrap" style={{ backgroundImage: "url('/images/bg_1.jpg')" }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 ftco-animate text-center">
              <p className="breadcrumbs">
                <span className="mr-2"><a href="index.html">Home</a></span> <span>About</span>
              </p>
              <h1 className="mb-3 bread">About</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="ftco-section ftc-no-pb">
      <div className="container">
      <ProductGrid />
      </div>
      </section>
      
    </>
  );
};

export default Property;
