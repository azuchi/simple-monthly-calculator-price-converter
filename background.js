chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    console.log("listen start");
    if(request.command == "loadCountry"){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://www.freecurrencyconverterapi.com/api/v2/convert?q=USD_JPY&compact=y", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          //handle the xhr response here
          var data = JSON.parse(xhr.responseText);
          console.log(data);
          sendResponse({value: data.USD_JPY.val});
        }
      };
      xhr.send();
      return true;
    }
  }
);