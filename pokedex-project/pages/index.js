import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

      
export default function Home({arrayPokemonLimpio}) {
  console.log("arrayPokemon", arrayPokemonLimpio)
  return (
   <>
   <ul className={styles.columnas}>
    {arrayPokemonLimpio.map((pokemon, index) =>{
      return(
        <li>
          <div onClick={()=>mostrarPokemon(pokemon)}>
          <a>
              <div className={`${styles.card} 
              ${pokemon.types[0].type.name}`}>
                <div className={styles.nombreTipos}>
                  <h3>{pokemon.name}</h3>
                  <div className={styles.tipos}>
                    {pokemon.types.map((tipo,index)=>{
                      return (
                        <p className={styles.tipo}>{tipo.type.name}</p>
                      )
                    })}
                  </div>
                </div>
                <img src={pokemon.image} height="110" width={110} className={styles.imagen}></img>
              </div>
          </a>
          </div>
        </li>
      )
    })}
    </ul>
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

  for(let i = 1; i<=151;i++){
    let data = await traerPokemon(i);
    arrayPokemon.push(data);
  }

  let arrayPokemonLimpio = arrayPokemon.map(pokemon=>{
    return(
      {
        id : pokemon.id,
        name : pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
        height: pokemon.height * 10,
        weight: pokemon.weight /   10
      }
    )
  })
  return{
    props:{
      arrayPokemonLimpio
    }
  }
}