import React,{useState} from 'react';
import Navbar from '../Components/Navbar3';
import './Reset.css';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const Reset = ()=>{
    
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom', //bottom
        horizontal: 'left', //left
    });
    const { vertical, horizontal, open } = state;

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        setredir(true);
        return;
      }
      setState({...state,open:false});
      setredir(true);
    };
    const [emailER,setEmailER] = useState(false);
    const [otpER,setotpER] = useState(false);
    const [stage1, setstage1] = useState(false);
    const [stage2, setstage2] = useState(false);
    const [passER,setpassER] = useState(false);
    const [redir,setredir] = useState(false);
    const [prog,setProg] = useState(false);
    const [email,setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpB, setotpB] = useState('');
    const [newPass,setnewPass] = useState('');
    const [dis, setDis] = useState(false);
    const [dis1,setDis1] = useState(false);
    const [count, setCount] = useState(0);

    const updateState = (e)=>{
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }

        if(e.target.name === 'otp'){
            setOtp(e.target.value);
        }

        if(e.target.name === 'password'){
            setnewPass(e.target.value);
        }
    }

    const submitReset = (e)=>{
        e.preventDefault();
        
        setProg(true)
        if(count===0){

            axios.post('https://rsp-backend.herokuapp.com/Reset/email',{
                email
            })
            .then((data)=>{
                
                if(data.data==='NO'){
                    setEmailER(true);
                    setProg(false);
                }
                else{
                    setEmailER(false);
                    setstage1(true);
                    setCount(1);
                    setotpB(data.data.otp);
                    setDis(true);
                    setProg(false);
                }
            })
            .catch((e)=>{
                console.log(e);
            })

        }

        if(count===1){

            if(otp===otpB){
                setotpER(false);
                
                setstage2(true);
                setCount(2);
                setDis1(true);
                setProg(false);
            }
            else{
                setotpER(true);
                
                setProg(false);
            }

        }

        if(count===2){
            
            if(newPass.length > 7){
                
                setpassER(false);

                axios.post('https://rsp-backend.herokuapp.com/Reset/Update',{
                    email,
                    newPass
                })
                .then((data)=>{
                    
                    if(data.data==='Done'){
                        setState({...state,open:true});
                        setProg(false);
                    }
                })
                .catch((e)=>{
                    console.log(e);
                })


            }
            else{
                setpassER(true);
                setProg(false);
            }
        }




    }
    
    if(redir){
        return <Redirect to='/Login' />
    }
    else{

    return(
        <div>
            <div>
                <Navbar />
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <div className="resetMid">
                    <div className="resetMid-1">
                        <div className="resetText">
                            <div><span >Reset your password</span></div>
                            <br></br>
                            
                        </div>
                        
                        <div className="resetText1">
                            <p>Please provide the email address that you used when<br></br> you signed up, we will send you an email that will <br></br> allow you to reset your password.</p>
                        </div>

                        <div>
                            <form>
                                <div className='resetForm'>
                                    <label>Email</label>
                                    <br></br>
                                    <input className='resetEmail' name="email" onChange={(e)=>updateState(e)} type="email" disabled={dis}  required ></input>
                                    <br></br>
                                    <br></br>
                                    {
                                        stage1 ? <div> <label>OTP</label>
                                        <br></br>
                                        <input className='resetEmail' name="otp" onChange={(e)=>updateState(e)} type="text" disabled={dis1} required ></input>
                                        <br></br>
                                        <br></br> </div> : null
                                    }
                                    {
                                        stage2 ? <div> <label>New Password</label>
                                        <br></br>
                                        <input className='resetEmail' name="password" onChange={(e)=>updateState(e)} type="password"  required ></input>
                                        <label style={{fontSize:'small'}}>*Must be {`>`}7 Length</label>
                                        
                                        <br></br> </div> : null
                                    }
                                    
                                </div>
                                <div className="alert_dis">
                                {emailER ? <div className="alerter" style={{margin:'5px' }}><Alert severity="error">This is an error alert — No Account Found!</Alert></div>:null}
                                {otpER ? <div className="alerter" style={{margin:'5px'}}><Alert severity="error">This is an error alert — Wrong OTP!</Alert></div>:null}
                                {passER ? <div className="alerter" style={{margin:'5px'}}><Alert severity="error">This is an error alert — Check Password!</Alert></div>:null}
                                </div>
                                
                                <button type="submit" onClick={(e)=>submitReset(e)} className="submitButton">{prog ? <CircularProgress size={20} style={{color:'white',position:'relative',left:'-50px',top:'3px'}} />: null}Submit</button>
                            
                            </form>
                            <Snackbar open={open} autoHideDuration={5000}  anchorOrigin={{ vertical, horizontal }} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" style={{backgroundColor:'#43a047',color:'white'}}>
                                This is a success message! You will be redirected to Login
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Reset;