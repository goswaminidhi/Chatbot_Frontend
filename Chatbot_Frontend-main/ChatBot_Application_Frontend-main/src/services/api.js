const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://chatbot-backend-0qz4.onrender.com";

export const chatAPI = {
  streamMessage: (message, conversationId, token, onChunk, onDone, onError) => {
    const url = `${BASE_URL}/api/chat/stream?message=${encodeURIComponent(
      message
    )}&conversationId=${encodeURIComponent(conversationId)}&token=${encodeURIComponent(token)}`;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      onChunk(event.data);
    };

    eventSource.onerror = (err) => {
      eventSource.close();
      if (onError) onError(err);
      if (onDone) onDone();
    };

    return eventSource;
  },
};