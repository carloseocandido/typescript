import { View } from "./view.js";
export class NegociacoesView extends View {
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${model.lista().map(neogciacao => {
            return `
                        <tr>
                            <td>${new Intl.DateTimeFormat().format(neogciacao.data)}</td>
                            <td>${neogciacao.quantidade}</td>
                            <td>${neogciacao.valor}</td>
                        </tr>
                    `;
        }).join('')}
            </tbody>
        </table>
        `;
    }
}
