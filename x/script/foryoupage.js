const profile = document.querySelector("#profile");
const post = document.querySelector("#fyp-post-button");
const logout = document.querySelector("#logout-button");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentuser = JSON.parse(localStorage.getItem("currentuser")) || null;


const profileIcon = document.querySelector("#initial-profile-icon");
if (profileIcon) {
  profileIcon.textContent = currentuser.name.trim()[0];
}

const profileName = document.querySelector("#initial-profile-name");
if (profileName) {
  profileName.textContent = currentuser.name;
}


function loadHTML(url, targetElementId) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      const targetElement = document.getElementById(targetElementId);
      targetElement.innerHTML = html;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {

          newScript.src = script.src;
          document.body.appendChild(newScript);
        } else {

          setTimeout(() => {
            eval(script.textContent);
          }, 0);
        }
      });
    })
    .catch((e) => {
      console.error("There has been a problem with your fetch operation:", e);
    });
}

profile.addEventListener("click", () => {loadHTML("userprofile.html", "grid-2")});

post.addEventListener("click", () => {loadHTML("post.html", "grid-2")});

logout.addEventListener("click", () => {window.location.href = "login.html"});
