import React, { useState } from 'react';
import Navbar from '../Components/Navbar3';
import './Signup.css';
import image1 from '../Assets/signup.svg';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Redirect} from 'react-router-dom';
const axios = require('axios').default;

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
   
    value: PropTypes.number.isRequired,
  };


const Signup = ()=>{
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom', //bottom
        horizontal: 'left', //left
    });
    const { vertical, horizontal, open } = state;
    const [redir,setredir] = useState(false);
    const handleClose5 = (event, reason) => {
        if (reason === 'clickaway') {
          setredir(true);
          return;
        }
        setState({...state,open:false});
        setredir(true);
    };


    const [stateSnack, setStateSnack] = React.useState({
        open: false,
        Transition: Fade,
      });
    const [stateSnack1, setStateSnack1] = React.useState({
        open: false,
        Transition: Fade,
    });
    const handleClose = () => {
        setStateSnack({
        ...stateSnack,
        open: false,
    });
    };
    const handleClose1 = () => {
        setStateSnack1({
        ...stateSnack1,
        open: false,
    });
    };
    const [progress, setProgress] = React.useState(1);
    //const classes = useStyles();
    const [display, setDisplay] = useState(false);
    const [displayStage1, setDisplayStage1] = useState(false);
    const [emailRead, setEmailRead] = useState(false);
    const [otpRead, setOtpRead] = useState(false);

    const [email, SetEmail] = useState('');
    const [username,setUser] = useState('');
    const [password,setPass] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [userError, setuserError] = useState(false);
    const [passwordError, setPassError] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [AlreadyError, setAlready] = useState(false);
    const [ServerError,setServer] = useState(false);

    const [otp,setOtp] = useState('');
    const [count, setCount] = useState(0);
    const [buttonText, setbuttonText] = useState('Signup with Email');
    const [userOtp, setuserOtp] = useState('');
    const [marginSetter,setMG] = useState('');
    const [progRess, setProg] = useState(true);
    const [progRess1, setProg1] = useState(false);
    

    let emailField = "emailField";
    //const msg = 'Check email'

    const hasNumber= (myString)=> {
        return /\d/.test(myString);
    }

    const emailCheck = (e)=>{
        SetEmail(e.target.value);
    }

    const userOTP = (e)=>{
        setuserOtp(e.target.value);
    }

    const userName = (e)=>{
        setUser(e.target.value);
    }
    const Password = (e)=>{
        setPass(e.target.value);
    }

    const emailMark = (val)=>{
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (regexEmail.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    const formSubmit = (e)=>{
        e.preventDefault();
        setServer(false);
        if(!emailMark(email)){
            setEmailError(true);
            
        }
        else{
            
            setEmailError(false);
            
            if(count===0){
                
                setProg1(true)
                axios.post('https://rsp-backend.herokuapp.com/Signup/email',{
                    email: email
                })
                .then((data)=>{
                    
                    if(data.data==='Already'){
                        setAlready(true);
                        setProg1(false)
                    }
                    else{
                        setEmailRead(true);
                        setStateSnack({open:true})
                        setProgress(10)
                        setAlready(false);
                        setOtp(data.data.otp)
                        SetEmail(email)
                        setDisplay(true);
                        setbuttonText('Submit OTP')
                        setCount(1);
                        setProg1(false)
                    }
                    
                    
                })
                .catch((err)=>{
                    setProg1(false)
                    setServer(true);
                })
                
                
            }

            if(count===1){
                setProg1(true)
                
                if(userOtp===otp){
                    setProgress(45);
                    setOtpError(false);
                    setProg1(false)
                    setOtpRead(true);
                    setStateSnack1({open:true});
                    setDisplayStage1(true);
                    setMG('-1');
                    setCount(2);
                    setbuttonText('Submit');
                }
                else{
                    setProg1(false)
                    setOtpError(true);
                }

            }

            if(count===2){
                setProg1(true)
                if(hasNumber(username)){
                    setuserError(true);
                    setProgress(75);
                }
                else{
                    setuserError(false);
                }

                if(password.length <=7 ){
                    
                    setPassError(true);
                }
                else{
                    setProgress(95);
                    setPassError(false);
                }

                if(!hasNumber(username) && password.length>7){
                    setProgress(100);
                    setProg(false);
                    
                    axios.post('https://rsp-backend.herokuapp.com/users/create',{
                        name: username,
                        email: email,
                        password: password
                    })
                    .then((data)=>{
                        setServer(false);
                        setbuttonText('Please Wait');
                        setProg1(false)
                        setState({...state,open:true});
                    })
                    .catch((e)=>{
                        setServer(true);
                        setProg1(false);
                    })


                }

            }

        }

    }
    if(redir){
        return <Redirect to='/Login' />
    }
    return(
        <div>
            <Navbar />
            <div className="content">
                <div className="page-setter" >
                    <div >
                        <br></br>
                        <br></br>
                        <br></br> 
                        <img className="mobile_image-contentSignup" src={image1} alt="alt" width="450px"></img>
                        <div className="text-part">
                            <p>Sign up</p>
                        </div>
                    </div>

                    <div className={`formMajor${marginSetter}`}>
                        <form >
                        
                            <div className="formPart">
                                <label>Email</label>
                                <br></br>
                                <input className={emailField} type="email" onChange={(e)=>emailCheck(e)} required disabled={emailRead}></input>
                                <br></br>
                                
                                <div style={{display: display ? 'inline' : 'none'}}>
                                    
                                    <br></br>
                                    <label>OTP</label>
                                    <br></br>
                                    <input onChange={(e)=>userOTP(e)} className="emailField" type="text" required disabled={otpRead}></input>
                                    <br></br>
                                </div>
                                <br></br>
                                
                                <div style={{display: displayStage1 ? 'inline' : 'none'}}>
                                    <label>Username</label>
                                    <br></br>
                                    <input onChange={(e)=>userName(e)}  className="emailField" type="text" required></input>
                                    <label style={{fontSize:'small'}}>*Must be Alphabetic</label>
                                    <br></br>
                                    <br></br>
                                    <label>Password</label>
                                    <br></br>
                                    <input onChange={(e)=>Password(e)} className="emailField" type="password" required></input>
                                    <label style={{fontSize:'small'}}>*Must be {`>`}7 Length</label>
                                    <br></br>
                                    <br></br>
                                </div>
                                
                            </div>
                            
                            {emailError ? <div><br></br><Alert severity="error">This is an error alert — check Email</Alert></div>: null}
                            {userError ? <div><br></br><Alert severity="error">This is an error alert — check Username</Alert></div>: null}
                            {passwordError ? <div><br></br><Alert severity="error">This is an error alert — check Password</Alert></div>: null}
                            {otpError ? <div><br></br><Alert severity="error">This is an error alert — check OTP</Alert></div>: null}
                            {AlreadyError ? <div><br></br><Alert severity="error">Email Already in Use</Alert></div>: null}
                            {ServerError ? <div><br></br><Alert severity="error">Server Error</Alert></div>: null}
                            <button onClick={(e)=>formSubmit(e)} type="submit" className="submitButton">{progRess1 ? <CircularProgress size={20} style={{color:'white',position:'relative',left:'-50px',top:'3px'}} />: null}{buttonText}</button>
                            
                        </form> 
                        
                        <div className="prog_mobile" style={{alignContent: 'center'}}>
                            {progRess ? <CircularProgressWithLabel value={progress} /> : <CircularProgress />}
                        </div>
                    </div>
                    
                    <Snackbar
                        open={stateSnack.open}
                        onClose={handleClose}
                        autoHideDuration={5000}
                        TransitionComponent={stateSnack.Transition}
                        message="OTP is coming to your Inbox"
                        key={stateSnack.Transition}
                    />
                    
                    <Snackbar open={stateSnack1.open} autoHideDuration={5000} onClose={handleClose1}>
                        <Alert onClose={handleClose1} severity="success">
                        This is a success message!
                        </Alert>
                    </Snackbar>

                    <Snackbar open={open} autoHideDuration={5000}  anchorOrigin={{ vertical, horizontal }} onClose={handleClose5}>
                        <Alert onClose={handleClose5} severity="success" style={{backgroundColor:'#43a047',color:'white'}}>
                        This is a success message! You will be redirected to Login
                        </Alert>
                    </Snackbar>
                    
                    </div>
                </div>
        </div>  
    )
}

export default Signup;
