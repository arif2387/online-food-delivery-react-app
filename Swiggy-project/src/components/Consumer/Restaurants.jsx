import React from 'react';
import '../../styles/restaurants.css';
import GPLAY from '../../assets/gplay.png';
import ASTORE from '../../assets/appstore.png';
import IMG1 from '../../assets/rsec1.png';
import IMG2 from '../../assets/rsec2.png';

const Rsec = () => {
    return (
        <div className="rsec1">
            <h1 className="rsec-h1">Restaurants in</h1>
            <h1 className="rsec-h1">your pocket</h1>
            <p className="rsec-p">Order from your favorite restaurants & track on the go, with the all-new Swiggy app.</p>
            <div className="rsec-img2">
                <img className="rsec-images2" src={GPLAY} alt="gplay" style={{ marginRight: "20px" }} />
                <img className="rsec-images2" src={ASTORE} alt="ios" />
            </div>
        </div>
    );
};

const Restaurants = () => {
    return (
        <div className="restaurants">
            <Rsec />
            <div className="rsec2">
                <img className="img-rsec1" src={IMG2} alt="restaurant1" />
                <img className="img-rsec2" src={IMG1} alt="restaurant2" />
            </div>
        </div>
    );
};

export default Restaurants;
