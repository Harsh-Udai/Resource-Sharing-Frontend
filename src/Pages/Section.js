import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dashboard from '../Containers/DashboardContainer';
import Resource from '../Containers/ResourceUpload';
import ChatIcon from '@material-ui/icons/Chat';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import StorefrontIcon from '@material-ui/icons/Storefront';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import SearchS from './Search';
import Notify from '../Containers/NotifyContainer';
import { useState } from 'react';
import Chate from './Chat';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    
    width: '100%',
    
  },
  
}));

export default function ScrollableTabsButtonAuto(props) {
  
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // States
  const [Home,setHome] = useState(true);
  const [Add, setAdd] = useState(false);
  const [Ann,setAnn] = useState(false);
  const [Chat,setChat] = useState(false);
  const [Search, setSearch] = useState(false);
  
  const HomeH = (e)=>{
    
    setHome(true);
    setAdd(false);
    setAnn(false);
    setChat(false);
    setSearch(false);
    props.setRequests(false)
    props.setCart(false);
    props.setProfile(false)
  }

  const AddC = (e)=>{
    
    setHome(false);
    setAdd(true);
    setAnn(false);
    setChat(false);
    setSearch(false);
    props.setRequests(false)
    props.setCart(false);
    props.setProfile(false)
  }
  const AnnC = (e)=>{
    
    setHome(false);
    setAdd(false);
    setAnn(true);
    setChat(false);
    setSearch(false);
    props.setRequests(false)
    props.setCart(false);
    props.setProfile(false)
  }

  const ChatC = (e)=>{
    
    setHome(false);
    setAdd(false);
    setAnn(false);
    setChat(true);
    setSearch(false);
    props.setRequests(false)
    props.setCart(false);
    props.setProfile(false)
  }

  const SearchC = (e)=>{
    
    setHome(false);
    setAdd(false);
    setAnn(false);
    setChat(false);
    setSearch(true);
    props.setRequests(false)
    props.setCart(false);
    props.setProfile(false)
  }


  return (
    <div className={classes.root} >
      <AppBar position="static" color="transparent" style={{boxShadow:'none'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label={<StorefrontIcon />} onClick={(e)=>HomeH(e)} {...a11yProps(0)} />
          <Tab label={<AddPhotoAlternateIcon />} onClick={(e)=>AddC(e)} {...a11yProps(1)} />
          <Tab label={<ImageSearchIcon />}  onClick={(e)=>SearchC(e)}  {...a11yProps(1)} />
          <Tab label={<NotificationsActiveIcon />} onClick={(e)=>AnnC(e)} {...a11yProps(2)} />
          <Tab label={<ChatIcon />} onClick={(e)=>ChatC(e)} {...a11yProps(3)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        
      </TabPanel>
      <TabPanel value={value} index={3} >
        
      </TabPanel>

      {Home ? <Dashboard />:null}
      {Add ?<div style={{marginTop:'-45px'}}> <Resource /> </div>:null}
      {Ann ? <div style={{marginTop:'-70px'}}> <Notify /> </div>:null}
      {Chat ? <div style={{marginTop:'-22px'}}><Chate /></div>:null}
      {Search ? <SearchS /> : null}
      
    </div>
  );
}
