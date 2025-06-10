document.addEventListener('DOMContentLoaded', function () {
// ********************************
// ELEMENT SELECTORS
// ********************************

    const url = ""
    const select = document.getElementById("");
    const btn = document.getElementById("")
    const listenInput = document.getElementById("")
    const loadingEl = document.getElementById("")
    const errorEl = document.getElementById("")
    const datalist = document.getElementById("")

// ********************************
// FETCH WITH BUTTON CLICK AND SINGLE DATA
// ********************************

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Button clicked");

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json()
            })
            .then(data => {
                if (data.text && data.author) {
                    const text = document.createElement("p");
                    text.textContent = data.text;

                    const author = document.createElement("p");
                    author.textContent = "- " + data.author;

                    quoteDiv.appendChild(text);
                    quoteDiv.appendChild(author);
                } else {
                    throw new Error("Invalid data format");
                }

            })
            .catch(error => {
                console.error("Error fetching data", error)
            })

// ********************************
// FETCH WITH ARRAY AND OPTIONS
// ********************************

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {

                if (Array.isArray(data.packages)) {
                    data.packages.forEach(pkg => {
                        const option = document.createElement("option");
                        option.value = pkg;
                        option.textContent = pkg;
                        select.appendChild(option);
                    });
                } else {
                    throw new Error("Invalid data format");
                }
            })
            .catch(error => {
                console.error("Error fetching packages:", error);
            });
    })

// ********************************
// FETCH WITH INPUT
// ********************************
    listenInput.addEventListener("focus", function () {
        const input = input.value.trim();
        if (input === "") return;

        // show loading element - hide error element
        loadingEl.style.display = "block";
        errorEl.style.display = "none";

        fetch(url + encodeURIComponent(input))
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => {
                // hide loading element
                loadingEl.style.display = "none";

                if (Array.isArray(data.data)) {
                    datalist.innerHTML = ""; // Clear previous options
                    data.data.forEach(pkg => {
                        const option = document.createElement("option");
                        option.value = pkg;
                        datalist.appendChild(option);
                    });
                } else {
                    throw new Error("Invalid data format");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);

                // hide loading element - show error element with text content
                loadingEl.style.display = "none";
                errorEl.textContent = "Failed to load data. Please try again later.";
                errorEl.style.display = "block";
            });
    });
})

// ********************************
// function declaration - Loads before code is executed
// ********************************
function sum1(number1, number2) {
    return number1 + number2;
}

// ********************************
// function expression - cannot access before initialization
// ********************************
const sum2 = function(number1, number2) {
    return number1 + number2;
};

// ********************************
// ES6 arrow function
// ********************************
const sum = (a, b) => {
    return a + b;
};

// ********************************
// The ternary operator
// ********************************
const a = 10;
const b = 7;

// long version
if (a > 5) {
    console.log(`${a} > ${b}`);
} else {
    console.log(`${a} <= ${b}`);
}

// shorthand version with ternary operator
a > 5 ? console.log(`${a} > ${b}`) : console.log(`${a} <= ${b}`);

