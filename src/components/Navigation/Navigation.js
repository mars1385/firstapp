import React from "react";

const Navigation = ({onRouteChange , isSignIn}) => {
    if(isSignIn){
        return(
            <nav className='flex justify-end'>
                <p onClick={() => onRouteChange('signin')} 
                className='f3 link dim  black underline pa3 pointer ma1'>Sign Out</p>
            </nav>
        );
    }else {
        return (
            <nav className='flex justify-end'>
                <p onClick={() => onRouteChange('signin')} 
                className='f3 link dim  black underline pa3 pointer ma1'>Sign In</p>
                <p onClick={() => onRouteChange('Register')} 
                className='f3 link dim  black underline pa3 pointer ma1'>Register</p>
            </nav>
        );
        
    }
}


export default Navigation ;