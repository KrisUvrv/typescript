/* Домашнее задание - Структурные паттерны */

// Напишите Proxy, которая будет отправлять запросы через отдельный класс API
// на https://dummyjson.com/products/1 если id продукта меньше 10 и возвращать ошибку,
// если больше.

// @ts-ignore
type HttpMethod = 'POST' | 'GET';

// @ts-ignore
class RequestBuilder {
    private method: HttpMethod = 'GET';
    private body: any = null;
    private headers: HeadersInit = {};
    private url: string = '';

    setMethod(method: HttpMethod) {
        this.method = method;
        return this;
    }

    setBody(body: any) {
        this.body = body;
        return this;
    }

    setHeaders(headers: HeadersInit) {
        this.headers = {...this.headers, ...headers};
        return this;
    }

    setUrl(url: string) {
        this.url = url;
        return this;
    }

    async exec<T>(): Promise<T> {
        const options = {
            method: this.method,
            headers: this.headers,
            body: this.method === 'POST' ? JSON.stringify(this.body) : undefined
        };

        const response = await fetch(this.url, options);
        if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status)
        }
        return await response.json() as Promise<T>;
    }
}

interface IServiceAPI {
    fetchProduct(id: number): Promise<any>;
}

class ServiceAPI implements IServiceAPI {
    async fetchProduct(id: number): Promise<any> {
        return new RequestBuilder()
            .setUrl(`https://dummyjson.com/products/${id}`)
            .exec();
    }
}

class ProxyAPI implements IServiceAPI {
    constructor(private api: IServiceAPI) {
    }

    async fetchProduct(id: number): Promise<any> {
        if (id > 10) {
            throw new Error('Product ID must be 10 or less');
        }
        return this.api.fetchProduct(id);
    }
}

const proxy = new ProxyAPI(new ServiceAPI());

proxy.fetchProduct(6)
    .then(data => console.log(data))
    .catch(error => console.error(error));

proxy.fetchProduct(11)
    .then(data => console.log(data))
    .catch(error => console.error(error));
