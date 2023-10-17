import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick'; // You need to install the 'react-slick' package
import MainStreamContext from '../context/mainStreamContext/mainStreamContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../styles/UserStream.css'; // Your custom CSS for styling
import UserVideo from './UserVideo';



const UserStreamContainer = (props) => {
    const {users, localTracks} = props;
    const mainStreamcontext = useContext(MainStreamContext);
const {mainStream, setMainStream, setStreamReady} = mainStreamcontext;
   useEffect(()=>{
    setMainStream(localTracks[1]);
    setStreamReady(true);
   },[])
    const settings = {
        infinite:false,
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
                {(mainStream != localTracks[1]) && <UserVideo track={localTracks[1]}/>}
                {
                    users.length>0 && users.map((user) => {
                        if(user.videoTrack && mainStream !== user.videoTrack){
                            console.log(user.uid, user.videoTrack);
                            return <UserVideo key={user.uid} track={user.videoTrack}/>
                        }
                        else return null
                    })
                }
            </Slider>
        </div>
    );
};

export default UserStreamContainer;
