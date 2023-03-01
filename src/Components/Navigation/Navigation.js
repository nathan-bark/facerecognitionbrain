import React from "react";
import './Navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return (
        <nav className="nav">
            <p 
            className="f3 pa3 link dim underline pointer "
            onClick={() => onRouteChange('signin')}
            >Sign Out</p>
        </nav>
    );
    } else {
        return (
            <nav className="nav">
            <p 
            className="f3 pa3 link dim underline pointer "
            onClick={() => onRouteChange('signin')}
            >Sign In</p>
            <p 
            className="f3 pa3 link dim underline pointer "
            onClick={() => onRouteChange('register')}
            >Register</p>
        </nav>

        )
    }
    
}

export default Navigation;