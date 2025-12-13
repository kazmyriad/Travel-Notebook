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

  // Navigation buttons
  if (editBtn) {
    editBtn.addEventListener("click", function () {
      window.location.href = "page2.html";
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", function () {
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

  var logsJSON = localStorage.getItem("logs");
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

  var log = logs[0];

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
