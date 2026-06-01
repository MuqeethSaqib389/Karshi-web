import React, { useEffect, useState } from 'react';
import api from '../api/client';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/products')
      .then(res => {
        console.log('GET /products response:', res);
        const payload = res?.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload?.data)
          ? payload.data
          : [];
        setProducts(list);
      })
      .catch(err => {
        console.error('Failed to load products', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>KARSHI Products</h2>
      {loading ? (
        <div>Loading products…</div>
      ) : Array.isArray(products) && products.length > 0 ? (
        products.map(p => (
          <div key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.name}</strong> — £{p.price}
          </div>
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default ProductList;
