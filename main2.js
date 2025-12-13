const openIndex = () => {
  console.log("BUTTON");
  window.location.href = "./index.html";
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

  // testing map usage, trying to figure how to make a map appear with APIs
  // i searched this entire part up, especially the location coordinates part

  // Photo upload functionality
  const photoInput = document.querySelector("#photo");
  const photoDisplay = document.querySelector("#photoDisplay");
  const addPhotoBtn = document.querySelector(".photo-gallery button");

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

  // Location lookup
  const getLocBtn = document.querySelector("#getLocationBtn");
  const locStatus = document.querySelector("#locationStatus");
  const locDisplay = document.querySelector("#locationDisplay");

  // maps-integration
  var travelMap = null;

  var mapDiv = document.querySelector("#map");

  if (mapDiv) {
    travelMap = L.map("map").setView([20, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(travelMap);
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
});
