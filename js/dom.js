// js/dom.js

// appendMovieCard kan kalde showMovieDetails funktionen(findes i main.js)
// Hjælper med at injicere showMovieDetails, så appendMovieCard kan kalde den, når en plakat klikkes på.
let showMovieDetailsCallback;
export function setMovieDetailsCallback(callback) {
    showMovieDetailsCallback = callback;
}

// Funktion til at rendere header
// Emoji hentet "fra https://html-css-js.com/html/character-codes/"
export const renderHeader = () => {
  const header = document.getElementById("header");
  header.innerHTML = `
        <div class="header-content">
            <h1>📽 Movie Search</h1>
            <p>Find din næste yndlingsfilm med AI-anbefalinger</p>
        </div>
    `;
};

// Funktion som renderer kontrol panelet
// Her kan man søge epå en film, vælge genre, now-playing/populære film
// Vi forventer at hente genre på argumentet genres, med genre.id og name
export const renderControls = (genres) => { 
  const controls = document.getElementById("controls");
  controls.innerHTML = `
        <div class="controls-container">
            <div class="search-box">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Søg efter film..."
                    autocomplete="off"
                />
            </div>
            <div class="genre-select">
                <select id="genre-select">
                    <option value="">Alle genrer</option>
                    ${genres.map(genre => `<option value="${genre.id}">${genre.name}</option>`).join('')}
                </select>
            </div>
            <div class="view-select">
                <select id="view-select">
                    <option value="popular">Populære film</option>
                    <option value="now-playing">Aktuelle film</option>
                </select>
            </div>
        </div>
    `;
};

// En render metode som viser en footer.
export const renderFooter = () => {
  const footer = document.getElementById("footer");
  footer.innerHTML = `
        <p>Data og billeder leveret af TMDB | AI-anbefalinger genereret med OpenAI</p>
        <p>© 2025 Movie AI Search Project</p>
    `;
};

// En render metode som vises hvis ingen film blev fundet. 
export const renderEmptyGridMessage = (grid) => {
  grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
          <p style="font-size: 1.25rem;">Ingen film fundet</p>
      </div>
    `;
};

// hjælpe funktion til at tilføje et enkelt filmkort
// Vi forventer at hente en film. movie.posterpath osv.
export function appendMovieCard(grid, movie) {
  const div = document.createElement("div");
  div.className = "movie-card";
  // her bruges callback metoden setMovieDetailsCallback. som injiceres i main.js
  div.onclick = () => showMovieDetailsCallback(movie.id);
  div.innerHTML = `
    <img
        class="movie-poster"
        src="${movie.posterPath ? "https://image.tmdb.org/t/p/w500" + movie.posterPath : "/abstract-movie-poster.png"}"
        alt="${movie.title}"
        loading="lazy"
    />
    <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-meta">
            <span class="movie-year">${movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}</span>
            <span class="movie-rating">${movie.voteAverage ? movie.voteAverage.toFixed(1) : "N/A"}</span>
        </div>
    </div>
  `;
  // placer nyoprettet div i grid.
  grid.appendChild(div);
}

// Metode som fjerner hidden klassen fra loading div'en
export const showLoading = () => {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("movies-grid").style.opacity = "0.5";
};

// Metode som tilføjer hidden klassen fra loading div'en
export const hideLoading = () => {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("movies-grid").style.opacity = "1";
};

// Hvis en error skal vises, hjælper denne const
export const showError = (message) => {
  const grid = document.getElementById("movies-grid");
  grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <p style="color: var(--accent-primary); font-size: 1.25rem;">${message}</p>
        </div>
    `;
};

// Modal som viser film med detaljer.
export const renderMovieDetailsModal = (movie, aiRecommendation) => {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
            <img
                class="modal-movie-poster"
                src="${movie.posterPath ? "https://image.tmdb.org/t/p/w780" + movie.posterPath : "/abstract-movie-poster.png"}"
                alt="${movie.title}"
            />
            <div class="modal-movie-info">
                <h2 class="modal-movie-title">${movie.title}</h2>
                <div class="modal-movie-meta">
                    <span>📅 ${movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}</span>
                    <span>⭐ ${movie.voteAverage ? movie.voteAverage.toFixed(1) : "N/A"}/10</span>
                    <span>🎭 ${movie.genres && movie.genres.length > 0 ? movie.genres.map((g) => g.name).join(", ") : "N/A"}</span>
                </div>
                <div class="modal-movie-overview">
                    <h3 style="margin-bottom: 0.5rem;">Beskrivelse</h3>
                    <p>${movie.overview || "Ingen beskrivelse tilgængelig."}</p>
                </div>
                <div class="ai-recommendation">
                    <h3>🤖 AI Anbefaling</h3>
                    <p>${aiRecommendation}</p>
                </div>
            </div>
        `;
        // Ligesom loading, har modal også en hidden, display: none. Her fjernes denne hidden klassen fra modalen
        // Dette sker efter modalen har fået nødvendig information.
  document.getElementById("modal").classList.remove("hidden");
};

// Modal loades, det gør den fordi at den skal vente på en ai-anbefaling.
// Uden ai-anbefaling ville jeg forvente et hurtigt kald til TMDB og dermed ikke et behov for en loadingbar nødvendigvis.
export const renderModalLoading = () => {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <div class="ai-loading">
            <div class="spinner"></div>
            <p>Henter filmdetaljer og AI-anbefaling...</p>
        </div>
    `;
    document.getElementById("modal").classList.remove("hidden");
}

export const renderModalError = (message) => {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <div class="modal-movie-info">
            <p style="color: var(--accent-primary);">Kunne ikke hente filmdetaljer med AI. Sørg for at backend kører.</p>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Detaljer: ${message || ""}</p>
        </div>
    `;
    document.getElementById("modal").classList.remove("hidden");
}

// funktion til at skjule modal-vinduet
// Man tilføjer hidden class tilbage igen
export const hideModal = () => {
  document.getElementById("modal").classList.add("hidden");
};