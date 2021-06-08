import React from 'react';
import Navbar from '../Components/Navbar3';
import imag from '../Assets/spot-moon.png'
import imag1 from '../Assets/spot-fireworks-1.png';
import imag2 from '../Assets/clip.png';
import imag3 from '../Assets/clip-1394.png';
import imag4 from '../Assets/spot-rocket.png';
import HomeAlert from '../Components/Home_alert';
import './Home.css';
import share_i from '../Assets/social-media.png';

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
                        <div style={{marginBottom:'15px',textAlign:'center'}}>
                            <p style={{textAlign:'center'}} className="font1"><span style={{backgroundColor:'#9FE2BF',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Welcome</span> to <br></br><span className="split-2"><span style={{color:"#7DCEA0"}}>R</span>esource <span style={{color:'#F5B041'}}>S</span>haring </span><span style={{backgroundColor:'#F7DC6F',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Platform</span> <span><br></br></span></p>
                            <div style={{marginTop:'-90px',marginBottom:'140px'}}><HomeAlert /></div>
                        </div>
                    </div>
                    <div className="main-part-2"> 
                        <div>
                            <img src={imag1} width="200px" alt="imag1"></img>
                        </div>
                    </div>
                    
                    <div>
                        <div className="text-part-2">
                            <p style={{textAlign:'center'}}>A place where you can<br></br> <span style={{backgroundColor:'#7DCEA0',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Find,</span> <span style={{backgroundColor:'#F5B041',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Borrow</span> & <span style={{backgroundColor:'#85C1E9',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Upload</span> your Resources</p>
                            
                        </div>
                        
                    </div>
                    
                    <br></br>
                    <div>
                        <div >
                            <div className="content-phase-2">
                                <div className="texter-1">
                                    <p style={{backgroundColor:'#F1948A',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Easily Upload your resources</p>
                                </div>
                                <div className="image-content">
                                    <img className="mobile_image-content" src={imag2} alt="imag2" width="550px"></img>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="content-phase-2">
                                
                                <div className="image-content">
                                    <img className="hook" alt="imag4" src={imag4} width="30px"></img>
                                    <img className="mobile_image-content" src={imag3} alt="imag3" width="450px"></img>
                                    
                                    
                                    
                                </div>
                                <div className="texter-1">
                                    <p style={{backgroundColor:'#7FB3D5',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Easily Find & Buy/Borrow Resources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className="footer_home" style={{marginTop:'80px'}}>
                        <img width="100px" alt="." src={share_i}></img>
                        <div className="footer_home_flex"> 
                            <div className="footer_home_card" >
                                <p className="footer_home_card_text">Sharing is Caring !</p>
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