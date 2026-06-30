const urlParams = new URLSearchParams(window.location.search);
const fitnessType = urlParams.get("type");

let endBtn = document.querySelector(".end-btn");
let quitPopup = document.querySelector("#quitPopup");
let noBtn = document.querySelector(".no-btn");
let yesBtn = document.querySelector(".yes-btn");
let continueBtn = document.querySelector(".continue-btn");
let claimRewardBtn = document.querySelector(".claim-reward-btn");

endBtn.addEventListener("click", () => {
    quitPopup.style.display = "flex";
})

yesBtn.addEventListener("click", () => {
    window.location.href = "index.html"
})

noBtn.addEventListener("click", () => {
    quitPopup.style.display = "none";
})

const typeList = ["back", "cardio", "chest", "lower arms", "lower legs", "shoulders", "upper arms", "upper legs", "waist"];

if (!typeList.includes(fitnessType)) {
    window.location.href = "index.html";
}

async function getData() {
    const response = await fetch(`./Exercises/${fitnessType}.json`);
    return await response.json();
}

async function main() {
    const exerciseData = await getData();
    
    let exerciseArray = [];
    for (let i = 0; i < 10; i++) {
        if (exerciseArray.length >= 5) {
            break
        }
        let exercise = exerciseData["data"][Math.floor(Math.random() * exerciseData["data"].length)];
        if (!exerciseArray.includes(exercise)) {
            exerciseArray.push(exercise);
        }
    }

    function populateUI() {
        document.querySelector(".exercise-name").innerHTML = exerciseArray[0]["name"];
        for (let i = 0; i < exerciseArray[0]["instructions"].length; i++) {
            let instructionsContainer = document.querySelector(".instructions-container");
            let instructionText = document.createElement("p");
            instructionText.innerHTML = exerciseArray[0]["instructions"][i];
            instructionText.classList.add("instructions-text");
            instructionsContainer.appendChild(instructionText);
        }
        exerciseArray.splice(0,1);
    }

    populateUI();

    continueBtn.addEventListener("click", () => {
        if (exerciseArray.length > 0) {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            let instructionsContainer = document.querySelector(".instructions-container");
            instructionsContainer.replaceChildren();
            populateUI();

            if (exerciseArray.length == 0) {
                continueBtn.innerHTML = "Finish Workout";
        }
        }

        else if (exerciseArray.length == 0) {
            document.querySelector("#finishWorkout").style.display = "flex";

            claimRewardBtn.addEventListener("click", () => {
                window.location.href = "index.html";
            })
        }
    })
}

main();