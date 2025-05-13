const recipeInput   = document.getElementById('recipeInput');
const sendRecipeBtn = document.getElementById('sendRecipeBtn');
const chatWindow    = document.getElementById('chatWindow');

// Call your favourite LLM endpoint — example uses OpenAI Chat API
async function queryRecipeAI(prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You suggest creative recipes based on ingredients, even if expired.' },
        { role: 'user',   content: prompt }
      ],
      temperature: 0.8
    })
  });
  const { choices } = await res.json();
  return choices[0].message.content.trim();
}

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'text';
  bubble.textContent = text;
  msg.appendChild(bubble);
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendRecipeBtn.addEventListener('click', async () => {
  const prompt = recipeInput.value.trim();
  if (!prompt) {
    alert('Please list the ingredients you have.');
    return;
  }

  // show chat & user bubble
  chatWindow.classList.remove('hidden');
  appendMessage(prompt, 'user');
  recipeInput.value = '';
  sendRecipeBtn.disabled = true;
  sendRecipeBtn.textContent = 'Thinking…';

  try {
    const reply = await queryRecipeAI(prompt);
    appendMessage(reply, 'ai');
  } catch (err) {
    appendMessage('😢 Something went wrong. Please try again later.', 'ai');
    console.error(err);
  } finally {
    sendRecipeBtn.disabled = false;
    sendRecipeBtn.textContent = 'Ask Chef AI';
  }
});
