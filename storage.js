// We can worry about the JS towards the end

export const addingData = () => {
  const inputs = document.querySelectorAll(".data-input");
  console.log("adding");
  const newItem = {
    title: "",
    location: "",
    dates: "",
    banner: "",
    notes: "",
    itinerary: "",
    photo: [],
    id: Date.now(),
    latitude: "",
    longitude: "",
  };

  const params = new URLSearchParams(window.location.search);
  const idStr = params.get("id");
  const tripId = idStr === null ? null : Number(idStr);

  if (tripId !== null && !Number.isNaN(tripId)) {
    newItem.id = tripId;
  }

  document.querySelectorAll("input").forEach((item) => {
    if ((item.id === "banner" && item.value == null) || item.value == "") {
      var bannerPlaceholder =
        "https://imgs.search.brave.com/-D4btnvwdQ47Udchhn36LvWi8VbUXhmF-zVRQuyfDj0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MzMyNTk1ODQ2MDQt/YWZkYzI0MzEyMmVh/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE5ueDhaR0Z5/YXlVeU1HSnNkV1Vs/TWpCaVlXTnJaM0p2/ZFc1a2ZHVnVmREI4/ZkRCOGZId3c";
      newItem[item.id] = bannerPlaceholder;
    } else {
      newItem[item.id] = item.value;
    }
  });

  //saving the photo gallery
  document.querySelectorAll("textarea").forEach((item) => {
    newItem[item.id] = item.value;
  });

  newItem.photo = [];

  const imgs = document.querySelectorAll("#photoDisplay img");
  imgs.forEach((img) => {
    if (img && img.src) {
      newItem.photo.push(img.src);
    }
  });

  //saving the checklist
  newItem.checklist = [];

  const checklistWrap = document.querySelector("#checklistItems");
  if (checklistWrap) {
    const rows = checklistWrap.querySelectorAll("div");
    rows.forEach((row) => {
      const cb = row.querySelector('input[type="checkbox"]');
      const label = row.querySelector("span");
      if (!label) return;

      const text = (label.textContent || "").trim();
      if (!text) return;

      newItem.checklist.push({
        text: text,
        checked: cb ? !!cb.checked : false,
      });
    });
  }

  savingData(newItem);
};

//actually writing data to memory
export const savingData = (data) => {
  const db = retrievingData();

  const params = new URLSearchParams(window.location.search);
  const idStr = params.get("id");
  const tripId = idStr === null ? null : Number(idStr);

  if (tripId !== null && !Number.isNaN(tripId)) {
    const idx = db.findIndex((x) => x.id === tripId);
    if (idx !== -1) {
      data.id = tripId;
      db[idx] = data;
      localStorage.setItem("database", JSON.stringify(db));
      return;
    }
  }

  db.push(data);
  localStorage.setItem("database", JSON.stringify(db));
};

export const retrievingData = () => {
  const database = localStorage.getItem("database") || "[]";
  console.log(database);
  return JSON.parse(database);
};

if (document.querySelector(".save-entry")) {
  console.log("save");
  document.querySelector(".save-entry").addEventListener("click", addingData);
}
