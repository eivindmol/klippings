// Definer kategorier
const categories = [
    { name: 'Haircut', interval: 30 },
    { name: 'BeardTrim', interval: 14 },
    { name: 'Stretch', interval: 1 }
];

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

// Oppdater visning for en spesifikk kategori
function updateDisplay(category, daysInterval) {
    const lastAction = getData(`last${category}`);
    const lastElement = document.getElementById(`last${category}`);
    const nextElement = document.getElementById(`next${category}`);

    if (lastAction) {
        const lastDate = new Date(lastAction);
        const nextDate = calculateNextDate(lastDate, daysInterval);

        lastElement.textContent = `Sist ${category.toLowerCase()}: ${formatDate(lastDate)}`;
        lastElement.style.color = '#000000';
        nextElement.textContent = `Neste ${category.toLowerCase()}: ${formatDate(nextDate)}`;
        nextElement.style.color = '#000000';
    } else {
        lastElement.textContent = `Ingen ${category.toLowerCase()} registrert enda.`;
        lastElement.style.color = '#45AC35';
        nextElement.textContent = '';
    }
}

// Håndter dagens handling for en kategori
function handleToday(category) {
    const today = new Date();
    saveData(`last${category}`, today.toISOString());
    const interval = categories.find(c => c.name === category).interval;
    updateDisplay(category, interval);
    updateButtonStates();
}

// Oppdater knappenes tilstand
function updateButtonStates() {
    categories.forEach(category => {
        const lastAction = getData(`last${category.name}`);
        const button = document.getElementById(`${category.name.toLowerCase()}Button`);
        button.disabled = shouldDisableButton(lastAction);
    });
}

// Nullstill alle data og oppdater visning
function resetTracker() {
    if (confirm('Er du sikker på at du vil nullstille alt?')) {
        localStorage.clear();
        categories.forEach(category => {
            updateDisplay(category.name, category.interval);
        });
        updateButtonStates();
    }
}

// Initialiser visning når siden lastes
document.addEventListener('DOMContentLoaded', () => {
    categories.forEach(category => {
        updateDisplay(category.name, category.interval);
    });
    updateButtonStates();

    // Sjekk knappenes tilstand hvert minutt
    setInterval(updateButtonStates, 60000);
});
