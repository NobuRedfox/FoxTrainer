const frage = {
    text: "Was macht eine for-Schleife?",

    antworten: [
        "Wiederholt Code",
        "Erstellt eine Klasse",
        "Löscht Variablen"
    ],

    richtig: 0
};

const app = document.getElementById("app");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
    let buttons = "";

    for (let i = 0; i < frage.antworten.length; i++) {
        buttons += `<button class="answer">${frage.antworten[i]}</button>`;
    }

    app.innerHTML = `
        <h1>Frage 1 von 10</h1>

        <div class="card">
            <p>${frage.text}</p>
            ${buttons}
        </div>
    `;

    const answers = document.querySelectorAll(".answer");

    for (let i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", function () {
            alert("Antwort geklickt");
        });
    }
});