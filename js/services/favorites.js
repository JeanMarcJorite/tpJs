import { ENDPOINT2 } from "../config.js";

export class FavoriteCharacter{

    static fetchFavorites = async () => {
        return localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    }

    static addFavorite = async (character) => {


        let favorites = await FavoriteCharacter.fetchFavorites();
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === character.id) {
                alert("Personnage déjà dans les favoris");
                return;
            }
        }

        favorites.push(character);
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }
    
    static removeFavorite = async (id) => {
        let favorites = await FavoriteCharacter.fetchFavorites();
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === id) {
                favorites.splice(i, 1);
            }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        location.reload();
    }

    
    static isFavorite = async (id) => {

        let favorites = await FavoriteCharacter.fetchFavorites();
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === id) {
                return true;
            }
        }
        return false;
    }

    static updateFavorite = async (character, id) =>{

        let favorites = await FavoriteCharacter.fetchFavorites();
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === id) {
                favorites[i] = character;
            }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
