// We can worry about the JS towards the end

export const addingData = () =>
{
    const inputs = document.querySelectorAll(".data-input");
    console.log("adding");
    const newItem = {
        title: "",
        location:"",
        dates:"",
        banner:"",
        notes:"",
        itinerary:"",
        photo:[],
        id: Date.now(),
        latitude: "",
        longitude: ""
        };

    document.querySelectorAll('input').forEach((item) => {
        if (item.id === "banner" && item.value == null || item.value == ""){
            var bannerPlaceholder = "https://imgs.search.brave.com/-D4btnvwdQ47Udchhn36LvWi8VbUXhmF-zVRQuyfDj0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MzMyNTk1ODQ2MDQt/YWZkYzI0MzEyMmVh/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE5ueDhaR0Z5/YXlVeU1HSnNkV1Vs/TWpCaVlXTnJaM0p2/ZFc1a2ZHVnVmREI4/ZkRCOGZId3c";
            newItem[item.id] = bannerPlaceholder;
        }
        else
        {
            newItem[item.id] = item.value;
        }
    })

    document.querySelectorAll('textarea').forEach((item) => {
        newItem[item.id] = item.value;
    })
    savingData(newItem);    
}

//actually writing data to memory
export const savingData = (data) => { 
    const db = retrievingData(); //needs to retrieve the list in order to append new data to it
    db.push(data);
    localStorage.setItem("database", JSON.stringify(db)); //put it back
};

export const retrievingData = () => {
   const database = localStorage.getItem("database") || '[]';
   console.log(database);
    return JSON.parse(database);
    };

if (document.querySelector(".save-entry")){
        console.log("save");
    document.querySelector(".save-entry").addEventListener("click", addingData);
}
