import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useEditProductFormFields } from '../../hooks';
import { useBoundStore } from '../../store/index';
import { shallow } from 'zustand/shallow';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    refetch,
    productDetailFormFields,
    handleUpdateFormFields,
  } = useEditProductFormFields(productId);

  const {
    name = '',
    price = 0,
    image = '',
    brand = '',
    category = '',
    description = '',
    countInStock = 0,
  } = productDetailFormFields;

  const {
    editProduct,
    isEditProductLoading,
    uploadProductImage,
    isUploadingImage,
  } = useBoundStore(
    (store) => ({
      editProduct: store.editProduct,
      isEditProductLoading: store.isEditProductLoading,
      uploadProductImage: store.uploadProductImage,
      isUploadingImage: store.isUploadingImage,
    }),
    shallow
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await editProduct({
        productId,
        updatedData: {
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
        },
      });
      toast.success('Product updated');
      refetch((prevState) => !prevState);
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData);
      toast.success(res.data.message);
      handleUpdateFormFields('image', res.data.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading || isEditProductLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>{error.data?.message}</Message>;
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => handleUpdateFormFields('name', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => handleUpdateFormFields('price', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => handleUpdateFormFields('image', e.target.value)}
            ></Form.Control>
            <Form.Control
              label='Choose File'
              onChange={uploadFileHandler}
              type='file'
            ></Form.Control>
            {isUploadingImage && <Loader />}
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => handleUpdateFormFields('brand', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) =>
                handleUpdateFormFields('countInStock', e.target.value)
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) =>
                handleUpdateFormFields('category', e.target.value)
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) =>
                handleUpdateFormFields('description', e.target.value)
              }
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
