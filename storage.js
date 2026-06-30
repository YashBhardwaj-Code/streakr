if (localStorage.getItem('currentXP') == null) {
    localStorage.setItem('currentXP', 0)
}

if (localStorage.getItem('currentLevel') == null) {
    localStorage.setItem('currentLevel', 1);
}

updateUI();

if (document.querySelector('.claim-reward-btn')) {
    document.querySelector('.claim-reward-btn').addEventListener("click", () => {
        let current_level = Number(localStorage.getItem('currentLevel'));
        let xp = Number(localStorage.getItem('currentXP')) + 50;

        while (xp >= current_level * 100) {
            xp -= current_level * 100;
            current_level++;
        }

        localStorage.setItem('currentXP', xp);
        localStorage.setItem('currentLevel', current_level);

        updateUI();
    })
}

function updateUI() {
    const level = document.querySelector('.level');
    const currentXP = document.querySelector('.current-xp');
    const requiredXP = document.querySelector('.required-xp');

    if (level) {
        level.innerHTML = `Level ${localStorage.getItem('currentLevel')}`;
    }   

    if (currentXP) {
        currentXP.innerHTML = `${localStorage.getItem('currentXP')}xp`;
    }
    
    if (requiredXP) {
        requiredXP.innerHTML = `${Number(localStorage.getItem('currentLevel')) * 100}xp`;
    }


    const finishedBar = document.querySelector('.finished-bar');



    if (finishedBar) {
        finishedBar.style.width = `${Number(localStorage.getItem('currentXP'))/(Number(localStorage.getItem('currentLevel')) * 100) * 100}%`;
    }


    if (localStorage.getItem('lastDate') == null) {
    localStorage.setItem('lastDate', Date.now())
    }

    if (localStorage.getItem('streakCount') == null) {
        localStorage.setItem('streakCount', 0)
    }

    currentDate = Date.now() * 60 * 60;
    lastDate = Number(localStorage.getItem('lastDate')) * 60 * 60;

    if ((lastDate - currentDate) >= 24 && (lastDate - currentDate) < 48) {
        localStorage.setItem('streakCount', Numebr(localStorage.getItem('streakCount')) + 1);
    }

    else if ((lastDate - currentDate) > 48) {
        localStorage.setItem('streakCount', 0);
    }

    document.querySelector('.streak-counter').innerHTML = Number(localStorage.getItem('streakCounter'));
}