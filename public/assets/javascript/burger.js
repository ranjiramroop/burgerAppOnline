var button = $("#button");
var textArea = $("#burgerName");
var notEatenColumn = $("#notEatenYet");
var btnColumn = $("#buttonsColumn");
var eatenColumn = $("#yesEatenColumn");

// gathering all offline burgers and running them through the newBurger function
if (localStorage.getItem("Burgers")) {
  var offlineBurgers = JSON.parse(localStorage.getItem("Burgers"));
  if (navigator.onLine) {
    for (i = 0; i < offlineBurgers.length; i++) {
      newBurger(offlineBurgers[i]);
    }
    localStorage.clear();
  }
} else {
  var offlineBurgers = [];
}

//when online, burgerName will capture the burger typed in, then it will pass it through the newBurger function
//when offline, push the burgerName information to local storage - it will update once online again.
button.on("click", function() {
  var burgerName = textArea.val();
  textArea.val("");
  if (navigator.onLine) {
    newBurger(burgerName);
  } else {
    offlineBurgers.push(burgerName);
    localStorage.setItem("Burgers", JSON.stringify(offlineBurgers));
    offlineList();
  }
});
// when the  button is clicked - burgerid
btnColumn.on("click", ".buttons", function() {
  var burgerId = $(this).attr("burgerid");
  updatingEat(burgerId);
});

// posting each burger to the database when a burger is entered through burgerName form, then call getBurger function.
function newBurger(burgerName) {
  var burger = {
    name: burgerName
  };
  $.ajax("/api/burger", {
    type: "POST",
    data: burger
  }).then(function(res) {
    getBurger();
  });
}
// getBurger will prepare the stored burgers to go to their assigned location with the displayBurgers function
function getBurger() {
  $.ajax("/api/burger", {
    type: "GET"
  }).then(function(res) {
    displayBurgers(res);
  });
}

// displayBurger is sorting each burger respective to their notEaten and eaten column and appending them below each other
function displayBurgers(burgers) {
  btnColumn.html("");
  notEatenColumn.html("");
  eatenColumn.html("");
  for (i = 0; i < burgers.length; i++) {
    var newDiv = $("<div>");
    newDiv.html(burgers[i].id + ". " + burgers[i].burger_name);
    newDiv.addClass("burgerstyle");
    if (burgers[i].eaten) {
      eatenColumn.append(newDiv);
    } else {
      notEatenColumn.append(newDiv);
      var newBtn = $("<button>");
      newBtn.text("Eat Burger!");
      newBtn.attr("burgerid", burgers[i].id);
      newBtn.addClass("btn btn-primary buttons");
      btnColumn.append(newBtn);
    }
  }
}
// this will change eaten to true in db
function updatingEat(id) {
  $.ajax({
    url: "/api/burger/" + id,
    type: "PUT"
  }).then(function(res) {
    btnColumn.html("");
    notEatenColumn.html("");
    eatenColumn.html("");
    getBurger();
  });
}
//when the burgers are created offline, there will be an onscreen display of the burger.
function offlineList() {
  var offlineListBox = $("#offlineList");
  offlineListBox.html("");
  for (i = 0; i < offlineBurgers.length; i++) {
    var list = $("<li>");
    list.html(offlineBurgers[i]);
    offlineListBox.append(list);
  }
}
// getBurger when the page is done loading
$(document).ready(function() {
  if (navigator.onLine) {
    getBurger();
  }
});
