import CharacterProvider from "../services/dbzProvider.js";

export default class CharacterAll {
    async render() {
        let characters = await CharacterProvider.fetchCharacters();
        console.log(characters);
        let view = /*html*/`
            <section class="section">
                <h1>Characters</h1>
                <ul>
                    ${characters.map(character =>/*html*/`
                        
                        <li>
                            <section class="container">
                            <img src="${character.img}" alt="image de ${character.nom}">
                            <a href="#/character/${character.id}">${character.nom}</a>
                            </section>
                        </li>
                    `).join('')}
                </ul>
            </section>
        `;
        return view;
    }
}