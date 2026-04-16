import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthPage.css'; // We'll create this CSS file next

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page-container">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <span onClick={toggleForm} className="toggle-link">
          {isLogin ? "Register here." : "Login here."}
        </span>
      </p>
    </div>
  );
}

export default AuthPage;
