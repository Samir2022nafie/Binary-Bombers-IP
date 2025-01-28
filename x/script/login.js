const signinPopover = document.querySelector("#sign-in");
const signupPopover = document.querySelector("#create-account");
const popover = document.querySelector(".popover-body");
const container = document.querySelector(".container");
const close = document.querySelector(".close-btn");
const closeBtn = document.querySelector("#close-btn-sign-up");
const signupPopoverBody = document.querySelector(".popover-sign-up-body");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentuser = JSON.parse(localStorage.getItem("currentuser")) || null;
localStorage.setItem("currentuser", JSON.stringify(null));


signinPopover.addEventListener("click", () => {
  popover.style.display = "flex";
  container.style.display = "none";
});
signupPopover.addEventListener("click", () => {
  signupPopoverBody.style.display = "flex";
  container.style.display = "none";
});
close.addEventListener("click", () => {
  popover.style.display = "none";
  container.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  signupPopoverBody.style.display = "none";
  container.style.display = "flex";
});
// Function to print all stored accounts for debugging
function printAllAccounts() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentuser = JSON.parse(localStorage.getItem("currentuser")) || null;

  if (users.length === 0) {
    console.log("No accounts are currently stored.");
  } else {
    console.log("Stored Accounts:");
    users.forEach((user, index) => {
      console.log(`Account ${index + 1}:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Phone/Email: ${user.phoneOrEmail}`);
      console.log(`  Password: ${user.password}`);
      console.log(`  Date of Birth: ${user.dob}`);
    });
  }

  if (currentuser) {
    console.log("Currently Logged-in Account:");
    console.log(`  Name: ${currentuser.name}`);
    console.log(`  Phone/Email: ${currentuser.phoneOrEmail}`);
    console.log(`  Password: ${currentuser.password}`);
    console.log(`  Date of Birth: ${currentuser.dob}`);
  } else {
    console.log("No user is currently logged in.");
  }
}

printAllAccounts();

// Utility function to show error messages
function showError(input, message) {
  const parent = input.parentElement;
  const error = parent.querySelector(".error-message");
  if (error) {
    error.textContent = message;
  } else {
    const span = document.createElement("span");
    span.className = "error-message";
    span.textContent = message;
    parent.appendChild(span);
  }
  input.classList.add("error");
}

// Utility function to clear error messages
function clearError(input) {
  const parent = input.parentElement;
  const error = parent.querySelector(".error-message");
  if (error) {
    parent.removeChild(error);
  }
  input.classList.remove("error");
}

// Validate login form
function validateLoginForm() {
  const emailOrPhone = document.querySelector(".input-field");
  let isValid = true;

  // Validate email/phone input
  if (!emailOrPhone.value.trim()) {
    showError(emailOrPhone, "Please enter your phone, email, or username.");
    isValid = false;
  } else {
    clearError(emailOrPhone);
  }

  return isValid;
}
document.querySelector(".next-btn").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateLoginForm()) {
    const emailOrPhone = document.querySelector(".input-field").value;
    const password = document.querySelector("#password").value;
    localStorage.setItem("currentuser", JSON.stringify(null));
    const userExists = users.find((user) => user.phoneOrEmail === emailOrPhone && user.password === password);
    if (userExists) {
      localStorage.setItem("currentuser", JSON.stringify(userExists));
      alert("login is Valid Welcome"); 
      window.location.href = "foryoupage.html";
    } else {
      alert("Invalid login credentials or User Doesn't Exist.");
    }
  }
});

// Validate signup form
function validateSignupForm() {
  const name = document.querySelector("#name");
  const phoneOrEmail = document.querySelector("#phone");
  const password = document.querySelector("#signuppassword");
  const month = document.querySelector("#month");
  const day = document.querySelector("#day");
  const year = document.querySelector("#year");
  let isValid = true;
  if (!name.value.trim()) {
    showError(name, "Please enter your name.");
    isValid = false;
  } else {
    clearError(name);
  }
  if (!phoneOrEmail.value.trim()) {
    showError(phoneOrEmail, "Please enter your phone or email.");
    isValid = false;
  } else {
    clearError(phoneOrEmail);
  }
  if (!password.value.trim()) {
    showError(password, "Please enter a password.");
    isValid = false;
  } else if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters long.");
    isValid = false;
  } else {
    clearError(password);
  }
  if (!month.value || !day.value || !year.value) {
    const dobFields = [month, day, year];
    dobFields.forEach((field) =>
      showError(field, "Please select a valid date.")
    );
    isValid = false;
  } else {
    const dobFields = [month, day, year];
    dobFields.forEach(clearError);
  }

  return isValid;
}
document.querySelector(".next-button").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateSignupForm()) {
    const name = document.querySelector("#name").value;
    const phoneOrEmail = document.querySelector("#phone").value;
    const password = document.querySelector("#signuppassword").value;
    const month = document.querySelector("#month").value;
    const day = document.querySelector("#day").value;
    const year = document.querySelector("#year").value;
    const user = {
      name,
      phoneOrEmail,
      password,
      dob: `${year}-${month}-${day}`,
      posts: [],
    };

    const userExists = users.find((users) => users.phoneOrEmail === phoneOrEmail);
    localStorage.setItem("currentuser", JSON.stringify(null));
    if (userExists) {
      localStorage.setItem("currentuser", JSON.stringify(userExists));
      alert("Account already exists. Please log in or create another one.");
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentuser", JSON.stringify(user));
      alert("Account created!");
      window.location.href = "foryoupage.html";
    }
  }
});

// Close popovers
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const popover =
      btn.closest(".popover") || btn.closest(".sign-up-popover");
    if (popover) {
      popover.style.display = "none";
    }
  });
});
