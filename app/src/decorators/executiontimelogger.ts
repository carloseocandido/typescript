export function executionTimeLogger(isSeconds: boolean = false) {
    return function(taget: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const baseMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            let divider = 1;
            let kindUnit = 'milissegundos';
            if (isSeconds) {
                divider = 1000;
                kindUnit = 'segundos';
            }
            const startTime  = performance.now();
            const result = baseMethod.apply(this, args);
            const endTime = performance.now();
            // console.log(`${propertyKey}, tempo de execução: ${(endTime - startTime )/divider} ${kindUnit}.`)
            result;
        };

        return descriptor;
    }
}