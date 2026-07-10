const MAX_FRAGEN = 10;

let punktzahl = 0;
let aktuelleFrage = 0;
let trainingsFragen = [];

const app = document.getElementById("app");
const startKnopf = document.getElementById("startKnopf");

startKnopf.addEventListener("click", function () {
    starteQuiz();
});

function starteQuiz() {
    punktzahl = 0;
    aktuelleFrage = 0;
    trainingsFragen = mischeFragen(fragen).slice(0, MAX_FRAGEN);

    zeigeFrage();
}

function resetQuiz() {
    starteQuiz();
}





