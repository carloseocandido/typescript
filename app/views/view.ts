export abstract class View<T> {

    protected element: HTMLElement;
    private skip = false;

    constructor(selector: string, skip?: boolean) {
        this.element = document.querySelector(selector);
        if (skip) {
            this.skip = skip;
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        if (this.skip) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }

    protected abstract template(model: T): string;
}
