import { ENDPOINT } from "../config.js";

export default class Niveau {

    static updateCharacter = async (character, id) =>{
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
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

    static async augmenterNiveau(post, request) {  
        if (post.niveau < post.evolutions.length - 1) {
            post.niveau++;
            const evolution = post.evolutions[post.niveau];
            post.nom = evolution.nom;
            post.puissance = evolution.puissance;
            post.img = evolution.img;
            post.techniques = evolution.techniques;
            await this.updateCharacter(post, request.id);
        } else {
            console.log(`${post.nom} a atteint le niveau maximum.`);
        }
    }

    static async diminuerNiveau(post, request) {
        if (post.niveau > 0) {
            post.niveau--;
            const evolution = post.evolutions[post.niveau];
            post.nom = evolution.nom;
            post.puissance = evolution.puissance;
            post.img = evolution.img;
            post.techniques = evolution.techniques;
            await this.updateCharacter(post, request.id);
        } else {
            console.log(`${post.nom} est déjà au niveau minimum.`);
        }
    }

    
}