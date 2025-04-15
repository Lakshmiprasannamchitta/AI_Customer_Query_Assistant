const Login = ({ onLogin }) => {
  const [mobileNo, setMobileNo] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(mobileNo, password);
  };

  return React.createElement(
    'div',
    { className: 'w-80' },
    React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-center' }, 'Login'),
    React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'tel',
        placeholder: 'Mobile Number',
        value: mobileNo,
        onChange: (e) => setMobileNo(e.target.value),
        className: 'w-full p-2 mb-4 border rounded',
      }),
      React.createElement('input', {
        type: 'password',
        placeholder: 'Password',
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className: 'w-full p-2 mb-4 border rounded',
      }),
      React.createElement(
        'button',
        {
          onClick: handleSubmit,
          className: 'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600',
        },
        'Login'
      )
    )
  );
};