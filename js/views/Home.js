import CharacterProvider from "../services/dbzProvider.js";
export default class Home {
    
    constructor() {
        window.search = this.search.bind(this);
        localStorage.setItem('favoris', {});
        localStorage.setItem('favoris', JSON.stringify({test: 'test'}));
        console.log("test", JSON.parse(localStorage.getItem('favoris')));
    }

    async search() {
        let searchTerm = document.getElementById('search-input').value;
        console.log("searchTerm", searchTerm)
        const resultsContainer = document.getElementById('results');
        if (searchTerm.length === 0) {
            resultsContainer.innerHTML = ''; 
            localStorage.removeItem('searchResults'); 
            localStorage.removeItem('searchTerm');
            return;
        }
        if (searchTerm.length >= 1) { 
            let characters = await CharacterProvider.searchCharacters(searchTerm);
            localStorage.setItem('searchResults', JSON.stringify(characters)); 
            localStorage.setItem('searchTerm', searchTerm);
            this.displayCharacters(characters); 
        }
    }
    
    displayCharacters(characters) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; 
        characters.forEach(character => {

            const listeElement = document.createElement('li');
            resultsContainer.appendChild(listeElement);

            const sectionElement = document.createElement('section');
            sectionElement.classList.add('container');
            listeElement.appendChild(sectionElement);
            
            const characterLink = document.createElement('a');
            characterLink.href = `#/character/${character.id}`;
            sectionElement.appendChild(characterLink);
        
            const imgElement = document.createElement('img');
            imgElement.src = character.img;
            imgElement.alt = `image de ${character.nom}`;
            characterLink.appendChild(imgElement);


            const h3Element = document.createElement('h3');
            h3Element.textContent = character.nom;

            characterLink.appendChild(h3Element);

            resultsContainer.appendChild(listeElement);
        });
    }
    
    async render(){
        let view = /*html*/`
            <section class="section">
                <h1>Home</h1>
                <p> Bienvenue sur notre page</p>
            </section>
            <div class="search-bar">
            <input type="text" id="search-input" placeholder="Rechercher..." oninput="search()">
            </div>
            <ul class="personnage" id="results">

            </ul>
            

            <style>
                .personnage {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .personnage h3 {
                    text-align: center;
                }
                .personnage li {
                    list-style: none;
                    margin: 10px;
                }
                .personnage img {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                }
                .personnage img:hover {
                    transform: scale(1.1);
                    transition: transform 0.5s;
                    border: 2px solid black;
                }
            </style>
            
        `;
        return view;
    }


    async afterRender() {
        document.getElementById('search-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                this.search();
            }
        }.bind(this));
    
        const searchResults = localStorage.getItem('searchResults');
        if (searchResults) {
            this.displayCharacters(JSON.parse(searchResults));
        }
        
        const searchTerm = localStorage.getItem('searchTerm');
        if (searchTerm) {
            document.getElementById('search-input').value = searchTerm;
        }
    }

}