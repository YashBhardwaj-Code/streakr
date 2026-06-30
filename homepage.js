let startWorkoutBtn = document.querySelector(".start-workout-btn");
let returnBtn = document.querySelector(".return-btn");
let confirmBtn = document.querySelector(".confirm-btn");
let overlay = document.querySelector(".overlay-container");

startWorkoutBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
})

returnBtn.addEventListener("click", () => {
  overlay.style.display = "none";
})

confirmBtn.addEventListener("click", () => {
  if (document.querySelector(".select-workout").value == "") {
    alert("Choose a workout");
  }
  else {
    window.location.href = "workout-page.html?" + "type=" + document.querySelector(".select-workout").value.toLowerCase();
  }
})