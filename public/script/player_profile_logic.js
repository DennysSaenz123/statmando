const playerId =
  window.playerId || window.location.pathname.split("/").pop();


// PLAYER IMAGE

const img = document.createElement("img");
img.alt = "Player Photo";
img.className = "player-photo";

img.src = `/playerpics/${playerId}.jpg`;

img.onerror = () => {
  img.src = "/playerpics/default.jpg";
};

document.getElementById("image-wrapper").appendChild(img);

document.getElementById("image-wrapper").appendChild(img);


// LOAD PLAYER BIO

d3.csv("/csv-files/players.csv").then((data) => {
  const player = data.find((p) => p.pdga_number === playerId);

  if (player) {
    document.getElementById("player-name").textContent = `${player.first_name} ${player.last_name}`;
    document.getElementById("player-location").textContent = `${player.city || ""}${player.city && player.state ? ", " : ""}${player.state || ""}`;
    document.getElementById("pdga-number").textContent = player.pdga_number;
    document.getElementById("member-since").textContent = player.member_since;
    document.getElementById("division").textContent = player.division;


    const flagEl = document.getElementById("country-flag");
    if (player.country && flagEl) {
      flagEl.src = `/images/flags/${player.country.toLowerCase()}.png`;
      flagEl.onerror = () => {
        flagEl.src = "/images/flags/default.png"; // optional fallback
      };
    }
  } else {
    document.getElementById("player-name").textContent = "Player not found";
  }
});


// LOAD EVENT HISTORY

d3.csv("/csv-files/event_round_player_stats.csv").then((data) => {
  const playerData = data.filter((row) => row.pdga_number === playerId);
  if (!playerData.length) return;

  const table = document.createElement("table");
  table.id = "eventHistoryTable";

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headers = Object.keys(playerData[0]);

  const headerRow = document.createElement("tr");
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  playerData.forEach((row) => {
    const tr = document.createElement("tr");
    headers.forEach((h) => {
      const td = document.createElement("td");
      td.textContent = row[h];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("events-table").appendChild(table);

  $(document).ready(function () {
    $("#eventHistoryTable").DataTable();
  });
});