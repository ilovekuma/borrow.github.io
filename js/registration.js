

function getRegistration(table){
    console.log('start getRegistration');

    // resp = axios.get('https://25eadr7ui5.execute-api.ap-southeast-2.amazonaws.com/STG/getRegister');
    axios.get('https://25eadr7ui5.execute-api.ap-southeast-2.amazonaws.com/STG/getRegister')
    .then(function (response) {
      // handle success
      console.log(response.data.body);
      for (rowid in response.data.body){
        console.log(rowid);

        let row = table.insertRow(-1); 

        // Create table cells
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        let c5 = row.insertCell(4);
        let c6 = row.insertCell(5);

        // Add data to c1 and c2
        c1.innerText = response.data.body[rowid][0]
        c2.innerText = response.data.body[rowid][1]
        c3.innerText = response.data.body[rowid][2]
        c4.innerText = response.data.body[rowid][3]
        c5.innerText = response.data.body[rowid][4]
        c6.innerText = response.data.body[rowid][5]
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
}


