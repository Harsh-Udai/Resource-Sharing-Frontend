import React,{ useState} from 'react';
import './upload.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
let Filter = require("bad-words");
const axios = require('axios').default;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const currencies = [
  {
    value: 'Hardware',
    label: 'Hardware',
    
  },
  {
    value: 'Book',
    label: 'Book',
  },
  {
    value: 'PDF/Text',
    label: 'PDF/Text',
  },
  
  {
    value: 'Project',
    label: 'Project',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  root1: {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    paddingTop:'0px',
    paddingLeft:'0px'
    
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    
    width: '25ch',
  },
  textField_1: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50ch',
    [theme.breakpoints.between(573,773)]: {
        width: '30ch',
        
      },
      [theme.breakpoints.between(0,600)]: {
        width: 'auto',
        marginTop:'20px'
      },
  },
  textField_2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '77ch',
    [theme.breakpoints.between(573,773)]: {
        width: '60ch',
        
      },
      [theme.breakpoints.between(0,600)]: {
        width: '40ch',
        marginTop:'20px'
      },
  },
  textField_3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '77ch',
    [theme.breakpoints.between(0,773)]: {
        width: '25ch',
      },
  },
  input: {
    display: 'none',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    
  },
}));


const ResourceUpload = (props)=>{
    
    const refe = React.createRef();
    const filter = new Filter();

    const  vertical = 'bottom';
    const horizontal = 'left';
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setFER(false);
    };
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setS(false);
    };

    const classes = useStyles();
    const [currency, setCurrency] = React.useState('Project');
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    
    const buttonClassname = clsx({
      [classes.buttonSuccess]: success,
    });
  
    
  
    const handleButtonClick = (e) => {
      if (!loading) {
        formApplyR(e)
      }
    };

      /*
      
      Work of BAckend --------------------------------------------------------------------------------------------------
      
      */
      //Data Part
      const owner = (props.main.master_user.user);
      const [Resource_name, setRN] = useState('');
      const [Resource_desc, setRD] = useState('');
      const [image, setImage] = useState('');
      // Error part
      const [re_name_er, setRNE] = useState(false);
      const [re_dec_er, setRDE] = useState(false);
      const [formER, setFER] = useState(false);
      const [succ,setS] = useState(false);
      // Creative part
      const [notiImg, setIMG] = useState(false);
      const [msg, setMsg] = useState('Image Added');
      const [borrowEr,setBER] = useState(false);
      const [borrowEr1,setBER1] = useState(false);
      const [inputDis,setINDIS] = useState(false);
      const [price,setPrice] = useState('');

      const [profanity,setProf] = useState(false);

      const PriceData = (e)=>{
        
        if(e.target.value===''){
          setBER1(false);
          
        }
        else{
          setPrice(e.target.value)
          setBER1(true);
          
        }
      }

      const handleChangeBorrow = (e)=>{
        if(borrowEr){
          setBER(false);
          setINDIS(false)
        }
        else{
          setINDIS(true)
          setBER(true);
        }
        
      }

      const resourceSet = (e)=>{
        
        const name = e.target.value;

        if(filter.isProfane(name)){
          setRNE(true);
          setProf(true);
        
        }
        else{
          setProf(false);
          if(name.length >5){
            setRNE(false);
            setRN(name);
          }
          
          else{
            setRNE(true);
          }
        }
        
      }

      const desc = (e)=>{
        
        const name = e.target.value;
        if(filter.isProfane(name)){
          setRDE(true);
          setProf(true);
        }
        else{
          if(name.length >5){
            setRDE(false);
            setRD(name);
          }
          
          else{
            setRDE(true);
          }
        }
      }

      

      const imageA = (e)=>{
        setIMG(false);
        
        console.log(e.target.files[0]);
        if(e.target.files[0]!==undefined){
          const name = e.target.files[0].name.match(/\.(jpg||jpeg||png)$/)
        

          if(name===null){
            setIMG(false);
            setMsg("Wrong Format try with JPEG or PNG or JPG")
            setIMG(true);
          }
          else{
            console.log("added");
            setMsg("Image Added")
            setIMG(false);
            setImage(e.target.files[0])
            setIMG(true);
          }
  
        }
      }

      const formApplyR = (e)=>{
        e.preventDefault();
          setProf(false);
          setSuccess(false);
          setLoading(true);
          
        if(Resource_name.length>5 && Resource_desc.length>5 && re_name_er===false && re_dec_er===false   && image && ((borrowEr && price==='')||(!borrowEr && price!==''))){
          
          setFER(false);
          
        }
        else{
          
          setFER(true);
          setS(false);
          setSuccess(false);
          setLoading(false);
        }

        if(Resource_name.length>5 && Resource_desc.length>5 && re_name_er===false && re_dec_er===false  && image && ((borrowEr && price==='')||(!borrowEr && price!==''))){
          const formData = new FormData();
          formData.append('resource_Name',Resource_name);
          formData.append('resource_Description',Resource_desc);
          formData.append('owner',owner);
          formData.append('classification',currency);
          formData.append('token_Check',props.main.master_user.token);
          formData.append('image',image);
          formData.append('email',props.main.master_user.email);
          formData.append('borrow',borrowEr);
          formData.append('Price',price);
          const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
          };
          axios.post("http://localhost:5000/uploadResource",formData,config)
              .then((response) => {
                  setS(true)
                  setSuccess(true);
                  setLoading(false);
              }).catch((error) => {
                setS(false);
                
          });  
        }
      }
      /*
      
      Work of BAckend --------------------------------------------------------------------------------------------------
      
      */

      //console.log(props);

    return(
        <div>
            <div className="decor">
              </div>
            <div>
                <div >
                    <p className="first-text">Resource Upload</p>
                </div>
                
                <div className="majorPart">
                    <div className="form">
                    <form autoComplete="off" >
                        <div className={classes.root} > 
                            
                            <TextField
                                    id="outlined-basic"
                                    variant="filled"
                                    label="Owner"
                                    value={owner}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                        }}
                                    
                                />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Resource Name"
                                
                                fullWidth
                                className={classes.textField_1}
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                                onChange={(e)=>resourceSet(e)}
                                error={re_name_er}
                            />
                            
                            <br></br>
                            
                        
                            <TextField
                                id="filled-full-width"
                                label="Description"
                                multiline
                                rows={7}
                                style={{ margin: 8 }}
                                
                                variant="outlined"
                                className={classes.textField_2}
                                onChange={(e)=>desc(e)}
                                error={re_dec_er}
                            />
                            
                            <br></br>
                            
                            <TextField
                                    id="filled-select-currency"
                                    select
                                    style={{marginTop:'10px'}}
                                    className={classes.textField_3}
                                    label="Select"
                                    value={currency}
                                    onChange={handleChange}
                                    helperText="Classification"
                                    variant="outlined"
                                    
                                >
                                    {currencies.map((option) => (
                                    <MenuItem key={option.value}  value={option.value}>
                                        <span ref={refe}>{option.label}</span>
                                    </MenuItem>
                                    ))}

                            </TextField>
                            
                            <br></br>
                            
                                                                         
                            <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap'}}>
                                <div style={{marginTop:'20px'}}>
                                  <input
                                      onChange={(e)=>imageA(e)}
                                      accept="image/*"
                                      className={classes.input}
                                      id="contained-button-file"
                                      type="file"
                                  />
                                  <label htmlFor="contained-button-file">
                                      <Button style={{marginLeft:'10px'}}  variant="contained" size="small" color="primary" startIcon={<CloudUploadIcon />} component="span">
                                      Upload Image
                                      </Button>
                                      
                                  </label>
                                </div>
                                
                                
                                <div style={{paddingTop:'13px'}}>
                                    <FormControlLabel
                                    style={{paddingLeft:'20px'}}
                                      control={
                                        <Checkbox
                                          checked={borrowEr}
                                          onChange={handleChangeBorrow}
                                          name="checkedB"
                                          color="primary"
                                          disabled={borrowEr1}
                                        />
                                      }
                                      label="Borrow Mode"
                                    />
                                </div>
                                
                                <div style={{paddingTop:'7px'}}>
                                  <TextField disabled={inputDis} onChange={(e)=>PriceData(e)} id="outlined-basic" type="number" label="Set Price" variant="outlined" />
                                </div>
                            </div>


                            <br></br>
                            
                            <div ref={refe}>
                                <div className={classes.root1} >
                                    <div className={classes.wrapper}>
                                        <Fab
                                        aria-label="save"
                                        color="primary"
                                        className={buttonClassname}
                                        onClick={handleButtonClick}
                                        
                                        >
                                        {success ? <CheckIcon /> : <SaveIcon />}
                                        </Fab>
                                        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                                    </div>
                                    <div className={classes.wrapper}>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        className={buttonClassname}
                                        disabled={loading}
                                        onClick={handleButtonClick}
                                        
                                        >
                                        Submit 
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>
                                </div>
                            </div>
                            

                          </div>
                        </form>
                    </div>

                    <Snackbar
                      anchorOrigin={{ vertical, horizontal }}
                      open={notiImg}
                      ref={refe}
                      autoHideDuration={6000}
                      
                      message={msg}
                      key={vertical + horizontal}
                    />
                    
                    <Snackbar ref={refe} open={formER} autoHideDuration={6000} onClose={handleClose1}>
                      <Alert onClose={handleClose1} severity="error">
                        Error in Form, fill form with correct detail & description!
                      </Alert>
                    </Snackbar>

                    <Snackbar ref={refe} open={succ} autoHideDuration={6000} onClose={handleClose2}>
                      <Alert onClose={handleClose2} severity="success">
                        Resource Added!!
                      </Alert>
                    </Snackbar>

                    <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={profanity} autoHideDuration={6000} >
                      
                      <Alert  severity="warning">This is a warning message, Profanity is not allowed here!</Alert>
                      
                    </Snackbar>

                    

                </div>
                
            </div>
        </div>
    )
}

export default ResourceUpload;