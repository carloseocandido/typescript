import { Negotiations } from "../models/negotiations.js";
import { Negotiation } from "../models/negotiation.js";
import { NegotiationsView } from "../views/negotiations-view.js";
import { MessageView } from "../views/mensage-view.js";
import { WeekDays } from "../enums/week-days.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new MessageView('#messageView');
        this.inputDate = document.querySelector('#date');
        this.inputQuantity = document.querySelector('#quantity');
        this.inputValue = document.querySelector('#value');
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.CreateFrom(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (this.isWeekday(negotiation.date)) {
            this.negotiations.add(negotiation);
            this.clearForm();
            this.updateView();
        }
        else {
            this.messageView.update('Apenas negciações em dias úteis são aceitas');
        }
    }
    isWeekday(date) {
        const dayOfWeek = date.getDay();
        const weekendDays = {
            [WeekDays.Saturday]: true,
            [WeekDays.Sunday]: true
        };
        return !(dayOfWeek in weekendDays);
    }
    clearForm() {
        this.inputDate.value = '';
        this.inputQuantity.value = '';
        this.inputValue.value = '';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negociação adicionada com sucesso');
    }
}
