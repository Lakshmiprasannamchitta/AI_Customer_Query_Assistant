const Offers = () => {
  const initialOffers = [
    { id: 1, title: "Summer Sale", description: "20% off all dresses", image: "/img/images (1).jpeg" },
    { id: 2, title: "Winter Clearance", description: "Up to 50% off jackets", image: "/img/images (3).jpeg" },
    { id: 3, title: "Festive Deal", description: "Free shipping on orders over $50", image: "/img/images (6).jpeg" },
    { id: 4, title: "New Arrivals", description: "10% off new collections", image: "/img/flower dres.jpg" },
  ];

  return React.createElement(
    'div',
    { className: 'bg-white shadow p-6 mb-6' },
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-4' },
      React.createElement('h2', { className: 'text-2xl font-bold' }, 'Offers'),
      React.createElement(
        'div',
        { className: 'text-blue-500 flex space-x-2' },
        React.createElement('a', { href: '#', className: 'hover:underline' }, 'All Offers'),
        React.createElement('a', { href: '#', className: 'hover:underline' }, 'Bank Offers'),
        React.createElement('a', { href: '#', className: 'hover:underline' }, 'VIEW ALL')
      )
    ),
    React.createElement(
      'div',
      { className: 'flex space-x-4 overflow-x-auto' },
      initialOffers.map((offer) =>
        React.createElement(
          'div',
          { key: offer.id, className: 'bg-white rounded-lg shadow-md p-4 w-64' },
          React.createElement(
            'div',
            { className: 'w-full h-32 mb-2 rounded overflow-hidden' },
            React.createElement('img', {
              src: offer.image,
              alt: offer.title,
              className: 'w-full h-32 object-cover rounded',
            })
          ),
          React.createElement('h3', { className: 'text-lg font-bold' }, offer.title),
          React.createElement('p', { className: 'text-gray-600' }, offer.description)
        )
      )
    )
  );
};