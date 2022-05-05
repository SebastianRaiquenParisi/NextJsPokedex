import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({arrayPokemonLimpio}) {
  console.log("arrayPokemon", arrayPokemonLimpio)
  return (
   <>
   </>
  )
}

export async function getServerSideProps(){
  const traerPokemon=(numero)=>{
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`)
    .then(response=> response.json())
    .then(data=>data)
  }

  let arrayPokemon = []

  for(let i = 1; i<=20;i++){
    let data = await traerPokemon(i);
    arrayPokemon.push(data);
  }

  let arrayPokemonLimpio = arrayPokemon.map(pokemon=>{
    return(
      {
        id : pokemon.id,
        name : pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types
      }
    )
  })
  return{
    props:{
      arrayPokemonLimpio
    }
  }
}