export function ExecutionTimeLogger() {
    return function(taget: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const baseMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const startTime  = performance.now();
            const result = baseMethod.apply(this, args);
            const endTime = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(endTime - startTime )/1000} segundos.`)
            result;
        };

        return descriptor;
    }
}