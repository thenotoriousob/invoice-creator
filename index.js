const selectedTasks = [];

document.addEventListener("click", (e) => {
    if (e.target.id === "add-btn") {
        handleAddTaskClick();
    }
    else if (e.target.dataset.remove) {
        handleRemoveTaskClick(e.target.dataset.remove);
    }
    else if (e.target.id === "send-btn") {
        handleSendInvoiceClick();
    }
});

function Task(name, price) {
    this.name = name;
    this.price = Number(price);
};

function handleAddTaskClick() {

    const taskName = document.getElementById("task").value;
    /* Create new task object */
    const addedTask = new Task(taskName,
                               document.getElementById("price").value);
    const checkIfTaskAlreadyAdded = task => task.name === taskName;

    /* Check to see if a task with this name has already been added */
    if (!selectedTasks.some(checkIfTaskAlreadyAdded)) {
        selectedTasks.push(addedTask);
    }

    renderAddedTasks();
}

function handleRemoveTaskClick(taskName) {

    const taskToRemove = selectedTasks.find(task => task.name === taskName);

    selectedTasks.splice(selectedTasks.indexOf(taskToRemove), 1);

    renderAddedTasks();

}

function handleSendInvoiceClick() {

    if (calculateTotalInvoice() === 0) {
        return;
    }

    console.log(`You have been sent an invoice for ${calculateTotalInvoice()}`)

    selectedTasks.length = 0;

    renderselectedTasks();
}

function calculateTotalInvoice() {

    return selectedTasks.reduce((total, currentService) => total + currentService.price,0);
}

function renderAddedTasks() {

    const taskListItemContainerEl = document.getElementById("task-list");
    const totalPriceEl = document.getElementById("total-price");

    taskListItemContainerEl.innerHTML = "";
    selectedTasks.forEach(service => {
        taskListItemContainerEl.innerHTML += `
        <div class="task-list-item-container">
            <p class="task-list-item-name">${service.name}</p>
            <button class="remove-task-btn" data-remove=${service.name}>Remove</button>
            <p class="task-list-item-price">$${service.price}</p>
        </div>
        `;
    });

    totalPriceEl.innerHTML = `$${calculateTotalInvoice()}`;

}
