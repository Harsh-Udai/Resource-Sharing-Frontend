import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom';
import ShopRoundedIcon from '@material-ui/icons/ShopRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  
  const [open, setOpen] = React.useState(false);
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    sessionStorage.removeItem('!@#$%^&*()_+');
    props.unsetuser();
    props.setAnimation(true)
    
    
  };
  const handleClose1 = () => {
    setOpen(false);
    
  };


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    handleClickOpen();
    
  };
  const handleMenuClose1 = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    // handleClickOpen();
    
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const profileC = ()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setProfile(true);
  }

  const CartC = ()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setCart(true);
  }

  const RequestsR = ()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setRequests(true);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose1}
    >
      <Link push="true" to='/UI/Profile' style={{textDecoration:'none',color:'black'}} ><MenuItem onClick={profileC}>Profile</MenuItem></Link>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      
      <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link push="true" to='/UI/Profile' style={{textDecoration:'none',color:'black'}} ><p onClick={profileC}>Profile</p></Link>
        
      </MenuItem>
      
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
         
        >
          <ShopRoundedIcon /> 
        </IconButton>
        <Link push="true" to='/UI/Cart' style={{textDecoration:'none',color:'black'}} ><p onClick={CartC}>Cart</p></Link>
        
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
         
        >
          <CachedRoundedIcon /> 
        </IconButton>
        <Link push="true" to='/UI/Requests' style={{textDecoration:'none',color:'black'}} ><p onClick={RequestsR}>Requests</p></Link>
        
      </MenuItem>
      <MenuItem>
      <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenuClose}
        >
          <PowerSettingsNewIcon /> 
        </IconButton>
        <p onClick={handleMenuClose}>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor:'white',color:'black',boxShadow:'none'}}>
        <Toolbar>
          
            
          
          <Typography className={classes.title} variant="h6" noWrap>
          <div className="tag-1"><Link push="true" style={{textDecoration:'none',color:'black'}}  to='/UI' >Resource Sharing</Link></div>
          </Typography>
          
          <div className={classes.grow} />
            
          <div className={classes.sectionDesktop}>
            <div style={{marginTop:'15px'}}>
            <Link push="true" to='/UI/Requests' style={{textDecoration:'none',color:'black'}} ><Button
                
                color="default"
                className={classes.button}
                startIcon={<CachedRoundedIcon />}
                onClick={RequestsR}
              >
                <span className='tag-2'>Requests</span>
              </Button></Link>
              <Link push="true" to='/UI/Cart' style={{textDecoration:'none',color:'black'}} ><Button
                
                color="default"
                className={classes.button}
                startIcon={<ShopRoundedIcon />}
                onClick={CartC}
              >
                <span className='tag-2'>Cart</span>
              </Button></Link>
            </div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar style={{backgroundColor:'#28B463'}}>H</Avatar>
              
            </IconButton>
            
              
            
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <div>
        
        <Dialog
          
          open={open}
          
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Signout"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to Signout ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose1} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    </div>

    </div>
  );
}
