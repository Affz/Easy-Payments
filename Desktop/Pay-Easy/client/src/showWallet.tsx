import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import Transactions from './transaction';

export default function ShowWallet(props: any) {
    const [wallet, setWalletData] = useState({ "name": "", "balance": 0 });
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
      
    useEffect(() => {
        if (props.walletID && wallet.name === "") {
            var id = props.walletID.toString();
            var backendUrl = "https://wallet-serversoon.herokuapp.com"
            var url = backendUrl + "/wallet:" + id;
            fetch(
                url,
                {
                    method: "GET",
                    headers: new Headers({
                        Accept: "application/json"
                    })

                })
                .then(res => res.json())
                .then(response => {
                    setWalletData({ "name": response.name, "balance": response.balance });
                })
                .catch(error => { console.log(error); })
        }
    }, [props.walletID , wallet.name]);

    return (
        <div className="row">
            <div className="offset-4 col-md-4 general-padding">
            <Card className={classes.root}>
             <CardContent>
                <div className="col-md-12 styling">
                     <h3>Wallet Details:</h3>
                 </div>
                <div className="col-md-12 general-padding ">
                    Name : {wallet.name}
                </div> 
                <div className="col-md-12 general-padding  ">
                    Wallet Balance : {wallet.balance}
                </div>          
                <Transactions props={{"walletBalance":wallet.balance,"walletId": props.walletID.toString()}}/>
            </CardContent>
            </Card>
            </div>
        </div>
    )
}