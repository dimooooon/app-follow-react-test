import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:1337'; // change it to env vars if time permits %REACT_APP_API_URL%

export abstract class BaseDataService {
    protected abstract readonly controllerName: string;

    protected readonly get = this.wrapper(axios.get);
    protected readonly put = this.wrapper(axios.put);
    protected readonly post = this.wrapper(axios.post);
    protected readonly delete = this.wrapper(axios.delete);

    private wrapper(method: any) {
        return (action?: string, ...params: any[]) => {
            const relativePath = `/${this.controllerName || ''}/${action || ''}`.replace(/\/\/+/g, '/');
            const url = `${SERVER_URL}${relativePath}`.replace(/\/$/, '');

            return method(url, ...params)
                .then((response: any) => {
                    // if (response.data.success !== true) {
                    //     console.log("ERROR: ", response);
                    // }

                    //debugger;

                    return response.data;
                })
                .catch((context: any) => {
                    console.log("ERROR: ", context.response);
                    return context.response.data;
                });
        };
    }
}
