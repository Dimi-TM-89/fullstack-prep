// ********************************
// Preloader
// ********************************

const url = "https://jsonplaceholder.typicode.com/users/1";

const output = document.getElementById("output");
const spinner = document.getElementById("preLoader");

const template = `
<div class="card col-6 col-md-6 col-lg-6">
  <div class="card-body">
    <h5 class="card-title">$name</h5>
    <h6 class="card-subtitle mb-2 text-muted">$company</h6>
    <p class="card-text"><i class="fa-regular fa-building"></i> $address<br/>
    <i class="fa-solid fa-phone"></i> $phone</p>
    <a href="https://www.$website" class="card-link">Website link</a>
    <a href="mailto:$mail" class="card-link">Mail link</a>
  </div>
</div>
`;

function getUser() {
    spinner.classList.remove("d-none");
    output.classList.add("d-none");
    console.log("Start loading data");
    setTimeout(() => {
        fetch(url)
            .then((response) => {
                //console.log("response", response);
                if (!response.ok) {
                    if (response.status === 404)
                        throw Error("The requested user was not found");
                    throw Error("Something went wrong with your request");
                }
                return response.json();
            })
            .then((user) => {
                //console.log("User found", user);
                output.innerHTML = template
                    .replace("$name", user.name)
                    .replace("$company", user.company.name)
                    .replace("$address", user.address.street + ", " + user.address.suite)
                    .replace("$phone", user.phone)
                    .replace("$mail", user.email)
                    .replace("$website", user.website);
                spinner.classList.add("d-none");
                output.classList.remove("d-none");
                console.log("Data loading finished");
            })
            .catch((error) => {
                spinner.classList.add("d-none");
                output.classList.remove("d-none");
                console.log("Error while loading data");
                output.innerHTML = error;
            });
    }, 3000);
}

getUser();