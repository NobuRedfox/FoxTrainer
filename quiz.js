function zeigeFrage() {
    let antwortKnopfe = "";

    const maxFragen = trainingsFragen.length;
    const prozent = ((aktuelleFrage + 1) / maxFragen) * 100;

    for (let i = 0; i < trainingsFragen[aktuelleFrage].antworten.length; i++) {
        antwortKnopfe += `<button class="answer">${trainingsFragen[aktuelleFrage].antworten[i]}</button>`;
    }

    app.innerHTML = `
        <div class="progress">
            <div class="progress-bar" style="width: ${prozent}%"></div>
        </div>

        <h1>Frage ${aktuelleFrage + 1} von ${trainingsFragen.length}</h1>

        <div class="card">
            <p>${trainingsFragen[aktuelleFrage].text}</p>
            ${antwortKnopfe}
        </div>
    `;

    const antwortElemente = document.querySelectorAll(".answer");

    for (let i = 0; i < antwortElemente.length; i++) {
        antwortElemente[i].addEventListener("click", function () {

            const frage = trainingsFragen[aktuelleFrage];
            const warRichtig = i === frage.richtig;

            speichereAntwort(frage.id, warRichtig);
            
            if (warRichtig) {
                antwortElemente[i].style.backgroundColor = "green";
                punktzahl++;
                console.log("punktzahl: " + punktzahl);
            } else {
                antwortElemente[i].style.backgroundColor = "red";
                antwortElemente[frage.richtig].style.backgroundColor = "green";
            }

            deaktiviereantwortKnopfe(antwortElemente);

            setTimeout(function () {
               gehezurNaechstenFrage();
            }, 1000);
        });
    }
}

function gehezurNaechstenFrage() {
    aktuelleFrage++;
    if (aktuelleFrage < trainingsFragen.length) {
        zeigeFrage();
    } else {
        zeigeErgebnis();
    }
}

function zeigeErgebnis() {
    app.innerHTML = `
        <h1>Training beendet!</h1>

        <div class="card">
            <h2>Dein Ergebnis</h2>
            <p>${punktzahl} von ${trainingsFragen.length} Punkten</p>
        
            <button id="restartKnopf">
                Nochmals spielen
            </button>
        </div>
    `;

    const restartKnopf = document.getElementById("restartKnopf");
    
    restartKnopf.addEventListener("click", function () {
        resetQuiz();
    });
}

function deaktiviereantwortKnopfe(antwortElemente) {
    // Alle antwortKnopfe deaktivieren
    for (let j = 0; j < antwortElemente.length; j++) {
        antwortElemente[j].disabled = true;
    }
}

function mischeFragen(fragenArray) {

    let gemischt = [...fragenArray];

    for (let i = gemischt.length - 1; i > 0; i--) {

        let zufall = Math.floor(Math.random() * (i + 1));

        let temp = gemischt[i];
        gemischt[i] = gemischt[zufall];
        gemischt[zufall] = temp;
    }

    return gemischt;
}

function zeigeCodeChallange() {
    
}