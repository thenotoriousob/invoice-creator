const taskForm = document.getElementById("task-form");
const selectedTasks = [];

document.addEventListener("click", (e) => {
    if (e.target.dataset.remove) {
        handleRemoveTaskClick(e.target.dataset.remove);
    }
    else if (e.target.id === "send-btn") {
        handleSendInvoiceClick();
    }
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  handleAddTaskClick();
});

function Task(name, price) {
    this.name = name;
    this.price = Number(price);
};

function handleAddTaskClick() {

    const taskFormData = new FormData(taskForm);
    const taskName = taskFormData.get('task');
    const taskPrice = taskFormData.get('price');

    /* Don't allow the casing to make it a completely new task */
    const addedTask = selectedTasks.find(task => task.name.toLowerCase() === taskName.toLowerCase());

    if (!addedTask) {
        selectedTasks.push(new Task(taskName, taskPrice));
    }

    renderAddedTasks();

    taskForm.reset();
}

function handleRemoveTaskClick(taskName) {

    const taskToRemove = selectedTasks.find(task => task.name.toLowerCase() === taskName.toLowerCase());

    selectedTasks.splice(selectedTasks.indexOf(taskToRemove), 1);

    renderAddedTasks();

}

function handleSendInvoiceClick() {

    if (calculateTotalInvoice() === 0) {
        return;
    }

    console.log(`You have been sent an invoice for £${calculateTotalInvoice()}`)

    selectedTasks.length = 0;

    renderAddedTasks();
}

function calculateTotalInvoice() {

    return selectedTasks.reduce((total, currentTask) => total + currentTask.price,0);
}

function renderAddedTasks() {

    const taskListItemContainerEl = document.getElementById("task-list");
    const totalPriceEl = document.getElementById("total-price");

    taskListItemContainerEl.innerHTML = "";
    selectedTasks.forEach(task => {
        taskListItemContainerEl.innerHTML += `
        <div class="task-list-item-container">
            <p class="task-list-item-name">${task.name}</p>
            <button class="remove-task-btn" data-remove="${task.name}">Remove</button>
            <p class="task-list-item-price">£${task.price}</p>
        </div>
        `;
    });

    totalPriceEl.innerHTML = `£${calculateTotalInvoice()}`;

}
