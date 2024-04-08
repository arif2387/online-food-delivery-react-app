import React from 'react';
import {ArrowCircleLeft as ArrowCircleLeftIcon,
    ArrowCircleRight as ArrowCircleRightIcon } from '@mui/icons-material'
import './Heading.css'

export default function Heading(props) {
    return (
        <>
            <div className="header">
                <h1>{props.heading}</h1>
                <div className='Navigation'> <ArrowCircleLeftIcon /><ArrowCircleRightIcon /></div>
            </div>
        </>
    );
}
