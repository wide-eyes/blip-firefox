var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var xhr = require("sdk/net/xhr");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
});

button.on("click", handleClick)

function reqListener () {
  console.log(this.responseText);
}

function handleClick(state) {
  console.log("You clicked '" + state.label + "'");

  var oReq = new xhr.XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.open("GET", "https://www.mozilla.org/", true);
  oReq.send();

  tabs.open({
	url: "https://www.mozilla.org/",
  });
}
