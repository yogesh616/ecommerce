import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './product.css'

function GetProducts() {
  const [products, setProducts] = useState([]);
 const [details, setDetails] = useState([]);

 

  useEffect(() => {
    async function getProducts() {
        
      try {
        const res = await axios.post('http://localhost:3000/getProducts');
        setProducts(res.data.data);
        if (res.data.data.length > 0) {
          setDetails(res.data.data.map(product => product.details));
          console.log(res.data.data.map(product => product.details));
        }
      } catch (err) {
        console.log(err);
      }
    }


    
      getProducts();
    
  }, []);

  return (
    <>
      {products.map((product, index) => (
      <div key={index}>
        <div key={index} className='product'>
          <div className='left'><img src={product.imgUrl} alt={product.productName} /></div>
          <div className='right'>
          <p className='productBrand'>{product.brandName}</p>
          <h3>{product.productName}</h3>
          
          <p>{product.price}</p>
          <p>{product.description}</p>
          </div>
        </div>
        <div className='productDesc'>
          <h5>Product Details</h5>
          <div className='desc'>
            <img src={product.imgUrl} alt={product.product} />
            <p>{product.description}</p>
          </div>
        </div>
        <div className='productDetails m-3 '>
        <button  className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
           Product Details
        </button>
        <div className="collapse" id="collapseExample">
         {details.map((detail, index) =>
         <div className="collapse" id="collapseExample" key={index}>
         <div className="card card-body text-secondary mb-5" key={index}>
          <p>Color:  &nbsp; &nbsp; &nbsp; {detail.color}</p>
          <p>Size: &nbsp; &nbsp; &nbsp; {detail.size}</p>
          <p>Inner Material: &nbsp; &nbsp; &nbsp; {detail.innerMaterial}</p>
          <p>Outer Material: &nbsp; &nbsp; &nbsp; {detail.outerMaterial}</p>

          </div>
       </div>
         )}
       </div>



        </div>

      </div>

        
      ))}


     
    </>
  );
}

export default GetProducts;
