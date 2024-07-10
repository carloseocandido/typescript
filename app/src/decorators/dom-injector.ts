export function domInjector(seletor: string) {
    return function(target: any, propertyKey: string) {
        // console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}`);
        let element: HTMLElement;
        const getter = function() {
            if (!element) {
                element = document.querySelector(seletor) as HTMLElement;
                // console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
            }
            return element;
        }

        Object.defineProperty(
            target, 
            propertyKey, 
            { get: getter }
        );
    }
}