import { Negotiation } from "./negotiation";

export class Negotiations {
    private negotiations: Negotiation[] = [];

    public add(negotiation: Negotiation) {
        this.negotiations.push(negotiation);
    }

    public list(): readonly Negotiation[] {
        return this.negotiations;
    }
}
