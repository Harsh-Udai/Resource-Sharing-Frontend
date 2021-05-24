import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Animation(){
    return(
        <div className="main-part-ANIME" style={{position:'fixed',top:'40%',left:'50%',transform:'translate(-50%,-50%)'}}>
            <div >
                <p style={{fontSize:'60%',marginBottom:'-20px'}}><span className="split-2"><span style={{color:"#7DCEA0"}}>R</span>esource <span style={{color:'#F5B041'}}>S</span>haring </span><br></br> </p>
                <CircularProgress style={{color:'#FF7F50'}} />
            </div>
        </div>
    )
}