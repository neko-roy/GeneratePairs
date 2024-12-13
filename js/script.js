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

    //pairsに[ペア１],[ペア2],[ペア3]みたいに入れている
    const pairs = [];
    for (let i = 0; i < names.length; i += 2) {
        console.log(i);
        if (i + 2 === names.length - 1) {
            // 奇数人数の場合、最後の3人組を作成
            pairs.push([names[i], names[i + 1], names[i + 2]]);
            break;
        } else if (i + 1 < names.length) {
            pairs.push([names[i], names[i + 1]]);
        } else {
            pairs.push([names[i], null]); // Handle remaining single person
        }
    }
    console.log("names12の値:" , names[12]);
    console.log("Pairs 配列:", pairs);
console.log("Pairs の要素数:", pairs.length);


    // Dynamically create slot elements for each pair
    pairs.forEach((pair, index) => {

    let slotsContainer;

    // 新しいコンテナを作成する条件
    if (index % 4 === 0) {
        slotsContainer = document.createElement('div');
        slotsContainer.className = 'slots-container'; // CSS用クラス名
        resultDiv.appendChild(slotsContainer); // 新しいコンテナを結果エリアに追加
    } else {
        // 直前のslotsContainerを再利用
        slotsContainer = resultDiv.lastChild;
    }
        
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

        if (pairs[Math.floor((names.length / 2) - 1 )] && slot2.id === `slot${(names.length) - 2}`) {
            // 3人目がいる場合は追加
            const slot3 = document.createElement('div');
            slot3.className = 'slot';
            slot3.id = `slot${index * 2 + 2}`;
            slot3.textContent = '?';
            pairContainer.appendChild(slot3);
        }

        slotsContainer.appendChild(pairContainer);
        
    });

    // Start animation for all slots
    pairs.forEach((pair, index) => {
        const slot1 = document.getElementById(`slot${index * 2}`);
        const slot2 = document.getElementById(`slot${index * 2 + 1}`);
        let slot3 = null;
        if (slot2.id === `slot${names.length - 2}`) { //修正
            slot3 = document.getElementById(`slot${(names.length - 1)}`);
        }
        let counter = 0;

        // Start slot animation
        const interval = setInterval(() => {
            slot1.textContent = names[Math.floor(Math.random() * (names.length))];
            slot2.textContent = names[Math.floor(Math.random() * (names.length))];
            if (slot3) {
                slot3.textContent = names[Math.floor(Math.random() * names.length)];
            }
            counter++;
        }, 100);

        // Stop animation and display the result
        setTimeout(() => {
            clearInterval(interval);
            slot1.textContent = pair[0];
            slot2.innerHTML = pair[1]; //|| '最後尾の3人は【3人1組】！'
            if (slot3) {
                slot3.textContent = pair[2]; //★ここが2じゃなくてnames.length - 1になってたから白表示になった
            }
        }, 4000); // Animation duration
    });
});
