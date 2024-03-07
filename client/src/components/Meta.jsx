import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To I-ProShop',
  description: 'We sell the best products for reasonable prices',
  keywords: 'apple product, phone, camera, playstation',
};

export default Meta;
