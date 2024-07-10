import { TodayNegotiation } from "../intefaces/today-negociation.js";
import { Negotiation } from "../models/negotiation.js";

export class NegotiationsService {
    public getTodayNegotiations(): Promise<Negotiation[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((data: TodayNegotiation[]) => {
                return data.map((item) => {
                    return new Negotiation(new Date(), item.vezes, item.montante);
                })
            })
    }
}