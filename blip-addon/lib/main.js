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
  var blip = JSON.parse(this.responseText)

  var panel = require("sdk/panel").Panel({
    width: 200,
    height: 100,
    contentURL: "data:text/plain," + blip["text"]
  });

  panel.show();

  var notifications = require("sdk/notifications");
  notifications.notify({
    title: "Blip",
    text: blip["text"],
  });
}

function handleClick(state) {
  // console.log("You clicked '" + state.label + "'");

  var oReq = new xhr.XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.open("GET", "http://localhost:5000/blip", true);
  oReq.send();
}
