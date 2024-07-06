export function inspect(target, propertyKey, descriptor) {
    const baseMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Método ${propertyKey}`);
        console.log(`------ parêmetros ${JSON.stringify(args)}`);
        const result = baseMethod.apply(this, args);
        console.log(`------ retorno: ${JSON.stringify(result)}`);
        return result;
    };
    return descriptor;
}
