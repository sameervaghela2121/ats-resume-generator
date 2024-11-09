import React, { useState } from "react";

function ModelSelector({ onModelChange }) {
  const [selectedModel, setSelectedModel] = useState("ChatGPT");
  const [userApiKeys, setUserApiKeys] = useState({
    chatgpt: "",
    claude: "",
    gemini: "",
  });

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    onModelChange(e.target.value, userApiKeys);
  };

  const handleApiKeyChange = (e) => {
    const { name, value } = e.target;
    setUserApiKeys((prevKeys) => ({ ...prevKeys, [name]: value }));
    onModelChange(selectedModel, { ...userApiKeys, [name]: value });
  };

  return (
    <div>
      <h3>Select AI Model</h3>
      <select value={selectedModel} onChange={handleModelChange}>
        <option value="ChatGPT">ChatGPT</option>
        <option value="Claude">Claude</option>
        <option value="Gemini">Gemini</option>
      </select>

      <div>
        <label>ChatGPT API Key</label>
        <input
          type="text"
          name="chatgpt"
          value={userApiKeys.chatgpt}
          onChange={handleApiKeyChange}
          placeholder="Optional"
        />
      </div>
      <div>
        <label>Claude API Key</label>
        <input
          type="text"
          name="claude"
          value={userApiKeys.claude}
          onChange={handleApiKeyChange}
          placeholder="Optional"
        />
      </div>
      <div>
        <label>Gemini API Key</label>
        <input
          type="text"
          name="gemini"
          value={userApiKeys.gemini}
          onChange={handleApiKeyChange}
          placeholder="Optional"
        />
      </div>
    </div>
  );
}

export default ModelSelector;
