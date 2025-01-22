import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const AfterJoin = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const wsRef = useRef<WebSocket | null>(null); // Define the type for wsRef

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:2322");
        ws.onmessage = (event) => {
            setMessages((m) => [...m, event.data]);
        }
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: "123"
                }
            }));
        }
        wsRef.current = ws;

        return () => {
            ws.close();
        }
    }, []);

    const sendMessage = () => {
        if (wsRef.current && input.trim() !== '') {
            wsRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                    message: input
                }
            }));
            setInput('');
        }
    }

    return (
        <div className="flex flex-col justify-between h-full w-full">
            <div className="h-4/5 rounded-lg bg-gray-700 border border-gray-200 p-4 overflow-y-auto overflow-x-hidden flex flex-col-reverse gap-2 items-end">
                {messages.map((m) => (
                    <div className="bg-blue-500 text-white p-2 rounded-lg">
                        {m}
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-between">
                {/* Input Box */}
                <div className="w-4/5">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full py-4 px-4 border border-gray-200 rounded-lg bg-gray-700 text-white text-lg text-end"
                        type="text"
                        placeholder="Write your message"
                    />
                </div>
                {/* Send Message */}
                <div
                    className="w-1/6 bg-green-600 border border-gray-200 p-4 rounded-lg text-white flex items-center justify-center hover:bg-green-400 cursor-pointer"
                    onClick={sendMessage}
                >
                    <Send />
                </div>
            </div>
        </div>
    )
}