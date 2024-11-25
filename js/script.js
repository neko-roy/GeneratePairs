document.getElementById('generate').addEventListener('click', () => {
    const namesInput = document.getElementById('names').value.trim();
    const resultDiv = document.getElementById('result');
    const slotsContainer = document.querySelector('.slot-div');
    resultDiv.innerHTML = ''; // Clear previous results
    slotsContainer.innerHTML = ''; // Clear previous slots

    const names = namesInput.split('\n').map(name => name.trim()).filter(name => name);

    if (names.length < 2) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter at least two names.</p>';
        return;
    }

    // Shuffle names array
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    const pairs = [];
    for (let i = 0; i < names.length; i += 2) {
        if (i + 1 < names.length) {
            pairs.push([names[i], names[i + 1]]);
        } else {
            pairs.push([names[i], null]); // Handle odd numbers
        }
    }

    // Dynamically create slot elements for each pair
    pairs.forEach((pair, index) => {
        const pairContainer = document.createElement('div');
        pairContainer.className = 'slot-container';

        const slot1 = document.createElement('div');
        slot1.className = 'slot';
        slot1.id = `slot${index * 2}`;
        slot1.textContent = '?';

        const slot2 = document.createElement('div');
        slot2.className = 'slot';
        slot2.id = `slot${index * 2 + 1}`;
        slot2.textContent = '?';

        pairContainer.appendChild(slot1);
        pairContainer.appendChild(slot2);
        slotsContainer.appendChild(pairContainer);
    });

    // Start animation for all slots
    pairs.forEach((pair, index) => {
        const slot1 = document.getElementById(`slot${index * 2}`);
        const slot2 = document.getElementById(`slot${index * 2 + 1}`);
        let counter = 0;

        // Start slot animation
        const interval = setInterval(() => {
            slot1.textContent = names[Math.floor(Math.random() * names.length)];
            slot2.textContent = names[Math.floor(Math.random() * names.length)];
            counter++;
        }, 100);

        // Stop animation and display the result
        setTimeout(() => {
            clearInterval(interval);
            slot1.textContent = pair[0];
            slot2.textContent = pair[1] || 'No pair';
        }, 2000); // Animation duration
    });
});
