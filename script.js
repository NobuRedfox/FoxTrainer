const app = document.getElementById("app");

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
    app.innerHTML = `
        <h1>Frage 1 von 10</h1>

        <div class="card">
            <p>Was macht eine for-Schleife?</p>

            <button>Wiederholt Code</button>
            <button>Erstellt eine Klasse</button>
            <button>Löscht Variablen</button>
        </div>
    `;
});
