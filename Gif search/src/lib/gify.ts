export const fetchGif = async(query:string) => {
    const apiKey = import.meta.env.VITE_GIFHY_API_KEY

const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=12 `

const res = await fetch(url)
const data = await res.json()

return data.data
}