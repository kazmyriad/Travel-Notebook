const openIndex = () => {
  console.log("BUTTON");

  const params = new URLSearchParams(window.location.search);
  const idStr = params.get("id");

  if (idStr !== null && idStr !== "") {
    window.location.href = "./page3.html?id=" + idStr;
  } else {
    window.location.href = "./index.html";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.querySelector(".save-entry-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", openIndex);
  }

  const submitImg = () => {
    console.log("IMG");
  };

  const bannerBtn = document.querySelector(".add-banner-btn");
  if (bannerBtn) {
    bannerBtn.addEventListener("click", submitImg);
  }

  // Photo upload functionality
  // just added delete button
  const photoInput = document.querySelector("#photo");
  const photoDisplay = document.querySelector("#photoDisplay");
  const addPhotoBtn = document.querySelector(".photo-gallery .submit-button");
  const deletePhotoBtn = document.querySelector(".delete-photo-btn");

  let selectedWrapper = null;

  const clearSelectedPhoto = () => {
    if (selectedWrapper) {
      selectedWrapper.classList.remove("photo-selected");
      selectedWrapper = null;
    }
    if (deletePhotoBtn) deletePhotoBtn.disabled = true;
  };

  const selectPhotoWrapper = (wrapper) => {
    if (!wrapper) return;
    clearSelectedPhoto();
    wrapper.classList.add("photo-selected");
    selectedWrapper = wrapper;
    if (deletePhotoBtn) deletePhotoBtn.disabled = false;
  };

  if (addPhotoBtn && photoInput && photoDisplay) {
    addPhotoBtn.addEventListener("click", () => {
      const url = photoInput.value.trim();
      if (!url) return;

      const img = document.createElement("img");
      img.src = url;

      const wrapper = document.createElement("div");
      wrapper.appendChild(img);

      photoDisplay.appendChild(wrapper);
      photoInput.value = "";
    });
  }

  if (photoDisplay) {
    photoDisplay.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;

      const wrapper = img.closest("div");
      if (!wrapper) return;

      selectPhotoWrapper(wrapper);
    });
  }

  if (deletePhotoBtn) {
    deletePhotoBtn.addEventListener("click", () => {
      if (!selectedWrapper) return;
      selectedWrapper.remove();
      clearSelectedPhoto();
    });
  }

  // Checklist functionality
  const checkInput = document.querySelector("#checkItemInput");
  const addCheckBtn = document.querySelector("#addCheckItemBtn");
  const checklistItems = document.querySelector("#checklistItems");

  const makeChecklistRow = (text, checked) => {
    const row = document.createElement("div");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!checked;

    const label = document.createElement("span");
    label.textContent = " " + text;
    label.style.textDecoration = cb.checked ? "line-through" : "none";

    cb.addEventListener("change", () => {
      label.style.textDecoration = cb.checked ? "line-through" : "none";
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.classList.add("checklist-delete-btn");

    delBtn.addEventListener("click", () => {
      row.remove();
    });

    row.appendChild(cb);
    row.appendChild(label);
    row.appendChild(delBtn);

    return row;
  };

  const addChecklistItem = () => {
    if (!checkInput || !checklistItems) return;

    const text = checkInput.value.trim();
    if (!text) return;

    checklistItems.appendChild(makeChecklistRow(text, false));
    checkInput.value = "";
  };

  if (addCheckBtn) {
    addCheckBtn.addEventListener("click", addChecklistItem);
  }

  if (checkInput) {
    checkInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addChecklistItem();
      }
    });
  }

  // Location lookup
  const getLocBtn = document.querySelector("#getLocationBtn");
  const locStatus = document.querySelector("#locationStatus");
  const locDisplay = document.querySelector("#locationDisplay");

  var travelMap = null;

  var mapDiv = document.querySelector("#map");

  if (mapDiv) {
    travelMap = L.map("map").setView([20, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(travelMap);
  }

  const latInputExisting = document.querySelector("#latitude");
  const lngInputExisting = document.querySelector("#longitude");

  const latInput = latInputExisting || document.createElement("input");
  if (!latInputExisting) {
    latInput.type = "hidden";
    latInput.id = "latitude";
    document.body.appendChild(latInput);
  }

  const lngInput = lngInputExisting || document.createElement("input");
  if (!lngInputExisting) {
    lngInput.type = "hidden";
    lngInput.id = "longitude";
    document.body.appendChild(lngInput);
  }

  if (getLocBtn) {
    getLocBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        if (locStatus) locStatus.textContent = "Geolocation not supported";
        return;
      }

      if (locStatus) locStatus.textContent = "Requesting location...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          latInput.value = String(lat);
          lngInput.value = String(lng);

          if (locStatus) locStatus.textContent = "Location found";
          if (locDisplay) {
            locDisplay.innerHTML =
              "Latitude: " +
              lat.toFixed(6) +
              "<br>Longitude: " +
              lng.toFixed(6);
          }

          if (travelMap) {
            travelMap.setView([lat, lng], 13);
            L.marker([lat, lng]).addTo(travelMap);
          }
        },
        () => {
          if (locStatus) locStatus.textContent = "Unable to retrieve location";
        }
      );
    });
  }

  // When a log is edited, it brings it the correct screen2
  // double check and edit this code if you want, i searched this up
  const params = new URLSearchParams(window.location.search);
  const idStr = params.get("id");
  const tripId = idStr === null ? null : Number(idStr);

  if (tripId !== null && !Number.isNaN(tripId)) {
    const dbJSON = localStorage.getItem("database") || "[]";
    let db;
    try {
      db = JSON.parse(dbJSON);
    } catch (e) {
      db = [];
    }

    const log = db.find((x) => x.id === tripId);

    if (log) {
      const titleEl = document.querySelector("#title");
      if (titleEl) titleEl.value = log.title || "";

      const locationEl = document.querySelector("#location");
      if (locationEl) locationEl.value = log.location || "";

      const datesEl = document.querySelector("#dates");
      if (datesEl) datesEl.value = log.dates || "";

      const bannerEl = document.querySelector("#banner");
      if (bannerEl) bannerEl.value = log.banner || "";

      const notesEl = document.querySelector("#notes");
      if (notesEl) notesEl.value = log.notes || "";

      const itineraryEl = document.querySelector("#itinerary");
      if (itineraryEl) itineraryEl.value = log.itinerary || "";

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

      clearSelectedPhoto();

      if (checklistItems) {
        checklistItems.innerHTML = "";
        if (Array.isArray(log.checklist)) {
          log.checklist.forEach((item) => {
            if (!item || !item.text) return;
            checklistItems.appendChild(
              makeChecklistRow(item.text, item.checked)
            );
          });
        }
      }

      if (log.latitude && log.longitude) {
        latInput.value = String(log.latitude);
        lngInput.value = String(log.longitude);

        const lat = Number(log.latitude);
        const lng = Number(log.longitude);

        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          if (locStatus) locStatus.textContent = "Location found";
          if (locDisplay) {
            locDisplay.innerHTML =
              "Latitude: " +
              lat.toFixed(6) +
              "<br>Longitude: " +
              lng.toFixed(6);
          }

          if (travelMap) {
            travelMap.setView([lat, lng], 13);
            L.marker([lat, lng]).addTo(travelMap);
          }
        }
      }
    }
  }
});
