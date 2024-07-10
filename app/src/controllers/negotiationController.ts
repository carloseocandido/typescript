import { Negotiations } from "../models/negotiations.js";
import { Negotiation } from "../models/negotiation.js";
import { NegotiationsView } from "../views/negotiations-view.js";
import { MessageView } from "../views/mensage-view.js";
import { WeekDays } from "../enums/week-days.js";
import { executionTimeLogger } from "../decorators/executiontimelogger.js";
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegotiationsService } from "../services/negotiations-service.js";
import { print } from "../utils/print.js";

export class NegotiationController {
    @domInjector('#date')
    private inputDate: HTMLInputElement;
    @domInjector('#quantity')
    private inputQuantity: HTMLInputElement;
    @domInjector('#value')
    private inputValue: HTMLInputElement;
    private negotiations = new Negotiations();
    private negotiationsView = new NegotiationsView('#negotiationsView');
    private messageView = new MessageView('#messageView');
    private negotiationsService = new NegotiationsService();

    constructor() {
        this.negotiationsView.update(this.negotiations);
    }

    @inspect
    @executionTimeLogger()
    public add(): void {
        const negotiation = Negotiation.CreateFrom(
            this.inputDate.value,
            this.inputQuantity.value,
            this.inputValue.value
        );
        if (this.isWeekday(negotiation.date)) {
            this.negotiations.add(negotiation);
            print(negotiation, this.negotiations);
            this.clearForm();
            this.updateView();
        } else {
            this.messageView.update('Apenas negciações em dias úteis são aceitas');
        }
    }

    public async importData(): Promise<void> {
        try {
            const todayNegotiations = await this.negotiationsService.getTodayNegotiations();
    
            todayNegotiations
                .filter(todayNegotiation => {
                    return !this.negotiations
                        .list()
                        .some(negociation => negociation.isEqual(todayNegotiation));
                })
                .forEach(negotiation => {
                    this.negotiations.add(negotiation);
                });
    
            this.negotiationsView.update(this.negotiations);
        } catch (error) {
            console.error('Erro ao importar dados:', error);
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