const placesContainer = document.querySelector("#places");

async function loadPlaces() {
  try {
    const response = await fetch("/api/places");

    if (!response.ok) {
      throw new Error("Unable to load places");
    }

    const places = await response.json();

    placesContainer.innerHTML = "";

    places.forEach((place) => {
      const article = document.createElement("article");

      article.className = "place-card";

      article.innerHTML = `
        <img
          src="${place.image}"
          alt="${place.name}"
          class="place-image"
        />

        <div class="place-content">

          <h2>${place.name}</h2>

          <p>
            ${place.description}
          </p>

          <div class="place-meta">

            <span>
              📍 ${place.location}
            </span>

            <span>
              🏷️ ${place.category}
            </span>

            <span>
              ⛰️ ${place.difficulty}
            </span>

          </div>

          <a
            href="/places/${place.id}"
            role="button"
          >
            View Details
          </a>

        </div>
      `;

      placesContainer.appendChild(article);
    });
  } catch (error) {
    placesContainer.innerHTML = `
      <article>
        <h2>Unable to load places</h2>
        <p>Please try again later.</p>
      </article>
    `;
  }
}

loadPlaces();