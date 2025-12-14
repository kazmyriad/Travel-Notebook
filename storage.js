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
   // issue is before parsing, parsing cannot continue because something isnt formatted as JSON
   console.log(database);
    return JSON.parse(database);
    };

if (document.querySelector(".save-entry")){
        console.log("save");
    document.querySelector(".save-entry").addEventListener("click", addingData);
}
