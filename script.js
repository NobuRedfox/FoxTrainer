let score = 0;
let aktuelleFrage = 0;

const fragen = [

    {
        text: "Was macht eine for-Schleife?",

        antworten: [
            "Wiederholt Code",
            "Erstellt eine Klasse",
            "Löscht Variablen"
        ],

        richtig: 0
    },

    {
    text: "Welches Schlüsselwort erstellt eine Variable?",

    antworten: [
        "let",
        "class",
        "function"
    ],

    richtig: 0
    }
];

const app = document.getElementById("app");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
    zeigeFrage();
});

function zeigeFrage() {
    let buttons = "";

    for (let i = 0; i < fragen[aktuelleFrage].antworten.length; i++) {
        buttons += `<button class="answer">${fragen[aktuelleFrage].antworten[i]}</button>`;
    }

    app.innerHTML = `
        <h1>Frage ${aktuelleFrage + 1} von ${fragen.length}</h1>

        <div class="card">
            <p>${fragen[aktuelleFrage].text}</p>
            ${buttons}
        </div>
    `;

    const answers = document.querySelectorAll(".answer");

    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", function () {
            
            if (i === fragen[aktuelleFrage].richtig) {
                // alert("Richtig!");
                answers[i].style.backgroundColor = "green";
                score++;
                console.log("Score: " + score);
            } else {
                // alert("Falsch!");
                answers[i].style.backgroundColor = "red";
                answers[fragen[aktuelleFrage].richtig].style.backgroundColor = "green";
            }

            // Alle Buttons deaktivieren
            for (let j = 0; j < answers.length; j++) {
                answers[j].disabled = true;
                
            }

            setTimeout(function () {
                aktuelleFrage++;
                if (aktuelleFrage < fragen.length) {
                    zeigeFrage();
                } else {
                    app.innerHTML = `
                        <h1>Training beendet!</h1>

                        <div class="card">
                            <h2>Dein Ergebnis</h2>
                            <p>${score} von ${fragen.length} Punkten</p>
                        
                            <button id="restartButton">
                                Nochmals spielen
                            </button>
                        </div>
                    `;

                    const restartButton = document.getElementById("restartButton");
                    restartButton.addEventListener("click", function () {
                        score = 0;
                        aktuelleFrage = 0;
                        zeigeFrage();
                    }
                }
            }, 1000);
        });
    }
}