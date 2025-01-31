interface UserResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

enum UserApiError {
    NetworkError = 'Network Error',
    ResponseError = 'Response Error',
    UnknownError = 'Unknown Error'
}
enum UserGender {
    Male = 'male',
    Female = 'female'
}

interface Hair {
    color: string;
    type: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: UserGender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

async function getUsers(url: string, method: string = 'GET') {
    try {
        const response = await fetch(url, {
            method
        })
        if (!response.ok) {
            console.log(UserApiError.ResponseError)
            return;
        }
        const data: UserResponse =  await response.json();
        if (!data?.users) {
            console.log(UserApiError.ResponseError)
            return;
        }
        data.users.forEach((user: User) => {
            console.log(`ID: ${user.id}, Name: ${user.firstName} ${user.lastName} role: ${user.role}`)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(UserApiError.NetworkError)
        } else {
            console.log(UserApiError.UnknownError)
        }
    }
}

getUsers('https://dummyjson.com/users');
