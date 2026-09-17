const placeContainer = document.querySelector("#place");

const pathParts = window.location.pathname.split("/");
const placeId = pathParts[pathParts.length - 1];

async function loadPlace() {
  try {
    const response = await fetch(`/api/places/${placeId}`);

    if (!response.ok) {
      throw new Error("Place not found");
    }

    const place = await response.json();

    placeContainer.innerHTML = `
      <div class="detail-page">

        <!-- Hero -->

        <section class="detail-hero">

          <img
            src="${place.image}"
            alt="${place.name}"
            class="detail-hero-image"
          />

          <div class="detail-hero-overlay">
            <span class="detail-category">
              ${place.category}
            </span>

            <h1>${place.name}</h1>

            <p>
              ${place.location}
            </p>
          </div>

        </section>


        <!-- Main content -->

        <div class="detail-layout">

          <main>

            <section class="detail-section">

              <h2>About ${place.name}</h2>

              <p class="lead">
                ${place.description}
              </p>

              <p>
                ${place.overview}
              </p>

            </section>


            <!-- Highlights -->

            <section class="detail-section">

              <h2>Highlights</h2>

              <ul class="highlight-list">

                ${place.highlights
                  .map(
                    (highlight) =>
                      `<li>${highlight}</li>`
                  )
                  .join("")}

              </ul>

            </section>


            <!-- Tips -->

            <section class="detail-section">

              <h2>Tips for Visiting</h2>

              <p>
                ${place.tips}
              </p>

            </section>

          </main>


          <!-- Sidebar -->

          <aside>

            <article class="facts-card">

              <h3>Quick Facts</h3>

              <div class="fact">

                <span>📍 Location</span>

                <strong>
                  ${place.location}
                </strong>

              </div>


              <div class="fact">

                <span>🏷️ Category</span>

                <strong>
                  ${place.category}
                </strong>

              </div>


              <div class="fact">

                <span>⛰️ Difficulty</span>

                <strong>
                  ${place.difficulty}
                </strong>

              </div>


              <div class="fact">

                <span>⭐ Best For</span>

                <strong>
                  ${place.bestFor}
                </strong>

              </div>


              <div class="fact">

                <span>⏱️ Suggested Time</span>

                <strong>
                  ${place.duration}
                </strong>

              </div>

            </article>

          </aside>

        </div>


        <!-- Back -->

        <div class="back-button">

          <a href="/" role="button">
            ← Back to Oʻahu Explorer
          </a>

        </div>

      </div>
    `;
  } catch (error) {

    placeContainer.innerHTML = `
      <article>
        <h1>Place Not Found</h1>

        <p>
          Sorry, we couldn't find this place.
        </p>

        <a href="/" role="button">
          ← Back Home
        </a>
      </article>
    `;
  }
}

loadPlace();