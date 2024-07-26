const selectedServices = [];
const services = [
                  {
                      id: "wash-car",
                      desc: "Wash Car",
                      price: 10
                  },
                  {
                      id: "mow-lawn",
                      desc: "Mow Lawn",
                      price: 20
                  },
                  {
                      id: "pull-weeds",
                      desc: "Pull Weeds",
                      price: 30
                  }
                ];

document.addEventListener("click", (e) => {
    if (e.target.dataset.service) {
        handleAddServiceClick(e.target.dataset.service);
    }
    else if (e.target.dataset.remove) {
        handleRemoveServiceClick(e.target.dataset.remove);
    }
    else if (e.target.id === "send-btn") {
        handleSendInvoiceClick();
    }
});

function handleAddServiceClick(serviceId) {

    const selectedService = services.find(service => service.id === serviceId);
    const checkIfServiceAlreadySelected = service => service.id === serviceId;

    if (!selectedServices.some(checkIfServiceAlreadySelected)) {
        selectedServices.push(selectedService);
    }

    renderSelectedServices();
}

function handleRemoveServiceClick(serviceId) {

    const selectedService = services.find(service => service.id === serviceId);

    selectedServices.splice(selectedServices.indexOf(selectedService), 1);

    renderSelectedServices();

}

function handleSendInvoiceClick() {

    if (calculateTotalInvoice() === 0) {
        return;
    }

    console.log(`You have been sent an invoice for ${calculateTotalInvoice()}`)

    selectedServices.length = 0;

    renderSelectedServices();
}

function calculateTotalInvoice() {

    return selectedServices.reduce((total, currentService) => total + currentService.price,0);
}

function renderSelectedServices() {

    const taskListItemContainerEl = document.getElementById("task-list");
    const totalPriceEl = document.getElementById("total-price");

    taskListItemContainerEl.innerHTML = "";
    selectedServices.forEach(service => {
        taskListItemContainerEl.innerHTML += `
        <div class="task-list-item-container">
            <p class="task-list-item-name">${service.desc}</p>
            <button class="remove-task-btn" data-remove=${service.id}>Remove</button>
            <p class="task-list-item-price">$${service.price}</p>
        </div>
        `;
    });

    totalPriceEl.innerHTML = `$${calculateTotalInvoice()}`;

}
