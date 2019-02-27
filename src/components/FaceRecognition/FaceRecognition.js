import React from "react";
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl , faceBorder}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage'  alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='faceborder' 
                style={{top: faceBorder.topRow , right: faceBorder.rightCol , bottom: faceBorder.bottomRow , left: faceBorder.leftCol}} >
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition ;