import { useState } from 'react';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<{ user: string; ai: any }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: inputValue }),
    });

    const data = await response.json();
    //@ts-ignore
    setMessages([...messages, { user: inputValue, ai: data.response }]);
    setInputValue('');
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as { preventDefault: () => void });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                <p>{message.user}</p>
              </div>
            </div>
            <div className="flex justify-start mt-2">
              <div className="bg-gray-300 p-2 rounded-lg max-w-xs">
                <p>{message.ai}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex p-4 bg-white border-t border-gray-300">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요"
          className="flex-grow p-2 border border-gray-400 rounded-lg resize-none"
          rows={3}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? '전송 중...' : '전송'}
        </button>
      </form>
    </div>
  );
};

export default Chat;
