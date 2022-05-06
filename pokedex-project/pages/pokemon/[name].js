import React from 'react'

export default function Pokemon({pokemon}){
    return (
      <div>
        <h1>{pokemon.name}</h1>
      </div>
    )
  }
  export async function getServerSideProps(context){
      const{name} = context.query;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      const pokemon = await res.json();
      return{
          props:{
              pokemon
          }
      }
}