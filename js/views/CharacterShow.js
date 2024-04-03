import Utils from "../services/utils.js";
import dbzProvider from "../services/dbzProvider.js";
import { FavoriteCharacter } from "../services/favorites.js";
import Niveau from "../services/niveau.js";

export default class CharacterShow {
    async render () {
        let request = Utils.parseRequestURL() 
        let post = await dbzProvider.getCharacter(request.id)
        
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
        
        function updateDisplay(post) {
            document.querySelector('.section h1').textContent = `Nom Personnage : ${post.nom}`;
            document.querySelector('.section p:nth-child(2)').textContent = `Race : ${post.race}`;
            document.querySelector('.section p:nth-child(3)').textContent = `Puissance de combat : ${post.puissance}`;
            document.querySelector('.section img').src = post.img;
            document.querySelector('.section img').alt = `image de ${post.nom}`;
            document.querySelector('.section ul').innerHTML = post.techniques.map(technique => `<li>${technique}</li>`).join('');
        }
        

        return /*html*/`
            <section class="section">
                <h1> Nom Personnage : ${post.nom}</h1>
                <p> Race : ${post.race} </p>
                <p> Puissance de combat : ${post.puissance} </p>
                <img src="${post.img}" alt="image de ${post.nom}">
                <h2> Techniques : </h2>
                <ul>
                    ${post.techniques.map(technique => `<li>${technique}</li>`).join('')}
                </ul>
                <button type="button" class="star-button " onclick="addFavorite()"> Ajouter en favoris</button>
                <button type="button" onclick="diminuerNiveau().catch(console.error)">Diminuer le niveau</button>
                <button type="button" onclick="augmenterNiveau().catch(console.error)">Augmenter le niveau</button>
            </section>
            <p><a href="/">back to home</a></p>             
        `
    }
    
}
