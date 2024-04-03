import { ENDPOINT } from "../config.js";

export default class Notation {
    static updateNotation = async (notation, id) =>{
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notation)
        };
        try {
            const response = await fetch(`${ENDPOINT}/${id}`, options)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            return json
        } catch (err) {
            console.log('Error updating character level', err)
        }
    }

    static async augmenterNotation(post, request) {  
        if (post.note < 5) {
            post.note++;
            await this.updateNotation(post, request.id);
        } else {
            alert(`La note de ${post.nom} est déjà au maximum.`);
        }
    }

    static async diminuerNotation(post, request) {
        console.log("ici",request);
        console.log("ici",post);
        if (post.note > 0) {
            post.note--;
            await this.updateNotation(post, request.id);
        } else {
            alert(`La note de ${post.nom} est déjà au minimum.`);
        }
    }

    
}