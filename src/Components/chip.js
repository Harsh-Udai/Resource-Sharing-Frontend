import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips(props) {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  
  return (
    <div className={classes.root}>
      
      
       
     
      
      <Chip
        avatar={<Avatar>{props.tag}</Avatar>}
        label={props.class}
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        
      />
      
    </div>
  );
}
