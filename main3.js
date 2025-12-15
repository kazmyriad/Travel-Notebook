var viewMap = null;

document.addEventListener("DOMContentLoaded", function () {
  var editBtn = document.querySelector("#editLogBtn");
  var deleteBtn = document.querySelector("#deleteLogBtn");

  // NAVIGATION BUTTONS

  //we need this so the back button doesnt go back to edit screen
  //overrides history.back(), but only for screen3 so itsok
  var backBtn = document.querySelector(".back-button");

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = "./index.html";
    });
  }

  // changed to go to the correct screen2
  if (editBtn) {
    editBtn.addEventListener("click", function () {
      var params = new URLSearchParams(window.location.search);
      var idStr = params.get("id");
      window.location.href = "page2.html?id=" + idStr;
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
      var idStr = params.get("id");
      var tripId = idStr === null ? null : Number(idStr);

      var dbJSON = localStorage.getItem("database") || "[]";
      var db;

      try {
        db = JSON.parse(dbJSON);
      } catch (e) {
        db = [];
      }

      var deleteIndex = -1;

      if (tripId !== null && !Number.isNaN(tripId)) {
        deleteIndex = db.findIndex((item) => item.id === tripId);
      }

      if (
        !Number.isInteger(deleteIndex) ||
        deleteIndex < 0 ||
        deleteIndex >= db.length
      ) {
        alert("Unable to delete log.");
        return;
      }

      db.splice(deleteIndex, 1);
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

  //displaying banner + info
  const params = new URLSearchParams(window.location.search);
  const tripId = parseInt(params.get("id"), 10);

  const log = logs.find((item) => item.id === tripId);
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

  const photoDisplay = document.querySelector("#photoDisplay");
  if (photoDisplay) {
    photoDisplay.innerHTML = "";
    if (Array.isArray(log.photo)) {
      log.photo.forEach((url) => {
        if (!url) return;
        const img = document.createElement("img");
        img.src = url;
        const wrapper = document.createElement("div");
        wrapper.appendChild(img);
        photoDisplay.appendChild(wrapper);
      });
    }
  }

  const itineraryDisplay = document.querySelector(".itinerary-display");
  if (itineraryDisplay) {
    itineraryDisplay.textContent = log.itinerary;
  }

  const checklistWrap = document.querySelector("#checklistItems");
  if (checklistWrap) {
    checklistWrap.innerHTML = "";

    if (Array.isArray(log.checklist)) {
      log.checklist.forEach((item, idx) => {
        if (!item || !item.text) return;

        const row = document.createElement("div");

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!item.checked;

        const label = document.createElement("span");
        label.textContent = " " + item.text;
        label.style.textDecoration = cb.checked ? "line-through" : "none";

        cb.addEventListener("change", () => {
          item.checked = cb.checked;
          label.style.textDecoration = cb.checked ? "line-through" : "none";
          localStorage.setItem("database", JSON.stringify(logs));
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.classList.add("checklist-delete-btn");

        delBtn.addEventListener("click", () => {
          log.checklist.splice(idx, 1);
          localStorage.setItem("database", JSON.stringify(logs));
          row.remove();
        });

        row.appendChild(cb);
        row.appendChild(label);
        row.appendChild(delBtn);
        checklistWrap.appendChild(row);
      });
    }
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
