const API_URL = "http://localhost:7079/api/islamic-history/events";

async function loadEvents() {

    const response = await fetch(API_URL);

    const events = await response.json();

    const container = document.getElementById("events-container");

    events.forEach(event => {

        const card = document.createElement("div");

        card.innerHTML = `
            <img src="${event.image_url}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p><strong>${event.year}</strong></p>
            <p>${shortenText(cleanDescription(event.description))}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href = `history.html?id=${event.id}`;
        });

        container.appendChild(card);
    });

}

loadEvents();

function cleanDescription(text) {
  return text.replace(/:contentReference\[.*?\]\{.*?\}/g, "");
}

function shortenText(text, length = 120) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}