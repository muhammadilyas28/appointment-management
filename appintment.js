document.addEventListener("DOMContentLoaded", () => {
    const calendarCells = document.querySelectorAll(".calendar td:not(.inactive)");
    const popup = document.getElementById("popup");
    const closeBtn = document.querySelector(".close");
    const saveBtn = document.getElementById("saveButton");
    let selectedDate;

    // IndexedDB setup
    let db;
    const request = indexedDB.open("CalendarDB", 1);

    request.onerror = (event) => {
        console.error("Database error: ", event.target.error);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore("customers", { keyPath: "date" });
        objectStore.createIndex("name", "name", { unique: false });
    };

    calendarCells.forEach(cell => {
        cell.addEventListener("click", () => {
            // Remove the active class from all cells
            calendarCells.forEach(c => c.classList.remove("active"));

            // Add the active class to the clicked cell
            cell.classList.add("active");

            selectedDate = cell.innerText;
            popup.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    saveBtn.addEventListener("click", () => {
        const customerName = document.getElementById("customerName").value;
        if (customerName) {
            saveCustomerName(selectedDate, customerName);
            popup.style.display = "none";
        } else {
            alert("Please enter a customer name.");
        }
    });

    function saveCustomerName(date, name) {
        const transaction = db.transaction(["customers"], "readwrite");
        const objectStore = transaction.objectStore("customers");
        const request = objectStore.add({ date, name });

        request.onsuccess = () => {
            console.log("Customer name has been added to your database.");
        };

        request.onerror = (event) => {
            console.error("Unable to add data. Customer name already exists in your database! ", event.target.error);
        };
    }
});
