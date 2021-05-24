import React,{useState} from 'react';
import './Search.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '../Components/Card';
import axios from 'axios';

const Search = ()=>{

    const [inputd,setInput] = useState('');
    const [image,setImage] = useState([]);
    const [start,setStart] = useState(false);
    const [error,setError] = useState(false);
    

    const inputS = (e)=>{
        setInput(e.target.value);
    }
    const SearchF = (e)=>{
        e.preventDefault();
        
        setStart(true);
        axios.post('http://localhost:5000/FindResource',({
            find:inputd
        }))
        .then((data)=>{
            
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

    return(
        <div>
            <div className="textS">
                <h1>Search in Resources</h1>
                <h3>Search by Name, Owner, Category</h3>
            </div>
            <div className="inputS">
                    <form>
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
                                        
                                        <Card class={img.classification} date={new Date(img.createdAt).toString()} image={img.image} tag={img.owner.charAt(0)} name={img.resource_Name} desc={img.resource_Description} />
                                    </div>                                    
                                )
                            })}
                        </div>
                : null}
                </div>
            </div>
        </div>

    )
}

export default Search;