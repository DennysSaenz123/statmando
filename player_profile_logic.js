const playerId = new URLSearchParams(window.location.search).get("id");

const img = document.createElement("img");
img.alt = "Player Photo";
img.className = "player-photo";
img.src = `playerpics/${playerId}.jpg`;
img.onerror = () => {
  img.src = "playerpics/default.jpg";
};
document.getElementById("image-wrapper").appendChild(img);

// Load player bio
d3.csv("players.csv").then(data => {
  const player = data.find(p => p.pdga_number === playerId);
  if (player) {
    document.getElementById("player-name").textContent = `${player.first_name} ${player.last_name}`;
    document.getElementById("player-location").textContent = `${player.city || ""}, ${player.state || ""}`;
    document.getElementById("pdga-number").textContent = player.pdga_number;
    document.getElementById("country-flag").src = `images/flags/${player.country.toLowerCase()}.png`;
    document.getElementById("member-since").textContent = player.member_since;
    document.getElementById("division").textContent = player.division;
  }
});

// Load event history
d3.csv("event_round_player_stats.csv").then(data => {
  const playerData = data.filter(row => row.pdga_number === playerId);
  if (!playerData.length) return;

  const table = document.createElement("table");
  table.id = "eventHistoryTable";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headers = Object.keys(playerData[0]);
  const headerRow = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  playerData.forEach(row => {
    const tr = document.createElement("tr");
    headers.forEach(h => {
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
    $('#eventHistoryTable').DataTable();
  });
});
