function formatDate(date) {
  return date.toLocaleDateString('no-NO');
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
}

function disableButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = true;
  button.classList.remove('green');
  button.classList.add('gray');
}

function enableButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = false;
  button.classList.remove('gray');
  button.classList.add('green');
}

function clipToday() {
  const today = new Date().toISOString();
  localStorage.setItem('lastClippedDate', today);
  updateHaircutDisplay();
}

function trimBeardToday() {
  const today = new Date().toISOString();
  localStorage.setItem('lastBeardTrimDate', today);
  updateBeardDisplay();
}

function stretchToday() {
  localStorage.setItem('stretchStatus', 'done');
  updateStretchDisplay();
}

function updateHaircutDisplay() {
  const dateStr = localStorage.getItem('lastClippedDate');
  if (dateStr) {
    const date = new Date(dateStr);
    const days = daysBetween(date, new Date());
    document.getElementById('lastClipped').innerText = `Sist klippet: ${formatDate(date)} (${days} dager siden)`;
    const next = new Date(date);
    next.setDate(next.getDate() + 3);
    document.getElementById('nextHaircut').innerText = `Neste klipp bør være: ${formatDate(next)}`;
    disableButton('haircutButton');
  } else {
    document.getElementById('lastClipped').innerText = 'Ingen klipp registrert enda.';
    document.getElementById('nextHaircut').innerText = '';
    enableButton('haircutButton');
  }
}

function updateBeardDisplay() {
  const dateStr = localStorage.getItem('lastBeardTrimDate');
  if (dateStr) {
    const date = new Date(dateStr);
    const days = daysBetween(date, new Date());
    document.getElementById('lastBeardTrim').innerText = `Sist skiftet: ${formatDate(date)} (${days} dager siden)`;
    const next = new Date(date);
    next.setDate(next.getDate() + 3);
    document.getElementById('nextBeardTrim').innerText = `Neste skift bør være: ${formatDate(next)}`;
    disableButton('beardButton');
  } else {
    document.getElementById('lastBeardTrim').innerText = 'Ingen dynetrekkskift registrert enda.';
    document.getElementById('nextBeardTrim').innerText = '';
    enableButton('beardButton');
  }
}

function updateStretchDisplay() {
  const status = localStorage.getItem('stretchStatus');
  if (status === 'done') {
    document.getElementById('stretchStatus').innerText = "Dagens strekk gjennomført. Husk å gjøre det i morgen også.";
    disableButton('stretchButton');
  } else {
    document.getElementById('stretchStatus').innerText = "Ingen strekk registrert enda.";
    enableButton('stretchButton');
  }
}

function resetTracker() {
  localStorage.clear();
  updateHaircutDisplay();
  updateBeardDisplay();
  updateStretchDisplay();
}

// Kjør når siden lastes
window.onload = () => {
  updateHaircutDisplay();
  updateBeardDisplay();
  updateStretchDisplay();
};
