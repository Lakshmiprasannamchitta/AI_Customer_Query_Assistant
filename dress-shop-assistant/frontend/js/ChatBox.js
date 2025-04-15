const ChatBox = ({ user, apiPort }) => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState('');

  const sendRequest = async (message) => {
    if (!user || !user.id) {
      setError('Please log in to use the chatbot.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }

    // Add immediate response for "hi"
    const userMessage = { text: message, sender: 'user', timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError('');
  
    const greetings = ['hi', 'hello', 'hey'];
    if (greetings.includes(message.toLowerCase())) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const botMessage = { 
        text: 'Hey how can I help you', 
        sender: 'bot', 
        timestamp: new Date().toISOString() 
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      return;
    }

    try {
      console.log(`Sending request to: http://localhost:${apiPort}/api/chat`); // Debug log
      const res = await fetch(`http://localhost:${apiPort}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user_id: user.id }),
      });
      const data = await res.json();
      console.log("Full API response:", JSON.stringify(data, null, 2));
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Chat service not found. Please check if the server is running.');
        }
        throw new Error(data.error || 'Chat request failed');
      }

      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
        setMessages((prev) => [
          ...prev,
          { text: 'Here are the available products:', sender: 'bot', timestamp: new Date().toISOString(), type: 'table' },
        ]);
      } else if (data.product) {
        setProducts([data.product]);
        setMessages((prev) => [
          ...prev,
          { text: 'Here is the product you requested:', sender: 'bot', timestamp: new Date().toISOString(), type: 'table' },
        ]);
      } else {
        const responseText = data.reply || data.message || 
                            (typeof data === 'string' ? data : JSON.stringify(data));
        
        setMessages((prev) => [
          ...prev,
          { text: responseText, sender: 'bot', timestamp: new Date().toISOString() },
        ]);
      }
    } catch (err) {
      console.error("Error in chat request:", err);
      setError(`Error: ${err.message}`);
      setMessages((prev) => [
        ...prev,
        { text: err.message === 'Chat service not found. Please check if the server is running.' 
            ? 'Unable to connect to the chat service. Please try again later.' 
            : 'Sorry, something went wrong. Please try again.', 
          sender: 'bot', 
          timestamp: new Date().toISOString() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOption = (option) => sendRequest(option);
  const handleSubmit = () => sendRequest(input);

  return React.createElement(
    'div',
    { 
      className: 'fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4',
      style: { width: '500px', maxWidth: '90vw' }
    },
    React.createElement(
      'div',
      null,
      // React.createElement(
      //   'div',
      //   { className: 'h-80 overflow-y-auto mb-4' },
      //   messages.map((msg, idx) =>
      //     React.createElement(
      //       'div',
      //       { key: idx, className: `mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}` },
      //       React.createElement(
      //         'span',
      //         {
      //           className: `inline-block p-2 rounded-lg ${
      //             msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      //           }`,
      //           style: { 
      //             maxWidth: '80%', 
      //             wordWrap: 'break-word', 
      //             overflowWrap: 'break-word' 
      //           }
      //         },
      //         msg.text,
      //         ' ',
      //         React.createElement('small', { className: 'text-xs' }, new Date(msg.timestamp).toLocaleTimeString())
      //       )
      //     )
      //   )
      // ),
      React.createElement(
        'div',
        { className: 'flex justify-between items-center mb-2' },
        React.createElement('h3', { className: 'font-semibold' }, 'Dress Shop Assistant'),
        React.createElement('button', { className: 'text-gray-500', onClick: () => setMessages([]) }, '×')
      ),
      React.createElement(
        'div',
        { className: 'h-80 overflow-y-auto mb-4' },
        messages.map((msg, idx) =>
          React.createElement(
            'div',
            { key: idx, className: `mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}` },
            msg.type === 'table'
              ? React.createElement(
                  'div',
                  { className: 'bg-gray-100 p-2 rounded-lg' },
                  React.createElement(
                    'table',
                    { className: 'w-full text-left text-sm' },
                    React.createElement(
                      'thead',
                      null,
                      React.createElement(
                        'tr',
                        { className: 'bg-gray-200' },
                        React.createElement('th', { className: 'p-2' }, 'Name'),
                        React.createElement('th', { className: 'p-2' }, 'Price'),
                        React.createElement('th', { className: 'p-2' }, 'Details')
                      )
                    ),
                    React.createElement(
                      'tbody',
                      null,
                      products.map((product) =>
                        React.createElement(
                          'tr',
                          { key: product.id, className: 'border-t' },
                          React.createElement('td', { className: 'p-2' }, product.name),
                          React.createElement('td', { className: 'p-2' }, `$${product.price}`),
                          React.createElement('td', { className: 'p-2' }, product.details)
                        )
                      )
                    )
                  )
                )
              : React.createElement(
                  'span',
                  {
                    className: `inline-block p-2 rounded-lg ${
                      msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`,
                    style: { 
                      maxWidth: '80%', 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word' 
                    }
                  },
                  msg.text,
                  ' ',
                  React.createElement('small', { className: 'text-xs' }, new Date(msg.timestamp).toLocaleTimeString())
                )
          )
        ),
        isTyping && React.createElement('p', { className: 'text-gray-500' }, 'Assistant is typing...')
      )
    ),
    error && React.createElement('p', { className: 'text-red-500 mb-2' }, error),
    React.createElement(
      'div',
      { className: 'flex flex-col space-y-2' },
      React.createElement(
        'div',
        { className: 'flex flex-wrap gap-2 mb-2' },
        ['Find Products', 'Check Order Status', 'Process Refund', 'Store Policies', 'Order History'].map((option) =>
          React.createElement(
            'button',
            {
              key: option,
              className: 'bg-gray-200 p-2 rounded text-sm hover:bg-gray-300',
              onClick: () => handleOption(option),
            },
            option
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'flex' },
        React.createElement('input', {
          type: 'text',
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyPress: (e) => e.key === 'Enter' && handleSubmit(),
          className: 'flex-1 p-2 border rounded-l-lg',
          placeholder: 'Ask about products, orders, refunds...',
        }),
        React.createElement(
          'button',
          { onClick: handleSubmit, className: 'bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600' },
          'Send'
        )
      )
    )
  );
};