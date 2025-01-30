// Необходимо написать функцию, которая удаляет все ключи из первого объекта, которые есть во втором объекте.
// Рассмотрение использования служебных типов, таких как Exclude и Pick, для извлечения правильных частей объекта А, которые отсутствуют в объекте B.

type Difference<T, P> = Pick<T, Exclude<keyof T, keyof P>>

function difference<T, P extends object>(obj1: T, obj2: P): Difference<T, P> {
    const result: Partial<T> = {};

    for (const key in obj1) {
        if (!(key in obj2)) {
            result[key] = obj1[key];
        }
    }
    return result as Difference<T, P>;
}

interface IA {
    a: number;
    b: string;
}

interface IB {
    a: number;
    c: boolean;
}

let a: IA = {a: 5, b: ''};
let b: IB = {a: 10, c: true};

let v0 = difference(a, b);
console.log(v0); // { b: '' }
