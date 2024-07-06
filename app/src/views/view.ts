import { ExecutionTimeLogger } from "../decorators/executiontimelogger.js";

export abstract class View<T> {

    protected element: HTMLElement;
    private skip = false;

    constructor(selector: string, skip?: boolean) {
        const element = document.querySelector(selector);
        if (element) {
            this.element = element as HTMLElement;
        } else {
            throw Error(`Seletor ${selector} não existe no DO. Verifique.`);
        }
        if (skip) {
            this.skip = skip;
        }
    }

    @ExecutionTimeLogger(true)
    public update(model: T): void {
        let template = this.template(model);
        if (this.skip) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }

    protected abstract template(model: T): string;
}
