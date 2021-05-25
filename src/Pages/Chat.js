import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../Components/Card4';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(5),
          width: theme.spacing(90),
          height: theme.spacing(75),
          [theme.breakpoints.between(406,723)]: {
            width: theme.spacing(50),
          },
          [theme.breakpoints.between(0,406)]: {
            width: theme.spacing(40),
          },
        },
        
      },
      root_1: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0),
          width: theme.spacing(90),
          height: theme.spacing(8),
          [theme.breakpoints.between(406,723)]: {
            width: theme.spacing(50),
          },
          [theme.breakpoints.between(0,406)]: {
            width: theme.spacing(40),
          },
        },
        
      },

}));

export default function Chat() {

    const classes = useStyles();

    return(
        <>
          <div className={classes.root}>
           <Paper elevation={3} >
                <div className={classes.root_1}>
                    <Paper elevation={1} style={{display: 'flex',justifyContent: 'center'}}>
                           <p style={{color: '#5F6A6A'}} className="Chat-Head">Chat App..</p>
                    </Paper>
                </div>
                <div style={{marginTop:'1px'}} className="decor">
                </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:'100px'}}>
                    <Card />
                </div>
            </Paper>
            
        </div>
        </>
    )
}