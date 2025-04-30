const tracker = document.getElementById("tracker");
const startDateInput = document.getElementById("startDate");
const cycleLengthInput = document.getElementById("cycleLength");
const toggleTheme = document.getElementById("toggleTheme");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

function generateCycle() {
  const startDate = new Date(startDateInput.value);
  const cycleLength = parseInt(cycleLengthInput.value);
  if (!startDate || isNaN(cycleLength)) return;

  const days = [];
  for (let i = 0; i < cycleLength; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push({
      day: i + 1,
      date: date.toISOString().split("T")[0],
    });
  }

  const phases = [
    { name: "Menstrual", start: 1, end: 5 },
    { name: "Follicular", start: 6, end: 13 },
    { name: "Ovulation", start: 14, end: 15 },
    { name: "Luteal", start: 16, end: cycleLength },
  ];

  function getPhase(day) {
    for (let phase of phases) {
      if (day >= phase.start && day <= phase.end) return phase.name;
    }
    return "";
  }

  const moodColors = {
    "Happy 😄": "#fff9c4",
    "Calm 🧘‍♀️": "#c8e6c9",
    "Irritable 😤": "#ffcdd2",
    "Sad 😢": "#bbdefb",
    "Anxious 😰": "#ffe0b2",
    "Energetic 💃": "#dcedc8"
  };

  let html = `<table><thead>
    <tr><th>Day</th><th>Date</th><th>Phase</th><th>📝 Symptom</th><th>😊 Mood</th><th>😴 Sleep</th><th>📓 Notes</th></tr>
  </thead><tbody>`;

  days.forEach((d) => {
    const phase = getPhase(d.day);
    const data = JSON.parse(localStorage.getItem("cycleData") || "{}")[d.date] || {};
    const moodBg = data.mood && moodColors[data.mood] ? `style="background:${moodColors[data.mood]}"` : "";

    html += `<tr>
      <td>${d.day}</td>
      <td>${d.date}</td>
      <td><span class="phase-tag ${phase.toLowerCase()}">${phase}</span></td>

      <td>
        <select onchange="saveData('${d.date}', 'symptom', this.value)">
          <option ${data.symptom === '' ? 'selected' : ''}></option>
          <option ${data.symptom === 'None' ? 'selected' : ''}>None</option>
          <option ${data.symptom === 'Cramps' ? 'selected' : ''}>Cramps</option>
          <option ${data.symptom === 'Headache' ? 'selected' : ''}>Headache</option>
          <option ${data.symptom === 'Bloating' ? 'selected' : ''}>Bloating</option>
          <option ${data.symptom === 'Acne' ? 'selected' : ''}>Acne</option>
          <option ${data.symptom === 'Nausea' ? 'selected' : ''}>Nausea</option>
          <option ${data.symptom === 'Tender breasts' ? 'selected' : ''}>Tender breasts</option>
        </select>
      </td>

      <td ${moodBg}>
        <select onchange="saveData('${d.date}', 'mood', this.value)">
          <option ${data.mood === '' ? 'selected' : ''}></option>
          <option ${data.mood === 'Happy 😄' ? 'selected' : ''}>Happy 😄</option>
          <option ${data.mood === 'Calm 🧘‍♀️' ? 'selected' : ''}>Calm 🧘‍♀️</option>
          <option ${data.mood === 'Irritable 😤' ? 'selected' : ''}>Irritable 😤</option>
          <option ${data.mood === 'Sad 😢' ? 'selected' : ''}>Sad 😢</option>
          <option ${data.mood === 'Anxious 😰' ? 'selected' : ''}>Anxious 😰</option>
          <option ${data.mood === 'Energetic 💃' ? 'selected' : ''}>Energetic 💃</option>
        </select>
      </td>

      <td>
        <select onchange="saveData('${d.date}', 'sleep', this.value)">
          <option ${data.sleep === '' ? 'selected' : ''}></option>
          <option ${data.sleep === '4h 🥴' ? 'selected' : ''}>4h 🥴</option>
          <option ${data.sleep === '5h 😩' ? 'selected' : ''}>5h 😩</option>
          <option ${data.sleep === '6h 😐' ? 'selected' : ''}>6h 😐</option>
          <option ${data.sleep === '7h 🙂' ? 'selected' : ''}>7h 🙂</option>
          <option ${data.sleep === '8h 😴' ? 'selected' : ''}>8h 😴</option>
          <option ${data.sleep === '9h+ 🛌' ? 'selected' : ''}>9h+ 🛌</option>
        </select>
      </td>

      <td>
        <textarea placeholder="Write anything..." onchange="saveData('${d.date}', 'notes', this.value)">${data.notes || ""}</textarea>
      </td>
    </tr>`;
  });

  html += `</tbody></table>`;
  tracker.innerHTML = html;
}

function saveData(date, field, value) {
  const saved = JSON.parse(localStorage.getItem("cycleData") || "{}");
  if (!saved[date]) saved[date] = {};
  saved[date][field] = value;
  localStorage.setItem("cycleData", JSON.stringify(saved));
  generateCycle();
}

window.onload = () => {
  const stored = localStorage.getItem("cycleData");
  if (stored) {
    const data = JSON.parse(stored);
    const dates = Object.keys(data).sort();
    if (dates.length > 0) {
      startDateInput.value = dates[0];
      generateCycle();
    }
  }
};

