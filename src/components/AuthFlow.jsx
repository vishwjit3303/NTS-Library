import React, { useState } from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPassword from '../pages/ForgetPassword';

const AuthFlow = () => {
  const [page, setPage] = useState('signin');

  return (
    <div>
      {page === 'signin' && (
        <SignIn
          switchToSignUp={() => setPage('signup')}
          switchToForget={() => setPage('forget')}
        />
      )}
      {page === 'signup' && <SignUp switchToSignIn={() => setPage('signin')} />}
      {page === 'forget' && <ForgetPassword switchToSignIn={() => setPage('signin')} />}
    </div>
  );
};

export default AuthFlow;
