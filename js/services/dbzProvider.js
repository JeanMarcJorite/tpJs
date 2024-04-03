import { ENDPOINT } from "../config.js";

export default class CharacterProvider {
    static fetchCharacters = async () => {
        try {
            const rep = await fetch(ENDPOINT);
            if (!rep.ok) throw new Error('Erreur fetchCharacters');
            const data = await rep.text();
            try {
                const jsonData = JSON.parse(data);
                return jsonData;
            } catch {
                console.error('Invalid JSON response:', data);
                throw new Error('Invalid JSON response');
            }
        } catch (error) {
            console.error('Erreur fetchCharacters', error);
            throw error;
        }
    }


    static getCharacter = async (id) => {
        try {
            const rep = await fetch(`${ENDPOINT}/${id}`);
            if (!rep.ok) throw new Error('Erreur getCharacter');
            const data = await rep.text();
            try {
                return JSON.parse(data);
            } catch {
                throw new Error('Invalid JSON response');
            }
        } catch (error) {
            console.error('Erreur getCharacter', error);
            throw error;
        }
    }
}