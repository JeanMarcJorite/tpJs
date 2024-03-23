import CharacterAll from "./views/CharacterAll.js";
import Utils from "./services/utils.js";
import Home from "./views/Home.js";
import Error404 from "./views/Error404.js";
import CharacterShow from "./views/CharacterShow.js";
import FavoritesShow from "./views/favoritesShow.js";

const routes = {
    '/'                     : Home
    , '/characters'         : CharacterAll
    , '/character/:id'      : CharacterShow
    , '/favorites'           : FavoritesShow
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