import React,{ useState,useEffect} from 'react';
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
import Switch from '@material-ui/core/Switch';
import LinearProgress from '@material-ui/core/LinearProgress';
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

  const [imageBack, setImageBack] = useState('');
  const [originalName,setOrgName] = useState('');
  const [uuid,setUID] = useState('');
  const [resQ,setresQ] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [cc,setCC] = useState(0);
  const handleQueue = (e)=>{
    setresQ(e.target.checked);
  }
    
  useEffect(()=>{
    const abortController = new AbortController();
      
    if(cc===0){
      axios.post('https://rsp-backend.herokuapp.com/ResourceFindUpdate',({
        Name:props.Name,
        Email:props.main.master_user.email,
        unique_id:props.unique_id
      }),{
        headers:{
            'Authorization': `Bearer ${props.main.master_user.token}`
        }
      })
      .then((data)=>{
        setCC(1);
        setUID(data.data.unique_id)
        
        setLoaded(false)
        setOrgName(data.data.name)
        setRN(data.data.name)
        setRD(data.data.desc)
        setCurrency(data.data.classification)
        setImageBack(data.data.image);
        if(data.data.borrow){
          setBER(data.data.borrow)
          setINDIS(true);
        }
        else{
          setPrice(data.data.price);
          setBER1(true);
        }
        
      })
      .catch((er)=>{
        console.log(er);
      })
    }
    

    return () => {
      abortController.abort();
  };

  })

    
    
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
    closer();
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
        setPrice('')
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
          setPrice('')
        }
        
      }

      const resourceSet = (e)=>{
        setRN('')
        const name = e.target.value;
        const name1 = name;

        if(filter.isProfane(name1)){
          setRNE(true);
          setProf(true);
          setRN(name);
          
        }
        else{
          setProf(false);
          if(name.length >5){
            setRNE(false);
            setRN(name);
          }
          
          else{
            setRN(name);
            setRNE(true);
          }
        }
      }

      const desc = (e)=>{
        setRD('')
        const name = e.target.value;
        const name1 = name;
        
        if(filter.isProfane(name1)){
          setRDE(true);
          setProf(true);
          setRD(name);
        }
        else{
          if(name.length >5){
            setRDE(false);
            setRD(name);
          }
          
          else{
            setRD(name);
            setRDE(true);
          }
        }
      }

      

      const imageA = (e)=>{
        setIMG(false);

        if(e.target.files[0]!==undefined){
        const name = e.target.files[0].name.match(/\.(jpg||jpeg||png)$/)
        

        if(name===null){
          setIMG(false);
          setMsg("Wrong Format try with JPEG or PNG or JPG")
          setIMG(true);
        }
        else{
          setMsg("Image Added")
          setIMG(false);
          setImage(e.target.files[0])
         
          setIMG(true);


          let reader = new FileReader();
          let file = e.target.files[0];

          reader.onloadend = () => {
            setURL(reader.result);
          }

          reader.readAsDataURL(file)


        }
      }       
      }

      const [imageUrl, setURL] = useState('');
      const formApplyR = (e)=>{
        e.preventDefault();
        setProf(false);
        setSuccess(false);
        setLoading(true);
        

        if(Resource_name.length>5 && re_name_er===false && re_dec_er===false && Resource_desc.length>5 && (image!=='' || imageBack!=='') && ((borrowEr && price==='')||(!borrowEr && price!==''))){
          
          setFER(false);
          
        }
        else{
          
          setFER(true);
          setS(false);
          setSuccess(false);
          setLoading(false);
        }
        // console.log(Resource_name,Resource_desc,image,borrowEr,price,imageBack)
        //   console.log("image",image,typeof(image),image==='')
        //   console.log("price",price,typeof(price),price==='')
        //   console.log(imageBack!=='')

        if(Resource_name.length>5 && re_name_er===false && re_dec_er===false && Resource_desc.length>5 && (image!=='' || imageBack!=='') && ((borrowEr && price==='')||(!borrowEr && price!==''))){
          const formData = new FormData();
          formData.append('OriginalName',originalName)
          formData.append('resource_Name',Resource_name);
          formData.append('resource_Description',Resource_desc);
          formData.append('owner',owner);
          formData.append('classification',currency);
          formData.append('token_Check',props.main.master_user.token);
          formData.append('image',image);
          formData.append('email',props.main.master_user.email);
          formData.append('QDel',resQ);
          formData.append('borrow',borrowEr);
          formData.append('Price',price);
          formData.append('unique_id',uuid)
          const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${props.main.master_user.token}`
            }
          };
          axios.post("https://rsp-backend.herokuapp.com/ResourceFindUpdateRefresh",formData,config)
              .then((response) => {
                  setS(true)
                  setSuccess(true);
                  setLoading(false);
                  props.danger();
              }).catch((error) => {
                setS(false);
                
          });  

        }
      }
      /*
      
      Work of BAckend --------------------------------------------------------------------------------------------------
      
      */
    
      const closer = ()=>{
        return props.closer(false)
      }
   
    return(
        <div >
            <div className="decor">
              </div>
            <div>
                <div >
                    <p className="first-text">Resource Update</p>
                </div>
                {loaded ? <LinearProgress /> :
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
                                value={Resource_name}
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
                                value={Resource_desc}
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
                                    <MenuItem key={option.value} ref={refe} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}

                            </TextField>
                            
                            <br></br>
                            <br></br>
                            <div style={{marginLeft:'36px'}}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={resQ}
                                      onChange={handleQueue}
                                      name="checkedB"
                                      color="primary"
                                    />
                                  }
                                  label="Clear Resource Queue"
                                />
                            </div>
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
                                      Change Image
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
                                  <TextField disabled={inputDis} value={price} onChange={(e)=>PriceData(e)} id="outlined-basic" type="number" label="Set Price" variant="outlined" />
                                </div>
                            </div>
                            <br></br>
                            <div>
                              {imageUrl==='' ? <img alt="taggg-1" src={`data:image/png;base64,`+new Buffer.from(imageBack).toString("base64")} /> : null}
                              {imageUrl!=='' ?  <img src={imageUrl} alt="taggg-2" width="50%"></img> : null}
                             
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
                                        variant="outlined"
                                        color="Default"
                                        onClick={handleButtonClick}
                                        style={{marginRight:'10px'}}
                                        >
                                        Update 
                                        </Button>
                                        <Button variant="outlined" color="default" onClick={closer}>Close</Button>
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
                        Error in Form, fill correctly!
                      </Alert>
                    </Snackbar>

                    <Snackbar ref={refe} open={succ} autoHideDuration={2500} onClose={handleClose2}>
                      <Alert onClose={handleClose2} severity="success">
                        Resource Updated
                      </Alert>
                    </Snackbar>

                    <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={profanity} autoHideDuration={6000} >
                      
                      <Alert  severity="warning">This is a warning message, Profanity is not allowed here!</Alert>
                      
                    </Snackbar>

                </div>}
            </div> 
        </div>
    )
}

export default ResourceUpload;