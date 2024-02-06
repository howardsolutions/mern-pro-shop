import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      <Star value={value} fullStarNumber={1} halfStarNumber={0.5} />
      <Star value={value} fullStarNumber={2} halfStarNumber={1.5} />
      <Star value={value} fullStarNumber={3} halfStarNumber={2.5} />
      <Star value={value} fullStarNumber={4} halfStarNumber={3.5} />
      <Star value={value} fullStarNumber={5} halfStarNumber={4.5} />
      <div className='rating-text'>{text && text}</div>
    </div>
  );
};

function Star({ value, fullStarNumber, halfStarNumber }) {
  return (
    <span>
      {value >= fullStarNumber ? (
        <FaStar />
      ) : value >= halfStarNumber ? (
        <FaStarHalfAlt />
      ) : (
        <FaRegStar />
      )}
    </span>
  );
}
