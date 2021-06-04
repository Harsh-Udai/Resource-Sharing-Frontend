import React from 'react';
import Navbar2 from '../Containers/Navbar2Container';
import Section from '../Containers/SectionContainer';
import {Redirect} from 'react-router-dom';
import './Entry.css';
import Animation from './Animation';
import SocketIO from 'socket.io-client';


const Entry = (props)=>{
    const decode=(arrf)=>{
        let s= '';
        for (let i=0;i<arrf.length;i++){
            s+=(String.fromCharCode(arrf[i]))
        }
        return s;
    }
    
    if(props.main.master_user.user===''){
        const hmm1 = JSON.parse(sessionStorage.getItem('!@#$%^&*()_+'));
        
        if(hmm1!==null){
            const kk = {name:decode(hmm1.milestone),init_token:hmm1.milestone1,_id:hmm1.milestone2}
            props.setuser(kk)
            props.setNotifications({socket:SocketIO('https://rsp-backend.herokuapp.com',{withCredentials: true})});
            return <Redirect to='/UI' />
        }
        else{
            return <Redirect push to='/Login' />
        }
    }
    
    return(
        <div>
            <div style={{display: props.main.master_user.animate ? 'block' : 'none'}}>
                <Animation />
            </div>
            <div className="Entry" style={{display: !props.main.master_user.animate ? 'block' : 'none'}}>
                <Navbar2 />
                <Section />
            </div>
        </div>
    )
}

export default Entry;