
const openIndex = () =>
{
    console.log("BUTTON");
    window.location.href= "./index.html";

}
document.querySelector(".save-entry-btn").addEventListener("click", openIndex);


// testing map usage, trying to figure how to make a map appear with APIs
// i searched this entire part up, especially the location coordinates part

// // Photo upload functionality
const photoInput = document.querySelector("#photoInput");
const addPhotosBtn = document.querySelector("#addPhotosBtn");
const photoDisplay = document.querySelector("#photoDisplay");

addPhotosBtn.addEventListener("click", () => {
  photoInput.click();
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

// Location lookup
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
