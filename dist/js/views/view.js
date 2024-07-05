export class View {
    constructor(selector, skip) {
        this.skip = false;
        const element = document.querySelector(selector);
        if (element) {
            this.element = element;
        }
        else {
            throw Error(`Seletor ${selector} não existe no DO. Verifique.`);
        }
        if (skip) {
            this.skip = skip;
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.skip) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }
}
