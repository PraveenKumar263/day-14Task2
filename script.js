// Create button
function button_create(inputTag, attrName, attrVal, attrName1, attrVal1, contents, className){
    let input_ele = document.createElement(inputTag);
    input_ele.setAttribute(attrName, attrVal);
    input_ele.setAttribute(attrName1, attrVal1);
    input_ele.innerHTML = contents;
    input_ele.className = className;
    return input_ele;
}

// Create div element with class
function div_create(classname){
    let ele = document.createElement("div");
    ele.className = classname;
    return ele;
}

// Populate table body
function populateTable(arr) {
    let tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    arr.forEach(data=>{
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${data.id}</td>
        <td>${data.first_name}</td>
        <td>${data.last_name}</td>
        <td>${data.email}</td>
        <td>${data.gender}</td>
        `;
        tbody.appendChild(row);
    });
}

// Fetch data from API
function getData(currentPage, recordsPerPage) {
    fetch('https://raw.githubusercontent.com/PraveenKumar263/day-14Task2/main/MOCK_DATA.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const totalRecords = data.length;
            totalPages = Math.ceil(totalRecords / recordsPerPage);
            let startIndex = (currentPage - 1) * recordsPerPage;
            let endIndex = startIndex + recordsPerPage;
            populateTable(data.slice(startIndex, endIndex));
            let paginationDiv = document.getElementById("buttons");
            paginationDiv.innerHTML = ""; 
            createPaginationButtons(currentPage, currentPage+numPagesToDisplay, totalPages);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Create pagination buttons
function createPaginationButtons(currentPage, endPage, totalPages) {
    let paginationDiv = document.getElementById("buttons");
    
    // Logic for page buttons to be created
    let pageBtnStart = currentPage > totalPages-5 ? totalPages-5:currentPage;
    let pageBtnEnd = 0;
    if(endPage>totalPages) {
        pageBtnEnd = totalPages;
    }
    else{
        pageBtnEnd = endPage;
    }

    // First page btn
    const firstPageBtn = button_create("button", "type", "button", "id", "first", "First", "btn btn-primary");
    firstPageBtn.addEventListener("click", () => goToPage(1));
    paginationDiv.appendChild(firstPageBtn);

    // Previous page button
    const prevPageBtn = button_create("button", "type", "button", "id", "previous", "Previous", "btn btn-primary");
    prevPageBtn.addEventListener("click", () => goToPage(currentPage - 1));
    if (currentPage == 1) {
        prevPageBtn.disabled = true;
    }
    paginationDiv.appendChild(prevPageBtn);

    // Create buttons for each page in the range
    for (let i = pageBtnStart; i <= pageBtnEnd; i++) {
        const button = button_create("button", "type", "button", "id", `btn-${i}`, `${i}`, "btn btn-secondary btn-sm");
        button.addEventListener("click", () => goToPage(i));
        paginationDiv.appendChild(button);
    }

    // Next btn
    const nextPageBtn = button_create("button", "type", "button", "id", "next", "Next", "btn btn-primary");
    nextPageBtn.addEventListener("click", () => goToPage(currentPage + 1));
    if (currentPage == totalPages) {
        nextPageBtn.disabled = true;
    }
    paginationDiv.appendChild(nextPageBtn);

    // Last page btn
    const lastPageBtn = button_create("button", "type", "button", "id", "last", "Last", "btn btn-primary");
    lastPageBtn.addEventListener("click", () => goToPage(totalPages));
    paginationDiv.appendChild(lastPageBtn);

}

// Function to handle pagination navigation
function goToPage(newPage) {
    if (newPage < 1 || newPage > totalPages) {
        return;
    }
    getData(newPage, recordsPerPage);
}

// Build basic div elements
const container = div_create("container");
const row = div_create("row");
const col = div_create("col");

// Create title h1 and p
const task_info = div_create("task-info");
const task_title = document.createElement("h1");
task_title.textContent = "Pagination in DOM Manipulation";
task_title.id = "title";

const task_descr = document.createElement("p");
task_descr.textContent = "This task explores pagination via DOM";
task_descr.id = "description";

// Create table
const tableCol = div_create("table-responsive");
const table = document.createElement("table");
table.id = "table";
table.className = "table table-bordered";
const thead = document.createElement("thead");
thead.className = "thead-dark";
const theadRow = document.createElement("tr");
const tbody = document.createElement("tbody");
tbody.id = "table-body";

// table headers
const table_headers = ["Id", "First Name", "Last Name", "Email", "Gender"];
table_headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    theadRow.appendChild(th);
});

// DOM elements structure setup
document.body.appendChild(container);
container.appendChild(row);
row.appendChild(col);
col.append(task_info, tableCol);
task_info.append(task_title, task_descr);
tableCol.appendChild(table);
table.append(thead, tbody);
thead.appendChild(theadRow);

// Pagination variables
const recordsPerPage = 10;
const numPagesToDisplay = 4;
let currentPage = 1;

// Buttons box
const paginationBox = div_create("d-flex justify-content-center");
paginationBox.id = "buttons";
col.appendChild(paginationBox);

// Initialize pagination
getData(currentPage, recordsPerPage);
