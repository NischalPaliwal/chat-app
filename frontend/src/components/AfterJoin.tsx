import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';

export const AfterJoin = () => {
    const [messages, setMessages] = useState<string[]>(["hi there", "hello"]);
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:2322");
        ws.onmessage = (event) => {
            setMessages((m) => [...m, event.data]);
        }
    }, []);

  return (
    <div className="flex flex-col justify-between h-full w-full">
        <div className="h-4/5 rounded-lg bg-gray-700 border border-gray-200 p-4 overflow-y-auto overflow-x-hidden flex flex-col-reverse gap-2 items-end">
        { messages.map((m) => (
            <div className='p-3 bg-blue-400 rounded-2xl text-white w-fit'>
                {m}
            </div>
        )) }
        </div>
        <div className="w-full flex justify-between">
        {/* Input Box */}
        <div className="w-4/5"><input className="w-full py-4 px-4 border border-gray-200 rounded-lg bg-gray-700 text-white text-lg text-end" type="text" placeholder="Write your message"></input></div>
        {/* Send Message */}
        <div className="w-1/6 bg-green-600 border border-gray-200 p-4 rounded-lg text-white flex items-center justify-center hover:bg-green-400">
        <Send />
        </div>
        </div>
    </div>
  )
}
