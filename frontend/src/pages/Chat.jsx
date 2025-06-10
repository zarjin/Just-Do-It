import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
import { AuthContext } from "../context/AuthContext";

export default function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { allUser, getOtherUser, otherUser, user } = useContext(UserContext);
  const { messages, getMessages, sendMessage, clearMessages } =
    useContext(MessageContext);
  const { logout } = useContext(AuthContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages when user is selected
  useEffect(() => {
    if (userId) {
      setSelectedUser(userId);
      getOtherUser(userId);
      getMessages(userId);
    }
  }, [userId, getOtherUser, getMessages]);

  // Handle user selection
  const handleUserSelect = async (selectedUserId) => {
    setSelectedUser(selectedUserId);
    await getOtherUser(selectedUserId);
    await getMessages(selectedUserId);
    navigate(`/chat/${selectedUserId}`);
  };

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUser || isLoading) return;

    setIsLoading(true);
    try {
      await sendMessage(selectedUser, messageText.trim());
      setMessageText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      clearMessages();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* User List Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={user?.profile || "https://via.placeholder.com/40"}
                  alt={user?.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{user?.fullName || "User"}</h3>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition duration-200"
              title="Logout"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4 chat-scrollbar">
          <h2 className="text-lg font-bold mb-4">Contacts</h2>
          {allUser.length > 0 ? (
            allUser
              .filter((chatUser) => chatUser._id !== user?._id)
              .map((chatUser) => (
                <div
                  key={chatUser._id}
                  onClick={() => handleUserSelect(chatUser._id)}
                  className={`flex items-center mb-3 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer ${
                    selectedUser === chatUser._id ? "bg-gray-700" : ""
                  }`}
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={chatUser.profile || "https://via.placeholder.com/48"}
                      alt={chatUser.fullName}
                      className="w-full h-full rounded-full object-cover border-2 border-blue-400"
                    />
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <div className="font-semibold truncate">
                      {chatUser.fullName}
                    </div>
                    <div className="text-green-400 text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Online
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-gray-400 text-center py-8">
              <p>No users available</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser && otherUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex items-center shadow-sm">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={otherUser.profile || "https://via.placeholder.com/40"}
                  alt={otherUser.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {otherUser.fullName}
                </h3>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 chat-scrollbar">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div
                    key={message._id || index}
                    className={`mb-4 flex ${
                      message.sender === user?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === user?._id
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none shadow"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.sender === user?._id
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 rounded-l-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !messageText.trim()}
                  className="bg-blue-500 text-white px-6 rounded-r-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "..." : "Send"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">Welcome to Chat</h3>
              <p>Select a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
