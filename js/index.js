document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters(currentPage);
    const form = document.getElementById('monster-form');
    form.addEventListener('submit', createMonster);

    function createMonster(event){
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const description = document.getElementById('description').value;

        const newMonster = {
            name,
            age: parseFloat(age),
            description
        };

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(newMonster)
        })

        .then(response => response.json())
        .then(monster => {
            fetchMonsters(currentPage);
        })

        .catch(error => console.error('Error creating monster:', error))

       document.getElementById('monster-form').reset();
    }


    document.getElementById('forward').addEventListener('click', () => {
        fetchMonsters(currentPage + 1);
    });

    document.getElementById('back').addEventListener('click', () => {
       if(currentPage > 1){
        fetchMonsters(currentPage - 1 );
       }

    });


});

let currentPage = 1;

function fetchMonsters( page = 1){
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then( monsters => {
        const container = document.getElementById('monster-container');
        container.innerHTML = '';

        monsters.forEach(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.className = 'monster';
            monsterDiv.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        container.appendChild(monsterDiv);
        });

        currentPage = page;
    })
    .catch(error => console.error('error fetching monsters:', error));
}