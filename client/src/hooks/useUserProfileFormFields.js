import { useState } from 'react';

const initialOptions = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function useUserProfileFormFields() {
  const [userProfileFormFields, setUserProfileFormFields] =
    useState(initialOptions);
  const userInfo = useBoundStore((store) => store.userInfo);

  useEffect(() => {
    setUserProfileFormFields((prevState) => ({
      ...prevState,
      email: userInfo.email,
      name: userInfo.name,
    }));
  }, [userInfo.email, userInfo.name]);

  return [userProfileFormFields, setUserProfileFormFields];
}

export default useUserProfileFormFields;
