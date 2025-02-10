function AllowFunc<T>(validate: (value: T) => boolean) {
    return (
        target: Object,
        propertyKey: string | symbol
    ) => {
        let value: T;

        const setter = function (newValue: T) {
            if (validate(newValue)) {
                value = newValue;
            } else {
                console.log(`${newValue}: недопустимое значение`)
            }
        }

        const getter = function () {
            return value;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}

class User {
    @AllowFunc((a: number) => a > 0)
    age: number = 30;
}

const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20


