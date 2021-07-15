import Button from '@material-ui/core/Button/Button';
import React, { useEffect, useState } from 'react';

export default function ViewTransaction(props: any) {
  const [previousTransactions, setTransactions] = useState([]);
  var id = localStorage.getItem("walletID");
  useEffect(() => {
    var backendUrl = "https://wallet-serversoon.herokuapp.com"

    var url = backendUrl + "/wallet:" + id;
    fetch(
      url,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        if (response.transactions.length) {
          setTransactions(response.transactions);
        }
      })
      .catch(error => { console.log(error); })
  }, [id]);

  function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.csvData || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }
  function exportCSV(data) {
    var csvData, filename, link;

    var csv = convertArrayOfObjectsToCSV({
      csvData: data
    });
    if (csv == null) return;

    filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    csvData = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', csvData);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="general-padding">
      {!previousTransactions.length ? <h2 className="general-padding"> Oops! No transactions Done </h2> :
        <>
          <h2 className="general-padding"> Your Previous Transactions</h2>
          <Button  id="export" variant="contained" color="primary" onClick={() => exportCSV(previousTransactions)}> Export CSV </Button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">WalletId</th>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
                <th scope="col">Balance</th>
                <th scope="col">type</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>

              {previousTransactions.length && previousTransactions.map((item: any, i: any) => {
                return (<tr key={i}>
                  <th scope="row">1</th>
                  <td>{item.walletId}</td>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.balance}</td>
                  <td>{item.type}</td>
                  <td>{item.date}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </>
      }
    </div>

  );
}