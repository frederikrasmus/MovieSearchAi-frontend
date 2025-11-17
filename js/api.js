// js/api.js
import { API_BASE_URL } from "./config.js";

// En hjælpemetode til at undersøge JSON-svar fra backend
// Metode som kan hjælpe med at undgå redundans i koden.
// Returnerer en 2xx hvis ok, ellers smider den en fejl kode eks. 4xx eller 5xx.
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Backend fejl (${response.status}): ${errorText}`);
  }
  return response.json();
};

// Henter genre fra backend
// Skriver besked til consol.log for logging 
// Når fetchet sendes svar til handleApiResponse, for at tjekke for evt. fejl
export const fetchBackendGenres = async () => {
  console.log("[API] Henter genrer fra backend...");
  const response = await fetch(`${API_BASE_URL}/genres`);
  return handleApiResponse(response);
};

// Henter film med backend
export const fetchBackendMovies = async (type) => {
  console.log(`[API] Henter film af type: ${type} fra backend...`);
  const response = await fetch(`${API_BASE_URL}/${type}`);
  return handleApiResponse(response);
};

// Henter film på genre med backend
export const fetchBackendMoviesByGenre = async (genreId) => {
  console.log(`[API] Henter film efter genre: ${genreId} fra backend...`);
  const response = await fetch(`${API_BASE_URL}/by-genre?genreId=${genreId}`);
  return handleApiResponse(response);
};

// Henter svar fra søgning på film med backend
export const fetchBackendSearchResults = async (query) => {
  console.log(`[API] Søger film med query: ${query} på backend...`);
  const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
  return handleApiResponse(response);
};

// Henter AI-anbefalinger på film med backend.
// Note: Dette er en post, fordi at den også skal sende prompten med sig.
export const fetchBackendAiRecommendations = async (prompt) => {
  console.log(`[API] Henter AI-anbefalinger for prompt: ${prompt} fra backend...`);
  const response = await fetch(`${API_BASE_URL}/ai-recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: prompt,
  });
  return handleApiResponse(response);
};

// Henter beskrivelse på film og ai-anbefaling.
export const fetchBackendMovieDetailsWithAi = async (movieId) => {
  console.log(`[API] Henter filmdetaljer med AI for ID: ${movieId} fra backend...`);
  const response = await fetch(`${API_BASE_URL}/details-with-ai/${movieId}`);
  return handleApiResponse(response);
};