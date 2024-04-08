import React from 'react';
import '../../styles/features.css';
import Fesec1 from '../../assets/fesec1.png';
import Fesec2 from '../../assets/fesec2.png';
import Fesec3 from '../../assets/fesec3.png';

const FeaturesSection = (props) => {
    return (
        <div className="fesec">
            <div className="fesec-img">
                <img className="fesec-imgtag" src={props.img} style={{ aspectRatio: "auto", width: props.width }} />
            </div>
            <div className="fesec-heading">
                {props.heading}
            </div>
            <div className="fesec-text">
                {props.textcon}
            </div>
        </div>
    );
}

const Features = () => {
    return (
        <div className="features">
            <div className="features-container">
                <FeaturesSection img={Fesec1} heading={'No Minimum Order'} textcon={'Order in for yourself or for the group, with no restrictions on order value'} width={'105px'} />
                <FeaturesSection img={Fesec2} heading={'Live Order Tracking'} textcon={'Know where your order is at all times, from the restaurant to your doorstep'} width={'112px'} />
                <FeaturesSection img={Fesec3} heading={'Lightning-Fast Delivery'} textcon={"Experience Swiggy's superfast delivery for food delivered fresh & on time"} width={'124px'} />
            </div>
        </div>
    );
}

export default Features;
