import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components';
import { useProducts } from '../hooks/index';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';

function HomeScreenPage() {
  const { pageNumber } = useParams();
  const { data, isLoading } = useProducts({ pageNumber });

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>Latest Product</h1>
      <Row>
        {data &&
          data.products &&
          data.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default HomeScreenPage;
