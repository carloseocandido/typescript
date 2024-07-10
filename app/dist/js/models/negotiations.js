export class Negotiations {
    constructor() {
        this.negotiations = [];
    }
    add(negotiation) {
        this.negotiations.push(negotiation);
    }
    list() {
        return this.negotiations;
    }
    toText() {
        return JSON.stringify(this.negotiations, null, 2);
    }
    isEqual(negociations) {
        return JSON.stringify(this.negotiations) === JSON.stringify(negociations.list);
    }
}
//# sourceMappingURL=negotiations.js.map