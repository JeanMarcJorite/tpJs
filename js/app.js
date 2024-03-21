import CharacterAll from "./views/CharacterAll.js";
import Utils from "./services/utils.js";
import Home from "./views/Home.js";

const routes = {
    '/'                     : Home
    , '/characters'         : CharacterAll
};

const router = async () => {
    const content = null || document.querySelector('#content');
    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    console.log('router');
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);