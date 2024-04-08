import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const EmptyCartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh;
`

const HeadingText = styled.h4`
    margin-top: 24px;
    font-size: 20px;
    font-weight: 600;
    color: #535665;
`

const SubHeading = styled.p`
    margin-top: 8px;
    color: #7e808c;
`
const SeeRestaurant = styled.button`
    margin-top: 30px;
    padding: 11px 20px;
    text-transform: uppercase;
    background-color: #fc8019;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    border: 0;
    outline: 0;
    font-size: 15px;
    text-align: center;
    -ms-transform: translateY(0);
    transform: translateY(0);
    transition: transform .8s cubic-bezier(.2,1,.2,1);

`
const EmptyCart = () => {
    return (
        <>
            <EmptyCartContainer>
                <img style={{height:'200px'}} src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="emptyCartImage" />
                <HeadingText>Your cart is empty</HeadingText>
                <SubHeading>You can go to home page to view more restaurants</SubHeading>
                <Link to='/'><SeeRestaurant>See restaurants near you</SeeRestaurant></Link>
            </EmptyCartContainer>
        </>
    )
}

export default EmptyCart
