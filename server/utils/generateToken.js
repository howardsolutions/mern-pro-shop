import jwt from 'jsonwebtoken';

export default function generateToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // set JWT as Http-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV !== 'development', // for https on production, in dev we don't have https
  });
}
