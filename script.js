const businessName = document.getElementById("businessName");
const businessType = document.getElementById("businessType");
const description = document.getElementById("description");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const serviceName = document.getElementById("serviceName");
const servicePrice = document.getElementById("servicePrice");
const addServiceButton = document.getElementById("addServiceButton");
const generateButton = document.getElementById("generateButton");
const servicesList = document.getElementById("servicesList");
const previewServices = document.getElementById("previewServices");

const previewName = document.getElementById("previewName");
const previewType = document.getElementById("previewType");
const previewDescription = document.getElementById("previewDescription");
const previewPhone = document.getElementById("previewPhone");
const previewAddress = document.getElementById("previewAddress");
const whatsappButton = document.getElementById("whatsappButton");

let services = [];

addServiceButton.addEventListener("click", () => {
  const name = serviceName.value.trim();
  const price = servicePrice.value.trim();

  if (name=== "") {
    alert("Please enter a product or service name.");
    return;
  }

    if (price === "") {
      alert("Please enter a price.");
      return;
    }

    const service = { name: name, price: price };
    services.push(service);
    updateServicesList();
    serviceName.value = "";
    servicePrice.value = "";
    displayServices();
    updatePreview();
});

function displayServices() {
    servicesList.innerHTML = "";
    services.forEach(function(service, index) {
        const div = document.createElement("div");
        div.className = "service-item";
        div.innerHTML = `
            <span>${service.name} - $${service.price}</span>
            <button class="remove-service" onclick="removeService(${index})">Remove</button>
        `;
        servicesList.appendChild(div);
    });
}

function removeService(index) {
    services.splice(index, 1);
    displayServices();
    updatePreview();
}

generateButton.addEventListener("click", () => {
  if (businessName.value.trim() === "") {
    alert("Please enter a business name.");
    businessName.focus();
    return;
  }

  updatePreview();
  document.getElementById("preview").scrollIntoView({ behavior: "smooth" });
});

function updatePreview() {
  if
    (businessName.value.trim() === "") {
    previewName.textContent = "Business Name";
  } else {
    previewName.textContent = "Your Business Name";
  }

  previewType.textContent = businessType.value;

  if (description.value.trim() === "") {
    previewDescription.textContent = description.value;
    } else {
        previewDescription.textContent = "Your business description will appear here.";
    }

    if (phone.value.trim() === "") {
        previewPhone.textContent = "Your phone number";
    }

    if (address.value.trim() !== "") {
        previewAddress.textContent = address.value.trim();
    } else {
        previewAddress.textContent = "Your business address";
    }

    if (services.length === 0) {
        previewServices.innerHTML = `<p class="empty-message">
            Add products or services to see them here.
        </p>`;
        return;
    }

    previewServices.innerHTML = "";
    services.forEach(function(service) {
        const div = document.createElement("div");
        div.className = "preview-service-item";
        div.innerHTML = `<span>${service.name}</span>
    <strong>$${service.price}</strong>`;

        previewServices.appendChild(div);
    });
}

whatsappButton.addEventListener("click", function() {
    const number = phone.value.replace(/\D/g, "");

    if (number === "") {
        alert("Please enter a phone number first.");
        return;
    }

    const message = `Hello ${businessName.value}, I 
    found your business online and would like to know more about your products and services.`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
});

businessName.addEventListener("input", updatePreview);
businessType.addEventListener("change", updatePreview);
description.addEventListener("input", updatePreview);
phone.addEventListener("input", updatePreview);
address.addEventListener("input", updatePreview);

updatePreview();
