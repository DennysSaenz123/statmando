// Show/hide table tabs
function showTable(type) {
  const eventsTable = document.getElementById('events-table-container');
  const playersTable = document.getElementById('players-table-container');

  if (type === 'events') {
    eventsTable.style.display = 'block';
    playersTable.style.display = 'none';
  } else if (type === 'players') {
    eventsTable.style.display = 'none';
    playersTable.style.display = 'block';
  }
}

// Load and display events.csv
fetch('events.csv')
  .then(res => res.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const data = parsed.data;

    if (!data.length) return;

    const table = document.createElement('table');
    table.setAttribute('id', 'eventsTable');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('events-table').appendChild(table);

    $(document).ready(function () {
      $('#eventsTable').DataTable();
    });
  })
  .catch(err => console.error("Error loading events.csv", err));

// Load and display players.csv
fetch('players.csv')
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const data = parsed.data;

    if (!data || data.length === 0) return;

    const table = document.createElement('table');
    table.setAttribute('id', 'playersTable');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');

        if (header === 'pdga_number') {
          td.innerHTML = `<a href="player.html?id=${row.pdga_number}">${row[header]}</a>`;
        } else {
          td.textContent = row[header];
        }

        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('players-table').appendChild(table);

    $(document).ready(function () {
      $('#playersTable').DataTable();
    });
  })
  .catch(error => console.error('Error loading players.csv:', error));



  