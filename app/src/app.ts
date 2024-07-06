import { NegotiationController } from "./controllers/negotiationController.js"; 

const controller = new NegotiationController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.add();
    });
} else {
    throw Error('Não foi possível iniciar a aplicação, verifique se o form existe');
}
