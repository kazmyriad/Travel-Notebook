// document.addEventListener("DOMContentLoaded", function () {
//   var editBtn = document.querySelector("#editLogBtn");

//   if (editBtn) {
//     editBtn.addEventListener("click", function () {
//       window.location.href = "page2.html";
//     });
//   }

//   var backBtn = document.querySelector("#backBtnPage3");

//   if (backBtn) {
//     backBtn.addEventListener("click", function () {
//       window.location.href = "index.html";
//     });
//   }
// });

// This will hold our map on the view page
var viewMap = null;

document.addEventListener("DOMContentLoaded", function () {
  var editBtn = document.querySelector("#editLogBtn");
  var backBtn = document.querySelector("#backBtnPage3");
  var deleteBtn = document.querySelector("#deleteLogBtn");

  // Navigation buttons
  if (editBtn) {
    editBtn.addEventListener("click", function () {
      window.location.href = "page2.html";
    });
  }

  //NEW DELETE BUTTON FUNCTION
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      var ok = window.confirm(
        "Are you sure you want to delete the log? This cannot be undone."
      );
      if (!ok) return;

      var params = new URLSearchParams(window.location.search);
      var indexStr = params.get("index");
      var index = indexStr === null ? 0 : Number(indexStr);

      var dbJSON = localStorage.getItem("database") || "[]";
      var db;

      try {
        db = JSON.parse(dbJSON);
      } catch (e) {
        db = [];
      }

      if (!Number.isInteger(index) || index < 0 || index >= db.length) {
        alert("Unable to delete log.");
        return;
      }

      db.splice(index, 1);
      localStorage.setItem("database", JSON.stringify(db));

      window.location.href = "index.html";
    });
  }

  // Set up the map for view page
  var mapDiv = document.querySelector("#mapView");

  if (mapDiv) {
    viewMap = L.map("mapView").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(viewMap);
  }

  var logsJSON = localStorage.getItem("database");
  if (!logsJSON) {
    return;
  }

  var logs;
  try {
    logs = JSON.parse(logsJSON);
  } catch (e) {
    logs = [];
  }

  if (!logs || logs.length === 0) {
    return;
  }

  var params2 = new URLSearchParams(window.location.search);
  var indexStr2 = params2.get("index");
  var idx = indexStr2 === null ? 0 : Number(indexStr2);

  if (!Number.isInteger(idx) || idx < 0 || idx >= logs.length) {
    idx = 0;
  }

  var log = logs[idx];

  if (
    viewMap &&
    log.latitude &&
    log.longitude &&
    log.latitude !== "" &&
    log.longitude !== ""
  ) {
    var lat = Number(log.latitude);
    var lng = Number(log.longitude);

    viewMap.setView([lat, lng], 13);

    L.marker([lat, lng]).addTo(viewMap);
  }
});
