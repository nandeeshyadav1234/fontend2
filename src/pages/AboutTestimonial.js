// Testimony.js
import React from 'react';
import OwlCarousel from 'react-owl-carousel'; // Ensure you have the react-owl-carousel package installed
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const testimonials = [
  {
    image: 'person_1.jpg',
    text: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    name: 'Roger Scott',
    position: 'Clients'
  },
  {
    image: 'person_2.jpg',
    text: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    name: 'Roger Scott',
    position: 'Agent'
  },
  {
    image: 'person_3.jpg',
    text: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    name: 'Roger Scott',
    position: 'Client'
  }
  // Add more testimonials as needed
];

const Testimony = () => {
  return (
    <section className="ftco-section testimony-section bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 ftco-animate">
            <div className="row ftco-animate">
              <div className="col-md-12">
                <OwlCarousel className="carousel-testimony owl-carousel ftco-owl" items={1} loop autoplay autoplayTimeout={3000} autoplayHoverPause>
                  {testimonials.map((testimonial, index) => (
                    <div className="item" key={index}>
                      <div className="testimony-wrap py-4 pb-5">
                        <div
                          className="user-img mb-4"
                          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${testimonial.image})` }}
                        >
                          <span className="quote d-flex align-items-center justify-content-center">
                            <i className="icon-quote-left"></i>
                          </span>
                        </div>
                        <div className="text text-center">
                          <p className="mb-4">{testimonial.text}</p>
                          <p className="name">{testimonial.name}</p>
                          <span className="position">{testimonial.position}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
