import { browser } from '$app/environment';

export class LocalStore<T> {
    value = $state<T>() as T;
    key = '';
    #firstTimeLoad = true;

    constructor(key: string, value: T) {
        this.key = key;
        this.value = value;


        if (browser) {
            const item = localStorage.getItem(key);
            if (item) {
                this.#firstTimeLoad = false;
                this.value = this.deserialize(item);
            }
        }

        $effect(() => {
            if (this.value == null) return;

            if (this.#firstTimeLoad) {
                this.#firstTimeLoad = false;
                return
            }

            localStorage.setItem(this.key, this.serialize(this.value));
        });
    }

    serialize(value: T): string {
        return JSON.stringify(value);
    }

    deserialize(item: string): T {
        return JSON.parse(item);
    }
}

export function localStore<T>(key: string, value: T) {
    return new LocalStore(key, value);
}
