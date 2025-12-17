const grid = document.getElementById("musicGrid");
const title = document.getElementById("sectionTitle");

/* =========================
   1️⃣ Genre-ээр дуу хайх
========================= */
async function searchMusic() {
  const genre = document.getElementById("genreSelect").value;
  title.innerText = `🎧 ${genre.toUpperCase()} – Songs`;
  grid.innerHTML = "⏳ Ачаалж байна...";

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${genre}&media=music&limit=40`
    );
    const data = await res.json();

    grid.innerHTML = "";

    data.results.forEach(song => {
      if (!song.trackName) return;

      grid.appendChild(
        createCard(
          song.trackViewUrl,
          song.artworkUrl100,
          song.trackName,
          song.artistName
        )
      );
    });

  } catch (err) {
    grid.innerHTML = "❌ Алдаа гарлаа";
    console.error(err);
  }
}

/* =========================
   2️⃣ Genre-ээр Top 10 артист
========================= */
async function loadTopArtists() {
  const genre = document.getElementById("genreSelect").value;
  title.innerText = `⭐ ${genre.toUpperCase()} – Top 10 Artists`;
  grid.innerHTML = "⏳ Ачаалж байна...";

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${genre}&media=music&entity=musicArtist&limit=10`
    );
    const data = await res.json();

    grid.innerHTML = "";

    data.results.forEach(artist => {
      const card = document.createElement("a");
      card.className = "music-card";
      card.target = "_blank";
      card.href = artist.artistLinkUrl || "#";

      card.innerHTML = `
        <div class="artist-avatar">🎤</div>
        <h3>${artist.artistName}</h3>
        <p>Artist</p>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = "❌ Алдаа гарлаа";
    console.error(err);
  }
}


/* =========================
   Card үүсгэгч
========================= */
function createCard(link, img, titleText, subtitle) {
  const card = document.createElement("a");
  card.className = "music-card";
  card.href = link;
  card.target = "_blank";

  card.innerHTML = `
    <img src="${img}" alt="">
    <h3>${titleText}</h3>
    <p>${subtitle}</p>
  `;

  return card;
}
