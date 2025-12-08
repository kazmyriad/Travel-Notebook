// We can worry about the JS towards the end
import { retrievingData } from "./storage";

document.querySelector(".create-new").addEventListener("click", openPage2);
document.querySelector(".open-log").addEventListener("click", openPage3);

// const openPage2 = () =>
// {
//     console.log("BUTTON");
//     window.location.href= "./page2.html";
// }


const openPage3 = () =>
{
    console.log("BUTTON");
    window.location.href= "./page3.html";
}

const createLog = () =>{
    const container = document.querySelector(".log-wrapper");
    const allData = retrievingData();

    allData.forEach(element => {
        document.querySelector(".log-wrapper").innerHTML = '<p>HellO!</p>';
    });
    console.log("created");
}

window.addEventListener("Load", (event) => { 
    createLog();
    console.log("Loaded");
});


