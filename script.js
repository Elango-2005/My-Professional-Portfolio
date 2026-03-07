const form = document.getElementById('contactForm');
const statusEle = document.getElementById('status');


form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById('name');
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const nameVal = name.value.trim();
  const emailVal = email.value.trim();
  const messageVal = message.value.trim();

  if (nameVal === "" || emailVal === "" || messageVal === "") {
    statusEle.textContent = "Please fill all fields";
    statusEle.style.color = "rgb(209, 0, 0)";
    return;
  }

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { "Accept": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      statusEle.textContent = "Message submitted successfully!";
      statusEle.style.color = "green";
      form.reset();

      setTimeout(() => {
        statusEle.textContent = "";
      }, 2000);
    } else {
      statusEle.textContent = "Failed to send message";
      statusEle.style.color = "rgb(209, 0, 0)";
    }
  })
  .catch(() => {
    statusEle.textContent = "Network error";
    statusEle.style.color = "rgb(209, 0, 0)";
  });
});

const navLinks = document.querySelectorAll("nav ul li a");
const logo = document.querySelector(".navbar-brand");
const homeLink = document.querySelector('nav ul li a[href="#HomePageSection"]'); 

// Function to set active link
function setActive(link) {
  navLinks.forEach(nav => nav.classList.remove("active"));
  link.classList.add("active");
}

// Click event for nav links
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    setActive(this);
  });
});

// Click event for logo
logo.addEventListener("click", function () {
  setActive(homeLink);
});

window.addEventListener("load", function () {

  // Remove hash from URL
  if (window.location.hash) {
    history.replaceState(null, null, " ");
  }

  // Scroll to top (Home)
  window.scrollTo(0, 0);

});

