const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(name, mobileNo, dob, password);
  };

  const handleLoginSwitch = () => {
    if (onSwitchToLogin) onSwitchToLogin();
  };

  return React.createElement(
    'div',
    { className: 'w-80' },
    React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-center' }, 'Sign Up'),
    React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'text',
        placeholder: 'Full Name',
        value: name,
        onChange: (e) => setName(e.target.value),
        className: 'w-full p-2 mb-4 border rounded',
      }),
      React.createElement('input', {
        type: 'tel',
        placeholder: 'Mobile Number',
        value: mobileNo,
        onChange: (e) => setMobileNo(e.target.value),
        className: 'w-full p-2 mb-4 border rounded',
      }),
      React.createElement('input', {
        type: 'date',
        value: dob,
        onChange: (e) => setDob(e.target.value),
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
          className: 'w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-2',
        },
        'Sign Up'
      ),
      React.createElement(
        'button',
        {
          onClick: handleLoginSwitch,
          className: 'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600',
        },
        'Login'
      )
    )
  );
};