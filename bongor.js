 const gombok = document.querySelectorAll('.bongo-button');
    const ablak = document.getElementById('gratulaloAblak');
    const bezaroGomb = document.getElementById('bezaroGomb');

    // Mai dátum lekérése
    const maiDatum = new Date().toISOString().split('T')[0];

    // Mentett adatok betöltése
    let mentettAdat = JSON.parse(localStorage.getItem('bongoAllapot'));

    // Ha új nap van vagy még nincs mentés, nullázzuk
    if (!mentettAdat || mentettAdat.datum !== maiDatum) {
        mentettAdat = {
            datum: maiDatum,
            megnyomottak: []
        };
        localStorage.setItem('bongoAllapot', JSON.stringify(mentettAdat));
    }

    gombok.forEach(gomb => {
        const id = gomb.getAttribute('data-id');

        // Ha ma már megnyomtad, lockoljuk
        if (mentettAdat.megnyomottak.includes(id)) {
            gomb.disabled = true;
        }

        gomb.addEventListener('click', function() {
            gomb.disabled = true;

            if (!mentettAdat.megnyomottak.includes(id)) {
                mentettAdat.megnyomottak.push(id);
                localStorage.setItem('bongoAllapot', JSON.stringify(mentettAdat));
            }

            // Pontosan az 5. megnyomott gombnál ugrik fel az ablak
            if (mentettAdat.megnyomottak.length === 5) {
                ablak.style.display = 'block';
            }
        });
    });

    bezaroGomb.addEventListener('click', function() {
        ablak.style.display = 'none';
    });