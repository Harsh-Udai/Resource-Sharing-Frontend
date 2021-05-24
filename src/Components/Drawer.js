import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Resource from '../Containers/ResourceUpdateContainer';

const useStyles = makeStyles((theme)=>({
  list: {
    width: '65vw',
    [theme.breakpoints.between(0,979)]: {
      width: '100vw',
    },
  },
  fullList: {
    width: 'auto',
  },
  
}));

export default function TemporaryDrawer(props) {
  
  const classes = useStyles();
  const [state, setState] = React.useState(props.check);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open );
    props.Change(open)
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>

        <Resource danger={props.danger}  closer={props.Change} Name={props.Name} />

      </div>

    </div>
  );
  
  return (
    
    <div>
      
        <React.Fragment key={'right'}>
          <Drawer anchor={'right'} open={state} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
          
        </React.Fragment>
 
    </div>
  );
}
