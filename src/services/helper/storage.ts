export default class Storage {
    private key?: string | null;
    private obj?: any | null;

    constructor(key?: string | null, obj?: any | null) {
        this.key = key;
        this.obj = obj;

        if (key) {
            if (!localStorage.getItem(key)) {
                return this.decrypt(key!);
            }

            this.encrypt(key, obj);
        }
    }

    encrypt(key: string, obj: any) {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
        let stringObj = JSON.stringify(obj);
        localStorage.setItem(key, btoa(stringObj));
        return stringObj;
    }

    decrypt(key: string) {
        let encrypedValue = localStorage.getItem(key);
        if (encrypedValue) {
            let data = atob(encrypedValue);
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    exists(key: string) {
        return localStorage.getItem(key) ? true : false;
    }

    getDecryptPropValue(key: string, prop: string) {
        let encrypedValue = localStorage.getItem(key);
        if (encrypedValue) {
            let data = atob(encrypedValue);
            const obj = JSON.parse(data);
            return obj[prop];
        } else {
            return null;
        }
    }

    encryptPropValue(key: string, prop: string, value: string) {
        let encrypedValue = localStorage.getItem(key);
        if (encrypedValue) {
            let data = atob(encrypedValue);
            const obj = JSON.parse(data);
            const newObj = { ...obj, [prop]: value };
            const newObjString = btoa(JSON.stringify(newObj));
            localStorage.setItem(key, newObjString);
        } else {
            return null;
        }
    }
}