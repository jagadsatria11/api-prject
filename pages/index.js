/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout";
import { useState, useEffect} from "react";
import Link from 'next/link'

export default function Home({ styles, pokeData }) {
  // console.log(pokeData)
  const [searchResults, setSearchResults] = useState(pokeData)
  const [pokeArr, setPokeArr] = useState(searchResults.slice(0, 20));
  const [pageno, setPageno] = useState(0);
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("All")
  // console.log(pokeArr);
  useEffect(() => {
    setPokeArr(searchResults.slice(pageno*20, (pageno*20)+20))
  }, [pageno])
  useEffect(()=>{
    setPokeArr(searchResults.slice(0, 20))
  },[searchResults])
  useEffect(()=>{
    if(input.length===0 && filter === "All"){
      setSearchResults(pokeData)
      return
    }
    if(input.length!==0 && filter === "All"){
      setSearchResults(c=>(c=pokeData.filter((pokeman)=>{
        return pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return
    }
    if(input.length===0 && filter !== "All"){
      setSearchResults(c=>(c=pokeData.filter((pokeman)=>{
        return pokeman.type.includes(filter)
      })))
      return
    }
    if(input.length!==0 && filter !== "All"){
      setSearchResults(c=>(c=pokeData.filter((pokeman)=>{
        return pokeman.type.includes(filter) && pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return
    }
  },[input,filter])
  const handlePrev=()=>{
    setPageno(c=>{return c-1})
  }
  const handleNext=()=>{
    setPageno(c=>{return c+1})
  }
  const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }
  const handleInputChange=(e)=>{
    setInput(e.target.value)
  }
  console.log(input,filter)
  return (
    <Layout title={"WebPokedexbyJagad"}>
      <div className="flex justify-center pt-12">
        <input type="text" placeholder="Search" className="mx-14 w-full sm:w-3/4 bg-gray-100 px-10 py-2 rounded border border-poke-yellow outline-none" onChange={handleInputChange} value={input} />
      </div>
      <div className="flex px-8 sm:px-16 py-4 items-center">
        <label htmlFor="types" className="text-monospace">Type </label>
        <select name="types" id="types" defaultValue={"All"} className="bg-blue-50 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-2.5" onChange={handleFilterChange} value={filter}>
        <option value="All" >
              All
            </option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center mx-auto">
        {pokeArr.map((pokeman, i) => {
          return (
            <div key={pokeman.name.english} className="p-4">
              <Link href={`/pokemons/${pokeman.id}`}><a>
              <div className="bg-red-200 py-4 px-6 rounded">
                <img
                  src={pokeman.image.hires}
                  alt=""
                  className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
                />
                <div className="text-monospace">
                  {pokeman.type.map((type, j) => {
                    return (
                      <span
                        key={type}
                        className="text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                        style={{ backgroundColor: styles[type.toLowerCase()] }}
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>
                <p className="text-monospace">
                  <span className="font-semibold text-3xl mr-2">
                    {`${pokeman.id}.`}
                  </span>
                  <span className="text-3xl">{pokeman.name.english}</span>
                </p>
              </div></a></Link>
            </div>
          );
        })}
      </div>
      <div className="container mx-auto flex flex-wrap justify-between pb-8 ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
        onClick={handlePrev}
        disabled={pageno===0?true:false}>
          Previous
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
        onClick={handleNext}
        disabled={searchResults.length/20-pageno<1?true:false}>
          Next
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await res.json();
    return {
      props: {
        pokeData: data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}
