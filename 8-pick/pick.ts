// Задача: написание функции, которая извлекает из объекта только заданные свойства.

function pickObjectKeys<T>(obj: T, keys: Array<keyof T> ) {
    const res  = {} as Record<keyof T, T[keyof T]>;
    for (const key of keys) {
        res[key] = obj[key];
    }
    return res;
}

const user = {
    name: 'Alice',
    age: 15,
    skills: ['typescript', 'javascript']
}

const res = pickObjectKeys(user, ['age', 'skills']);

console.log(res);

