const profile = document.querySelector("#profile");
const post = document.querySelector(".post-btn");

profile.addEventListener("click", () => {
  fetch("userprofile.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("grid-2").innerHTML = html;
    })
    .catch((e) => {
      console.error("There has been a problem with your fetch operation: ");
    });
});
post.addEventListener("click", () => {
  fetch("post.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("grid-2").innerHTML = html;
    })
    .catch((e) => {
      console.error("There has been a problem with your fetch operation");
    });
});
