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
          <Link href="">
          <a>
              <div className={styles.card}>
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
                <img src={pokemon.image} height="100" width={100} className={styles.imagen}></img>
              </div>
          </a>
          </Link>
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