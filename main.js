// We can worry about the JS towards the end
import { retrievingData } from "./storage.js";

// everytime the page loads, read LocalStorage and rerender log displays...=

window.addEventListener("DOMContentLoaded", function(){
     //When dom loads, look through atabase and populatate logs
     const db = retrievingData();
     console.log("Hello");
         let count = 0;
         
     db.forEach(element => {
      // how to access title of a specific object?
        var el = `<log-display title="${db[count].title}" date="${db[count].dates}" photo="${db[count].banner}" id="${db[count].id}"></log-display>`;
        document.getElementById("log-wrapper").innerHTML += el;
        console.log(db);
        count++;
     });
})
   



