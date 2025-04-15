const App = () => {
  const [currentView, setCurrentView] = React.useState('signup');
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const API_PORT = 5005; // Match backend port

  React.useEffect(() => {
    if (currentView === 'home') {
      fetch(`http://localhost:${API_PORT}/api/products`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('Failed to fetch products:', err));
    }
  }, [currentView]);

  const handleSignup = async (name, mobileNo, dob, password) => {
    try {
      const response = await fetch(`http://localhost:${API_PORT}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile_no: mobileNo, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentView('login');
        setSuccess('Signup successful! Please log in.');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Signup failed: ' + err.message);
    }
  };

  const handleLogin = async (mobileNo, password) => {
    try {
      const response = await fetch(`http://localhost:${API_PORT}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_no: mobileNo, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setCurrentView('home');
        setSuccess('Login successful!');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gray-100' },
    currentView === 'signup' &&
      React.createElement(
        'div',
        { className: 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center' },
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg shadow-lg w-96' },
          React.createElement(Signup, {
            onSignup: handleSignup,
            onSwitchToLogin: () => setCurrentView('login'),
          }),
          error && React.createElement('p', { className: 'text-red-500 mt-2' }, error),
          success && React.createElement('p', { className: 'text-green-500 mt-2' }, success)
        )
      ),
    currentView === 'login' &&
      React.createElement(
        'div',
        { className: 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center' },
        React.createElement(
          'div',
          { className: 'bg-white p-6 rounded-lg shadow-lg w-96' },
          React.createElement(Login, { onLogin: handleLogin }),
          error && React.createElement('p', { className: 'text-red-500 mt-2' }, error),
          success && React.createElement('p', { className: 'text-green-500 mt-2' }, success)
        )
      ),
    currentView === 'home' &&
      user &&
      React.createElement(
        'div',
        null,
        React.createElement(
          'header',
          { className: 'bg-white shadow p-4 flex justify-between items-center' },
          React.createElement('span', { className: 'text-2xl font-bold' }, 'Dress Shop'),
          React.createElement(
            'a',
            {
              href: '#',
              className: 'text-gray-600 hover:text-black',
              onClick: () => {
                setUser(null);
                setCurrentView('login');
              },
            },
            'Logout'
          )
        ),
        React.createElement(
          'div',
          { className: 'container mx-auto p-10' },
          React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, `Welcome, ${user.name}`),
          React.createElement(Offers),
          React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, 'Our Products'),
          React.createElement(ProductCard, { products: products }),
          React.createElement(ChatBox, { user: user, apiPort: API_PORT })
        )
      )
  );
};