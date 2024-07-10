export function skip(target, propertyKey, descriptor) {
    const baseMethod = descriptor.value;
    descriptor.value = function (...args) {
        let result = baseMethod.apply(this, args);
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=skip.js.map