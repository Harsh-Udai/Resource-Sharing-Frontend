import React,{useEffect,useState} from 'react';
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetDividers(props) {
  const classes = useStyles();
  const [user,setUser] = useState(null);
  const [zero,setZero] = useState(0);

  useEffect(() => {
    if(props.data.userId!==""){
      const getUser = async()=>{
        try{
            
            const res = await axios.get("https://rsp-backend.herokuapp.com/api/messages/findUser/"+ props.data.userId);
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
    }
    
  

  })

  return (
    <>
    {user ? <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <>
          <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar />
          </StyledBadge>
          </>
        </ListItemAvatar>
        <ListItemText  primary={<span className="font1">{user ? user.name :null}</span>} />
      </ListItem>     
      
    </List>:null}
    </>
  );
}
