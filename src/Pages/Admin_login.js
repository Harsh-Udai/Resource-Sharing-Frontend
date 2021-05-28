import React,{useState} from 'react';
import Navbar3 from '../Components/Navbar3';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect} from 'react-router-dom';
import './admin.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Adm_login(props) {

    const [wrong,setWrong] = useState(false);
    const [prog,setProg] = useState(false);
    const [data_f,setDF] = useState('');
    const [chan,setChan] = useState(false);

    const admin_check = (e)=>{
        
        e.preventDefault();
        setProg(true);
        axios.post('http://localhost:5000/auth/admin',{
            token: data_f
        })
        .then((data)=>{
            if(data.data.msg==='wrong'){
                setWrong(true);

            }
            else{
                setWrong(false);
                props.setAdmin(data.data.msg);
                setChan(true);
            }
            setProg(false);
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    if(chan){
        return <Redirect to='/auth/admin' />
    }

    
    return(
        <div>
            <Navbar3 />

                <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{textAlign:'center',marginTop:'100px',paddingTop:'20px',backgroundColor:'#F2F3F4',borderRadius:'5px',borderLeft:'10px solid #F7DC6F',width:'70%'}}>
                    <p className="font1" style={{fontSize:'220%'}}><span style={{backgroundColor:'#7DCEA0',color:'white',paddingLeft:'5px',paddingRight:'5px'}}>Enter Access Token</span></p>
                    <div style={{alignItems:'center',marginTop:'0px',marginBottom:'80px'}}>
                        <form onSubmit={admin_check}>
                            <input type="password" onChange={(e)=>setDF(e.target.value)} style={{width:'400px'}} className="emailField" placeholder="Type here"></input>
                            <br></br>
                            <button style={{width:'150px',border:'none'}} onClick={admin_check} className="submitButton">{prog ? <CircularProgress size={20} style={{color:'white',marginTop:'5px'}} />: "Login"}</button>
                        </form>
                    </div>
                </div>
                </div>
           

            {wrong ? <div style={{textAlign:'center',marginBottom:'80px'}}>
            <Snackbar open={wrong} autoHideDuration={6000} onClose={()=>{setWrong(false)}}>
                <Alert  severity="error">
                    This is a error message, Wrong Access Token!
                </Alert>
            </Snackbar>
            </div>: null}

        </div>
    )
}