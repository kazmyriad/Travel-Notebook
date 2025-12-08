// We can worry about the JS towards the end
const compiledData = [];

const addingData = () =>
{
    const inputs = document.querySelectorAll(".data-input");
    const title = document.querySelector(".title-input");
    const newListInput = [];
    
    newListInput.push(...Array.from(inputs).map(input => input.value));
    console.log(newListInput); // taking input for current page and making array

    // compiledData.push(newListInput); // pushes new array into list of data

    // console.log(compiledData);
    savingData(newListInput, title.value);

    console.log("ADDED");
}

//actually writing data to memory
export const savingData = (data, title) => {
    var data = JSON.stringify(data); //converts data to a String
    localStorage.setItem(title, data); //saves data in localStorage
};

export const retrievingData = () => {
    var compiledArray = [];

    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        const item = localStorage.getItem(localStorage.key(i));
        const newItem = JSON.parse(item);
        compiledArray+=newItem;
        } // returning a string

    console.log(compiledArray);
    return compiledArray;
};

document.querySelector(".save-entry").addEventListener("click", addingData);
