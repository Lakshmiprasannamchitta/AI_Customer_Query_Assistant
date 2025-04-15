const ProductCard = ({ products }) => {
  return React.createElement(
    'div',
    { className: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4' },
    products.map((product) =>
      React.createElement(
        'div',
        { key: product.id, className: 'bg-white rounded-lg shadow-md p-4' },
        React.createElement(
          'div',
          { className: 'w-full h-48 mb-2 rounded overflow-hidden' },
          React.createElement('img', {
            src: product.image,
            alt: product.name,
            className: 'w-full h-48 object-cover mb-2 rounded',
          })
        ),
        React.createElement('h3', { className: 'text-lg font-bold' }, `${product.id} - ${product.name}`),
        React.createElement('p', { className: 'text-gray-600' }, `$${product.price}`),
        React.createElement('p', { className: 'text-gray-500' }, product.details)
      )
    )
  );
};