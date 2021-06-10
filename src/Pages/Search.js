import React,{useState} from 'react';
import './Search.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Select from '@material-ui/core/Select';
import Card from '../Components/Card';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '320px',
      [theme.breakpoints.between(0,400)]: {
        width: '220px',
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));



const Search = ()=>{
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [stateSnack, setStateSnack] = React.useState({
        open: false,
        Transition: Fade,
    });

    const handleClose = () => {
        setStateSnack({
        ...stateSnack,
        open: false,
    });
    };

    const [inputd,setInput] = useState('');
    const [image,setImage] = useState([]);
    const [start,setStart] = useState(false);
    const [error,setError] = useState(false);

    const inputS = (e)=>{
        setInput(e.target.value);
    }
    const SearchF = (e)=>{
        e.preventDefault();

        if(age===''){
            
            setStateSnack({
                ...stateSnack,
                open: true,
            });
        }
        else{
            
            setStateSnack({
                ...stateSnack,
                open: false,
            });


            setError(false);
            setStart(true);
            setImage([])
            axios.post('https://rsp-backend.herokuapp.com/FindResource',({
                find:inputd,
                categ: age
            }))
            .then((data)=>{
                console.log(data)
                setStart(false);
                if(data.data==='NO'){
                    setError(true);
                }
                else{
                    setError(false);
                    setImage(data.data)
                }
                
            })
            .catch((e)=>{
                console.log(e);
            })


        }

       
       
    }

    return(
        <div>
            <div className="textS">
                <h1>Search in Resources</h1>
                <h3>Search by Name, Owner, Category</h3>
            </div>
            <div className="inputS">
                    <form>
                        <span style={{display:'flex',justifyContent:'center'}}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={age}
                                onChange={handleChange}
                                label="Age"
                                >
                                
                                <MenuItem value={'Resource'}>Resource Name</MenuItem>
                                <MenuItem value={'Owner'}>Owner Name</MenuItem>
                                <MenuItem value={'Category'}>Category</MenuItem>
                                </Select>
                            </FormControl>
                        </span>
                    <br></br>
                    <input className="inputTS" onChange={(e)=>inputS(e)} placeholder="Search" type="text" ></input> <input onClick={(e)=>SearchF(e)} className="inputTS1" type="submit"></input>
                    </form>
            </div>

            <div className="inputS">
                <div style={{paddingTop:'100px'}}>
                    {start ? <CircularProgress /> : null}
                </div>
                {error?<div className="textS">
                         <h1>Not Found!</h1>
                        </div> :null}
                <div>

                {!error ?<div className="cards">
                            {image.map((img,index)=>{
                               
                                return(
                                    <div key={index} style={{margin:'50px',width:'300px',height:'500px'}}>
                                        
                                        <Card search={true} class={img.classification} email={img.email} unique_id={img.unique_id} date={new Date(img.createdAt).toString()} image={img.image} tag={img.owner.charAt(0)} name={img.resource_Name} desc={img.resource_Description} />
                                    </div>                                    
                                )
                            })}
                        </div>
                : null}
                </div>
            </div>
            <Snackbar
                open={stateSnack.open}
                onClose={handleClose}
                autoHideDuration={5000}
                TransitionComponent={stateSnack.Transition}
                message="Select a Category first!"
                key={stateSnack.Transition}
            />


        </div>
    )
}

export default Search;