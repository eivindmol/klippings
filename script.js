document.addEventListener('DOMContentLoaded', () => {
  // ⚠️ Preview-deploy advarsel
  if (window.location.hostname.includes('--')) {
    const warning = document.createElement('div');
    warning.textContent = '⚠️ Du bruker en preview-deploy. LocalStorage lagres separat her, så data kan forsvinne mellom deploys.';
    warning.style.backgroundColor = '#ffcc00';
    warning.style.color = '#000';
    warning.style.padding = '10px';
    warning.style.textAlign = 'center';
    warning.style.fontWeight = 'bold';
    warning.style.position = 'fixed';
    warning.style.top = '0';
    warning.style.left = '0';
    warning.style.width = '100%';
    warning.style.zIndex = '9999';
    document.body.style.paddingTop = '50px';
    document.body.prepend(warning);
  }

  // Oppdater visning og tilstand ved innlasting
  updateHaircutDisplay();
  updateBeardDisplay();
  updateStretchDisplay();
  updateBadNedeDisplay();
  updateButtonStates();

  // Sjekk knapper hvert minutt for å reaktivere ved midnatt
  setInterval(updateButtonStates, 60000);
});

// 🔧 Felles funksjoner
function saveData(key, value) {
  localStorage.setItem(key, value);
}

function getData(key) {
  return localStorage.getItem(key);
}

function formatDate(date) {
  return date.toLocaleDateString('no-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function calculateNextDate(lastDate, days) {
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function shouldDisableButton(lastActionDate) {
  if (!lastActionDate) return false;
  const lastDate = new Date(lastActionDate);
  const now = new Date();
  return lastDate.getDate() === now.getDate() &&
         lastDate.getMonth() === now.getMonth() &&
         lastDate.getFullYear() === now.getFullYear();
}

function updateButtonStates() {
  const mappings = [
    { key: 'lastHaircut', buttonId: 'haircutButton' },
    { key: 'lastBeardTrim', buttonId: 'beardButton' },
    { key: 'lastStretch', buttonId: 'stretchButton' },
    { key: 'lastBadNede', buttonId: 'BadBedeButton' }
  ];

  mappings.forEach(({ key, buttonId }) => {
    const lastDate = getData(key);
    const button = document.getElementById(buttonId);
    if (button) button.disabled = shouldDisableButton(lastDate);
  });
}

// 💇‍♂️ Hårklipp
function clipToday() {
  const today = new Date();
  saveData('lastHaircut', today.toISOString());
  updateHaircutDisplay();
  updateButtonStates();
}

function updateHaircutDisplay() {
  const lastHaircut = getData('lastHaircut');
  const lastElem = document.getElementById('lastClipped');
  const nextElem = document.getElementById('nextHaircut');

  if (lastHaircut) {
    const lastDate = new Date(lastHaircut);
    const nextDate = calculateNextDate(lastDate, 3);
    lastElem.textContent = `Sist klippet: ${formatDate(lastDate)}`;
    nextElem.textContent = `Neste klipp: ${formatDate(nextDate)}`;
  } else {
    lastElem.textContent = 'Ingen klipp registrert enda.';
    nextElem.textContent = '';
  }
}

// 🧺 Dynetrekk
function trimBeardToday() {
  const today = new Date();
  saveData('lastBeardTrim', today.toISOString());
  updateBeardDisplay();
  updateButtonStates();
}

function updateBeardDisplay() {
  const lastBeard = getData('lastBeardTrim');
  const lastElem = document.getElementById('lastBeardTrim');
  const nextElem = document.getElementById('nextBeardTrim');

  if (lastBeard) {
    const lastDate = new Date(lastBeard);
    const nextDate = calculateNextDate(lastDate, 14);
    lastElem.textContent = `Sist skiftet dynetrekk: ${formatDate(lastDate)}`;
    nextElem.textContent = `Neste dynetrekk: ${formatDate(nextDate)}`;
  } else {
    lastElem.textContent = 'Ingen dynetrekkskift registrert enda.';
    nextElem.textContent = '';
  }
}

// 🚿 Bad nede
function vaskBadnedeToday() {
  const today = new Date();
  saveData('lastBadNede', today.toISOString());
  updateBadNedeDisplay();
  updateButtonStates();
}

function updateBadNedeDisplay() {
  const lastBad = getData('lastBadNede');
  const lastElem = document.getElementById('lastBadNedeVask');
  const nextElem = document.getElementById('nextBadNedeVask');

  if (lastBad) {
    const lastDate = new Date(lastBad);
    const nextDate = calculateNextDate(lastDate, 14);
    lastElem.textContent = `Vasket: ${formatDate(lastDate)}`;
    nextElem.textContent = `Neste vask: ${formatDate(nextDate)}`;
  } else {
    lastElem.textContent = 'Ingen vask nede registrert enda.';
    nextElem.textContent = '';
  }
}

// 🧘‍♂️ Strekk
function stretchToday() {
  const today = new Date();
  saveData('lastStretch', today.toISOString());
  updateStretchDisplay();
  updateButtonStates();
}

function updateStretchDisplay() {
  const lastStretch = getData('lastStretch');
  const elem = document.getElementById('stretchStatus');

  if (lastStretch) {
    const lastDate = new Date(lastStretch);
    const today = new Date();
    if (shouldDisableButton(lastStretch)) {
      elem.textContent = 'Bra, dette er gjort i dag. Husk å gjøre det igjen i morgen';
    } else {
      elem.textContent = `Sist strekket: ${formatDate(lastDate)}`;
    }
  } else {
    elem.textContent = 'Ingen strekk registrert enda.';
  }
}

// 🔄 Nullstill alt
function resetTracker() {
  if (confirm('Er du sikker på at du vil nullstille alt?')) {
    localStorage.clear();
    updateHaircutDisplay();
    updateBeardDisplay();
    updateBadNedeDisplay();
    updateStretchDisplay();
    updateButtonStates();
  }
}
