import { Negotiation } from "../models/negotiation.js";
export class NegotiationsService {
    getTodayNegotiations() {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((data) => {
            return data.map((item) => {
                return new Negotiation(new Date(), item.vezes, item.montante);
            });
        });
    }
}
//# sourceMappingURL=negotiations-service.js.map