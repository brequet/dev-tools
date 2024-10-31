import { browser } from '$app/environment';

// const STORAGE_KEY = 'user_preferences';

export class LocalStore<T> {
    value = $state<T>() as T;
    key = '';

    constructor(key: string, value: T) {
        this.key = key;
        this.value = value;

        let firstTimeLoad = true;

        console.log('DEBUG loading from local', key, value)

        if (browser) {
            const item = localStorage.getItem(key);
            if (item) {
                this.value = this.deserialize(item);
            }
        }

        $effect(() => {
            if (firstTimeLoad) {
                firstTimeLoad = false;
                return;
            }
            console.log('DEBUG saving to local', key, this.value)
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
