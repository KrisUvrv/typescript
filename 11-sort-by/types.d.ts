// https://www.npmjs.com/package/sort-by
//
// Необходимо добавить типизацию для sort-by

declare module 'sort-by' {
    export function sortBy<T>(...args: string[]): (a: T, b: T) => number;
}
