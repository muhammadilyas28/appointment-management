

function submitForm(event) {
    event.preventDefault();

    let patient_Name=document.getElementById('patientName')
console.log(patient_Name);

let doctor_name=document.getElementById('doctor')
console.log(doctor_name);

let appointment_Date=document.getElementById('appointmentDate')
console.log(appointment_Date);

let appointment_Time=document.getElementById('appointmentTime')
console.log(appointment_Time);

let email_patient=document.getElementById('email')
console.log(email_patient);

let phone_patient=document.getElementById('phone')
console.log(phone_patient);

let payment_Type=document.getElementById('paymentType')
console.log(payment_Type);

let comments_=document.getElementById('comments')
console.log(comments_);

    // const form = document.getElementById('appointmentForm');
    // const formData = new FormData(form);
    // console.log(payment_Type);
    const receiptData = {
        patientName: patient_Name.value,
        doctor: doctor_name.value,
        appointmentDate: appointment_Date.value,
        appointmentTime: appointment_Time.value,
        email: email_patient.value,
        phone: phone_patient.value,
        // paymentType: payment_Type.value,
        comments: comments_.value
    };
    console.log(receiptData);
    
    generateReceipt(receiptData);
}

function generateReceipt(data) {
    console.log(data);
    console.log(data.patientName);
    const receiptContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appointment Receipt</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: white;
    }
    .receipt-container {
        max-width: 600px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
        color: #333;
    }
    .receipt-section {
        margin-bottom: 20px;
    }
    .receipt-section label {
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
    }
    .receipt-section p {
        margin: 0;
        padding: 8px;
        background: #f9f9f9;
        border-radius: 4px;
    }
    .receipt-section textarea {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background: #f9f9f9;
    }
</style>
</head>
<body>
// <div class="receipt-container">
//     <h2>Appointment Receipt</h2>
//     <div class="receipt-section">
//         <label for="receiptPatientName">Patient Name:</label>
//         <p id="receiptPatientName" contenteditable="true">${data.patientName}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptDoctor">Doctor:</label>
//         <p id="receiptDoctor" contenteditable="true">${data.doctor}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptAppointmentDate">Appointment Date:</label>
//         <p id="receiptAppointmentDate" contenteditable="true">${data.appointmentDate}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptAppointmentTime">Appointment Time:</label>
//         <p id="receiptAppointmentTime" contenteditable="true">${data.appointmentTime}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptEmail">User e-mail:</label>
//         <p id="receiptEmail" contenteditable="true">${data.email}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptPhone">Phone:</label>
//         <p id="receiptPhone" contenteditable="true">${data.phone}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptPaymentType">Payment Type:</label>
//         <p id="receiptPaymentType" contenteditable="true">${data.paymentType}</p>
//     </div>
//     <div class="receipt-section">
//         <label for="receiptComments">Comments:</label>
//         <textarea id="receiptComments" rows="4" contenteditable="true">${data.comments}</textarea>
//     </div>

// -----------------------------------
 <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-white bg-pink-500 p-2 rounded">Appointment details:</div>
            <ul id="appointmentDetails">
                <li id="patient_Name"><strong>Patient Name:</strong> <span class="editable">${data.patientName}</span></li>
                <li id="doctor_name"><strong>Doctor Name:</strong> <span class="editable">${data.doctor}</span></li>
                <li id="appointment_Date"><strong>Appointment Date:</strong>${data.appointmentDate} <a href="#" class="editable"></a></li>
                <li id="appointment_Time"><strong>Appointment Time:</strong> <span class="editable"> ${data.appointmentTime}</span></li>
                <li id="patient_email"><strong>User e-mail:</strong> <span class="editable">${data.email}</span></li>
                <li id="patient_phone"><strong>Phone:</strong> <span class="editable">${data.phone}</span></li>
                <li id="patient_paymentType"><strong>Payment:</strong> <span class="editable">${data.paymentType}</span></li>
                <li id="patient_comments"><strong>Comments:</strong> <span class="editable">${data.comments}</span></li>
                
            </ul>
            <div class="mt-4 flex space-x-3">
                <button id="editBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                <button id="deleteBtn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                <button id="saveBtn" style="display: none;" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button id="cancelBtn" style="display: none;" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                <button id="downloadReceipt" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download Receipt</button>
            </div>
        </div>
// -----------------------------------
</div>
</body>
</html>`;

let recipt_file=document.getElementById('recipt_file')


    const blob = new Blob([receiptContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'appointment_receipt.html';
    link.click();
}
