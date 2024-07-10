export function inspect(target, propertyKey, descriptor) {
    const baseMethod = descriptor.value;
    descriptor.value = function (...args) {
        const result = baseMethod.apply(this, args);
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=inspect.js.map