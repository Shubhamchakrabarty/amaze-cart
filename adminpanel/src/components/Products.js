import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';  // Adjust path to your firebase config

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await firestore.collection('products').get();
        const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading Products...</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
