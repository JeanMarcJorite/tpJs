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
                <h1>Favoris</h1>
            </section>
            <ul class="personnage">
            ${favorites.map(character => {
                        window[`removeFavorite${character.id}`] = async () => {
                            await FavoriteCharacter.removeFavorite(character.id);
                        };
                        return /*html*/`
                            <li>
                                <section class="container">
                                    <a href="#/character/${character.id}">
                                        <img src="${character.img}" alt="image de ${character.nom}" />
                                        <h3>${character.nom}</h3>
                                    </a>
                                </section>
                                <button onclick="removeFavorite${character.id}()">Supprimer des favoris</button>

                            </li>
                        `;
                    }).join('')}
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
}