type HttpMethod = 'POST' | 'GET';

class RequestBuilder {
    private method: HttpMethod = 'GET';
    private body: any = null;
    private headers: HeadersInit = {};
    private url: string = '';
    setMethod(method: HttpMethod ) {
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


console.log(new RequestBuilder()
    .setMethod('POST')
    .setUrl('https://dummyjson.com/test')
    .setHeaders(
        {
            'Authentication': 'secret',
            'Content-Type': 'application/json'
        })
    .setBody({title: 'RequestBuilder', body: 'Homework'})
    .exec());
