var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new MessageView('#messageView');
        this.negotiationsService = new NegotiationsService();
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.CreateFrom(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
        if (this.isWeekday(negotiation.date)) {
            this.negotiations.add(negotiation);
            print(negotiation, this.negotiations);
            this.clearForm();
            this.updateView();
        }
        else {
            this.messageView.update('Apenas negciações em dias úteis são aceitas');
        }
    }
    importData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todayNegotiations = yield this.negotiationsService.getTodayNegotiations();
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
            }
            catch (error) {
                console.error('Erro ao importar dados:', error);
            }
        });
    }
    isWeekday(date) {
        const dayOfWeek = date.getDay();
        return dayOfWeek !== WeekDays.Saturday && dayOfWeek !== WeekDays.Sunday;
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
__decorate([
    domInjector('#date')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#quantity')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInjector('#value')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect,
    executionTimeLogger()
], NegotiationController.prototype, "add", null);
//# sourceMappingURL=negotiationController.js.map