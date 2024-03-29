import React from 'react'
import { async } from 'rxjs';
import {Product, FooterBanner, HeroBanner} from '../components'
import { client } from '../lib/client';


const Home = ({products, bannerData}) => {
  return (
   <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakerss of many variations</p>
    </div>

    <div className="products-container">
      {
        products?.map((product) => <Product key={product._id} 
        product={product}
        />)
      } 
    </div>

    <FooterBanner footerBanner = {bannerData && bannerData[0]} />


   </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]' //fetch all  products from sanity dashbaord
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]' //fetch banna data  products from sanity dashbaord
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home