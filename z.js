const genreSelect = document.getElementById("genreSelect");
const moviesDiv = document.getElementById("movies");

let allShows = [];

// Fetch shows (NO API KEY)
fetch("https://api.tvmaze.com/shows")
  .then(res => res.json())
  .then(data => {
    allShows = data;
    loadGenres(data);
  });

function loadGenres(shows) {
  const genres = new Set();

  shows.forEach(show => {
    show.genres.forEach(g => genres.add(g));
  });

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

genreSelect.addEventListener("change", () => {
  const genre = genreSelect.value;
  moviesDiv.innerHTML = "";

  const filtered = allShows.filter(show =>
    show.genres.includes(genre)
  );

  filtered.forEach(show => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${show.image?.original || ''}">
      <div class="movie-info">
        <h3>${show.name}</h3>
        <p>⭐ ${show.rating.average || "N/A"}</p>
      </div>
    `;
    moviesDiv.appendChild(card);
  });
});
