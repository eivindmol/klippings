    // Funksjonene for lokal lagring og oppdatering av klippinger, etc.

    function getStretchStatus() {
      return localStorage.getItem('stretchStatus');
    }

    function setStretchStatus(status) {
      localStorage.setItem('stretchStatus', status);
    }

    function updateStretchDisplay() {
      const status = getStretchStatus();

      if (status === 'done') {
        document.getElementById('stretchStatus').innerText = "Dagens strekk gjennomført. Husk å gjøre det i morgen også.";
        document.getElementById('stretchButton').disabled = true;
        document.getElementById('stretchButton').style.backgroundColor = '#cccccc'; // Grå ut knappen
      } else {
        document.getElementById('stretchStatus').innerText = "Ingen strekk registrert enda.";
        document.getElementById('stretchButton').disabled = false;
        document.getElementById('stretchButton').style.backgroundColor = '#4CAF50'; // Normal grønn farge
      }
    }

    function stretchToday() {
      setStretchStatus('done');
      updateStretchDisplay();
    }

    function getStoredDate(key) {
      return localStorage.getItem(key);
    }

    function setStoredDate(key, date) {
      localStorage.setItem(key, date);
    }

    function formatDate(date) {
      // Norsk datoformat: DD.MM.YYYY
      return date.toLocaleDateString('no-NO');
    }

    function daysBetween(date1, date2) {
      // Konverter til midnatt for å få nøyaktig antall dager
      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    function updateButtonState(buttonId, lastDateStr) {
      const button = document.getElementById(buttonId);
      const today = new Date();
      
      if (lastDateStr) {
        const lastDate = new Date(lastDateStr);
        if (lastDate.toDateString() === today.toDateString()) {
          button.disabled = true;
          button.style.backgroundColor = '#cccccc'; // Grå ut knappen
        } else {
          button.disabled = false;
          button.style.backgroundColor = '#4CAF50'; // Normal grønn farge
        }
      }
    }

    function updateHaircutDisplay() {
      const lastDateStr = getStoredDate('lastClippedDate');
      const lastDate = lastDateStr ? new Date(lastDateStr) : null;
      const today = new Date();

      if (lastDate) {
        const days = daysBetween(lastDate, today);
        document.getElementById('lastClipped').innerText = `Sist klippet: ${formatDate(lastDate)} (${days} dager siden)`;
        document.getElementById('daysSince').innerText = ''; // Tøm denne

        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + 3);
        document.getElementById('nextHaircut').innerText = `Neste klipp bør være: ${formatDate(nextDate)}`;
      } else {
        document.getElementById('lastClipped').innerText = 'Ingen klipp registrert enda.';
        document.getElementById('daysSince').innerText = '';
        document.getElementById('nextHaircut').innerText = '';
      }
      
      updateButtonState('haircutButton', lastDateStr);
    }

    function updateBeardDisplay() {
      const lastDateStr = getStoredDate('lastBeardTrimDate');
      const lastDate = lastDateStr ? new Date(lastDateStr) : null;
      const today = new Date();

      if (lastDate) {
        const days = daysBetween(lastDate, today);
        document.getElementById('lastBeardTrim').innerText = `Sist skiftet: ${formatDate(lastDate)} (${days} dager siden)`;
        document.getElementById('daysSinceBeard').innerText = ''; // Tøm denne

        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + 3);
        document.getElementById('nextBeardTrim').innerText = `Neste skift bør være: ${formatDate(nextDate)}`;
      } else {
        document.getElementById('lastBeardTrim').innerText = 'Ingen dynetrekkskift registrert enda.';
        document.getElementById('daysSinceBeard').innerText = '';
        document.getElementById('nextBeardTrim').innerText = '';
      }
      
      updateButtonState('beardButton', lastDateStr);
    }

    function clipToday() {
      const today = new Date();
      setStoredDate('lastClippedDate', today.toISOString());
      updateHaircutDisplay();
    }

    function trimBeardToday() {
      const today = new Date();
      setStoredDate('lastBeardTrimDate', today.toISOString());
      updateBeardDisplay();
    }

    // Oppdater alt når siden lastes
    updateHaircutDisplay();
    updateBeardDisplay();
    updateStretchDisplay();


    function resetTracker() {
      localStorage.removeItem('lastClippedDate');
      localStorage.removeItem('lastBeardTrimDate');
        localStorage.removeItem('stretchStatus');
      
      // Oppdater visningen
      updateHaircutDisplay();
      updateBeardDisplay();
        updateStretchDisplay();
      
      // Aktiver knappene igjen manuelt
      const haircutButton = document.getElementById('haircutButton');
      haircutButton.disabled = false;
      haircutButton.style.backgroundColor = '#4CAF50';
      
      const beardButton = document.getElementById('beardButton');
      beardButton.disabled = false;
      beardButton.style.backgroundColor = '#4CAF50';
    }    

