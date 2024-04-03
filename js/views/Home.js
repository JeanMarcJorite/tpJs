export default class Home{
    async render(){
        let view = /*html*/`
            <section class="section">
                <h1>Home</h1>
                <p> Bienvenue sur notre page</p>
            </section>
        `;
        return view;
    }
}