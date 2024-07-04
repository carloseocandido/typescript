export class View {
    constructor(selector, skip) {
        this.skip = false;
        this.element = document.querySelector(selector);
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
