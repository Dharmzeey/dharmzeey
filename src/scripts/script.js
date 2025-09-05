// // About 
// const intro = document.getElementById("intro");
// const details = document.getElementById("personal");
// const expand = document.getElementById("expand");
// const collapse = document.getElementById("collapse");

// const viewMe = document.querySelector("#view-me");
// const showMe = document.querySelector("#show-me");
// const imgPadding = document.querySelector("#img-padding");

// // THIS IS TO TOGGLE READMORE AND COLLAPSE OF ABOUT SECTION
// intro.addEventListener("click", () => {
//   details.classList.toggle("hidden");
//   expand.classList.toggle("hidden");
//   collapse.classList.toggle("hidden");
// });

// // THIS IS TO DISPLAY(SCALE OUT) THE PICTURE ON CLICK
// // viewMe.addEventListener("click", () => {
// //   showMe.style.transform = "scale(1)";
// //   showMe.style.transform = "rotate(360deg)";
// //   imgPadding.style.padding = "2rem";
// // });

// // // TO TAKE AWAY THE DISPLAY
// // showMe.addEventListener("click", () => {
// //   showMe.style.transform = "scale(0)";
// //   showMe.style.transform = "rotate(0deg)";
// //   imgPadding.style.padding = "0px";
// // });

// viewMe.addEventListener("click", () => {
//   showMe.classList.toggle("scale-0");
//   showMe.classList.toggle("rotate-[360deg]");
//   imgPadding.style.padding = "2rem";
// });

// // TO TAKE AWAY THE DISPLAY
// showMe.addEventListener("click", () => {
//   showMe.classList.toggle("scale-0");
//   showMe.classList.toggle("rotate-[360deg]");
//   imgPadding.style.padding = "0px";
// });


// TOGGLE FULL IMAGE VIEW ON CLICK FOR MULTIPLE IMAGES
const projectImages = document.querySelectorAll(".show-img");
console.log(projectImages)
const fullImageView = document.createElement("div");
const fullImage = document.createElement("img");

// Style the full image view container
fullImageView.style.position = "fixed";
fullImageView.style.top = "0";
fullImageView.style.left = "0";
fullImageView.style.width = "100%";
fullImageView.style.height = "100%";
fullImageView.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
fullImageView.style.display = "none";
fullImageView.style.justifyContent = "center";
fullImageView.style.alignItems = "center";
fullImageView.style.zIndex = "1000";
fullImageView.style.cursor = "pointer";

// Style the full image
fullImage.style.maxWidth = "90%";
fullImage.style.maxHeight = "90%";

// Append the image to the container
fullImageView.appendChild(fullImage);
document.body.appendChild(fullImageView);

// Add click event to each image
projectImages.forEach((projectImage) => {
  projectImage.addEventListener("click", () => {
    console.log(projectImage);
    fullImage.src = projectImage.src;
    fullImage.alt = projectImage.alt;
    fullImageView.style.display = "flex";
  });
});

// Hide full image on click
fullImageView.addEventListener("click", () => {
  fullImageView.style.display = "none";
});