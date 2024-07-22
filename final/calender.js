
function initializeCalendarComponents() {
    // Create and append the calendar container
    const calendarContainer = document.createElement('div');
    calendarContainer.id = 'calendar-container';
    document.body.appendChild(calendarContainer);
  
    // Create and append the popup container
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popupContainer';
    document.body.appendChild(popupContainer);
  
    // Create and append the form container
    const formContainer = document.createElement('div');
    formContainer.id = 'formContainer';
    formContainer.style.display = 'block';
    document.body.appendChild(formContainer);
  
    // Create and append the patient form
    const patientForm = document.createElement('div');
    patientForm.id = 'patient_form';
    document.body.appendChild(patientForm);
  }
  
  // Call the function to initialize components
  initializeCalendarComponents();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  
function addStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            background-color: #2C2F48;
            color: white;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .calendar-container {
            width: 320px;
            background-color: #3E416D;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            text-align: center;
            padding: 20px;
        }
        .calendar-header h1 {
            font-size: 1.2em;
            margin: 0 0 10px;
        }
        .progress-bar-container {
            height: 10px;
            background: #ccc;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        .progress-bar {
            width: 50%;
            height: 100%;
            background: #9DB6E1;
        }
        .message {
            display: none;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
        }
        .success-message {
            background: green;
            color: white;
        }
        .warning-message {
            background: orange;
            color: white;
        }
        .month-year {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .month-year span {
            cursor: pointer;
        }
        .calendar {
            width: 100%;
            border-collapse: collapse;
        }
        .calendar th, .calendar td {
            border: 1px solid #4A4C7A;
            text-align: center;
            padding: 10px;
            color: white;
        }
        .inactive {
            background-color: #4A4C7A;
        }
        .active {
            background-color: #7E81A7;
        }
    `;
    document.head.appendChild(style);
}

let calendarContainer

function createCalendar() {

    calendarContainer = document.getElementById('calendar-container');

    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarContainer.appendChild(calendarHeader);

    const h1 = document.createElement('h1');
    h1.textContent = 'Select your Appointment Date';
    calendarHeader.appendChild(h1);

    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    calendarHeader.appendChild(progressBarContainer);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'progressBar';
    progressBarContainer.appendChild(progressBar);

    const successMessage = document.createElement('div');
    successMessage.className = 'message success-message';
    successMessage.id = 'successMessage';
    successMessage.textContent = 'Appointment submitted successfully!';
    calendarHeader.appendChild(successMessage);

    const warningMessage = document.createElement('div');
    warningMessage.className = 'message warning-message';
    warningMessage.id = 'warningMessage';
    warningMessage.textContent = 'Please fill in all fields!';
    calendarHeader.appendChild(warningMessage);

    const monthYear = document.createElement('div');
    monthYear.className = 'month-year';
    calendarHeader.appendChild(monthYear);

    const prev = document.createElement('span');
    prev.className = 'prev';
    prev.innerHTML = '&#8249;';
    monthYear.appendChild(prev);

    const month = document.createElement('span');
    month.className = 'month';
    month.textContent = 'June';
    monthYear.appendChild(month);

    const year = document.createElement('span');
    year.className = 'year';
    year.textContent = '2024';
    monthYear.appendChild(year);

    const next = document.createElement('span');
    next.className = 'next';
    next.innerHTML = '&#8250;';
    monthYear.appendChild(next);

    const calendar = document.createElement('table');
    calendar.className = 'calendar';
    calendarContainer.appendChild(calendar);

    const thead = document.createElement('thead');
    calendar.appendChild(thead);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tr = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    const tbody = document.createElement('tbody');
    calendar.appendChild(tbody);

    const daysInMonth = [
        ['inactive', 'inactive', 'inactive', 'inactive', 'inactive', 'inactive', 'active'],
        ['active', 'active', 'active', 'active', 'active', 'active', 'active'],
        ['active', 'active', 'active', 'active', 'active', 'active', 'active'],
        ['active', 'active', 'active', 'active', 'active', 'active', 'active'],
        ['active', 'active', 'active', 'active', 'active', 'active', 'active'],
        ['active', 'inactive', 'inactive', 'inactive', 'inactive', 'inactive', 'inactive']
    ];

    daysInMonth.forEach((week, weekIndex) => {
        const tr = document.createElement('tr');
        week.forEach((status, dayIndex) => {
            const td = document.createElement('td');
            td.className = status;
            td.textContent = weekIndex * 7 + dayIndex + 1;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

addStyles();
createCalendar();

function addPopupStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .popup {
            display: none;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
        }
        .popup-content {
            background-color: #2c2c3c;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            position: relative;
            color: white;
        }
        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 18px;
            cursor: pointer;
        }
        .time-slots {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 10px 0;
        }
        .time-slot {
            background-color: #444;
            border: none;
            color: white;
            padding: 10px 15px;
            margin: 5px;
            border-radius: 5px;
            cursor: pointer;
        }
        .time-slot:hover {
            background-color: #bac0fa;
        }
        #saveButton, #nextBtn {
            background-color: #5cb85c;
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }
        #saveButton {
            margin-right: 10px;
        }
        #saveButton:hover, #nextBtn:hover {
            background-color: #4cae4c;
        }
    `;
    document.head.appendChild(style);
}

function createPopup() {
    // Utility function to create a div with a given class and optional text content
    function createDiv(className, textContent = '') {
        const div = document.createElement('div');
        div.className = className;
        div.textContent = textContent;
        return div;
    }

    // Utility function to create a span with a given class, optional text content, or inner HTML
    function createSpan(className, textContent = '', innerHTML = '') {
        const span = document.createElement('span');
        span.className = className;
        if (textContent) {
            span.textContent = textContent;
        }
        if (innerHTML) {
            span.innerHTML = innerHTML;
        }
        return span;
    }

    // Utility function to create a button with a given class and text content
    function createButton(className, textContent) {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = textContent;
        return button;
    }

    // Function to create the time slots
    function createTimeSlots() {
        const times = ['09:00 - 10:00', '12:00 - 13:00', '13:00 - 14:00', '16:00 - 17:00'];
        const timeSlotsDiv = createDiv('time-slots');

        times.forEach(time => {
            const button = createButton('time-slot', time);
            timeSlotsDiv.appendChild(button);
        });

        return timeSlotsDiv;
    }

    // Function to create the popup
    function buildPopup() {
        const popupContainer = document.getElementById('popupContainer');
        if (!popupContainer) {
            console.error("Popup container element not found.");
            return;
        }

        const popup = createDiv('popup');
        popup.id = 'timeSlotPopup';

        const popupContent = createDiv('popup-content');
        popup.appendChild(popupContent);

        const closeBtn = createSpan('close', '', '&times;');
        popupContent.appendChild(closeBtn);

        const title = document.createElement('h2');
        title.textContent = 'Doctor Slot';
        popupContent.appendChild(title);

        const timeSlots = createTimeSlots();
        popupContent.appendChild(timeSlots);

        const saveButton = createButton('saveButton', 'Save');
        popupContent.appendChild(saveButton);

        const nextButton = createButton('nextBtn', 'Next');
        popupContent.appendChild(nextButton);

        // Event listeners for the close button
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Event listeners for the save button
        saveButton.addEventListener('click', () => {
            console.log('Save button clicked');
            // Add save functionality here
        });

       // Event listeners for the next button
        nextButton.addEventListener('click', () => {
            console.log('Next button clicked');
            const formContainer = document.getElementById('formContainer');
            formContainer.style.display = 'block'; // Show the patient form

            popup.style.display = 'none'; // Hide the popup

            const calendarContainer = document.getElementsByClassName('calendar-container')[0];
            if (calendarContainer) {
                calendarContainer.style.display = 'none'; // Hide the calendar container
            }
        });


        popupContainer.appendChild(popup);
    }

    // Function to initialize and add the popup to the DOM
    return function initializePopup() {
        buildPopup();
    }
}

// Usage

const initPopup = createPopup();
initPopup();

// ------------New Code Added end-------------
import  patient_form_starter  from './patientForm.js'
// import  createAppointmentForm  from './patientForm.js'

document.addEventListener("DOMContentLoaded", () => {
    const calendarCells = document.querySelectorAll(".calendar td.active");
    const popup = document.getElementById("timeSlotPopup");

    calendarCells.forEach(cell => {
        cell.addEventListener("click", () => {
            popup.style.display = "flex";
        });
    });
    // createAppointmentForm()
});
patient_form_starter;

// export default{
//     initializeCalendarComponents,
// }