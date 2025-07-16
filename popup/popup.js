document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const promptInput = document.getElementById('prompt');
  const modelSelect = document.getElementById('model');
  const autocaptureSelect = document.getElementById('autocapture');
  const autocaptureintervalSelect = document.getElementById('autocaptureinterval');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

  // Load saved settings
  chrome.storage.sync.get(['apiKey', 'prompt', 'model', 'autocapture', 'autocaptureinterval'], function(data) {
    if (data.apiKey) apiKeyInput.value = data.apiKey;
    if (data.prompt) promptInput.value = data.prompt;
    if (data.model) modelSelect.value = data.model;
    if (data.autocapture) autocaptureSelect.value = data.autocapture;
    if (data.autocaptureinterval) autocaptureintervalSelect.value = data.autocaptureinterval;
  });

  // Save settings
  saveButton.addEventListener('click', function() {
    const apiKey = apiKeyInput.value.trim();
    const prompt = promptInput.value.trim();
    const model = modelSelect.value;
    const autocapture = autocaptureSelect.value;
    const autocaptureinterval = autocaptureintervalSelect.value;

    if (!apiKey) {
      statusDiv.textContent = 'API Key is required';
      return;
    }

    chrome.storage.sync.set({ apiKey, prompt, model, autocapture, autocaptureinterval }, function() {
      statusDiv.textContent = 'Settings saved!';
      setTimeout(() => statusDiv.textContent = '', 2000);
    });
  });
});