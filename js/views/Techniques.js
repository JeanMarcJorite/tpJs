import { TechniquesProvider } from '../services/TechniquesProvider.js';

export default class Techniques {
    async render() {
        let techniques = await TechniquesProvider.fetchTechniques();

        if (!techniques) {
            return `<div>No techniques found</div>`;
        }
        let view = /*html*/`
            <section class="section">
                <h1>Techniques</h1>
            </section>
            <ul class="techniques
            ">

            ${techniques.map(technique => {
                return /*html*/`
                    <li>
                        <section class="container">
                            <a href="#/techniques/${technique}">
                                <button type="button" >${technique}</button>
                            </a>
                        </section>
                    </li>
                `;
            }).join('')}

            </ul>
            <style>
                .techniques {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .techniques p {
                    text-align: center;
                }
                .techniques li {
                    list-style: none;
                    margin: 10px;
                }
            </style>
        `;
        return view;
    }
}