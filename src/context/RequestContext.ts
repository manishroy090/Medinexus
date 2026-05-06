import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<any>();

export const RequestContext = {
    run: (req: any, fn: any) => {
        asyncLocalStorage.run(req, fn);
    },
    get: () => {
        return asyncLocalStorage.getStore();
    }
};