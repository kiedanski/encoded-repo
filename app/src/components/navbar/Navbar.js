import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link } from "react-router-dom";


function Navbar() {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" >
                    Dashboard
                </Typography>
                <div >
                    <Link to="/" >
                        Home
                    </Link>
                    <Link to="/forecast" >
                        Intensity Forecast
                    </Link>
                    <Link to="/generation" >
                        Generation Mix
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;