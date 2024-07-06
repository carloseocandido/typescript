export function ExecutionTimeLogger() {
    return function (taget, propertyKey, descriptor) {
        const baseMethod = descriptor.value;
        descriptor.value = function (...args) {
            const startTime = performance.now();
            const result = baseMethod.apply(this, args);
            const endTime = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(endTime - startTime) / 1000} segundos.`);
            result;
        };
        return descriptor;
    };
}
