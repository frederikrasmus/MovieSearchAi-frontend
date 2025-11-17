// js/state.js

// Med export gør vi constanten til fri benyttelse af andre "moduler"
// Når applikation starter fremvises film som er populære.
export const appState = {
  currentView: "popular", // 'popular', 'now-playing'
  currentGenre: "",
  searchQuery: "",
};

// Nulstiller søgninger når jeg indtaster nye søgniner
// Eks. Komedie genre valgt, du søger på film og får svar på søgning men ikke kun komediefilm
// Fremtidig implementering - Søg på film inden for valgt genre.
export function resetSearchAndGenre() {
    appState.currentGenre = "";
    appState.searchQuery = "";
}