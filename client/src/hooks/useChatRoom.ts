import { useState } from 'react';

interface Message {
  socketId: string;
  username: string;
  content: string;
}

export function useChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);

  return [messages, setMessages];
}
