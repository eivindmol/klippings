// Funksjoner for å lagre og hente data fra localStorage
function saveData(key, value) {
    localStorage.setItem(key, value);
}

function getData(key) {
    return localStorage.getItem(key);
}

// Funksjoner for å formatere datoer
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

// Funksjon for å sjekke om en knapp skal være deaktivert
function shouldDisableButton(lastActionDate) {
    if (!lastActionDate) return false;
    
    const lastDate = new Date(lastActionDate);
    const now = new Date();
    
    // Sjekk om det er samme dag
    return lastDate.getDate() === now.getDate() &&
           lastDate.getMonth() === now.getMonth() &&
           lastDate.getFullYear() === now.getFullYear();
}

// Funksjon for å oppdatere knappenes tilstand
function updateButtonStates() {
    const lastHaircut = getData('lastHaircut');
    const lastBeardTrim = getData('lastBeardTrim');
    const lastStretch = getData('lastStretch');
    
    document.getElementById('haircutButton').disabled = shouldDisableButton(lastHaircut);
    document.getElementById('beardButton').disabled = shouldDisableButton(lastBeardTrim);
    document.getElementById('stretchButton').disabled = shouldDisableButton(lastStretch);
}

// Hårklipp funksjoner
function clipToday() {
    const today = new Date();
    saveData('lastHaircut', today.toISOString());
    updateHaircutDisplay();
    updateButtonStates();
}

function updateHaircutDisplay() {
    const lastHaircut = getData('lastHaircut');
    const lastClippedElement = document.getElementById('lastClipped');
    const nextHaircutElement = document.getElementById('nextHaircut');
    
    if (lastHaircut) {
        const lastDate = new Date(lastHaircut);
        const nextDate = calculateNextDate(lastDate, 3); // 30 dager mellom hårklipp
        
        lastClippedElement.textContent = `Sist klippet: ${formatDate(lastDate)}`;
        lastClippedElement.style.color = '#000000';
        nextHaircutElement.textContent = `Neste klipp: ${formatDate(nextDate)}`;
        nextHaircutElement.style.color = '#000000';
    } else {
        lastClippedElement.textContent = 'Ingen klipp registrert enda.';
        lastClippedElement.style.color = '#45AC35';
        nextHaircutElement.textContent = '';
    }
}

// Dynetrekk funksjoner
function trimBeardToday() {
    const today = new Date();
    saveData('lastBeardTrim', today.toISOString());
    updateBeardDisplay();
    updateButtonStates();
}

function updateBeardDisplay() {
    const lastBeardTrim = getData('lastBeardTrim');
    const lastBeardElement = document.getElementById('lastBeardTrim');
    const nextBeardElement = document.getElementById('nextBeardTrim');
    
    if (lastBeardTrim) {
        const lastDate = new Date(lastBeardTrim);
        const nextDate = calculateNextDate(lastDate, 14); // 7 dager mellom dynetrekk
        
        lastBeardElement.textContent = `Sist skiftet dynetrekk: ${formatDate(lastDate)}`;
        lastBeardElement.style.color = '#000000';
        nextBeardElement.textContent = `Neste dynetrekk: ${formatDate(nextDate)}`;
        nextBeardElement.style.color = '#000000';
    } else {
        lastBeardElement.textContent = 'Ingen dynetrekkskift registrert enda.';
        lastBeardElement.style.color = '#45AC35';
        nextBeardElement.textContent = '';
    }
}
//bad nede funksjoner
function vaskBadnedeToday() {
  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 14); // For eksempel: vask hver 14. dag

  // Lagre dato i LocalStorage
  localStorage.setItem('badNedeLast', today.toISOString());
  localStorage.setItem('badNedeNext', nextDate.toISOString());

  // Oppdater visning
  document.getElementById('lastBadNedeVask').textContent = `Vasket: ${today.toLocaleDateString()}`;
  document.getElementById('nextBadNedeVask').textContent = `Neste vask: ${nextDate.toLocaleDateString()}`;

  // Deaktiver knapp
  const button = document.getElementById('BadBedeButton');
  button.disabled = true;
  button.classList.add('disabled');
}

// Strekk funksjoner
function stretchToday() {
    const today = new Date();
    saveData('lastStretch', today.toISOString());
    updateStretchDisplay();
    updateButtonStates();
}

function updateStretchDisplay() {
    const lastStretch = getData('lastStretch');
    const stretchStatusElement = document.getElementById('stretchStatus');
    
    if (lastStretch) {
        const lastDate = new Date(lastStretch);
        const today = new Date();
        
        // Sjekk om det er samme dag
        if (lastDate.getDate() === today.getDate() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getFullYear() === today.getFullYear()) {
            stretchStatusElement.textContent = 'Bra, dette er gjort i dag. Husk å gjøre det igjen i morgen';
        } else {
            stretchStatusElement.textContent = `Sist strekket: ${formatDate(lastDate)}`;
        }
    } else {
        stretchStatusElement.textContent = 'Ingen strekk registrert enda.';
    }
}

// Reset funksjon
function resetTracker() {
    if (confirm('Er du sikker på at du vil nullstille alt?')) {
        localStorage.clear();
        updateHaircutDisplay();
        updateBeardDisplay();
        updateStretchDisplay();
        updateButtonStates();
    }
}

window.addEventListener('DOMContentLoaded', () => {
  const last = localStorage.getItem('badNedeLast');
  const next = localStorage.getItem('badNedeNext');

  if (last) {
    document.getElementById('lastBadNedeVask').textContent = `Vasket: ${new Date(last).toLocaleDateString()}`;
  }
  if (next) {
    document.getElementById('nextBadNedeVask').textContent = `Neste vask: ${new Date(next).toLocaleDateString()}`;

    // Deaktiver knappen hvis allerede vasket
    const button = document.getElementById('BadBedeButton');
    if (button) {
      button.disabled = true;
      button.classList.add('disabled');
    }
  }
});


// Initialiser visning når siden lastes
document.addEventListener('DOMContentLoaded', () => {
    updateHaircutDisplay();
    updateBeardDisplay();
    updateStretchDisplay();
    updateButtonStates();
    
    // Sjekk knappenes tilstand hvert minutt
    setInterval(updateButtonStates, 60000);
});
