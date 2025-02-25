import { useState } from 'react';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<{ user: string; ai: any }[]>([]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: inputValue }),
    });

    const data = await response.json();
    //@ts-ignore
    setMessages([...messages, { user: inputValue, ai: data.response }]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as { preventDefault: () => void });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <form onSubmit={handleSubmit} className="flex justify-center mt-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
          className="w-1/2 p-2 border border-gray-400 rounded-lg"
          rows={3}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          전송
        </button>
      </form>
      <div className="flex flex-col mt-4">
        {messages.map((message, index) => (
          <div key={index}>
            <p className="text-right text-blue-500">{message.user}</p>
            <p className="text-left text-gray-600">{message.ai}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
