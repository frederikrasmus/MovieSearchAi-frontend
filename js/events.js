// js/events.js
// Importér appState og resetSearchAndGenre som eksporterers fra state.js
// Med resetSearchAndGenre kan vi nulstilel søgefunktionen.
import { appState, resetSearchAndGenre } from './state.js'; 

// Så searchMovies ikke bliver kaldt for hvert bogstav der skrives
// Minimerer belastning
let searchTimeout;

// Opsætning af eventlisteners på tværs af applikationen
// BRuger ClearTimout og SetTimeout så appen ikke søger efter hvert bogstav
export const setupEventListeners = (callbacks) => { 
  // Søgefelt
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    appState.searchQuery = e.target.value.trim(); 
    searchTimeout = setTimeout(() => {
      if (appState.searchQuery) { 
        callbacks.searchMovies(appState.searchQuery);
      } else {
        callbacks.loadMovies(appState.currentView); 
      }
    }, 500);
  });

  // Genre dropdown
  document.getElementById("genre-select").addEventListener("change", (e) => {
    appState.currentGenre = e.target.value; 
    if (appState.currentGenre) { 
      callbacks.loadMoviesByGenre(appState.currentGenre);
    } else {
      callbacks.loadMovies(appState.currentView); 
    }
  });

  // Visnings dropdown (populære/aktuelle)
  document.getElementById("view-select").addEventListener("change", (e) => {
    appState.currentView = e.target.value; 
    resetSearchAndGenre(); 
    document.getElementById("genre-select").value = "";
    document.getElementById("search-input").value = "";
    callbacks.loadMovies(appState.currentView); 
  });

  // AI-anbefaling knap
  const aiPromptInput = document.getElementById("ai-prompt-input");
  const aiRecommendBtn = document.getElementById("ai-recommend-btn");
  aiRecommendBtn.addEventListener("click", () => {
    const prompt = aiPromptInput.value.trim();
    if (prompt) {
      callbacks.getAiRecommendations(prompt);
    } else {
      alert("Venligst indtast en beskrivelse for AI-anbefalinger.");
    }
  });

  // Luk modal knap
  document.getElementById("close-modal").addEventListener("click", callbacks.hideModal);

  // Luk modal ved klik udenfor
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      callbacks.hideModal();
    }
  });
};