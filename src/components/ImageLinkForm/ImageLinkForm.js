import React from "react";
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange , onButtonSubmit}) => {
    return (
        <div className='f3'>
            <p className='me'>{'This is face detection app . give it a try'}</p>
            <div className='center formSize'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f3 center pa2 w-70' onChange={onInputChange}/>
                    <button 
                    className='f4 w-30 grow link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>
                    {'Detect'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm ;