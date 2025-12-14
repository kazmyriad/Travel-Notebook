import { retrievingData } from "./storage.js";

var viewMap = null;

document.addEventListener("DOMContentLoaded", function () {
  var editBtn = document.querySelector("#editLogBtn");
  var deleteBtn = document.querySelector("#deleteLogBtn");

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

  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {

      const db = retrievingData();
      const trip = db.find(item => item.id === tripId);
      var ok = window.confirm(
      "Are you sure you want to delete your trip, " + trip.title + "? This cannot be undone."
      );

      //actually deleting the log
      const index = db.findIndex(item => item.id === tripId);

      if (index === -1) {
        alert("Unable to delete log.");
        return;
      }

      db.splice(index, 1);
      localStorage.setItem("database", JSON.stringify(db));
      // done in storage as savingData if time replace this w/imported method

      window.location.href = "index.html";
    });
  }


  //displaying banner + info
  const params = new URLSearchParams(window.location.search);
  const tripId = parseInt(params.get("id"), 10);

  const log = logs.find(item => item.id === tripId);
  if (log && log.banner) {
    const bannerElement = document.querySelector(".trip-banner");
    if (bannerElement) {
      bannerElement.style.setProperty("--banner-url", `url("${log.banner}")`);
    } // have to set as a CSS variable in order to be read
  }

//could probably make a loop for all this if somebody wants to
  const titleDisplay = document.querySelector(".title-display");
  if (titleDisplay) {
    titleDisplay.textContent = log.title;
  }

  const locationDisplay = document.querySelector(".location-display");
  if (locationDisplay) {
    locationDisplay.textContent = log.location;
  }

  const dateDisplay = document.querySelector(".date-display");
  if (dateDisplay) {
    dateDisplay.textContent = log.dates;
  }

  const noteDisplay = document.querySelector(".notes-display");
  if (noteDisplay) {
    noteDisplay.textContent = log.notes;
  }

  const itineraryDisplay = document.querySelector(".itinerary-display");
  if (itineraryDisplay) {
    itineraryDisplay.textContent = log.itinerary;
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
