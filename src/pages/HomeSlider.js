// src/components/HomeSliderAndSearch.js
import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};

// Reusable component for form fields
const FormField = ({ label, type = 'text', options, placeholder }) => (
    <div className="form-group">
        <label htmlFor="#">{label}</label>
        <div className="form-field">
            {options ? (
                <div className="select-wrap">
                    <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                    <select className="form-control">
                        {options.map((option, index) => (
                            <option key={index} value={option.value || option}>
                                {option.label || option}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <>
                    <div className="icon"><span className="icon-pencil"></span></div>
                    <input type={type} className="form-control" placeholder={placeholder} />
                </>
            )}
        </div>
    </div>
);

// Reusable component for slider items
const SliderItem = ({ backgroundImage, propertyTypes, propertyStatuses, agents, bedOptions, bathroomOptions, priceOptions }) => (
    <section className="ftco-search" style={{ height: "600px", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
        <div className="container">
            <div className="row bgSearchBar">
                <div className="col-md-12 search-wrap">
                    <form action="#" className="search-property">
                        <div className="row">
                            <FormField label="Location" placeholder="City/Locality Name" />
                            <FormField label="Property Type" options={propertyTypes} />
                            <FormField label="Property Status" options={propertyStatuses} />
                            <div className="col-md align-self-end">
                                <div className="form-group">
                                    <div className="form-field">
                                        <input type="submit" value="Search" className="form-control btn btn-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
);

// Main component
const HomeSliderAndSearch = () => {
    const sliderData = [
        {
            backgroundImage: '/images/bg_1.jpg',
            title: 'Florida 5, Pinecrest, FL',
            location: 'Melbourne, Vic 3004',
            description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
            price: '$28,000',
        },
        {
            backgroundImage: '/images/bg_2.jpg',
            title: '3015 Grand Avenue, CocoWalk',
            location: 'Melbourne, Vic 3004',
            description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
            price: '$28,000',
        },
    ];

    const propertyTypes = [
        { label: 'Type', value: '' },
        'Commercial',
        'Residential',
        'Villa',
        'Condominium',
        'Apartment',
    ];

    const propertyStatuses = [
        { label: 'Type', value: '' },
        'Rent',
        'Sale',
    ];

    const agents = [
        { label: 'Any', value: '' },
        'John Doe',
        'Doe Mags',
        'Kenny Scott',
        'Emily Storm',
    ];

    const bedOptions = [1, 2, 3, 4, 5].map(num => ({ label: num, value: num }));
    const bathroomOptions = [1, 2, 3, 4, 5].map(num => ({ label: num, value: num }));
    const priceOptions = ['$1,000', '$5,000', '$10,000', '$50,000', '$100,000', '$200,000', '$300,000', '$400,000', '$500,000', '$600,000', '$700,000', '$800,000', '$900,000', '$1,000,000', '$2,000,000'];

    return (
        <Slider {...settings}>
            {sliderData.map((data, index) => (
                <SliderItem
                    key={index}
                    backgroundImage={data.backgroundImage}
                    propertyTypes={propertyTypes}
                    propertyStatuses={propertyStatuses}
                    agents={agents}
                    bedOptions={bedOptions}
                    bathroomOptions={bathroomOptions}
                    priceOptions={priceOptions}
                />
            ))}
        </Slider>
    );
};

SliderItem.propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    propertyTypes: PropTypes.array.isRequired,
    propertyStatuses: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    bedOptions: PropTypes.array.isRequired,
    bathroomOptions: PropTypes.array.isRequired,
    priceOptions: PropTypes.array.isRequired,
};

export default HomeSliderAndSearch;
