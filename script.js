// רשימת אנימות התחלתית (ריקה או עם דוגמאות)
let animes = [];

// בחירת האלמנט שבו יוצגו כרטיסי האנימות
const animeListDiv = document.getElementById("anime-list");

// ------------------- פונקציות ------------------- //

// פונקציה להצגת רשימת האנימות
function showAnimes(list) {
    animeListDiv.innerHTML = "";

    list.forEach((anime, index) => {
        // יצירת כרטיס אנימה
        const card = document.createElement("div");
        card.className = "anime-card";

        // HTML הכרטיס
        card.innerHTML = `
            <h3>${anime.title}</h3>
            <img src="${anime.image}" alt="${anime.title}">
            <div class="episodes" style="display:none;">
                <h4>פרקים:</h4>
                <div class="episode-list"></div>
                <input type="text" class="new-episode-input" placeholder="הוסף פרק חדש">
                <button class="add-episode-btn">הוסף פרק</button>
            </div>
        `;

        const episodesDiv = card.querySelector(".episodes");
        const episodeListDiv = card.querySelector(".episode-list");

        // ------------------- הצגת פרקים ------------------- //
        function renderEpisodes() {
            episodeListDiv.innerHTML = "";
            anime.episodes.forEach(ep => {
                const epDiv = document.createElement("div");
                epDiv.className = "episode";
                epDiv.textContent = ep;
                episodeListDiv.appendChild(epDiv);
            });
        }
        renderEpisodes();

        // פתיחה / סגירה של רשימת הפרקים בלחיצה על התמונה או הכותרת
        card.querySelector("img").addEventListener("click", () => {
            episodesDiv.style.display = episodesDiv.style.display === "none" ? "block" : "none";
        });
        card.querySelector("h3").addEventListener("click", () => {
            episodesDiv.style.display = episodesDiv.style.display === "none" ? "block" : "none";
        });

        // ------------------- הוספת פרק חדש ------------------- //
        card.querySelector(".add-episode-btn").addEventListener("click", () => {
            const newEpInput = card.querySelector(".new-episode-input");
            const newEp = newEpInput.value.trim();
            if (newEp) {
                anime.episodes.push(newEp);
                newEpInput.value = "";
                renderEpisodes();
            }
        });

        // הוספת הכרטיס ל-DIV הראשי
        animeListDiv.appendChild(card);
    });
}

// ------------------- הוספת אנימה חדשה ------------------- //
function addAnime() {
    const title = document.getElementById("anime-title").value.trim();
    const image = document.getElementById("anime-image").value.trim();
    const episodesInput = document.getElementById("anime-episodes").value.trim();

    if (!title || !image || !episodesInput) {
        alert("מלאי את כל השדות!");
        return;
    }

    const episodes = episodesInput.split(",").map(ep => ep.trim()).filter(ep => ep !== "");

    animes.push({
        title: title,
        image: image,
        episodes: episodes
    });

    // נקה את הטופס
    document.getElementById("anime-title").value = "";
    document.getElementById("anime-image").value = "";
    document.getElementById("anime-episodes").value = "";

    showAnimes(animes);
}

// ------------------- חיפוש בזמן אמת ------------------- //
function searchAnime() {
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = animes.filter(anime => anime.title.toLowerCase().includes(value));
    showAnimes(filtered);
}

// מציג את כל האנימות בהתחלה
