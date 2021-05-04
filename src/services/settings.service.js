export const toggleDarkMode = () => {
    if(!localStorage.getItem('ndqdm')) localStorage.setItem('ndqdm', false)
    localStorage.setItem('ndqdm', !localStorage.getItem('ndqdm'))
}