var tl = gsap.timeline();

tl.to("#black", {
    height: "0vh",
    delay: 1,
    duration: 2,
    ease: Expo.easeInOut
})
    .to("#black h1", {
        y: -100,         // Move the text up off the screen
        duration: 2,
        ease: Expo.easeInOut
    }, "<");             // "<" ensures this animation starts at the same time as the previous one

tl.to("#ash", {
    height: "0vh",
    duration: 2,
    delay: -1.7,
    ease: Expo.easeInOut
});

function openLogoutForm() {
    document.querySelector(".logout_overlay").style.display = "flex";
    document.getElementById("logout").style.display = "block";
}

function cancelLogout() {
    document.getElementById("logout").style.display = "none";
}

let formCount = 0;

const formsContainer = document.querySelector("#formsContainer"); // Ensure this div exists in your HTML

function createForm() {
    const currentFormIndex = formCount; // Capture the current form index
    const formDiv = document.createElement("div");
    formDiv.classList.add("createdFormDiv");
    formDiv.id = `form_${currentFormIndex}`;

    console.log(`Creating form with ID: ${formDiv.id}`); // Debugging log

    // Add remove (cross) button
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeFormButton");
    removeButton.textContent = "✖"; // Cross mark
    removeButton.onclick = () => removeForm(`form_${currentFormIndex}`); // Call the remove function
    formDiv.appendChild(removeButton); // Add remove button to form

    // Radio Buttons for Payment Modes (Now at the top)
    const dotSelectors = document.createElement("div");
    dotSelectors.classList.add("dotSelectors");
    const paymentModes = ["Cash", "Card", "Bank", "UPI"];
    paymentModes.forEach((mode) => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `dotSelector_${currentFormIndex}`;
        radio.value = mode;
        radio.required = true;

        const label = document.createElement("label");
        label.textContent = mode;
        label.style.marginRight = "10px";

        // Append radio and label to dotSelectors
        dotSelectors.appendChild(radio);
        dotSelectors.appendChild(label);
    });

    // Append radio buttons to the form
    formDiv.appendChild(dotSelectors);

    // Container for Income input and Income in words
    const incomeContainer = document.createElement("div");
    incomeContainer.classList.add("incomeContainer");

    // Income user input
    const incomeFieldDiv = document.createElement("div");
    incomeFieldDiv.classList.add("inputContainer");
    const incomeFieldLabel = document.createElement("label");
    incomeFieldLabel.textContent = "Income (Rs.)";
    const incomeField = document.createElement("input");
    incomeField.type = "number";
    incomeField.name = `income_${currentFormIndex}`;
    incomeField.placeholder = " ";
    incomeField.required = true;
    incomeField.oninput = () => updateWords(currentFormIndex);
    incomeFieldDiv.appendChild(incomeFieldLabel);
    incomeFieldDiv.appendChild(incomeField);

    // Income in words
    const incomeWordsFieldDiv = document.createElement("div");
    incomeWordsFieldDiv.classList.add("inputWordsContainer");
    const incomeWordsFieldLabel = document.createElement("label");
    incomeWordsFieldLabel.textContent = "Income (in words)";
    const incomeWordsField = document.createElement("input");
    incomeWordsField.type = "text";
    incomeWordsField.name = `incomeWords_${currentFormIndex}`;
    incomeWordsField.placeholder = " ";
    incomeWordsField.disabled = true;
    incomeWordsFieldDiv.appendChild(incomeWordsFieldLabel);
    incomeWordsFieldDiv.appendChild(incomeWordsField);

    // Append income fields to the income container
    incomeContainer.appendChild(incomeFieldDiv);
    incomeContainer.appendChild(incomeWordsFieldDiv);

    // Container for Expense input and Expense in words
    const expenseContainer = document.createElement("div");
    expenseContainer.classList.add("expenseContainer");

    // Expense user input
    const expenseFieldDiv = document.createElement("div");
    expenseFieldDiv.classList.add("inputContainer");
    const expenseFieldLabel = document.createElement("label");
    expenseFieldLabel.textContent = "Expense (Rs.)";
    const expenseField = document.createElement("input");
    expenseField.type = "number";
    expenseField.name = `expense_${currentFormIndex}`;
    expenseField.placeholder = " ";
    expenseField.required = true;
    expenseField.oninput = () => updateWords(currentFormIndex);
    expenseFieldDiv.appendChild(expenseFieldLabel);
    expenseFieldDiv.appendChild(expenseField);

    // Expense in words
    const expenseWordsFieldDiv = document.createElement("div");
    expenseWordsFieldDiv.classList.add("inputWordsContainer");
    const expenseWordsFieldLabel = document.createElement("label");
    expenseWordsFieldLabel.textContent = "Expense (in words)";
    const expenseWordsField = document.createElement("input");
    expenseWordsField.type = "text";
    expenseWordsField.name = `expenseWords_${currentFormIndex}`;
    expenseWordsField.placeholder = " ";
    expenseWordsField.disabled = true;
    expenseWordsFieldDiv.appendChild(expenseWordsFieldLabel);
    expenseWordsFieldDiv.appendChild(expenseWordsField);

    // Append expense fields to the expense container
    expenseContainer.appendChild(expenseFieldDiv);
    expenseContainer.appendChild(expenseWordsFieldDiv);

    // Append income and expense containers to form
    formDiv.appendChild(incomeContainer);
    formDiv.appendChild(expenseContainer);

    // Append form to the forms container (which has the class name "forms-container")
    formsContainer.appendChild(formDiv);

    formCount++; // Increment the form count only after everything is set up
    if (formCount > 0) {
        document.querySelector(".submitAll").style.display = "block";
    }
}

function updateWords(formIndex) {
    console.log(`Updating words for form index: ${formIndex}`);

    const formExists = document.getElementById(`form_${formIndex}`);
    if (!formExists) {
        console.warn(`Form with index ${formIndex} does not exist!`);
        return;
    }

    const incomeInput = document.querySelector(`input[name="income_${formIndex}"]`);
    const expenseInput = document.querySelector(`input[name="expense_${formIndex}"]`);
    const incomeWordsInput = document.querySelector(`input[name="incomeWords_${formIndex}"]`);
    const expenseWordsInput = document.querySelector(`input[name="expenseWords_${formIndex}"]`);

    if (!incomeInput || !expenseInput || !incomeWordsInput || !expenseWordsInput) {
        console.error(`Fields for formIndex ${formIndex} not found!`);
        return;
    }

    const incomeValue = parseInt(incomeInput.value) || 0;
    const expenseValue = parseInt(expenseInput.value) || 0;

    incomeWordsInput.value = numberToWords(incomeValue) + " Rupees Only";
    expenseWordsInput.value = numberToWords(expenseValue) + " Rupees Only";
}

function numberToWords(num) {
    if (num === 0) return "Zero";
    const belowTwenty = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const aboveThousand = ["", "Thousand", "Million", "Billion"];

    let words = "";

    function convertToWords(n) {
        if (n < 20) return belowTwenty[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "");
        if (n < 1000) {
            return (
                belowTwenty[Math.floor(n / 100)] +
                " Hundred" +
                (n % 100 !== 0 ? " and " + convertToWords(n % 100) : "")
            );
        }
        for (let i = 0, divisor = 1000; i < aboveThousand.length; i++, divisor *= 1000) {
            if (n < divisor * 1000) {
                return (
                    convertToWords(Math.floor(n / divisor)) +
                    " " +
                    aboveThousand[i] +
                    (n % divisor !== 0 ? " " + convertToWords(n % divisor) : "")
                );
            }
        }
    }

    words = convertToWords(num);
    return words.trim();
}

function removeForm(formId) {
    const formDiv = document.getElementById(formId);
    if (formDiv) {
        formDiv.remove(); // Remove the form from the DOM
        formCount--; // Decrease the form count
        // If no forms are left, hide the submit button
        if (formCount === 0) {
            document.querySelector(".submitAll").style.display = "none";
        }
    } else {
        console.warn(`Form with ID ${formId} not found during removal!`);
    }
}

function submitAllForms() {
    let allFormData = {};

    const forms = document.querySelectorAll("#formsContainer .createdFormDiv");

    forms.forEach((form, index) => {
        let formData = {};

        const selectedPaymentMode = form.querySelector('input[type="radio"]:checked');
        if (selectedPaymentMode) {
            formData.paymentMode = selectedPaymentMode.value;
        }

        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            let name = input.name.replace(/\d+$/, "").replace(/_$/, ""); // Normalize field names
            formData[name] = input.value || 0;
        });

        allFormData[`form_${index}`] = formData;
    });

    // Submit the data as JSON
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(allFormData),
        credentials: 'include'
    })
        .then(response => {
            if (response.redirected) {
                // If the backend provides a redirect with form IDs
                const formIds = response.url.split("/").pop(); // Extract form IDs from the URL
                window.location.href = `/analysis/${formIds}`; // Redirect to analysis page with form IDs
            } else if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || "Unknown Error");
                });
            }
        })
        .catch(error => {
            // Show error popup if something goes wrong
            showErrorPopup(error.message || "Error submitting forms");
        });
}

function showErrorPopup(errorMessage) {
    const popup = document.createElement("div");
    popup.className = "popup";

    popup.innerHTML = `
        <div class="popup-content">
            <h2>Error</h2>
            <p>${errorMessage}</p>
            <button id="reloadButton">Reload</button>
            <button id="analysisButton">Check Analysis</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Add event listeners to buttons
    document.getElementById("reloadButton").onclick = () => {
        window.location.reload(); // Reload the page
    };

    document.getElementById("analysisButton").onclick = () => {
        const formIds = window.location.pathname.split("/").pop(); // Get form IDs from the current path
        window.location.href = `/analysis/${formIds}`; // Redirect to the analysis page
    };
}

// CSS for the popup
const style = document.createElement("style");
style.innerHTML = `
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .popup-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
    }
    .popup-content h2 {
        margin: 0 0 10px;
    }
    .popup-content p {
        margin: 0 0 20px;
    }
    .popup-content button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

console.log("Selected Payment Mode:", document.querySelector('input[name="dotSelector_' + currentFormIndex + '"]:checked').value);

const selectedRadio = form.querySelector('input[type="radio"]:checked');
if (selectedRadio) {
    console.log("Selected Payment Mode:", selectedRadio.value);
} else {
    console.log("No payment mode selected");
}