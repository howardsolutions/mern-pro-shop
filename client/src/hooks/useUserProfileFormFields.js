import { useState } from 'react';

const initialOptions = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function useUserProfileFormFields() {
  const [userProfile, setUserProfile] = useState(initialOptions);

  return [userProfile, setUserProfile];
}

export default useUserProfileFormFields;
