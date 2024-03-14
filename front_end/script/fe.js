const url = 'https://fap.fpt.edu.vn/Report/ScheduleOfWeek.aspx';

// Get cookies from the document header
const cookie = document.cookie;

// Send message to background.js with the cookie
chrome.runtime.sendMessage({ action: 'mergeCookies', cookie }, response => {
    // console.log(response);

    const options = {
        method: 'GET',
        headers: {


            'Content-Type': 'application/json',
            'fapcookie': response // Including client-side cookies in the request headers
            
        },
        // body: JSON.stringify({})
    };
    

    var content = document.querySelector('div.col-md-12');
    content.style.display = 'none'; // Hides the selected element
    
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Parse JSON data
    })
    .then(html => {
        // Parse the HTML string into a DOM document
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');


        
        const rows = document.querySelectorAll('.row');
        var dataRow = rows[1];
        const scheduleDiv = document.createElement('div');
        scheduleDiv.classList.add('schedule');

        // Append the newly created div to the dataRow
        dataRow.appendChild(scheduleDiv);
        var Tbls = doc.getElementsByTagName('table');
        var mainTable = document.createElement('table');
        scheduleDiv.appendChild(mainTable);

        var yearTh = Tbls[2].querySelectorAll('th');
        yearTh[0].innerHTML = '';

         // Copy HTML content from Tbls[2] table to mainTable
        mainTable.innerHTML = Tbls[2].innerHTML;
    })
    .catch(error => {
        console.error('Error:', error.message);
    });


});