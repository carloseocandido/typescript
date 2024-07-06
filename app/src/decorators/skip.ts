export function skip(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const baseMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        let result = baseMethod.apply(this, args);
        if (typeof result === 'string') {
            console.log(`@skip em ação na classe ${this.constructor.name} para o método ${propertyKey}`);
            result = result.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return result;
    }
    return descriptor;
}