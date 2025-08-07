import React from 'react'
import {fetchGif} from "../lib/gify"


interface Props {
    query:string,
}



const GifGrid:React.FC<Props> = ({query}:Props) => {
    const [gifs,setGifs] = React.useState<any[]>([])

   const [loading, setLoading] = React.useState<boolean>(false)


   
   React.useEffect(()=> {
         
    const getGif = async() => {
        setLoading(true)
        try {
            const res = await fetchGif(query)
           setGifs(res)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }     
    }
     getGif();
   },[query])

   if(loading) return <p className='text-center mt-10 '>Loading Gif...</p>

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-5'>
   
   {
    gifs.map((gif)=> (
        <img key={gif.id} src={gif.images.fixed_height.url} alt="" />
    ))
   }
    </div>
  )
}

export default GifGrid
