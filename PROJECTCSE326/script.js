
const rescueForm = document.querySelector("#Rescue form");
const treatmentForm = document.querySelector("#Treatment form");
const releaseForm = document.querySelector("#Release form");
const recordForm = document.querySelector("#record form");

const recordTable = document.getElementById("recordTable");
const searchRecord = document.getElementById("searchRecord");
let animals = JSON.parse(localStorage.getItem("animals")) || [];
function saveData() {
    localStorage.setItem("animals", JSON.stringify(animals));
}
function generateID() {
    return "W" + Date.now().toString().slice(-6);
}
function updateDashboard() {
    const boxes = document.querySelectorAll("#home .box h3");

    const total = animals.length;

    const treatment = animals.filter(
        animal => animal.status === "Under Treatment"
    ).length;

    const rehabilitation = animals.filter(
        animal => animal.status === "Recovering"
    ).length;

    const released = animals.filter(
        animal => animal.status === "Released"
    ).length;

    boxes[0].textContent = total;
    boxes[1].textContent = treatment;
    boxes[2].textContent = rehabilitation;
    boxes[3].textContent = released;
}

// Display records in table
function displayRecords(data = animals) {

    recordTable.innerHTML = "";

    data.forEach(animal => {

        const row = document.createElement("tr");

        const values = [
            animal.id,
            animal.name,
            animal.species,
            animal.age,
            animal.rescueDate,
            animal.location,
            animal.condition,
            animal.status
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value || "-";
            row.appendChild(cell);
        });

        recordTable.appendChild(row);
    });

    updateDashboard();
}
rescueForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const inputs = rescueForm.querySelectorAll("input, select, textarea");

    const animal = {
        id: generateID(),
        name: inputs[0].value,
        species: inputs[1].value,
        age: inputs[2].value,
        rescueDate: inputs[3].value,
        location: inputs[4].value,
        condition: inputs[5].value,
        description: inputs[6].value,
        status: "Under Treatment"
    };

    animals.push(animal);

    saveData();
    displayRecords();

    alert("Animal rescued successfully! Animal ID: " + animal.id);

    rescueForm.reset();
});
treatmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const inputs = treatmentForm.querySelectorAll("input, select");

    const id = inputs[0].value;

    const animal = animals.find(
        item => item.id === id
    );

    if (!animal) {
        alert("Animal ID not found!");
        return;
    }

    animal.name = inputs[1].value;
    animal.species = inputs[2].value;
    animal.disease = inputs[3].value;
    animal.doctor = inputs[4].value;
    animal.treatmentDate = inputs[5].value;
    animal.medicine = inputs[6].value;
    animal.status = inputs[7].value;

    saveData();
    displayRecords();

    alert("Treatment details saved successfully!");

    treatmentForm.reset();
});
releaseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const inputs = releaseForm.querySelectorAll("input, select, textarea");

    const id = inputs[0].value;

    const animal = animals.find(
        item => item.id === id
    );

    if (!animal) {
        alert("Animal ID not found!");
        return;
    }
    if (animal.status !== "Recovered") {
        alert("Only recovered animals can be released!");
        return;
    }
    animal.releaseDate = inputs[3].value;
    animal.releaseLocation = inputs[4].value;
    animal.health = inputs[5].value;
    animal.releaseDescription = inputs[6].value;
    animal.status = "Released";
    saveData();
    displayRecords();

    alert("Animal released successfully!");

    releaseForm.reset();
});
recordForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const inputs = recordForm.querySelectorAll("input, select");

    const id = inputs[0].value;

    const existing = animals.find(
        animal => animal.id === id
    );

    if (existing) {
        alert("This Animal ID already exists!");
        return;
    }

    const animal = {
        id: id,
        name: inputs[1].value,
        species: inputs[2].value,
        age: inputs[3].value,
        rescueDate: inputs[4].value,
        location: inputs[5].value,
        condition: inputs[6].value,
        status: inputs[7].value
    };

    animals.push(animal);

    saveData();
    displayRecords();

    alert("Animal record added successfully!");

    recordForm.reset();
});


searchRecord.addEventListener("input", function() {

    const searchValue = searchRecord.value.toLowerCase();

    const filteredAnimals = animals.filter(animal =>

        animal.id.toLowerCase().includes(searchValue) ||

        animal.name.toLowerCase().includes(searchValue)

    );

    displayRecords(filteredAnimals);
});

displayRecords();
