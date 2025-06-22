import { useEffect, useRef, useState, useCallback } from 'react';

type MessagePayload = {
  type: 'system' | 'chat' | 'error';
  payload: any;
};

type UseWebSocketReturn = {
  connected: boolean;
  messages: MessagePayload[];
  joinRoom: (username: string, room: string) => void;
  sendMessage: (message: string) => void;
  leaveRoom: () => void;
};

export function useWebSocket(url: string): UseWebSocketReturn {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  // Helper to add messages to state
  const addMessage = useCallback((msg: MessagePayload) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  // Open WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(url);
    wsRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      addMessage({ type: 'system', payload: { message: 'Connected to server' } });
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as MessagePayload;
        addMessage(data);
      } catch {
        addMessage({ type: 'error', payload: { message: 'Malformed message received' } });
      }
    };

    socket.onclose = () => {
      setConnected(false);
      addMessage({ type: 'system', payload: { message: 'Disconnected from server' } });
    };

    socket.onerror = (err) => {
      addMessage({ type: 'error', payload: { message: 'WebSocket error occurred' } });
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [url, addMessage]);

  // Send data helper
  const sendData = useCallback(
    (data: object) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(data));
      } else {
        addMessage({ type: 'error', payload: { message: 'Socket not connected' } });
      }
    },
    [addMessage]
  );

  // Join a room
  const joinRoom = useCallback(
    (username: string, room: string) => {
      sendData({ type: 'JOIN', payload: { username, room } });
    },
    [sendData]
  );

  // Send a chat message
  const sendMessage = useCallback(
    (message: string) => {
      sendData({ type: 'CHAT', payload: { message } });
    },
    [sendData]
  );

  // Leave the current room
  const leaveRoom = useCallback(() => {
    sendData({ type: 'LEAVE' });
  }, [sendData]);

  return { connected, messages, joinRoom, sendMessage, leaveRoom };
}
