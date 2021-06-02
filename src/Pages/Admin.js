import React,{useState} from 'react';
import Navbar3 from '../Components/Navbar3';
import Table from '../Components/Table';
import './admin.css';
import axios from 'axios';
import AlertA from '../Components/Alert_Admin';
import {Redirect} from 'react-router-dom';

export default function Admin(props) {
    
    const [aler,setaler] = useState(false);
    const [data,setData] = useState('');

    let [senData,setSD] = useState(props.main.master_user.admin_d);
    
    const handleClicker = (value)=>{
        setData(value);
        setaler(true);
    }

    const handleClose = (val)=>{
        setaler(false);
        
        if(val==='agree'){
            axios.post('http://localhost:5000/auth/accountR',{
                email: data.email,
                token:data.init_token
            })
            .then((dat)=>{
                
                if(dat.data.msg==='updated'){
                    const dc=senData.filter((da)=>{
                        return da.email!==data.email;
                    })
                    
                    setSD(dc)
                    
                }
            })
            .catch((e)=>{
                console.log(e);
            })
        }
    }

    if(props.main.master_user.admin_d.length===0){
        return <Redirect to='/auth/login' />
    }


    return(
        <div>
            <Navbar3 />

            <div style={{display:'flex',justifyContent:'center'}}>
                <div className="admin_back">
                    <p className="font1" style={{textAlign:'center',color:'white',fontSize:'370%'}}><span style={{backgroundColor:'#F4D03F',paddingLeft:'5px',paddingRight:'5px',borderRadius:'5px'}}>Admin Console</span> </p>
                </div>

                
            </div>


            <div style={{display:'flex',justifyContent:'center',marginTop:'100px',marginBottom:'100px'}}>
                <div className="table_admin">
                    <Table data={senData} start={true} major={handleClicker} />
                </div>
            </div> 

            <AlertA start={aler} handleClose={handleClose} />
        </div>
    )
}