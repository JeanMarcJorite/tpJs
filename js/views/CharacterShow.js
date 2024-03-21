import Utils from "../services/utils.js";
import dbzProvider from "../services/dbzProvider.js";

export default class CharacterShow {
    async render () {
        let request = Utils.parseRequestURL() 
        let post = await dbzProvider.getCharacter(request.id)
        
        return /*html*/`
            <section class="section">
                <h1> Nom Personnage : ${post.nom}</h1>
                <p> Race : ${post.race} </p>
                <p> Puissance de combat : ${post.puissance} </p>
                <img src="${post.img}" alt="image de ${post.nom}">
            </section>
            <p><a href="/">back to home</a></p>
        `
    }
}

