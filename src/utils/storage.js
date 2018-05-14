class Storage {
    constructor(type) {
        type && (this.global = type)
    }

    get(key) {
        try {
            return JSON.parse(this.global.getItem(key) || null)
        } catch (e) {
            return this.global.getItem(key)
        }
    }

    set(key, data) {
        this.global.setItem(key, JSON.stringify(data))
    }

    each(fn) {
        for (let i = this.global.length - 1; i >= 0; i--) {
            let key = this.global.key(i);
            fn(this.get(key), key);
        }
    }

    remove(key) {
        this.global.removeItem(key)
    }

    clearAll() {
        this.global.clear()
    }

}

export const local = new Storage(window.localStorage)
export const session = new Storage(window.sessionStorage)