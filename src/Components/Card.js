import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Chip from './chip';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '86.25%',  // 16:9
  },
  title: {
    fontSize: 18,
    color:'black',
    marginTop:'9px',
    textTransform:'capitalize',
    fontFamily:'Lexend'
  },
  fontG:{fontFamily:'Lexend'},
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'green',
  },
}));

export default function RecipeReviewCard(props) {
  
  

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [countAPI,setcountAPI] = React.useState(props.count);
  var today = new Date();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const liker=(et)=>{
      props.back(true)
      axios.post('https://rsp-backend.herokuapp.com/Resource/interest',{
                unique_id:props.unique_id,
                token:props.main.master_user.token,
                likes:'+1',
                name:et,
                user:props.main.master_user.user,
                user_email:props.main.master_user.email,
                date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
                time:today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      },{
          headers:{
              'Authorization': `Bearer ${props.main.master_user.token}`
          }
      })
      .then((data)=>{
          
         
          if(data.data===0){
            setcountAPI(countAPI-1);
            
          }
          else{
            setcountAPI(countAPI+1);
          }
          props.back(false)
      })
      .catch((e)=>{
          console.log(e);
      })
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`data:image/png;base64,`+new Buffer.from(props.image.data).toString("base64")}
        key = {props.keyPart}
      />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <VerifiedUserIcon />
          </Avatar>
        }
        
        title={<Typography className={classes.title} color="textSecondary" gutterBottom>
                {props.name}
              </Typography>}
        // subheader={props.date.slice(4,15)}
      />
      
      <CardActions disableSpacing>
        {!props.search ?<IconButton aria-label="add to favorites">
          <Badge color="secondary" badgeContent={countAPI} showZero>
            <GroupIcon onClick={()=>liker(props.name)} />
          </Badge>
        </IconButton> : null}
        <Link push="true" style={{textDecoration:'none'}}  to={{pathname:`/UI/Product/${props.name}`,state:{email:props.email,unique_id:props.unique_id}}} ><Button color="default" style={{marginLeft:'60px'}}>VIEW</Button></Link>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><Chip  tag={ props.tag} class={props.class} /></Typography>
          <Typography paragraph style={{fontFamily:'Lexend'}}>
            {props.desc}
          </Typography>
          <hr></hr>
          <Typography paragraph style={{fontFamily:'Lexend',fontSize:'small'}}>
            Click on the People icon therfore you will be having more chances to get!
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
