import React from 'react';
import Slider from 'react-slick'; // You need to install the 'react-slick' package

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../styles/UserStream.css'; // Your custom CSS for styling
import UserVideo from './UserVideo';

const UserStreamContainer = () => {
    const settings = {
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1385, // Adjust as needed
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1032, // Adjust as needed
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 688, // Adjust as needed
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        prevArrow: <button className="slick-prev">Previous</button>,
        nextArrow: <button className="slick-next">Next</button>,
        // Other slick options
    };

    return (
        <div className="userStreams">
            <Slider {...settings}>
                <UserVideo/>
                <UserVideo/>
                <UserVideo/>
                <UserVideo/>
                <UserVideo/>
            
            </Slider>
        </div>
    );
};

export default UserStreamContainer;
