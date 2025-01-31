// Цель задания: Написать функцию, которая меняет местами ключи и значения в переданном объекте.
//
// Требования к объекту:
//
// Имеет тип Record<string, unknown> (предполагаемый тип, где ключи - строки, а значения - числа), соответственно, все ключи должны быть строками, а значения - числами.
// Объект не должен содержать смешанные данные (например, строки в значениях ключей).
// Задача функции:
//
// Дан объект, например, { A: 1, B: 2 }.
// Функция должна возвращать объект, где ключи и значения поменяны местами, то есть для данного примера результат будет { 1: 'A', 2: 'B' }.


function swapKeysAndValues<K extends string, V extends string | number>(obj: Record<K, V>): Record<V, K> {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))
}

/* Вариант 2 */

// function swapKeysAndValues<K extends string, V extends string | number>(obj: Record<K, V>): Record<V, K> {
//     const swappedObj = {} as Record<V, K>;
//
//     for (const key in obj) {
//         swappedObj[obj[key]] = key;
//     }
//
//     return swappedObj;
// }

/* Вариант 3 */

// function swapKeysAndValues<K extends string, V extends string | number>(obj: Record<K, V>): Record<V, K> {
//     const swappedObj = {} as Record<V, K>;
//
//     for (const [key, value] of Object.entries(obj) as [K, V][]) {
//         swappedObj[value] = key;
//     }
//     return swappedObj
// }

/* Вариант 4, где key является number, как это выглядит в задании { 1: 'A', 2: 'B' } */

// function swapKeysAndValues<T extends Record<string, number>>(obj: T): Map<number, string> {
//     const swappedObj  = new Map<number, string>();
//
//     for (const [key, value] of Object.entries(obj)) {
//         swappedObj.set(value, key);
//     }
//     return swappedObj;
// }

const obj: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    f: 4
}

const res = swapKeysAndValues(obj);
console.log(res);

