export class Negotiation {

    constructor(
        private _date: Date, 
        public readonly quantity: number, 
        public readonly value: number
    ) {}

    public static CreateFrom(dateString: string, quantityString: string, valueString: string): Negotiation {
        const exp = /-/g;
        const date = new Date(dateString.replace(exp, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negotiation(date, quantity, value);
    }

    get date(): Date {
        const date = new Date(this._date.getTime());
        return date;
    }

    get volume(): number {
        return this.quantity * this.value;
    }
}
