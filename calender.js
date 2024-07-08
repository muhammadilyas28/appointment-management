// Create and append the calendar container
const calendarContaine = document.createElement('div');
calendarContaine.id = 'calendar-container';
document.body.appendChild(calendarContaine);

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
    const popupContainer = document.getElementById('popupContainer');

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'timeSlotPopup';
    popupContainer.appendChild(popup);

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popup.appendChild(popupContent);

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    popupContent.appendChild(closeBtn);

    const title = document.createElement('h2');
    title.textContent = 'Doctor Slot';
    popupContent.appendChild(title);

    const timeSlots = document.createElement('div');
    timeSlots.className = 'time-slots';
    popupContent.appendChild(timeSlots);

    const times = ['09:00 - 10:00', '12:00 - 13:00', '13:00 - 14:00', '16:00 - 17:00'];
    times.forEach(time => {
        const button = document.createElement('button');
        button.className = 'time-slot';
        button.textContent = time;
        timeSlots.appendChild(button);
    });

    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Save';
    popupContent.appendChild(saveButton);

    const nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.textContent = 'Next';
    popupContent.appendChild(nextButton);

    // Event listeners for the close button
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Example of how to show the popup
    // To show the popup, set popup.style.display to 'flex'
    // popup.style.display = 'flex';
}

addPopupStyles();
createPopup();

document.addEventListener("DOMContentLoaded", () => {
    const calendarCells = document.querySelectorAll(".calendar td.active");
    const popup = document.getElementById("timeSlotPopup");
    const closeBtn = document.querySelector(".close");
    const saveBtn = document.getElementById("saveButton");
    const nextBtn = document.getElementById("nextBtn");
    
    
    calendarCells.forEach(cell => {
        cell.addEventListener("click", () => {
            popup.style.display = "flex";
        });
    });
    
    
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
    
    saveBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
    nextBtn.addEventListener("click", (event) => {
        console.log(event);
        console.log("onclick for patient fom");
        // patient_form.classList.remove('patientform_displayBlock')
        const container = document.getElementById('formContainer');
        container.style.display='block'
        popup.style.display = "none";
        popup.style.display = "none";
        // console.log(calendar_container[0]);
        // const calendar_container = document.getElementsByClassName("calendar-container");
        // console.log(calendar_container);

        calendarContainer.style.display='none'
    });
});

// --------------------PATIENT APPOINTMENT FORM---------------------

let patient_form=document.getElementById("patient_form")

patient_form.className='patientform_displayBlock'

// Open (or create) the IndexedDB database
let db;
let request = window.indexedDB.open('PatientAppointmentsDB', 1);

// Handle database creation or upgrade
request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store (like a table) to store patient appointments
    let objectStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement:true });

    // Define the schema(Name) of the IndexedDB

    objectStore.createIndex('patientData', 'patientData');

    console.log('Database setup complete');
};

// Handle successful database opening
request.onsuccess = function(event) {
    db = event.target.result;
    console.log('Database opened successfully');
};

// Handle database errors
request.onerror = function(event) {
    console.error('Database error:', event.target.errorCode);
};

// Function to save form data to IndexedDB
function saveAppointmentToDB(appointmentData) {
    console.log(appointmentData);
    let transaction = db.transaction(['appointments'], 'readwrite');
    let objectStore = transaction.objectStore('appointments');

    // Add the appointment data to the object store
    let request = objectStore.add(appointmentData);

    // Handle successful addition
    request.onsuccess = function(event) {
        console.log('Appointment saved to database');
    };

    // Handle errors
    request.onerror = function(event) {
        console.error('Error saving appointment:', event.target.error);
    };
}

let appointmentData=""
// Function to submit the form

function submitForm(event) {

    event.preventDefault(); // Prevent form submission

    // Fetch values from form   

    let patient_Name=document.getElementById('patientName')
    console.log(patient_Name);
    let doctor_name=document.getElementById('doctor')
    let appointment_Date=document.getElementById('appointmentDate')
    let appointment_Time=document.getElementById('appointmentTime')
    let email_patient=document.getElementById('email')
    let phone_patient=document.getElementById('phone')
    let payment_Type=document.getElementById('paymentType')
    let amount=document.getElementById('amount')
    let comments_=document.getElementById('comments')

    // Create an object with the form data
    appointmentData = {
        patientName: patient_Name.value,
        patientPhone:phone_patient.value,
        appointmentDate: appointment_Date.value,
        appointmentTime: appointment_Time.value,
        patient_email:email_patient.value,
        doctor: doctor_name.value,
        paymentType:payment_Type.value,
        comments: comments_.value,
        amounts:amount.value
    };
    console.log(appointmentData);

    // Save the data to IndexedDB
    saveAppointmentToDB(appointmentData);
    idbToReciptFile(appointmentData)
   

    // Optional: Reset the form after submission
    document.getElementById('appointmentForm').reset();
}

// Function to show messages
function showMessage(type) {
    const successMessage = document.getElementById('successMessage');
    const warningMessage = document.getElementById('warningMessage');

    if (type === 'success') {
        successMessage.style.display = 'block';
        warningMessage.style.display = 'none';
    } else if (type === 'warning') {
        successMessage.style.display = 'none';
        warningMessage.style.display = 'block';
    }

    // Hide the message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
        warningMessage.style.display = 'none';
    }, 3000);
}

// Function to update the progress bar
function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
}

function idbToReciptFile(appointmentData){
    document.getElementById('patient_n').innerText += appointmentData.patientName
    document.getElementById('doctor_n').innerText += appointmentData.doctor
    document.getElementById('appointment_D').innerText += appointmentData.appointmentDate
    document.getElementById('appointment_T').innerText += appointmentData.appointmentTime
    document.getElementById('patient_e').innerText += appointmentData.patient_email
    document.getElementById('patient_p').innerText += appointmentData.patientPhone
    document.getElementById('patient_pay').innerText += appointmentData.paymentType
    document.getElementById('patient_c').innerText += appointmentData.comments
    document.getElementById('patient_amut').innerText += appointmentData.amounts
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    document.getElementById('invoice_date').innerText += `${day}-${month}-${year}`
    
}
 
let submitButton = null;

function createAppointmentForm() {
    const container = document.getElementById('formContainer');
    container.style.display='none'
    // container.className='patientform_displayBlock'
    container.style.width='80%'

    const formContainer = document.createElement('div');
    formContainer.id = 'patient_form';
    formContainer.className = 'bg-white p-8 rounded-lg shadow-lg w-screen';
    formContainer.style.padding = '30px';
    formContainer.style.borderRadius = '11px';

    const formTitle = document.createElement('h2');
    formTitle.className = 'text-2xl font-bold mb-6 text-gray-800';
    formTitle.textContent = 'Patient Appointment Form';
    formContainer.appendChild(formTitle);

    const form = document.createElement('form');
    form.id = 'appointmentForm';
    form.onsubmit = (event) => submitForm(event);
    formContainer.appendChild(form);

const fieldGroups = [
    [
        { label: 'Patient Name:', type: 'text', id: 'patientName', name: 'patientName' },
        { label: 'Doctor', type: 'select', id: 'doctor', name: 'doctor', options: ['Select Doctor', 'Dr. Smith', 'Dr. Johnson', 'Dr. Brown'] }
    ],
    [
        { label: 'Appointment Date:', type: 'date', id: 'appointmentDate', name: 'appointmentDate' },
        { label: 'Appointment Time:', type: 'time', id: 'appointmentTime', name: 'appointmentTime' }
    ],
    [
        { label: 'User e-mail:', type: 'email', id: 'email', name: 'email' },
        { label: 'Phone:', type: 'tel', id: 'phone', name: 'phone' }
    ],
    [
        { label: 'Amount:', type: 'tel', id: 'amount', name: 'amount' },
        {
            label: 'Payment Type:', type: 'radio', id: 'paymentType', name: 'paymentType', options: [
                { value: 'paid', text: 'Paid' },
                { value: 'unpaid', text: 'Unpaid' }
            ]
        }
    ]
];

    fieldGroups.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'flex flex-row gap-10 justify-center items-center w-full';

        group.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'mb-4 flex flex-row gap-5 justify-center items-center';

            const label = document.createElement('label');
            label.className = 'block text-gray-700 font-bold';
            label.htmlFor = field.id;
            label.textContent = field.label;
            fieldDiv.appendChild(label);

            if (field.type === 'select') {
                const select = document.createElement('select');
                select.id = field.id;
                select.name = field.name;
                select.className = 'mt-1 w-[40%] border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500';
                select.required = true;

                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option === 'Select Doctor' ? '' : option;
                    optionElement.disabled = option === 'Select Doctor';
                    optionElement.selected = option === 'Select Doctor';
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                });

                fieldDiv.appendChild(select);

            } else if (field.type === 'radio') {
                const radioDiv = document.createElement('div');
                radioDiv.className = 'mt-1';

                field.options.forEach(option => {
                    const radioLabel = document.createElement('label');
                    radioLabel.className = 'inline-flex items-center';

                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.id = field.id;
                    radioInput.name = field.name;
                    radioInput.value = option.value;
                    radioInput.required = true;
                    radioLabel.appendChild(radioInput);

                    const span = document.createElement('span');
                    span.className = 'ml-2';
                    span.textContent = option.text;
                    radioLabel.appendChild(span);

                    radioDiv.appendChild(radioLabel);
                });

                fieldDiv.appendChild(radioDiv);
            } else {
                const input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
                input.name = field.name;
                input.className = 'mt-1 w-[40%] border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500';
                input.required = true;
                fieldDiv.appendChild(input);
            }

            groupDiv.appendChild(fieldDiv);
        });

        form.appendChild(groupDiv);
    });

    const commentsDiv = document.createElement('div');
    commentsDiv.className = 'mb-4 flex flex-row gap-5 justify-center items-center';

    const commentsLabel = document.createElement('label');
    commentsLabel.htmlFor = 'comments';
    commentsLabel.className = 'block text-gray-700 font-medium';
    commentsLabel.textContent = 'Comments (optional):';
    commentsDiv.appendChild(commentsLabel);

    const commentsTextarea = document.createElement('textarea');
    commentsTextarea.id = 'comments';
    commentsTextarea.name = 'comments';
    commentsTextarea.rows = 4;
    commentsTextarea.className = 'mt-1 w-[40%] border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-indigo-500 focus:border-indigo-500';
    commentsDiv.appendChild(commentsTextarea);

    form.appendChild(commentsDiv);

    submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submite_btn';
    submitButton.className = 'w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
    submitButton.textContent = 'Submit Appointment';

       

        submitButton.addEventListener('click',(event)=>{

            formContainer.style.display='none'  
            // patient_form.style.display='none'  
            recipt_file.style.display='block'
            recipt_file.style.width='100%'
        });

  
    form.appendChild(submitButton);

    container.appendChild(formContainer);
}

createAppointmentForm();

// -------------------Recipt File data Code------------------------

function createReceipt() {
    const receiptFile = document.createElement('div');
    receiptFile.id = 'recipt_file';
    receiptFile.className = 'max-w-sm mx-auto text-gray-500 shadow-md rounded-lg overflow-hidden hidden';

    const receiptContent = document.createElement('div');
    receiptContent.className = 'px-6 py-4 flex flex-col gap-4 bg-slate-400';
    receiptContent.style.backgroundColor = 'cornsilk';

    const header = document.createElement('div');
    header.className = 'font-bold text-xl mb-2 text-white bg-blue-500 p-2 rounded';
    header.textContent = 'Appointment details:';
    receiptContent.appendChild(header);

    const appointmentDetails = document.createElement('ul');
    appointmentDetails.id = 'appointmentDetails';
    appointmentDetails.className = 'flex flex-col gap-5 w-full';

    const details = [
        { id: 'patient_Name', label: 'Patient Name:', spanId: 'patient_n' },
        { id: 'doctor_name', label: 'Doctor Name:', spanId: 'doctor_n' },
        { id: 'appointment_Date', label: 'Appointment Date:', spanId: 'appointment_D' },
        { id: 'appointment_Time', label: 'Appointment Time:', spanId: 'appointment_T' },
        { id: 'patient_email', label: 'User e-mail:', spanId: 'patient_e' },
        { id: 'patient_phone', label: 'Phone:', spanId: 'patient_p' },
        { id: 'patient_amount', label: 'Amount:', spanId: 'patient_amut' },
        { id: 'patient_paymentType', label: 'Payment:', spanId: 'patient_pay' },
        { id: 'patient_comments', label: 'Comments:', spanId: 'patient_c' },
        { id: 'invoice_date', label: 'Invoice Date:', spanId: 'invoice_d' }
    ];

    details.forEach(detail => {
        const li = document.createElement('li');
        li.id = detail.id;

        const strong = document.createElement('strong');
        strong.textContent = detail.label;
        li.appendChild(strong);

        const span = document.createElement('span');
        span.id = detail.spanId;
        span.className = 'editable';
        li.appendChild(span);

        appointmentDetails.appendChild(li);
    });

    receiptContent.appendChild(appointmentDetails);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-4 flex space-x-3';

    const buttons = [
        { id: 'editBtn', text: 'Edit', className: 'bg-blue-500 hover:bg-blue-700' },
        { id: 'deleteBtn', text: 'Delete', className: 'bg-red-500 hover:bg-red-700' },
        { id: 'saveBtn', text: 'Save', className: 'bg-green-500 hover:bg-green-700', style: 'display: none;' },
        { id: 'cancelBtn', text: 'Cancel', className: 'bg-gray-500 hover:bg-gray-700', style: 'display: none;' },
        { id: 'downloadReceipt', text: 'Download Receipt', className: 'bg-blue-500 hover:bg-blue-700' }
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.id = button.id;
        btn.textContent = button.text;
        btn.className = `${button.className} text-white font-bold py-2 px-4 rounded`;
        if (button.style) btn.style = button.style;
        buttonContainer.appendChild(btn);
    });

    receiptContent.appendChild(buttonContainer);
    receiptFile.appendChild(receiptContent);

    document.body.appendChild(receiptFile);

    // Event listeners

    document.getElementById('editBtn').addEventListener('click', () => toggleEdit(true));
    document.getElementById('saveBtn').addEventListener('click', saveDetails);
    document.getElementById('cancelBtn').addEventListener('click', () => toggleEdit(false));
    document.getElementById('deleteBtn').addEventListener('click', deleteReceipt);
    document.getElementById('downloadReceipt').addEventListener('click', downloadReceipt);
}

function toggleEdit(enable) {
    document.querySelectorAll('.editable').forEach(span => {
        span.contentEditable = enable;
        if (enable) {
            span.style.border = '1px solid #ccc';
            span.style.padding = '2px';
            span.style.backgroundColor = '#fff';
        } else {
            span.style.border = '';
            span.style.padding = '';
            span.style.backgroundColor = '';
        }
    });
    document.getElementById('editBtn').style.display = enable ? 'none' : 'inline-block';
    document.getElementById('deleteBtn').style.display = enable ? 'none' : 'inline-block';
    document.getElementById('saveBtn').style.display = enable ? 'inline-block' : 'none';
    document.getElementById('cancelBtn').style.display = enable ? 'inline-block' : 'none';
}

function saveDetails() {
    toggleEdit(false);
    // Additional save logic can be added here
    alert('Details saved!');
}

function deleteReceipt() {
    if (confirm('Are you sure you want to delete this receipt?')) {
        document.getElementById('recipt_file').remove();
    }
}

function downloadReceipt() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const receiptContent = document.getElementById('recipt_file');
    const title = receiptContent.querySelector('.font-bold').textContent;
    const details = receiptContent.querySelectorAll('ul li');

    let y = 20;
    doc.setFontSize(16);
    doc.text(title, 10, y);
    doc.setFontSize(12);

    details.forEach(detail => {
        y += 10;
        // const strong = detail.querySelector('strong').textContent;
        // const span = detail.querySelector('span').textContent;
        // doc.text(`${strong} ${span}`, 10, y);
    });

    doc.save('receipt.pdf');
}

createReceipt();