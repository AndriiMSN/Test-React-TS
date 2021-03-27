class LocalStorage {
    readonly counter: string = "60"

    setUserAndVerification(isUser: boolean, isVerified: boolean) {
        localStorage.setItem('log', '' + isUser)
        localStorage.setItem('ver', '' + isVerified)
    }

    setCounterAndDate(counter: string = this.counter) {
        localStorage.setItem('lastCounter', counter)
        localStorage.setItem('lastDate', new Date().getTime().toString())
    }
}

export const SetLocalStorage = new LocalStorage()