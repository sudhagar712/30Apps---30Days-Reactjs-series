import React from 'react'
import { Input } from './input'


interface Props  {
    query:string,
    setQuery:(value:string)=> void
}

const SearchBar:React.FC<Props> = ({query ,setQuery}:Props) => {

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setQuery(e.target.value)
  }



  return (
    <div>
      <Input
      value={query}
      onChange={handleChange}
       placeholder="Search your fav Gif here....."
        />
    </div>
  );
}

export default SearchBar
