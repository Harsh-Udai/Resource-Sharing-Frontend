import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Drawer from './Drawer';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const [Draw,setDraw] = useState(false);
  const DrawMagic = ()=>{
    setDraw( true)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={`data:image/png;base64,`+new Buffer.from(props.image.data).toString("base64")}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display:'flex',justifyContent:'center'}}>
        {Draw ? <Drawer danger={props.danger} check={Draw} Change={setDraw} Name={props.name} /> : null}
          <Button size="small" color="primary" onClick={DrawMagic}>
            Update
          </Button>
        <Button size="small" color="primary"  onClick={()=>props.click(props.name,props.unique_id)}>
          Delete
        </Button>
        <Link push="true" style={{textDecoration:'none'}}  to={{pathname:`/UI/Product/${props.name}`,state:{email:props.email,unique_id:props.unique_id}}} ><Button size="small" color="primary">
          Learn More
        </Button></Link>
      </CardActions>
    </Card>
  );
}
