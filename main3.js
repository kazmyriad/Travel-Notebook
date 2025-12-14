
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

  //displaying banner
const params = new URLSearchParams(window.location.search);
const tripId = parseInt(params.get("id"), 10);

const log = logs.find(item => item.id === tripId);
if (log && log.banner) {
  const bannerElement = document.querySelector(".trip-banner");
  if (bannerElement) {
    bannerElement.style.setProperty("--banner-url", `url("${log.banner}")`);
  }
}

// displaying log infor
const titleDisplay = document.getElementById(".title-display");
  if (titleDisplay) {
    titleDisplay.textContent = "Hello";
  }


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
