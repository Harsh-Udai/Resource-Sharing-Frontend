import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Backdrop from './Backdrop';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AlertD from './Alert_Dialog';
import alert1 from '../Assets/alert1.svg';
import alert2 from '../Assets/alert2.svg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const history = useHistory()

  const [oEr,setOE] = useState(false);
  const [oEr1,setOE1] = useState(false);
  const [oEr2,setOE2] = useState(false);
  const [oEr3,setOE3] = useState(false);
  const [oEr4,setOE4] = useState(false);
  const [buyR,setBR] = useState(false);
  const [value, setValue] = React.useState('');
  const add_cart = ()=>{
      
      axios.post('http://localhost:5000/cart/add',{
        self_user:props.main.master_user.email,
        resource_name:props.cart_data.re_name,
        resource_owner:props.cart_data.owner_email,
        unique_key:props.cart_data.unique_id
          },{
              headers:{
                  'Authorization': `Bearer ${props.main.master_user.token}`
              }
          })
          .then((data)=>{
              setOE3(false);       
              if(data.data.msg==='Added'){
                setOE1(true);
    
              }      
              else{
                setOE2(true);
              }
          })
          .catch((e)=>{
              console.log(e);
      })
  }

  const Handle_Buy = ()=>{
    
    if(props.cart_data.owner_email===props.main.master_user.email){
      setOE(true);
    }
    else{
      setOE3(true);
      if(props.cart_data.sold==='SOLD'){
        setOE4(true);
        setOE3(false);       
      }
      else{
        add_cart();
        setBR(true);
      }
    }
  }

  const Handle_Cart = ()=>{
    setBR(false);
    if(props.cart_data.owner_email===props.main.master_user.email){
      setOE(true);
    }
    else{
      setOE3(true);
      if(props.cart_data.sold==='SOLD'){
        setOE4(true);
        setOE3(false);       
      }
      else{
        add_cart();
        
      }
    }
  }

  const stopper = ()=>{
    setOE(false);
  }
  const stopper1 = ()=>{
    
    setOE1(false);
    if(buyR){
      history.push('/UI/Cart');
    }
  }
  const stopper2 = ()=>{
    setOE2(false);
    if(buyR){
      history.push('/UI/Cart');
    }
  }
  const stopper3 = ()=>{
    setOE2(false);
  }
  const stopper4 = ()=>{
    setOE4(false);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={Handle_Buy} label="Buy" icon={<ShopTwoIcon />} />
      <BottomNavigationAction onClick={Handle_Cart} label="Add to Cart" icon={<AddShoppingCartIcon />} />
      <Backdrop start={oEr3} stop={stopper3} />
      <AlertD text={'You Already Own this Resource!'} image={alert1} start={oEr} stop={stopper} />
      <AlertD text={'Added to Cart!'} image={alert2} start={oEr1} stop={stopper1} />
      <AlertD text={'Already in the Cart!'} image={alert2} start={oEr2} stop={stopper2} />
      <AlertD text={'Sorry, resource Sold! :('} image={alert2} start={oEr4} stop={stopper4} />
    </BottomNavigation>
  );
}
