import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetDividers({conversation,currentUser}) {
  const classes = useStyles();
  const [user,setUser] = useState(null);
  const [zero,setZero] = useState(0);

  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m!==currentUser._id);
    
    
      const getUser = async()=>{
        try{
            const res = await axios.get("https://rsp-backend.herokuapp.com/api/messages/findUser/"+ friendId);
            setUser(res.data);
            setZero(1);
        }
        catch(e){
            console.log(e);
        }
       

    }
    if(zero===0){
      getUser();
    }

    
    
    
  })

  return (
    <>
    {user ? 
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar >
                {user ? user.name.charAt(0) : null}
          </Avatar>
        </ListItemAvatar>
        <ListItemText  primary={<span className="font1">{user ? user.name: ''}</span>} />
      </ListItem>     
      
    </List>:null}
    </>
  );
}
