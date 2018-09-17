import React from 'react';

//Since webpack would change the folders configuration when we
//upload the app we need to import the image instead of using path
//This import makes Webpack aware of that and it will handle img correctly
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;