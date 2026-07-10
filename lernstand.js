function speichereAntwort(frageId, warRichtig) {
    const gespeicherterLernstand = localStorage.getItem("lernstand");

    let lernstand;

    if (gespeicherterLernstand === null) {
        lernstand = {};
    } else {
        lernstand = JSON.parse(gespeicherterLernstand);
    }

    if (lernstand[frageId] === undefined) {
        lernstand[frageId] = {
            richtig: 0,
            falsch: 0,
            letzteAntwort: null
        };
    }

    if (warRichtig) {
        lernstand[frageId].richtig++;
    } else {
        lernstand[frageId].falsch++;
    }

    lernstand[frageId].letzteAntwort = new Date().toISOString();

    localStorage.setItem(
        "lernstand",
        JSON.stringify(lernstand)
    );

    console.log("Lernstand gespeichert:", lernstand);
}