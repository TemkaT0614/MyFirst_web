const grid = document.getElementById("musicGrid");
const title = document.getElementById("sectionTitle");

// Enter товч дарахад хайлт хийх
function handleEnter(event) {
  if (event.key === "Enter") {
    searchMusic();
  }
}

// Дуу хайх функц
async function searchMusic() {
  const songName = document.getElementById("songInput").value.trim();

  if (!songName) {
    alert("Дууны нэрээ бичнэ үү!");
    return;
  }

  title.innerText = `🎧 "${songName}" хайлт`;

  grid.innerHTML = "⏳ Ачаалж байна...";

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(songName)}&media=music&limit=40`
    );
    const data = await res.json();

    grid.innerHTML = "";

    if (!data.results.length) {
      grid.innerHTML = "⚠️ Дуу олдсонгүй";
      return;
    }

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

// Card үүсгэгч
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
