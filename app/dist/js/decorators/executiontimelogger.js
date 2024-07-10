export function executionTimeLogger(isSeconds = false) {
    return function (taget, propertyKey, descriptor) {
        const baseMethod = descriptor.value;
        descriptor.value = function (...args) {
            let divider = 1;
            let kindUnit = 'milissegundos';
            if (isSeconds) {
                divider = 1000;
                kindUnit = 'segundos';
            }
            const startTime = performance.now();
            const result = baseMethod.apply(this, args);
            const endTime = performance.now();
            result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=executiontimelogger.js.map