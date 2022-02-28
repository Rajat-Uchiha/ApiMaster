
// Initializing variables;
let addedParamCount = 0;

// Utility functions
function getElementFromString(string) { //ehe function har parameter de ander di value len lyi likheya hai
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}

let responseVal = document.getElementById("responsePrism");
responseVal.innerHTML = "Your response will be shown here.";

// Grabing paramsBox by id
let paramBox = document.getElementById("paramsBox");
paramBox.style.display = "none"; // initially hide paramBox

// Grabing paramsBox by id
let jsonContentBox = document.getElementById("jsonContentBox");
// jsonContentBox.style.display = "none"; // initially hide jsonContentBox

// If the user click on json, show jsonContentBox and hide paramsBox
let jsonclicked = document.getElementById("jsonclicked");

jsonclicked.addEventListener("click", () => { //Adding event listener click

    jsonContentBox.style.display = "flex"; // show the jsonContent Box
    // -----------------------------------------------------------
    paramBox.style.display = "none"; // Hide the paramBox
});


// If the user click on Custom parameters, show paramsBox and hide jsonContentBox
let paramsclicked = document.getElementById("paramsclicked");

paramsclicked.addEventListener("click", () => { //Adding event listener click

    paramBox.style.display = "block"; // Show the paramBox
    // -------------------------------------------------------------
    jsonContentBox.style.display = "none"; // Hide jsonContent Box

});

// To add more params if user clicked on + button
let addParams = document.getElementById("addParams");//Adding event listener click
addParams.addEventListener("click", () => {
    let newParams = document.getElementById("newParams");
    let string = `<section class="text-gray-600 body-font w-full my-2">
                        <div class="container  w-full">
                            <div
                                class="flex lg:w-3/4 justify-center w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                                <div class="relative  w-full">
                                    <input type="text" id="paramsKey${addedParamCount + 2}" placeholder="Paramter ${addedParamCount + 2} Key"
                                        class=" form-control w-full bg-gray-100 bg-opacity-50 rounded border border-gray-600 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </div>
                                <div class="relative  w-full">
                                    <input type="text" id="paramsValue${addedParamCount + 2}" placeholder="Paramter ${addedParamCount + 2}  Value"
                                        class=" form-control w-full bg-gray-100 bg-opacity-50 rounded border border-gray-600 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                </div>
                                <button
                                    id="addParams" class=" deleteParam text-white bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">-</button>
                            </div>
                        </div>
                    </section>`;
    // Convert the content to DOM node 
    let recievedElement = getElementFromString(string);
    newParams.appendChild(recievedElement);
    // Adding an eventlistener to delete parameters of clicking - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });
    };
    addedParamCount++;
});


// If the user clicked on the submit button
let submitClicked = document.getElementById("submitBtn");
submitClicked.addEventListener("click", () => {


    // Show please wait in the response box 
    let responseVal = document.getElementById("responsePrism");
    responseVal.innerHTML = "Please wait we are working on your request. . . . .";

    // Getting the value of url , request type, content type
    let url = document.getElementById("url").value;

    // To get the value of the radio button (request Type)
    var getRequestedType = document.querySelector("input[name='requestType']:checked").value;

    // To get the value of the radio button (Content Type)
    var getContentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has checked Custom params then we will save all the parameters into an object

    if (getContentType == "CustomParams") {

        paramsData = {}; //Creating an empty object to save all the parameters in this object

        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById("paramsKey" + (i + 1)) != undefined) {
                let key = document.getElementById("paramsKey" + (i + 1)).value;
                let value = document.getElementById("paramsValue" + (i + 1)).value;
                paramsData[key] = value;
            }
        }
        paramsData = JSON.stringify(paramsData);

    }
    else {
        paramsData = document.getElementById("jsonTextBox").value;
        paramsData = JSON.stringify(paramsData);
    }


    // If request Type is GET invoke fetch api to create GET request
    if (getRequestedType == "GET") {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: "POST",
            body: paramsData,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.text()).then((text) => {
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        })
    }


});







