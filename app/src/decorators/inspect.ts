export function inspect(target: any,  propertyKey: string, descriptor: PropertyDescriptor) {
    const baseMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`--- Método ${propertyKey}`);
        console.log(`------ parêmetros ${JSON.stringify(args)}`);
        const result = baseMethod.apply(this, args);
        console.log(`------ retorno: ${JSON.stringify(result)}`);
        return result
    }

    return descriptor;
}