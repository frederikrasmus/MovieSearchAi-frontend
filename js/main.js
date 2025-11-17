// js/main.js - Det primære app-script
import { API_BASE_URL } from "./config.js";
import { appState } from "./state.js"; 
import {
    // Adgang til funktioner som laver api kald.
  fetchBackendGenres,
  fetchBackendMovies,
  fetchBackendMoviesByGenre,
  fetchBackendSearchResults,
  fetchBackendAiRecommendations,
  fetchBackendMovieDetailsWithAi,
} from "./api.js";
import {
    // Adgang til alle dom funktioner, så vi kan rendere DOM'en og UI
  renderHeader,
  renderControls,
  renderFooter,
  appendMovieCard, 
  showLoading,
  hideLoading,
  showError,
  renderMovieDetailsModal,
  renderModalLoading,
  renderModalError,
  hideModal,
  setMovieDetailsCallback,
} from "./dom.js";
// Importerer animations funktion
import { animateAndRenderMovies } from "./animations.js"; 
// Setup af event listeners
import { setupEventListeners } from "./events.js";

// applikationskernelogik
export const loadGenres = async () => {
  try {
    const genres = await fetchBackendGenres();
    renderControls(genres); 
    setupEventListeners({
        loadMovies,
        loadMoviesByGenre,
        searchMovies,
        getAiRecommendations,
        showMovieDetails,
        hideModal,
    });
    console.log("[App] Genrer indlæst succesfuldt");
  } catch (error) {
    console.error("[App] Fejl ved indlæsning af genrer:", error);
  }
};

export const loadMovies = async (type) => {
  console.log(`[App] Indlæser film af type: ${type}`);
  showLoading();
  try {
    const movies = await fetchBackendMovies(type);
    animateAndRenderMovies(movies); // Brug animation manager
  } catch (error) {
    console.error("[App] Fejl ved indlæsning af film:", error);
    showError("Kunne ikke hente film. Sørg for at backend kører.");
  } finally {
    hideLoading();
  }
};

export const loadMoviesByGenre = async (genreId) => {
  console.log(`[App] Indlæser film efter genre: ${genreId}`);
  showLoading();
  try {
    const movies = await fetchBackendMoviesByGenre(genreId);
    animateAndRenderMovies(movies); // Brug animation manager
  } catch (error) {
    console.error("[App] Fejl ved indlæsning af film efter genre:", error);
    showError("Kunne ikke hente film efter genre.");
  } finally {
    hideLoading();
  }
};

export const searchMovies = async (query) => {
  console.log(`[App] Søger film med query: ${query}`);
  showLoading();
  try {
    const movies = await fetchBackendSearchResults(query);
    animateAndRenderMovies(movies); // Brug animation manager
  } catch (error) {
    console.error("[App] Fejl ved søgning:", error);
    showError("Kunne ikke søge efter film.");
  } finally {
    hideLoading();
  }
};

export const getAiRecommendations = async (prompt) => {
  console.log("[App] Henter AI-anbefalinger for prompt:", prompt);
  showLoading();
  try {
    const movies = await fetchBackendAiRecommendations(prompt);
    animateAndRenderMovies(movies); // Vis AI-foreslåede film i grid'en
  } catch (error) {
    console.error("[App] Fejl ved hentning af AI-anbefalinger:", error);
    showError(
      "Kunne ikke hente AI-anbefalinger. Sørg for at backend kører og AI-nøglen er gyldig."
    );
  } finally {
    hideLoading();
  }
};

export const showMovieDetails = async (movieId) => {
  console.log("[App] Viser filmdetaljer for ID:", movieId);
  renderModalLoading(); // Vis loading i modalen

  try {
    const data = await fetchBackendMovieDetailsWithAi(movieId);
    renderMovieDetailsModal(data.movie, data.aiRecommendation);
  } catch (error) {
    console.error("[App] Fejl ved indlæsning af filmdetaljer:", error);
    renderModalError(error.message);
  }
};


// Initialisering af applikationen
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  loadMovies(appState.currentView); 
  loadGenres(); 

  setMovieDetailsCallback(showMovieDetails);
});