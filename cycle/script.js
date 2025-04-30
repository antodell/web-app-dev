const tracker = document.getElementById("tracker");
const startDateInput = document.getElementById("startDate");
const cycleLengthInput = document.getElementById("cycleLength");
const toggleTheme = document.getElementById("toggleTheme");

// Load dark mode preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Toggle theme
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

  let html = `<table><thead><tr>`;
  phases.forEach((p) => {
    html += `<th colspan="${p.end - p.start + 1}">${p.name}</th>`;
  });
  html += `</tr><tr>`;
  days.forEach((d) => {
    html += `<th>Day ${d.day}</th>`;
  });
  html += `</tr></thead><tbody><tr>`;
  days.forEach((d, i) => {
    const data = JSON.parse(localStorage.getItem("cycleData") || "{}")[d.date] || {};
    html += `<td>
      <input type="text" placeholder="Symptoms" value="${data.symptom || ""}" onchange="saveData('${d.date}', 'symptom', this.value)" /><br />
      <input type="text" placeholder="Mood" value="${data.mood || ""}" onchange="saveData('${d.date}', 'mood', this.value)" /><br />
      <input type="text" placeholder="Sleep" value="${data.sleep || ""}" onchange="saveData('${d.date}', 'sleep', this.value)" />
    </td>`;
  });
  html += `</tr></tbody></table>`;

  tracker.innerHTML = html;
}

function saveData(date, field, value) {
  const saved = JSON.parse(localStorage.getItem("cycleData") || "{}");
  if (!saved[date]) saved[date] = {};
  saved[date][field] = value;
  localStorage.setItem("cycleData", JSON.stringify(saved));
}

// Auto-load if previous date exists
window.onload = () => {
  const previousDate = Object.keys(JSON.parse(localStorage.getItem("cycleData") || "{}"))[0];
  if (previousDate) {
    startDateInput.value = previousDate;
    generateCycle();
  }
};
