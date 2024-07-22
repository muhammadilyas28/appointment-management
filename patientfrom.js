// Open (or create) the IndexedDB database
let db;
let request = window.indexedDB.open('PatientAppointmentsDB', 1);

// Handle database creation or upgrade
request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store (like a table) to store patient appointments
    let objectStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement:true });

    // Define the schema of the data
    objectStore.createIndex('patientName', 'patientName', { unique: false });
    objectStore.createIndex('appointmentDate', 'appointmentDate', { unique: false });
    objectStore.createIndex('appointmentTime', 'appointmentTime', { unique: false });
    objectStore.createIndex('doctor', 'doctor', { unique: false });
    objectStore.createIndex('comments', 'comments', { unique: false });

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

// Function to submit the form
function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch values from form
    let patientName = document.getElementById('patientName').value;
    let appointmentDate = document.getElementById('appointmentDate').value;
    let appointmentTime = document.getElementById('appointmentTime').value;
    let doctor = document.getElementById('doctor').value;
    let comments = document.getElementById('comments').value;

    // Create an object with the form data
    let appointmentData = {
        patientName: patientName,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        doctor: doctor,
        comments: comments
    };

    // Save the data to IndexedDB
    saveAppointmentToDB(appointmentData);

    // Optional: Reset the form after submission
    document.getElementById('appointmentForm').reset();
}
