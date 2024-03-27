import { FavoriteCharacter } from "../services/favorites.js";

export default class FavoritesShow {

    async render() {
        let favorites = await FavoriteCharacter.fetchFavorites();
        console.log(favorites);

        if (!favorites) {
            return `<div>No favorites found</div>`;
        }
        let view = /*html*/`
            <section class="section">
                <h1>Favorites</h1>

                </section>
            <ul>
            ${favorites.map(character => {
                window[`removeFavorite${character.id}`] = async () => {
                    await FavoriteCharacter.removeFavorite(character.id);
                }
                return /*html*/`
                <li>
                 <section class="container">
                 <h1> Nom Personnage : ${character.nom}</h1>
                 <button type="button" onclick="removeFavorite${character.id}()">Supprimer des favoris</section> 
                 </section>
                </li>
<<<<<<< HEAD
                `
                )}
=======
                `;
            })}
>>>>>>> 2c490446389010768c0708dec7cc01d69350f904
        `;
        return view;
    }
}