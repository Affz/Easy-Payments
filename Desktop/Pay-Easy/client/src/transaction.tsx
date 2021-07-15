import Button from '@material-ui/core/Button/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Transactions(props:any) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(true);
  const [description, setDescription] = useState("");

  const transactionInWallet = (props) => {
    var backendUrl = "https://wallet-serversoon.herokuapp.com"

    var url = backendUrl + "/transact:" + props.props.walletId;
    var transactionType = ""
    if (type) {
      transactionType = "CREDIT";
    } else {
      transactionType = "DEBIT";
    }
    fetch(
      url,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "walletId": props.props.walletId,
          "amount": amount,
          "balance": props.props.balance,
          "description": description,
          "type": transactionType,
          "date": Date.now()
        })
      })
      .then((res) => res.json())
      .catch((err) => console.log('error'));

  }
  return (
    <div className="row ">
      <div className="col-md-12 general-padding">
        <div className="row">
          <div className="offset-1 col-md-11 general-padding" >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Amount for transaction*" variant="outlined"
              name="amount"
              onChange={(e) => setAmount(parseInt(e.currentTarget.value))} />
          </div>
        </div>
        <div className="row">
          <div className="offset-1 col-md-11 general-padding ">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description" variant="outlined"
              name="amount"
              onChange={(e) => setDescription(e.currentTarget.value)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <span className="styling">Credit</span>
            <FormControlLabel
              control={
                <Switch
                  checked={type ? true : false}
                  onChange={() => setType(!type)}
                  name="type"
                  color="primary"
                />
              }
              label=""
            />
          </div>
        </div>
      </div>
      <div className="col-md-12 general-padding">
        <Button variant="contained" color="primary" onClick={() => transactionInWallet(props)}>
          Submit
        </Button>

        <Button  color="primary">
          <Link to="/view">View Transactions</Link>
        </Button>
      </div>
    </div>
  )
}