import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom'

function ProductView() {
  const params = useParams()
  console.log(params);

  const [searchParams, setSearchParams] = useSearchParams()
  console.log(...searchParams);

  const [productData, setProductData] = useState({})


  useEffect(() => {
    loadProduct()
  }, [])

  let loadProduct = async () => {
    try {
      let product = await axios.get(`https://62ff561c9350a1e548dc4cb7.mockapi.io/products/${params.id}`);
      setProductData(product.data)
      console.log(product.data);
    } catch (error) {

    }
  }
  return (
    // <h1>{params.Id}</h1>
    <>
      <h2 style={{color:"Blue"}}>{productData.name}</h2>
      <h2 style={{color:"Black"}}>{productData.quantity}</h2>
      <h2 style={{color:"Black"}}>{productData.price}</h2>
    </>
  )
}

export default ProductView