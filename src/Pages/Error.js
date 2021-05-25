import React from 'react';
import './error.css';
import er_img from '../Assets/ufo1.png';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export default function Error() {
    return(
        <div>
            <div className="er_main font1 ">
                <span style={{fontSize:'800%'}}>4</span><img alt="." className="main-part-2-error" width="180px" src={er_img}></img><span style={{fontSize:'800%'}}>4</span>
                <div>
                    <p style={{fontSize:'200%'}}>uuh, Page not found!</p>
                    <Button href="/"><ArrowBackIosIcon /><span className="font1" style={{fontSize:'120%',color:'#27AE60'}}>Back to Home</span></Button>
                </div>
            </div>
        </div>
    )
}