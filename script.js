// Slide navigation
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateSlide() {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === currentSlide);
  });
  document.getElementById('current').textContent = currentSlide + 1;
}

document.getElementById('next')?.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

document.getElementById('prev')?.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

// Keyboard & swipe controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.code === 'Space') {
    document.getElementById('next')?.click();
  } else if (e.key === 'ArrowLeft') {
    document.getElementById('prev')?.click();
  }
});

let touchStart = 0;
document.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const touchEnd = e.changedTouches[0].clientX;
  if (touchStart - touchEnd > 50) {
    document.getElementById('next')?.click();
  } else if (touchEnd - touchStart > 50) {
    document.getElementById('prev')?.click();
  }
});

// Mock AI Chat (Demo Mode - No API Required)
const chatButton = document.getElementById('ai-chat-toggle');
const chatPanel = document.getElementById('ai-chat-panel');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendButton = document.getElementById('send-btn');

// Mock responses based on slide content
const mockResponses = {
  0: [
    "The Cognitive Load Companion is an AI product that helps manage mental clutter and prevents decision fatigue.",
    "It's designed to capture thoughts proactively, not reactively like existing tools.",
    "The companion understands context and helps users prioritize before cognitive overload happens.",
  ],
  1: [
    "Daily cognitive overload is real—people handle ~6,200 cognitive events per day while losing 40% productivity.",
    "67% of professionals report mental overload. It's a hidden crisis affecting focus and wellbeing.",
    "The problem: fragmented thoughts, unfinished tasks, and decision fatigue accumulate.",
  ],
  2: [
    "Current tools like Notion, Todoist, and Otter.ai are reactive—they wait for manual input.",
    "The Cognitive Load Companion is different: it anticipates needs, captures organic thoughts, and integrates everything.",
    "The market gap is massive because no one is offering proactive, integrated cognitive management.",
  ],
  3: [
    "The product has three layers: Ambient Capture (voice/text), Intelligent Triage (prioritization), and Autonomous Action (timely reminders).",
    "It uses on-device processing for privacy and federated learning to improve continuously.",
    "The platform spans mobile, desktop, and web for seamless access.",
  ],
  4: [
    "Key features: Spontaneous Capture (no forms needed), Natural Workflow Integration (groups related thoughts), and Predictive Load Management.",
    "Unlike competitors, the Companion understands your energy patterns and suggests optimal timing.",
    "It shifts tasks proactively so you act at the right moment, not when overloaded.",
  ],
  5: [
    "The design is minimalist to reduce cognitive strain—a calm, focused interface.",
    "Multi-modal access means voice, text, gestures, and context-aware interactions.",
    "Onboarding takes 2–3 weeks to establish baseline patterns before delivering immediate value.",
  ],
  6: [
    "Pricing: $9.99/month for individuals, $4.99/month for students, and $250 for team plans.",
    "Teams benefit most—cognitive savings scale with organizational size and complexity.",
    "Enterprise customization includes analytics and deep integrations.",
  ],
  7: [
    "Beta results: 47% reduction in cognitive load, 32% productivity increase, 28% stress reduction.",
    "85% retention rate shows users love the product and keep using it.",
    "Early validation proves the market wants this solution.",
  ],
  8: [
    "Roadmap: Expand beta testing first, then public launch in Q4 2026.",
    "Enterprise integration comes next—deploying custom solutions for large organizations.",
    "The competitive advantage is managing spontaneous mental overhead end-to-end.",
  ],
};

// Generic responses for questions not tied to a specific slide
const genericResponses = [
  "Great question! Ask me about any slide by number (1-9) or ask about cognitive load, the business model, or market opportunity.",
  "The Cognitive Load Companion is built on three principles: proactive intelligence, integrated systems, and privacy-first design.",
  "Think of it as a personal AI that prevents burnout by managing your mental clutter before it becomes overwhelming.",
  "It's different from Notion, Todoist, or Otter because it doesn't wait for you to organize—it anticipates and organizes automatically.",
  "The market is hungry for this—67% of professionals report cognitive overload. We're solving a real, urgent problem.",
];

function getMockResponse(userMessage, slideNumber) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check if user is asking about a specific slide
  const slideMatch = userMessage.match(/slide\s*(\d+)/i);
  if (slideMatch) {
    const requestedSlide = parseInt(slideMatch[1]) - 1;
    if (requestedSlide >= 0 && requestedSlide < 9) {
      return mockResponses[requestedSlide][Math.floor(Math.random() * mockResponses[requestedSlide].length)];
    }
  }
  
  // Check for keywords related to current slide
  if (mockResponses[slideNumber] && mockResponses[slideNumber].length > 0) {
    return mockResponses[slideNumber][Math.floor(Math.random() * mockResponses[slideNumber].length)];
  }
  
  // Return generic response
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

if (chatButton) {
  chatButton.addEventListener('click', () => {
    chatPanel.classList.toggle('open');
  });
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message to chat
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-message user';
  userDiv.textContent = message;
  chatMessages.appendChild(userDiv);
  chatInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate typing delay
  setTimeout(() => {
    const mockResponse = getMockResponse(message, currentSlide);
    const aiDiv = document.createElement('div');
    aiDiv.className = 'chat-message ai';
    aiDiv.textContent = mockResponse;
    chatMessages.appendChild(aiDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
}

if (sendButton) {
  sendButton.addEventListener('click', sendMessage);
  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}
