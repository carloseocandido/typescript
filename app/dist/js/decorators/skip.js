export function skip(target, propertyKey, descriptor) {
    const baseMethod = descriptor.value;
    descriptor.value = function (...args) {
        let result = baseMethod.apply(this, args);
        if (typeof result === 'string') {
            console.log(`@skip em ação na classe ${this.constructor.name} para o método ${propertyKey}`);
            result = result.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return result;
    };
    return descriptor;
}
