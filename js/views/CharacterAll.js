import CharacterProvider from "../services/dbzProvider.js";

export default class CharacterAll {
    async render() {
        let characters = await CharacterProvider.fetchCharacters();
        console.log(characters);
        let view = /*html*/`
            <section class="section">
                <h1>Characters</h1>
                <ul class="personnage">
                    ${characters.map(character =>/*html*/`
                        <li>
                            <section class="container">
                            <a href="#/character/${character.id}">
                            <img src="${character.img}" alt="image de ${character.nom}" >
                            <h3>${character.nom}</h3>
                            </a>
                            </section>
                        </li>
                    `).join('')}
                </ul>
            </section>

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