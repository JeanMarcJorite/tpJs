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
}