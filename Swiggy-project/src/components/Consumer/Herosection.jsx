import React from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Logo from '../../assets/Swiggy_logo.png';
import '../../styles/hero.css';
import { Link } from 'react-router-dom';
const Hero = ({ openDrawer }) => {
    return (
        <div className="herosection">
            <div className="hero-subsec">
                <div className="hsec1">
                    <Link to='/'><img className="logo" src={Logo} alt="swiggylogo" /></Link>
                    <div className="button-sect">
                        <button onClick={openDrawer('right', true)} className='login-btn'>Login</button>
                        <button onClick={openDrawer('right', true)} className='sign-up-btn'>Sign up</button>
                    </div>
                </div>
                <div className="hsec2">
                    <h1 className="heading-hsec2"><span className="animation-heading"></span></h1>
                    <p className="dull-text">Order food from favourite restaurants near you.</p>
                </div>
                <div className="hsec3">
                    <div className="input-container">
                        <div className="inputPlocate">
                            <input className="input-box" type="text" placeholder="Enter your delivery location" />
                            <div className="locate-btn">
                                < GpsFixedIcon />
                                <span> &nbsp; &nbsp;Locate Me</span>
                            </div>
                        </div>
                        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                            <button className='find-food-btn' >Find Food</button>
                        </Link>
                    </div>
                </div>
                <div className="hsec4">
                    <h3 className="hsec4-h3">POPULAR CITIES IN INDIA</h3>
                    <ul className="list-para">
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Ahmedabad</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Bangalore</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Chennai</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Delhi</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Gurgaon</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Hyderabad</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Kolkata</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Mumbai</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">Pune</a></li>
                        <li className="list-content-hsec4"><a className="list-item-hsec4" href="#city">& more</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Hero;
