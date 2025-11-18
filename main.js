// We can worry about the JS towards the end

// testing map usage, trying to figure how to make a map appear with APIs
const editBtn = document.querySelector("#editPageBtn");
const saveBtn = document.querySelector("#saveEntryBtn");

const fields = [
  document.querySelector("#titleInput"),
  document.querySelector("#locationInput"),
  document.querySelector("#datesInput"),
  document.querySelector("#notesInput"),
  document.querySelector("#itineraryInput"),
];

const photoInput = document.querySelector("#photoInput");
const addPhotosBtn = document.querySelector("#addMorePhotosBtn");
const photoDisplay = document.querySelector("#photoDisplay");

editBtn.addEventListener("click", () => {
  fields.forEach((f) => (f.disabled = false));
  addPhotosBtn.classList.remove("disabled");
  saveBtn.style.display = "block";
});

saveBtn.addEventListener("click", () => {
  fields.forEach((f) => (f.disabled = true));
  addPhotosBtn.classList.add("disabled");
  saveBtn.style.display = "none";
});

addPhotosBtn.addEventListener("click", () => {
  if (!addPhotosBtn.classList.contains("disabled")) {
    photoInput.click();
  }
});

photoInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    const wrapper = document.createElement("div");
    wrapper.appendChild(img);
    photoDisplay.appendChild(wrapper);
  });
});

const getLocBtn = document.querySelector("#getLocationBtn");
const locStatus = document.querySelector("#locationStatus");
const locDisplay = document.querySelector("#locationDisplay");

getLocBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    locStatus.textContent = "Geolocation not supported";
    return;
  }

  locStatus.textContent = "Requesting location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      locStatus.textContent = "Location found";
      locDisplay.innerHTML =
        "Latitude: " + lat.toFixed(6) + "<br>Longitude: " + lng.toFixed(6);
    },
    () => {
      locStatus.textContent = "Unable to retrieve location";
    }
  );
});
