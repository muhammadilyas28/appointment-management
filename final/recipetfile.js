// / -------------------Receipt File data Code------------------------

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

// Initialize IndexedDB
let db;
function initDB() {
    const request = indexedDB.open('appointmentDB', 1);

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('patient_Name', 'patient_Name', { unique: false });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        populateDetails(); // Populate details after successful DB initialization
    };

    request.onerror = (event) => {
        console.error('Database error: ', event.target.errorCode);
    };
}

// Save receipt details to IndexedDB
function saveDetails() {
    const appointmentDetails = {};

    document.querySelectorAll('.editable').forEach(span => {
        appointmentDetails[span.id] = span.textContent;
    });

    const transaction = db.transaction(['appointments'], 'readwrite');
    const objectStore = transaction.objectStore('appointments');
    const request = objectStore.add(appointmentDetails);

    request.onsuccess = () => {
        alert('Details saved!');
    };

    request.onerror = () => {
        alert('Error saving details.');
    };

    toggleEdit(false);
}

// Retrieve and populate receipt details from IndexedDB
function populateDetails() {
    const transaction = db.transaction(['appointments'], 'readonly');
    const objectStore = transaction.objectStore('appointments');
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        const appointments = event.target.result;
        if (appointments.length > 0) {
            const lastAppointment = appointments[appointments.length - 1];
            Object.keys(lastAppointment).forEach(key => {
                const span = document.getElementById(key);
                if (span) {
                    span.textContent = lastAppointment[key];
                }
            });
        }
    };

    request.onerror = (event) => {
        console.error('Error retrieving details: ', event.target.errorCode);
    };
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

function deleteReceipt() {
    if (confirm('Are you sure you want to delete this receipt?')) {
        const transaction = db.transaction(['appointments'], 'readwrite');
        const objectStore = transaction.objectStore('appointments');
        const request = objectStore.clear();

        request.onsuccess = () => {
            document.getElementById('recipt_file').remove();
        };

        request.onerror = () => {
            alert('Error deleting receipt.');
        };
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
        const strong = detail.querySelector('strong').textContent;
        const span = detail.querySelector('span').textContent;
        doc.text(`${strong} ${span}`, 10, y);
    });

    doc.save('receipt.pdf');
}

initDB();
createReceipt();

export default {
    createReceipt
}
