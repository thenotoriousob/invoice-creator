const taskForm = document.getElementById("task-form");
const colorThemeEl = document.getElementById("color-theme");
const addTaskEl = document.getElementById("add-task");
const selectedTasks = [];
const colorProperties = [];

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

colorThemeEl.addEventListener("click", changeColorTheme);

function Task(name, price) {
    this.name = name;
    this.price = Number(price);
};

function colorProperty(name, darkTheme, lightTheme) {
    this.name = name;
    this.darkTheme = darkTheme;
    this.lightTheme = lightTheme;
}

function handleAddTaskClick() {

    const taskFormData = new FormData(taskForm);
    const taskName = taskFormData.get('task');
    const taskPrice = taskFormData.get('price');
    /* Don't allow casing to make it a completely new task */
    const addedTask = selectedTasks.find(task => task.name.toLowerCase() === taskName.toLowerCase());

    if (!addedTask) {
        selectedTasks.push(new Task(taskName, taskPrice));

        renderAddedTasks();

        resetForm();
    } else {
        displayError(addedTask.name, "Task has already been added");
    }
}

function handleRemoveTaskClick(taskName) {

    const taskToRemove = selectedTasks.find(task => task.name.toLowerCase() === taskName.toLowerCase());

    selectedTasks.splice(selectedTasks.indexOf(taskToRemove), 1);

    renderAddedTasks();

}

function handleSendInvoiceClick() {

    if (calculateTotalInvoice() === 0) {
        displayError('', "An invoice can't be sent when there are no tasks");
        return;
    }

    console.log(`You have been sent an invoice for £${calculateTotalInvoice()}`)

    selectedTasks.length = 0;

    resetForm();

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
            <p class="task-list-item-name" id="${task.name}">${task.name}</p>
            <button class="remove-task-btn" data-remove="${task.name}">Remove</button>
            <p class="task-list-item-price">£${task.price}</p>
        </div>
        `;
    });

    totalPriceEl.innerHTML = `£${calculateTotalInvoice()}`;

}

function displayError (taskName, error) {

    const errorEl = document.getElementById("error");
    const taskEl = document.getElementById(taskName);

    errorEl.innerHTML = error;
    errorEl.style.display = "block";
    addTaskEl.classList.add("input-error")

    // Only want to do this if its a duplicate error (when taskName is passed in)
    if (taskEl) {
        taskEl.parentElement.classList.add("task-item-exists");
    }

    // Remove this after 1 second
    setTimeout(() => {
        errorEl.style.display = "none";
        addTaskEl.classList.remove("input-error")

        if (taskEl) {
            taskEl.parentElement.classList.remove("task-item-exists");
        }
    },1000)

}

function resetForm() {
    taskForm.reset();

    addTaskEl.focus();
}

function changeColorTheme() {

    const root = document.querySelector(':root');
    const isDarkMode = colorThemeEl.checked;

    colorProperties.forEach(property => {
        root.style.setProperty(property.name, isDarkMode ? property.darkTheme : property.lightTheme);
    });
}

function setUpColorProperties() {
    colorProperties.push(new colorProperty("--header-background-color", "#3A69D2", "#F5F5F5"));
    colorProperties.push(new colorProperty("--main-background-color", "#1F2937", "#FFFFFF"));
    colorProperties.push(new colorProperty("--main-header-color", "#FFFFFF", "#2B283A"));
    colorProperties.push(new colorProperty("--main-text-color", "#F5F5F5", "#4A4E74"));
    colorProperties.push(new colorProperty("--secondary-header-color", "#D5D4D8", "#918E9B"));
    colorProperties.push(new colorProperty("--slider-checked-color", "#ffffff", "#1F2937"));
    colorProperties.push(new colorProperty("--slider-color", "#3A69D2", "#ffffff"));
}

function displayPriceOptions() {

    const prices = [10, 20, 30, 40, 50];
    const priceEl = document.getElementById("price");

    prices.forEach(price => {
        priceEl.innerHTML += `<option value="${price}">£${price}</option>`;
    });
    
}

setUpColorProperties();

displayPriceOptions();