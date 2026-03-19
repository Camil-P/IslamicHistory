const API_URL = "http://localhost:7079/api/islamic-history/events";

async function loadEventDetails() {
    const loader = document.getElementById("loader");
    const container = document.getElementById("event-details");
    container.style.display = "none";

    const response = await fetch(API_URL);
    const events = await response.json();

    // 👇 uzmi ID iz URL-a
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let event;

    if (id !== null) {
        event = events.find(e => e.id === parseInt(id));
    } else {
        // reroute to first event if no ID provided
        window.location.href = "history.html?id=1";
        return;
    }

    loader.style.display = "none";
    container.style.display = "block";

    const total = events.length;
    const currentId = id !== null ? parseInt(id) : 0;

    const prevId = currentId > 1 ? currentId - 1 : null;
    const nextId = currentId < total - 1 ? currentId + 1 : null;

    container.innerHTML = `
        <div class="event-hero">
            <img src="${event.image_url}" alt="${event.image_search}">
        </div>

        <div class="event-content fade-in">

            <h2>${event.title}</h2>

            <p class="event-year">${event.year}</p>

            <p class="event-description">
            ${cleanDescription(event.description)}
            </p>

            <div class="event-nav">

                ${prevId !== null ? `<a href="history.html?id=${prevId}" class="nav-btn">← Previous</a>` : ""}

                ${nextId !== null ? `<a href="history.html?id=${nextId}" class="nav-btn">Next →</a>` : ""}

            </div>

            <a href="historic-events.html" class="btn">
            ← Back to Events
            </a>

        </div>
    `;

}

function cleanDescription(text) {
    return text.replace(/:contentReference\[.*?\]\{.*?\}/g, "");
}

loadEventDetails();
