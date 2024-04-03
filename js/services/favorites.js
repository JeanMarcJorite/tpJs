export class FavoriteCharacter{
    static fetchFavorites = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch('http://localhost:3001/favorites', options)
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static getFavorite = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch('http://localhost:3001/favorites/')
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }

    static addFavorite = async (character) => {

        let favorites = await FavoriteCharacter.fetchFavorites();

        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === character.id) {
                console.log("Personnage déjà dans les favoris");
                return;
            }
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        };
        try {
            const response = await fetch('http://localhost:3001/favorites', options)
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error adding favorite', err)
        }
    }
    
    static removeFavorite = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            console.log("test removeFavorite")
            const response = await fetch('http://localhost:3001/favorites/' + id, options)
            window.location.reload();
            return response.ok; 
            
        } catch (err) {
            console.log('Error removing favorite', err)
        }
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
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        };
        try {
            const response = await fetch('http://localhost:3001/favorites/' + id, options)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error updating favorite', err)
        }
    }
}