import React from 'react';
import { Link } from "react-router-dom";

import './styles.css';

const MyLink = ({ route, children }) =>
(
    <Link className="my-link" to={route}>
        {children}
    </Link>
);


export default MyLink;