import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components';
import { useProducts } from '../hooks/index';
import Loader from '../components/Loader';

function HomeScreenPage() {
  const { products } = useProducts();

  if (!products) return <Loader />;

  return (
    <div>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreenPage;
