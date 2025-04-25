// About 
const intro = document.getElementById("intro");
const details = document.getElementById("personal");
const expand = document.getElementById("expand");
const collapse = document.getElementById("collapse");

const viewMe = document.querySelector("#view-me");
const showMe = document.querySelector("#show-me");
const imgPadding = document.querySelector("#img-padding");

// THIS IS TO TOGGLE READMORE AND COLLAPSE OF ABOUT SECTION
intro.addEventListener("click", () => {
  details.classList.toggle("hidden");
  expand.classList.toggle("hidden");
  collapse.classList.toggle("hidden");
});

// THIS IS TO DISPLAY(SCALE OUT) THE PICTURE ON CLICK
// viewMe.addEventListener("click", () => {
//   showMe.style.transform = "scale(1)";
//   showMe.style.transform = "rotate(360deg)";
//   imgPadding.style.padding = "2rem";
// });

// // TO TAKE AWAY THE DISPLAY
// showMe.addEventListener("click", () => {
//   showMe.style.transform = "scale(0)";
//   showMe.style.transform = "rotate(0deg)";
//   imgPadding.style.padding = "0px";
// });

viewMe.addEventListener("click", () => {
  showMe.classList.toggle("scale-0");
  showMe.classList.toggle("rotate-[360deg]");
  imgPadding.style.padding = "2rem";
});

// TO TAKE AWAY THE DISPLAY
showMe.addEventListener("click", () => {
  showMe.classList.toggle("scale-0");
  showMe.classList.toggle("rotate-[360deg]");
  imgPadding.style.padding = "0px";
});


// Resume
