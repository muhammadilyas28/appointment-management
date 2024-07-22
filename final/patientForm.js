// // --------------------PATIENT APPOINTMENT FORM---------------------
// function patient_form_starter() {
//     let db;
//     let request = window.indexedDB.open('PatientAppointmentsDB', 1);
    
//     let patient_form=document.getElementById("patient_form")
    
//     patient_form.className='patientform_displayBlock'
    
//     // Open (or create) the IndexedDB database
    
//     // Handle database creation or upgrade
//     request.onupgradeneeded = function(event) {
//         db = event.target.result;
    
//         // Create an object store (like a table) to store patient appointments
//         let objectStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement:true });
    
//         // Define the schema(Name) of the IndexedDB
    
//         objectStore.createIndex('patientData', 'patientData');
    
//         console.log('Database setup complete');
//     };
    
//     // Handle successful database opening
//     request.onsuccess = function(event) {
//         db = event.target.result;
//         console.log('Database opened successfully');
//     };
    
//     // Handle database errors
//     request.onerror = function(event) {
//         console.error('Database error:', event.target.errorCode);
//     };
// }

// // Function to save form data to IndexedDB
// function saveAppointmentToDB(appointmentData) {

//     console.log(appointmentData);
//     let idb;
//     let requesti = window.indexedDB.open('PatientAppointmentsDB', 1);

//     let transaction = requesti.transaction(['appointments'], 'readwrite');
//     let objectStore = transaction.objectStore('appointments');

//     // Add the appointment data to the object store
//     let requestiz = objectStore.add(appointmentData);

//     // Handle successful addition
//     requestiz.onsuccess = function(event) {
//         console.log('Appointment saved to database');
//     };

//     // Handle errors
//     requestiz.onerror = function(event) {
//         console.error('Error saving appointment:', event.target.error);
//     };
// }


// --------------------PATIENT APPOINTMENT FORM---------------------
let patient_form = document.getElementById("patient_form");
function patient_form_starter() {
    let db;
    let request = window.indexedDB.open('PatientAppointmentsDB', 1);
    
    
    patient_form.className = 'patientform_displayBlock';
    
    // Open (or create) the IndexedDB database
    
    // Handle database creation or upgrade
    request.onupgradeneeded = function(event) {
        db = event.target.result;
    
        // Create an object store (like a table) to store patient appointments
        let objectStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true });
    
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
}

// Function to save form data to IndexedDB
function saveAppointmentToDB(appointmentData) {
    console.log(appointmentData);
    let requesti = window.indexedDB.open('PatientAppointmentsDB', 1);

    requesti.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction(['appointments'], 'readwrite');
        let objectStore = transaction.objectStore('appointments');

        // Add the appointment data to the object store
        let requestiz = objectStore.add(appointmentData);

        // Handle successful addition
        requestiz.onsuccess = function(event) {
            console.log('Appointment saved to database');
        };

        // Handle errors
        requestiz.onerror = function(event) {
            console.error('Error saving appointment:', event.target.error);
        };
    };

    requesti.onerror = function(event) {
        console.error('Database error:', event.target.errorCode);
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
// function showMessage(type) {
//     const successMessage = document.getElementById('successMessage');
//     const warningMessage = document.getElementById('warningMessage');

//     if (type === 'success') {
//         successMessage.style.display = 'block';
//         warningMessage.style.display = 'none';
//     } else if (type === 'warning') {
//         successMessage.style.display = 'none';
//         warningMessage.style.display = 'block';
//     }

//     // Hide the message after 3 seconds
//     setTimeout(() => {
//         successMessage.style.display = 'none';
//         warningMessage.style.display = 'none';
//     }, 3000);
// }

// Function to update the progress bar
// function updateProgressBar(percentage) {
//     const progressBar = document.getElementById('progressBar');
//     progressBar.style.width = percentage + '%';
// }

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

// import initializeCalendarComponents from './calender.js'

// initializeCalendarComponents()
// console.log(initializeCalendarComponents());
import createReceipt from './recipetfile.js'
console.log(createReceipt);


export function createAppointmentForm() {
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
    const container = document.getElementById('formContainer');
    // console.log(container);
    container.style.display='none'
    // container.className='patientform_displayBlock'
    container.style.width='80%'

    const formContainers = document.createElement('div');
    formContainers.id = 'patient_form';
    formContainers.className = 'bg-white p-8 rounded-lg shadow-lg w-screen';
    formContainers.style.padding = '30px';
    formContainers.style.borderRadius = '11px';

    const formTitle = document.createElement('h2');
    formTitle.className = 'text-2xl font-bold mb-6 text-gray-800';
    formTitle.textContent = 'Patient Appointment Form';
    formContainers.appendChild(formTitle);

    const form = document.createElement('form');
    form.id = 'appointmentForm';
    form.onsubmit = (event) => submitForm(event);
    formContainers.appendChild(form);

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

            createReceipt ,
            formContainers.style.display='none'  
            calendarContainer.style.display='none'  
            recipt_file.style.display='block'
            recipt_file.style.width='150%'
        });

  
    form.appendChild(submitButton);

    container.appendChild(formContainers);
}

createAppointmentForm();

export default{
    patient_form_starter,
    createAppointmentForm,
}
