import React,{useEffect,useState} from 'react';
import cloudy from '../Assets/Sprinkle.svg';
import Card from '../Containers/CardContainer';
import './Dashboard.css';
import Footer from './Footor.js';
import BackDrop from '../Components/Backdrop';
import axios from 'axios';
import TempCard from '../Components/tempCard';

const Dashboard = (props)=>{
    
    const [image,setImage] = useState([]);
    const [back,setBack] = useState(false);
    const [effe,setEffe] = useState(0);
    const [prog,setProg] = useState(true);
    const [effe1,setEffe1] = useState(0);

    useEffect(()=>{
        
        const abortController = new AbortController();
        
        if(effe===0){
            
            const setData = async()=>{
                try{
                    const res = await axios.get('http://localhost:5000/retriveResource')
                    
                    setImage(res.data);
                    setProg(false);
                    setEffe(1);
                }
                catch(e){
                    console.log(e);
                }
                
            }
        setData();
        }
        
        return () => {
            abortController.abort();
        };
        
    },[effe])

    const updater=(res)=>{
        props.setAnimation(false);
        props.setCentral(res.data)
    }
    

    useEffect(()=>{
        const abortController = new AbortController();
        if(effe1===0){

        
        const setProfile = async()=>{
            try{
                const res = await axios.post('http://localhost:5000/Profile',{
                    token:props.main.master_user.token
                },{
                    headers:{
                        'Authorization': `Bearer ${props.main.master_user.token}`
                    }
                })
                
                setEffe1(1);
                updater(res);
                
            }
            catch(e){
                console.log(e);
            }
        }

        setProfile();
        }

        return () => {
            abortController.abort();
        };
    })
    
    
    return(
        <div className="dashB">
            
            <div>
                <div className="img-cen">
                    <img src={cloudy} alt="imagePart" width="70%" style={{borderRadius:'5px',marginTop:'20px'}}></img>
                    <div className="img-text">
                        <h1>Welcome!</h1>
                    </div>
                </div>
                <div style={{marginTop:'50px'}}>
                    <div className="font">
                        <p>Available Resources</p>
                    </div>

                    {prog ? <div style={{marginBottom:'50px'}}><TempCard /></div> : 
                    <div>
                        <div className="cards">
                            {image.map((img,index)=>{
                                
                               
                                return(
                                    <div key={index} style={{margin:'40px',marginBottom:'220px',width:'300px',height:'400px'}}>
                                        
                                        <Card back={setBack} unique_id={img.unique_id} email={img.email} keyPart={index} count={img.likes} class={img.classification} date={new Date(img.createdAt).toString()} image={img.image} tag={img.owner.charAt(0)} name={img.resource_Name} desc={img.resource_Description} />
                                    </div>                                    
                                )
                            })}
                        </div>
                        
                    </div> }
                </div>
                <BackDrop start={back}/>
                
                <Footer />
            </div>
        </div>
    )
}

export default Dashboard;