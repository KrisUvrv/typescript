class MyMap {
    private buckets: [string, any][][];
    protected size: number;

    constructor(size: number = 100) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }

    private hash(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    private findKey(bucket: [string, any][], key: string): number {
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return i;
            }
        }
        return -1;
    }

    add(key: string, value: any): void {
        const index: number = this.hash(key);
        const bucket: [string, any][] = this.buckets[index];

        const foundIndex = this.findKey(bucket, key);

        if (foundIndex !== -1) {
            bucket[foundIndex][1] = value;
        } else {
            bucket.push([key, value]);
        }
    }

    delete(key: string): void {
        const index: number = this.hash(key);
        const bucket: [string, any][] = this.buckets[index];
        const foundIndex = this.findKey(bucket, key);

        if (foundIndex !== -1) {
            bucket.splice(foundIndex, 1);
        }

    }

    get(key: string): any | undefined {
        const index: number = this.hash(key);
        const bucket: [string, any][] = this.buckets[index];

        const foundIndex = this.findKey(bucket, key);
        return foundIndex !== -1 ? bucket[foundIndex][1] : undefined;
    }

    clear(): void {
        this.buckets = new Array(this.size).fill(null).map(() => []);
    }
}

let weatherMap = new MyMap();
weatherMap.add('London', 20);
weatherMap.add('Berlin', 25);
console.log(weatherMap.get('London')); // Выведет 20
console.log(weatherMap.get('Berlin')); //
weatherMap.delete('London'); //
console.log(weatherMap.get('London')); //
weatherMap.add('London', 20);
weatherMap.add('Berlin', 25);
weatherMap.add('Paris', 27);
console.log(weatherMap);
console.log(weatherMap.get('Paris'));
console.log(weatherMap.get('Kazan'));
weatherMap.clear();
console.log(weatherMap);

















