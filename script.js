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
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.getElementById("navbarNav");

// Function to set active link
function setActive(link) {
  navLinks.forEach(nav => nav.classList.remove("active"));
  link.classList.add("active");
}

// Click event for nav links
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    setActive(this);
    // Automatically close the mobile navbar when a link is clicked
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      if (navbarToggler) {
        navbarToggler.click();
      }
    }
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

// Scroll Animation Observer for Mobile
const animationObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('mobile-animate');
      // Optional: stop observing once animated to prevent repeating
      // observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Target animation classes
const animatedElements = document.querySelectorAll('.autoDisplay, .fadeInRight, .cardsFadeInRight, .autoBlur');
animatedElements.forEach(el => {
  animationObserver.observe(el);
});
