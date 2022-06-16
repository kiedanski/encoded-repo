import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


import MyLink from '../MyLink';


const Navbar = () =>
(
    <AppBar position="static">
        <Toolbar>
            <div >
                <MyLink route="/" >
                    Home
                </MyLink>
                <MyLink route="/forecast" >
                    Intensity Forecast
                </MyLink>
                <MyLink route="/generation" >
                    Generation Mix
                </MyLink>
            </div>
        </Toolbar>
    </AppBar>
);


export default Navbar;