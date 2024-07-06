import { Negotiations } from "../models/negotiations.js";
import { Negotiation } from "../models/negotiation.js";
import { NegotiationsView } from "../views/negotiations-view.js";
import { MessageView } from "../views/mensage-view.js";
import { WeekDays } from "../enums/week-days.js";
import { executionTimeLogger } from "../decorators/executiontimelogger.js";

export class NegotiationController {
    private inputDate: HTMLInputElement;
    private inputQuantity: HTMLInputElement;
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationsView('#negotiationsView');
    private messageView = new MessageView('#messageView');

    constructor() {
        this.inputDate = document.querySelector('#date') as HTMLInputElement;
        this.inputQuantity = document.querySelector('#quantity') as HTMLInputElement;
        this.inputValue = document.querySelector('#value') as HTMLInputElement;
        this.negotiationsView.update(this.negotiations);
    }

    @executionTimeLogger()
    public add(): void {
        const negotiation = Negotiation.CreateFrom(
            this.inputDate.value,
            this.inputQuantity.value,
            this.inputValue.value
        );
        if (this.isWeekday(negotiation.date)) {
            this.negotiations.add(negotiation);
            this.clearForm();
            this.updateView();
        } else {
            this.messageView.update('Apenas negciações em dias úteis são aceitas');
        }
    }

    private isWeekday(date: Date): boolean {
        const dayOfWeek = date.getDay();
        return dayOfWeek !== WeekDays.Saturday && dayOfWeek !== WeekDays.Sunday;
    }

    private clearForm(): void {
        this.inputDate.value = '';
        this.inputQuantity.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }

    private updateView(): void {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negociação adicionada com sucesso');
    }
}
