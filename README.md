# 🎬 MovieSearch AI - Frontend

En moderne og brugervenlig webgrænseflade designet til at søge efter film og modtage intelligente film anbefalinger, drevet af en Spring Boot backend og OpenAI's AI-model.


## ✨ Funktioner

*   **Dynamisk filmsøgning:** Søg efter film ved titel eller nøgleord med live-opdatering.
*   **Genrefiltrering:** Filtrer film efter specifikke genrer via en dropdown-menu.
*   **Visningsvalg:** Skift mellem populære og aktuelt spillede film.
*   **AI-baserede anbefalinger:** Indtast en beskrivelse af den ønskede film (f.eks. "En mørk fantasyfilm med romance og action"), og AI'en foreslår matchende film.
*   **Filmdetaljer med AI-indsigt:** Klik på en film for at se detaljer, inklusiv en AI-genereret opsummering/anbefaling.
*   **Fluid UI med animationer:** Glidende overgange, når filmgitteret opdateres, for en forbedret brugeroplevelse.
*   **Responsivt design:** Optimeret til visning på forskellige skærmstørrelser.


## 🚀 Kom godt i gang

Følg disse trin for at få frontend-applikationen til at køre lokalt på din maskine.

### Forudsætninger

*   En moderne webbrowser (Chrome, Firefox, Edge, Safari).
*   [Visual Studio Code](https://code.visualstudio.com/) med udvidelsen [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (anbefales for nem udvikling).
*   Din [MovieSearch AI - Backend](https://github.com/frederikrasmus/MovieSearchAi-backend) skal køre og være tilgængelig på `http://localhost:8080`.


### Installation og Kørsel

1.  **Klon repository'et:**
    ```bash
    git clone https://github.com/frederikrasmus/MovieSearchAi-frontend.git
    ```
2.  **Naviger til projektmappen:**
    ```bash
    cd MovieSearchAi-frontend
    ```
3.  **Start med Live Server (anbefalet):**
    *   Åbn mappen `MovieSearchAi-frontend` i Visual Studio Code.
    *   Højreklik på `index.html` og vælg "Open with Live Server".
    *   Applikationen vil nu åbne i din standardbrowser på en lokal server (f.eks. `http://127.0.0.1:5500/index.html`).

4.  **Alternativt (åbn direkte i browser):**
    *   Åbn `index.html`-filen direkte i din webbrowser. Bemærk, at visse browser-sikkerhedsrestriktioner (CORS) kan påvirke, hvordan lokale `file://` URL'er interagerer med din backend API. Live Server omgår normalt dette.


## 💻 Teknologier

*   **HTML5:** Til sidens struktur.
*   **CSS3:** Til styling og UI-animationer.
*   **JavaScript (ES6+):** Til interaktivitet og dynamisk indhold, organiseret i moduler for bedre vedligeholdelse og Separation of Concerns.

MovieSearchAi-frontend/

├── index.html                  # Hovedside struktur
├── style.css                   # Global styling og animationer
└── js/                         # JavaScript moduler
├── config.js               # Globale konfigurationer (API base URL)
├── state.js                # Applikationens globale tilstand (currentView, searchQuery etc.)
├── dom.js                  # Al DOM-manipulation og UI-rendering
├── api.js                  # Håndtering af API-kald til backend
├── animations.js           # Specifik logik for UI-animationer i filmgitteret
├── events.js               # Opsætning og håndtering af event listeners
└── main.js                 # Applikationens startpunkt og orkestrering af moduler
## 📂 Projektstruktur (Frontend)

Projektet er opdelt i JavaScript-moduler for at opnå en klar Separation of Concerns (SoC) og lette vedligeholdelsen.

## 🤝 Bidrag

Forespørgsler og forslag er velkomne.


## 📝 Licens

MIT License

Copyright (c) [2025] [Frederik Rasmus Wendelboe Hansen]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## ✉️ Kontakt
@frederikrasmus](https://github.com/frederikrasmus)
frederikrasmus@hotmail.dk
