import React from 'react'
import{BestProducts, FooterBanner, Banner} from '../components/index'
import { client } from '../lib/client'


export default function Home({banners, bestProducts}) {
  return (
    <div className='container-fluid home'>
      <Banner banners={banners} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
      </div>
      <div className='products-container'>
        {bestProducts?.map((product)=> <BestProducts key={product._id} products= {product} />)}
      </div>
      <FooterBanner />
    </div>
  )
}

export const getServerSideProps = async () =>{
  const query = '*[_type == "products"]'
  const bestProducts = await client.fetch(query)

  console.log(bestProducts)

  const queryBanner = '*[_type == "banner"]'
  const banners = await client.fetch(queryBanner)

  return {
    props: {banners, bestProducts }
  }

}
