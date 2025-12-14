import { retrievingData } from "./storage.js";

window.addEventListener("DOMContentLoaded", function(){
     const db = retrievingData();
     console.log("Hello");
         let count = 0;
         
     db.forEach(element => {
        var el = `<log-display title="${db[count].title}" date="${db[count].dates}" photo="${db[count].banner}" id="${db[count].id}"></log-display>`;
        document.getElementById("log-wrapper").innerHTML += el;
        console.log(db);
        count++;
     });
})
   
