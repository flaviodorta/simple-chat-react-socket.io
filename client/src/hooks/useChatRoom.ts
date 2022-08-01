import { useState } from 'react';

interface Message {
  content: string;
  ownerName: string;
  ownerId: string;
  date: Date;
}

export function useChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
}
