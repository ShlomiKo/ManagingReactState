import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import useFetch from './services/useFetch';
import PageNotFound from './PageNotFound';
import { useCart } from './cartContext';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState('');
  const { data: product, error, loading } = useFetch(`products/${id}`);
  const { dispatch } = useCart();

  if (loading) return <Spinner></Spinner>;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select
        id="size"
        value={sku}
        onChange={(e) => {
          setSku(e.target.value);
        }}
      >
        <option value="">What size?</option>
        {product.skus.map((sku) => {
          return (
            <option key={sku.sku} value={sku.sku}>
              {sku.size}
            </option>
          );
        })}
      </select>
      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: 'add', id, sku });
            navigate('/cart');
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
