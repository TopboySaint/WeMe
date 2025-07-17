import React from 'react'
import axios from 'axios'

const Connect = () => {
    const url = 'http://localhost:5010/test'
    const fetchInfo = () =>{
    axios.get(url)
    .then((response)=>{
     console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);   
    })
    }

  return (
    <>
    <button onClick={fetchInfo}>Connect</button>
    </>
  )
}

export default Connect