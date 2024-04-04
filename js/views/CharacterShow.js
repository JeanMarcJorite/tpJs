import Utils from "../services/utils.js";
import dbzProvider from "../services/dbzProvider.js";
import { FavoriteCharacter } from "../services/favorites.js";
import Niveau from "../services/niveau.js";
import Notation from "../services/notation.js"; 

export default class CharacterShow {
    async render () {
        let request = Utils.parseRequestURL() 
        let post = await dbzProvider.getCharacter(request.id)
               

        return /*html*/`
            <section class="section">
                
                <h1>${post.nom}</h1>
                <p> Race : ${post.race} </p>
                <p> Puissance de combat : ${post.puissance} </p>
                <img src="${post.img}" alt="image de ${post.nom}">
                <p id="note" > Note : ${post.note}/5 </p>
                <p> Côté : ${post.alignement} </p>
                <h2> Techniques : </h2>
                <ul>
                    ${post.techniques.map(technique => `<li>${technique}</li>`).join('')}
                </ul>

                <section class="allbtn" >
                <button type="button" class="star-button " onclick="addFavorite()"> Ajouter en favoris</button>
                <button type="button" onclick="augmenterNiveau().catch(console.error)">Augmenter le niveau</button>
                <button type="button" onclick="diminuerNiveau().catch(console.error)">Diminuer le niveau</button>
                <button type="button" onclick="augmenterNotation().catch(console.error)">Note +</button>
                <button type="button" onclick="diminuerNotation().catch(console.error)">Note -</button>
                </section>
            </section>
            
            
            <style>
                .star-button {
                    background-color: #f1c40f;
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                }
                .star-button:hover {
                    background-color: #f39c12;
                }
                .star-button:active {
                    background-color: #f1c40f;
                }
                .section img {
                    width: 200px;
                    height: 200px;
                    object-fit: cover;
                }

                .section {
                    margin: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                #allbtn {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
            </style>
        `
    }

    async after_render() {
        window.addFavorite = async () => {
            await FavoriteCharacter.addFavorite(post);
        }

        window.augmenterNiveau = async () => {  
            await Niveau.augmenterNiveau(post, request);
            if (await FavoriteCharacter.isFavorite(request.id)) {
                await FavoriteCharacter.updateFavorite(post, request.id);
            }
            updateDisplay(post);
        }
                
        window.diminuerNiveau = async () => {
            await Niveau.diminuerNiveau(post, request);
            if (await FavoriteCharacter.isFavorite(request.id)) {
                await FavoriteCharacter.updateFavorite(post, request.id);
            }
            updateDisplay(post);
        }

        window.augmenterNotation = async () => {
            await Notation.augmenterNotation(post, request);
            updateDisplay(post);
        }

        window.diminuerNotation = async () => {
            await Notation.diminuerNotation(post, request);
            updateDisplay(post);
        }

        function updateDisplay(post) {
            document.querySelector('.section h1').textContent = `${post.nom}`;
            document.querySelector('.section p:nth-child(2)').textContent = `Race : ${post.race}`;
            document.querySelector('.section p:nth-child(3)').textContent = `Puissance de combat : ${post.puissance}`;
            document.querySelector('.section img').src = post.img;
            document.querySelector('.section img').alt = `image de ${post.nom}`;
            document.querySelector('#note').textContent = `Note : ${post.note}/5`;
            document.querySelector('.section ul').innerHTML = post.techniques.map(technique => `<li>${technique}</li>`).join('');

        }

    }
    
}
