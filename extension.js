
function DomModificationHandler() {
  $(this).unbind("DOMSubtreeModified");
  loadCountry();
  setTimeout(function(){
    $('div.billLabel').bind('DOMSubtreeModified',DomModificationHandler);
  },1000);
}

$(function(){
  // このタイミングではまだ対象の金額表示部分がロードされてないので待ち
  setTimeout(function(){
    $('div.billLabel').bind("DOMSubtreeModified", DomModificationHandler);
    loadCountry();
  }, 5000);
});

function loadCountry() {
  chrome.runtime.sendMessage({command: "loadCountry"}, function(response){
    var rate = response.value;
    var header = $('div.billLabel').html();
    var price = + header.substring(header.lastIndexOf("$") + 1, header.lastIndexOf(")"));
    var result = "[ " + String( Math.round(price * rate) ).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' ) + " 円 ]";
    if(header.indexOf("[") > -1){
      header = header.substring(0, header.indexOf("["));
    }
    $('div.billLabel').html(header + result);
  });
}

