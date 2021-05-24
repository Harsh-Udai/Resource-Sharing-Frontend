import React from 'react';
import Navbar from '../Components/Navbar';
import imag from '../Assets/spot-moon.png'
import imag1 from '../Assets/spot-fireworks-1.png';
import imag2 from '../Assets/clip.png';
import imag3 from '../Assets/clip-1394.png';
import imag4 from '../Assets/spot-rocket.png';
import HomeAlert from '../Components/Home_alert';
import './Home.css';

const Home = (props) => {
    
    const wrapper = React.createRef();

    

    return(
        <div ref={wrapper}>
            <div>
                <div>
                    <Navbar />
                </div>
                <div  className="master">
                    <div className="object-2">
                        <div>
                            <img src={imag} width="40px" alt="imag"></img>
                        </div>
                    </div>
                    <div className="main-part-1" >
                        <div style={{marginBottom:'15px'}}>
                            <p>Welcome to <br></br><span className="split-2"><span style={{color:"#7DCEA0"}}>R</span>esource <span style={{color:'#F5B041'}}>S</span>haring </span>Platform <span><br></br></span></p>
                            <div style={{marginTop:'-100px',marginBottom:'100px'}}><HomeAlert /></div>
                        </div>
                    </div>
                    <div className="main-part-2"> 
                        <div>
                            <img src={imag1} width="200px" alt="imag1"></img>
                        </div>
                    </div>
                    <div>
                        <div className="text-part-2">
                            <p style={{textAlign:'center'}}>A place where you can<br></br> <span style={{backgroundColor:'#7DCEA0'}}>Find,</span> <span style={{backgroundColor:'#F5B041'}}>Borrow</span> & <span style={{backgroundColor:'#85C1E9'}}>Upload</span> your Resources</p>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <div >
                            <div className="content-phase-2">
                                <div className="texter-1">
                                    <p style={{backgroundColor:'#F1948A',color:'white'}}>Easily Upload your resources</p>
                                </div>
                                <div className="image-content">
                                    <img src={imag2} alt="imag2" width="550px"></img>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="content-phase-2">
                                
                                <div className="image-content">
                                    <img className="hook" alt="imag4" src={imag4} width="30px"></img>
                                    <img src={imag3} alt="imag3" width="500px"></img>
                                    
                                    
                                    
                                </div>
                                <div className="texter-1">
                                    <p style={{backgroundColor:'#7FB3D5',color:'white'}}>Easily Find & Buy/Borrow Resources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Home;