import { FavoriteCharacter } from "../services/favorites.js";

export default class FavoritesShow {

    async render() {
        let favorites = await FavoriteCharacter.fetchFavorites();
        console.log(favorites);
        let post = await FavoriteCharacter.getFavorite(favorites.id)

        window.removeFavorite = async () => {
            await FavoriteCharacter.removeFavorite(post);
        }
        if (!favorites) {
            return `<div>No favorites found</div>`;
        }
        let view = /*html*/`
            <section class="section">
                <h1>Favorites</h1>
                <p> Welcome to our Favorites</p>
            </section>
            <ul>
            ${favorites.map(character =>`
                <li>
                 <section class="container">
                 <h1> Nom Personnage : ${character.nom}</h1>
                 <button type="button" onclick="removeFavorite">Supprimer des favoris</section> 
                 </section>
                </li>
                `
                )}


        `;
        return view;
    }
}