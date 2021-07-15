import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField/TextField';
import React, { useState } from 'react';
import ShowWallet from './showWallet';

export default function InitWallet() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  
  
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const classes = useStyles();
const addInWallet = () => {

  var backendUrl = "https://wallet-serversoon.herokuapp.com"
    var url = backendUrl + "/setup";
    if(balance > 0){
    fetch (
      url,
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "balance": balance, 
        })
      })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("walletID", result._id);
      })
      .catch((err) => console.log('error'));
    }

  };
  

  if( localStorage.getItem("walletID") ){
       return <ShowWallet walletID={localStorage.getItem("walletID")}/>
  } else {
  return (
    <div className="row">
      <div className="offset-4 col-md-4 general-padding">
      <Card className={classes.root}>
        <CardContent>
        <div className="row general-padding">
          <div className="col-md-12">
             <h3>Welcome to Pay-Easy</h3>
          </div>
        </div>
        <div className="row general-padding">
          <div className="col-md-12">
              <TextField
               fullWidth
               id="outlined-basic"
               label="Name" variant="outlined"
               name="name"
               onChange={(e) => setName(e.currentTarget.value)}/>         
           </div>
        </div>
        <div className="row general-padding">
          <div className="col-md-12">
              <TextField
               fullWidth
               id="outlined-basic"
               label="Balance" variant="outlined"
               name="balance"
               onChange={(e) => setBalance(parseInt(e.currentTarget.value))}/>         
          </div>
        </div>
        <div className="row general-padding">
            <div className="col-md-12">
            <Button variant="contained" color="primary" onClick={() => addInWallet()}> Add in Wallet 
            </Button>
            </div>
        </div>
       </CardContent>
      </Card>
      </div>     
    </div>
  );
  }
}