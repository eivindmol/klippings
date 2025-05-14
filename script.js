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

// Hårklipp funksjoner
function clipToday() {
    const today = new Date();
    saveData('lastHaircut', today.toISOString());
    updateHaircutDisplay();
}

function updateHaircutDisplay() {
    const lastHaircut = getData('lastHaircut');
    const lastClippedElement = document.getElementById('lastClipped');
    const nextHaircutElement = document.getElementById('nextHaircut');
    
    if (lastHaircut) {
        const lastDate = new Date(lastHaircut);
        const nextDate = calculateNextDate(lastDate, 30); // 30 dager mellom hårklipp
        
        lastClippedElement.textContent = `Sist klippet: ${formatDate(lastDate)}`;
        nextHaircutElement.textContent = `Neste klipp: ${formatDate(nextDate)}`;
    } else {
        lastClippedElement.textContent = 'Ingen klipp registrert enda.';
        nextHaircutElement.textContent = '';
    }
}

// Dynetrekk funksjoner
function trimBeardToday() {
    const today = new Date();
    saveData('lastBeardTrim', today.toISOString());
    updateBeardDisplay();
}

function updateBeardDisplay() {
    const lastBeardTrim = getData('lastBeardTrim');
    const lastBeardElement = document.getElementById('lastBeardTrim');
    const nextBeardElement = document.getElementById('nextBeardTrim');
    
    if (lastBeardTrim) {
        const lastDate = new Date(lastBeardTrim);
        const nextDate = calculateNextDate(lastDate, 7); // 7 dager mellom dynetrekk
        
        lastBeardElement.textContent = `Sist skiftet dynetrekk: ${formatDate(lastDate)}`;
        nextBeardElement.textContent = `Neste dynetrekk: ${formatDate(nextDate)}`;
    } else {
        lastBeardElement.textContent = 'Ingen dynetrekkskift registrert enda.';
        nextBeardElement.textContent = '';
    }
}

// Strekk funksjoner
function stretchToday() {
    const today = new Date();
    saveData('lastStretch', today.toISOString());
    updateStretchDisplay();
}

function updateStretchDisplay() {
    const lastStretch = getData('lastStretch');
    const stretchStatusElement = document.getElementById('stretchStatus');
    
    if (lastStretch) {
        const lastDate = new Date(lastStretch);
        stretchStatusElement.textContent = `Sist strekket: ${formatDate(lastDate)}`;
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
    }
}

// Initialiser visning når siden lastes
document.addEventListener('DOMContentLoaded', () => {
    updateHaircutDisplay();
    updateBeardDisplay();
    updateStretchDisplay();
});
