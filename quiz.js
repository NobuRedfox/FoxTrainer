let aktuellerTipp = 0;

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
        zeigeCodeChallenge();
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

function zeigeCodeChallenge() {
    aktuellerTipp = 0;

    const challenge = codeChallenges[0];

    app.innerHTML = `
        <h1>Code-Challenge</h1>

        <div class="card code-challenge-card">
            <h2>${challenge.titel}</h2>

            <p>${challenge.aufgabe}</p>

            <textarea
                id="codeEingabe"
                rows="12"
                placeholder="Schreibe hier deinen Code..."
            ></textarea>

            <p id="codeFeedback"></p>

            <p id="tippText"></p>

            <button id="tippKnopf">
                Tipp
            </button>

            <button id="codePruefenKnopf">
                Code prüfen
            </button>
        </div>
    `;

    const codePruefenKnopf = document.getElementById("codePruefenKnopf");

    const tippKnopf = document.getElementById("tippKnopf");
    const tippText = document.getElementById("tippText");

    tippKnopf.addEventListener("click", function() {
        if (aktuellerTipp < challenge.tipps.length) {
            tippText.textContent = challenge.tipps[aktuellerTipp];
            tippText.className = "hint";

            aktuellerTipp++;

            if (aktuellerTipp === challenge.tipps.length) {
                tippKnopf.disabled = true;
                tippKnopf.textContent = "Keine weiteren Tipps";
            }
        }
    });

    codePruefenKnopf.addEventListener("click", function () {
        const codeEingabe = document.getElementById("codeEingabe");

        const code = codeEingabe.value;

        pruefeCode(code);
    });
}

function pruefeCode(code) {
    const codeFeedback = document.getElementById("codeFeedback");

    if (code.trim() === "") {
        codeFeedback.textContent = "Bitte gib zuerst eine Lösung ein.";
        codeFeedback.className = "wrong";
        return;
    }

    console.log("Code zur Prüfung:", code);

    zeigeErgebnis();
}