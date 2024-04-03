import { TechniquesProvider } from '../services/TechniquesProvider.js';
import Utils from '../services/utils.js';


export default class TechniquesShow {
    async render() {
        let request = Utils.parseRequestURL();
        let personnages = await TechniquesProvider.getPersonnageTechniques(request.id);

        if (!personnages) {
            return `<div>No techniques found</div>`;
        }
        let view = /*html*/`
            <section class="section">
                <h1>${request.id.toUpperCase().replace(/%20/g, ' ')}</h1>

            </section>
            <ul class="personnage">
            ${personnages.map(character => {
                return /*html*/`
                    <li>
                        <section class="container">
                            <a href="#/character/${character.id}">
                                <img src="${character.img}" alt="image de ${character.nom}" />
                                <h3>${character.nom}</h3>
                            </a>
                        </section>
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