var searchForm = document.getElementById('searchForm');

var submitHandler = () => {
  event.preventDefault();
  var http = new XMLHttpRequest();
  var url = '/search';
  var name = document.getElementById('textbox').value
  var nameSplit = name.split(/\s+/g);

  // alert if two names are not inserted into searchbar
  if(nameSplit.length < 2 || !(nameSplit[0].length && nameSplit[1].length)) {
    alert('Please insert two names!');
    return;
  }

  // alert if lowercase letters are used for names
  if(nameSplit.some(name => name.charAt(0) === name.charAt(0).toLowerCase())){
    alert('Please use uppercase for both names!');
    return;
  }

  var params = `name=${name}`;
  http.open('POST', url, true);

  //Ensure the correct header is set
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // Function is called when there is a change in state
  http.onreadystatechange = function() {
    if(http.readyState === 4 && http.status === 200) {
      if(!http.responseText){
        document.getElementById('employeeDetails').innerHTML = `
          <div class="failureMessage">
            <h3>Sorry, cannot find</h3>
            <h3>${name} in the system
          </div>`;
      } else {
        var responseData = JSON.parse(http.responseText)
        document.getElementById('employeeDetails').innerHTML = `
        <div class="resultMessage">
        <h3>${responseData.first_name} is seated on</h3>
        <h3>Floor ${responseData.floor}</h3>
        <h3>Seat ${responseData.seat}</h3>
        </div>`;
      }
    }
  }
  http.send(params);
}

searchForm.addEventListener("submit", submitHandler);