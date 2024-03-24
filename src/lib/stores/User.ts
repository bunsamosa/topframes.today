import { writable } from 'svelte/store'

interface User {
    fid: number
    name: string
    loggedIn: boolean
}

// read data from localstorage on load
let defaultUser = JSON.stringify({ fid: 0, name: '', loggedIn: false})
const localData = localStorage.getItem('user')
if (!localData) localStorage.user = defaultUser

export const userData = writable<User>(JSON.parse(localData || defaultUser))

// update data to localstorage on change
userData.subscribe((value) => localStorage.user = JSON.stringify(value))
