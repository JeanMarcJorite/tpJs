import CharacterProvider from "../services/dbzProvider.js";
export default class Home {
  constructor() {
    window.search = this.search.bind(this);
    localStorage.setItem("favoris", {});
    localStorage.setItem("favoris", JSON.stringify({ test: "test" }));
    console.log("test", JSON.parse(localStorage.getItem("favoris")));
  }

  async search() {
    let searchTerm = document.getElementById("search-input").value;
    console.log("searchTerm", searchTerm);
    const resultsContainer = document.getElementById("results");
    if (searchTerm.length === 0) {
      resultsContainer.innerHTML = "";
      localStorage.removeItem("searchResults");
      localStorage.removeItem("searchTerm");
      return;
    }
    if (searchTerm.length >= 1) {
      let characters = await CharacterProvider.searchCharacters(searchTerm);
      localStorage.setItem("searchResults", JSON.stringify(characters));
      localStorage.setItem("searchTerm", searchTerm);
      this.displayCharacters(characters);
    }
  }

  displayCharacters(characters) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    characters.forEach((character) => {
      const listeElement = document.createElement("li");
      resultsContainer.appendChild(listeElement);

      const sectionElement = document.createElement("section");
      sectionElement.classList.add("container");
      listeElement.appendChild(sectionElement);

      const characterLink = document.createElement("a");
      characterLink.href = `#/character/${character.id}`;
      sectionElement.appendChild(characterLink);

      const imgElement = document.createElement("img");
      imgElement.src = character.img;
      imgElement.alt = `image de ${character.nom}`;
      characterLink.appendChild(imgElement);

      const h3Element = document.createElement("h3");
      h3Element.textContent = character.nom;

      characterLink.appendChild(h3Element);

      resultsContainer.appendChild(listeElement);
    });
  }

  async render() {
    let view = /*html*/ `
            <section class="section">
                <h1>Bienvenue sur notre page</h1>
                <p>Retrouvez ici tous les personnages de Dragon Ball Z, leurs techniques et les articles sur l'univers de DBZ.</p>
            </section>
            <div class="search-bar">
            <input type="text" id="search-input" placeholder="Rechercher un personnage" oninput="search()">
            </div>
            <ul class="personnage" id="results">

            </ul>
            <h2>Articles sur DBZ</h2>
        <div class="article">
            <h3>Les puissants guerriers de Dragon Ball Z</h3>
            <p>Dans l'univers de Dragon Ball Z, les guerriers Z sont connus pour leurs incroyables pouvoirs et leurs combats épiques. De Goku à Vegeta en passant par Gohan, chacun possède des techniques uniques et des transformations impressionnantes.</p>
        </div>
        <div class="article">
            <h3>Les batailles légendaires de Dragon Ball Z</h3>
            <p>Dragon Ball Z est célèbre pour ses combats épiques entre les guerriers Z et de redoutables ennemis. Des affrontements contre des ennemis comme Freezer, Cell et Majin Buu restent gravés dans la mémoire des fans, marquant des moments cruciaux de l'histoire.</p>
        </div>
        <div class="article">
            <h3>Les mystères des Dragon Balls dans Dragon Ball Z</h3>
            <p>Les Dragon Balls sont des artefacts magiques centraux dans l'univers de Dragon Ball Z. Leur pouvoir de réaliser n'importe quel vœu a conduit nos héros à travers des quêtes palpitantes à la recherche de ces sphères sacrées, tout en affrontant des adversaires redoutables et en découvrant les secrets de leur histoire.</p>
        </div>
            

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

                
.section {
    background-color: #f0f0f0;
    padding: 20px;
    margin-bottom: 20px;
}

.section h1 {
    font-size: 24px;
    color: #333;
}

.section p {
    color: #666;
}

/* Style de la barre de recherche */
.search-bar {
    margin-bottom: 20px;
    position: relative;
    text-align: center; /* Centrer le contenu */
}

.search-bar input[type="text"] {
    width: 70%; /* Réduire la largeur du champ de texte */
    max-width: 300px; /* Largeur maximale du champ de texte */
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box; /* Pour inclure le padding dans la largeur */
    display: inline-block; /* Afficher le champ de texte en ligne */
}

.search-bar input[type="text"]:focus {
    outline: none;
    border-color: #66afe9; /* Couleur de la bordure lorsque la barre de recherche est active */
}


.search-bar::after {
    content: "\f002"; /* Code Unicode pour une icône de loupe */
    font-family: FontAwesome; /* Utilisation de la police FontAwesome pour les icônes */
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #666;
}



.personnage {
    list-style-type: none;
    padding: 0;
}

.article {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
}

.article h3 {
    font-size: 20px;
    color: #333;
}

.article p {
    color: #666;
}


                

            </style>
            
        `;
    return view;
  }

  async afterRender() {
    document.getElementById("search-input").addEventListener(
      "keypress",
      function (e) {
        if (e.key === "Enter") {
          this.search();
        }
      }.bind(this)
    );

    const searchResults = localStorage.getItem("searchResults");
    if (searchResults) {
      this.displayCharacters(JSON.parse(searchResults));
    }

    const searchTerm = localStorage.getItem("searchTerm");
    if (searchTerm) {
      document.getElementById("search-input").value = searchTerm;
    }
  }
}
