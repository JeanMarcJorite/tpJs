import Utils from "../services/utils.js";
import dbzProvider from "../services/dbzProvider.js";
import { FavoriteCharacter } from "../services/favorites.js";

export default class CharacterShow {
    async render () {
        let request = Utils.parseRequestURL() 
        let post = await dbzProvider.getCharacter(request.id)
        
        window.addFavorite = async () => {
            await FavoriteCharacter.addFavorite(post);
        }

        return /*html*/`
            <section class="section">
                <h1> Nom Personnage : ${post.nom}</h1>
                <p> Race : ${post.race} </p>
                <p> Puissance de combat : ${post.puissance} </p>
                <img src="${post.img}" alt="image de ${post.nom}">
                <button type="button" onclick="addFavorite()"> ajouter en favoris</button>
                <h2> Techniques : </h2>
                <ul>
                    ${post.techniques.map(technique => `<li>${technique}</li>`).join('')}
                </ul>
            </section>
            <p><a href="/">back to home</a></p>
        `
    }
}