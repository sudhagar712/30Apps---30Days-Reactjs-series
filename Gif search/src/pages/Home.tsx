
import GifGrid from "@/components/GifGrid"
import SearchBar from "@/components/ui/SearchBar"
import React from "react";

const Home = () => {
    const [query, setQuery] = React.useState<string>("")

  return (
    <div>
      <h2 className="text-center mb-5 font-bold text-2xl ">Gif Quest</h2>
      <SearchBar query={query} setQuery={setQuery} />
      <GifGrid query={query} />
    </div>
  );
}

export default Home

