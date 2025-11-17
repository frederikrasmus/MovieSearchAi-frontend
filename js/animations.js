// js/animations.js
import { appendMovieCard, renderEmptyGridMessage } from './dom.js';

// Importerer "hjælpefunktioner" fra dom.js så den kan opbygge filmkort
export const animateAndRenderMovies = (movies) => {
  const grid = document.getElementById("movies-grid");
  const currentMovieCards = Array.from(grid.children);

  // Hvis der INGEN gamle film er, ved eventuelt refresh af siden
  if (currentMovieCards.length === 0) {
    // Starter med tomt gitter
    grid.innerHTML = "";
    // Hvis den ingen film kan finde, vises besked "Ingen film fundet"
    if (!movies || movies.length === 0) {
      renderEmptyGridMessage(grid);
      // Sikrer med offsetWidth at film er loaded før animation vises.
    } else {
      movies.forEach((movie) => appendMovieCard(grid, movie));
      void grid.offsetWidth;
      grid.classList.add('slide-down-in');
    }
    return;
  }

  // Hvis de nye film er tomme, men der er gamle, animer dem ud
  if (!movies || movies.length === 0) {
    grid.classList.remove('slide-down-in');
    grid.classList.add('slide-fade-out');
    grid.addEventListener('animationend', function handler() {
      grid.removeEventListener('animationend', handler);
      grid.classList.remove('slide-fade-out');
      renderEmptyGridMessage(grid);
    }, { once: true });
    return;
  }

  // Hvis der er film, der skal skiftes ud (animation her)
  // Essentielt for korrekt animation er at gamle film er væk og nye er loaded før animation startes
  grid.classList.remove('slide-down-in');
  grid.classList.add('slide-fade-out');

  grid.addEventListener('animationend', function handler() {
    grid.removeEventListener('animationend', handler);
    grid.classList.remove('slide-fade-out');

    grid.innerHTML = "";

    void grid.offsetWidth;
    movies.forEach((movie) => appendMovieCard(grid, movie));
    grid.classList.add('slide-down-in');

    grid.addEventListener('animationend', function fadeInHandler() {
        grid.removeEventListener('animationend', fadeInHandler);
        grid.classList.remove('slide-down-in');
    }, { once: true });

  }, { once: true });
};