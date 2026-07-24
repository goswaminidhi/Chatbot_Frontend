// // // src/services/api.js

// // const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://chatbot-backend-0qz4.onrender.com";

// // export const chatAPI = {
// //   sendMessage: async (message) => {
// //     const response = await fetch(`${BASE_URL}/api/chat`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ message }),
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to get response from server");
// //     }

// //     return response.json();
// //   },
// // };

// // src/services/api.js

// const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://chatbot-backend-0qz4.onrender.com";

// export const chatAPI = {
//   // Keep this if you still need it elsewhere
//   sendMessage: async (message) => {
//     const response = await fetch(`${BASE_URL}/api/chat`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message }),
//     });
//     if (!response.ok) throw new Error("Failed to get response from server");
//     return response.json();
//   },

//   // NEW: streaming version
//   streamMessage: (message, onChunk, onDone, onError) => {
//     const url = `${BASE_URL}/api/chat/stream?message=${encodeURIComponent(message)}`;
//     const eventSource = new EventSource(url);

//     eventSource.onmessage = (event) => {
//       onChunk(event.data);
//     };

//     eventSource.onerror = (err) => {
//       eventSource.close();
//       // EventSource fires onerror even on a clean stream end sometimes,
//       // so only treat it as a real error if the stream never completed normally.
//       if (onError) onError(err);
//       if (onDone) onDone();
//     };

//     return eventSource; // returned so caller can manually close() if needed
//   },
// };

// src/services/api.js

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://chatbot-backend-0qz4.onrender.com";

export const chatAPI = {
  // Non-streaming (kept in case you still need it elsewhere)
  sendMessage: async (message, conversationId) => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, conversationId }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response from server");
    }

    return response.json();
  },

  // Streaming version — now includes conversationId
  streamMessage: (message, conversationId, onChunk, onDone, onError) => {
    const url = `${BASE_URL}/api/chat/stream?message=${encodeURIComponent(
      message
    )}&conversationId=${encodeURIComponent(conversationId)}`;

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