import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const CardSkeleton = () => {
    return (
        <>
            <Box sx={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap', gap:'2rem'}}>
                {Array.from(new Array(10)).map((item, index) => (
                    <Box key={index} sx={{  }}>
                        <Skeleton variant="rectangular" width={310} height={218} sx={{borderRadius:'10px'}}/>
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton width="60%" />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default CardSkeleton;
