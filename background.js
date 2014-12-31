chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    console.log("listen start");
    if(request.command == "loadCountry"){
      $.getJSON('http://www.freecurrencyconverterapi.com/api/v2/convert?callback=?',
        {q: "USD_JPY", compact: "y"},
        function(result) {
          console.log(result);
          sendResponse({value: result.USD_JPY.val});
        }
      );
      return true;
    }
  }
);