import { Negotiations } from "../models/negotiations.js";
import { Negotiation } from "../models/negotiation.js";
import { NegotiationsView } from "../views/negotiations-view.js";
import { MessageView } from "../views/mensage-view.js";
import { WeekDays } from "../enums/week-days.js";

export class NegotiationController {
    private inputDate: HTMLInputElement;
    private inputQuantity: HTMLInputElement;
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationsView('#negotiationsView');
    private messageView = new MessageView('#messageView');

    constructor() {
        this.inputDate = document.querySelector('#date');
        this.inputQuantity = document.querySelector('#quantity');
        this.inputValue = document.querySelector('#value');
        this.negotiationsView.update(this.negotiations);
    }

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
        const weekendDays = {
            [WeekDays.Saturday]: true,
            [WeekDays.Sunday]: true
        }
        return !(dayOfWeek in weekendDays);
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
