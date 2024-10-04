import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';  // Adjust path to your firebase config

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await firestore.collection('orders').get();
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading Orders...</p>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{new Date(order.dateCreated.seconds * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
