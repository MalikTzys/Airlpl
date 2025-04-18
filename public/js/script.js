document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const chatMessages = document.getElementById('chat-messages');
    
    // Get all input fields and send buttons (both mobile and desktop)
    const userInputs = document.querySelectorAll('#user-input, #mobile-user-input, .chat-input, .search-input');
    const sendButtons = document.querySelectorAll('#send-button, #mobile-send-button');
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Back button functionality - untuk semua back button di aplikasi
    const backButtons = document.querySelectorAll('.back-button, #mobile-back, #desktop-back');
    backButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                window.history.back();
            });
        }
    });
    
    // Check for saved theme preference and apply it
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            if (themeToggle) themeToggle.checked = false;
        }
    }
    
    // Load theme preference on page load
    loadThemePreference();
    
    // Theme Toggle Functionality
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Chat history persistence
    const currentPage = window.location.pathname;
    const chatHistoryKey = `chatHistory-${currentPage}`;
    
    // Load chat history from localStorage if available
    function loadChatHistory() {
        const savedChat = localStorage.getItem(chatHistoryKey);
        if (savedChat && chatMessages) {
            const chatHistory = JSON.parse(savedChat);
            chatHistory.forEach(msg => {
                if (msg.type === 'user') {
                    addUserMessage(msg.content, false);
                } else {
                    addBotMessage(msg.content, false);
                }
            });
        } else if (chatMessages) {
            // Initial welcome message only if no chat history
            setTimeout(() => {
                addBotMessage("Halo, saya adalah chatbot yang siap melayani Anda untuk menjawab pertanyaan pertanyaan Anda.");
            }, 1000);
        }
    }
    
    // Save chat history to localStorage
    function saveChatHistory(type, content) {
        let chatHistory = [];
        const savedChat = localStorage.getItem(chatHistoryKey);
        
        if (savedChat) {
            chatHistory = JSON.parse(savedChat);
        }
        
        chatHistory.push({
            type: type,
            content: content
        });
        
        localStorage.setItem(chatHistoryKey, JSON.stringify(chatHistory));
    }
    
    // Load chat history on page load
    loadChatHistory();
    
    // Send message function for all input fields and buttons
    function setupMessageSending() {
        // Get current values of input fields
        function getCurrentInputValue() {
            let value = '';
            userInputs.forEach(input => {
                if (input && input.value.trim() !== '') {
                    value = input.value.trim();
                }
            });
            return value;
        }

        // Clear all input fields
        function clearAllInputs() {
            userInputs.forEach(input => {
                if (input) input.value = '';
            });
        }

        // Handle send button clicks
        sendButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function() {
                    const message = getCurrentInputValue();
                    if (message !== '') {
                        sendMessage(message);
                        clearAllInputs();
                    }
                });
            }
        });

        // Handle Enter key on all input fields
        userInputs.forEach(input => {
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Mencegah default behavior (seperti form submission)
                        
                        // Semua jenis input diperlakukan sama - sebagai chat input
                        const message = this.value.trim();
                        if (message !== '') {
                            sendMessage(message);
                            clearAllInputs();
                        }
                    }
                });
            }
        });
    }

    setupMessageSending();
    
    // Navigation buttons functionality - DIUBAH: langsung kirim ke chat
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            // Langsung kirim pesan tanpa memasukkan ke input fields
            sendMessage(buttonText);
        });
    });
    
    // Function to send message
    function sendMessage(message) {
        if (!message || message === '') return;
        
        // Add user message to chat
        addUserMessage(message, true);
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response after a delay
        setTimeout(() => {
            removeTypingIndicator();
            
            // Generate bot response based on user input
            const botResponse = generateBotResponse(message);
            addBotMessage(botResponse, true);
        }, 1500);
    }
    
    // Function to add user message to chat
    function addUserMessage(message, save = true) {
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        
        // Add timestamp
        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            ${message}
        `;
        
        chatMessages.appendChild(messageElement);
        
        if (save) {
            saveChatHistory('user', message);
        }
        
        scrollToBottom();
    }
    
    // Function to add bot message to chat
    function addBotMessage(message, save = true) {
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        
        // Add timestamp
        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            ${message}
        `;
        
        chatMessages.appendChild(messageElement);
        
        if (save) {
            saveChatHistory('bot', message);
        }
        
        scrollToBottom();
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        if (!chatMessages) return;
        
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('typing-dot');
            typingIndicator.appendChild(dot);
        }
        
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to scroll chat to bottom
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Add animations to elements when page loads
    function addLoadAnimations() {
        const elements = [
            document.querySelector('.chatbot-title'),
            document.querySelector('.navigation-buttons'),
            document.querySelector('.search-container'),
            document.querySelector('.back-button')
        ];
        
        elements.forEach((element, index) => {
            if (element) { // Check if element exists before applying animation
                setTimeout(() => {
                    element.style.opacity = '0';
                    element.style.animation = `fadeIn 0.5s ease-in-out forwards`;
                }, index * 200);
            }
        });
    }
    
    // Add animations on load
    addLoadAnimations();
    
    // Mobile keyboard handling
    let viewportHeight = window.innerHeight;
    const chatContainer = document.querySelector('.chat-container');
    const chatInputContainer = document.querySelector('.chat-input-container');
    
    // Store original viewport height
    window.addEventListener('load', function() {
        viewportHeight = window.innerHeight;
        document.documentElement.style.setProperty('--viewport-height', `${viewportHeight}px`);
    });
    
    // Handle resize events (including keyboard appearance)
    window.addEventListener('resize', function() {
        const currentHeight = window.innerHeight;
        const isKeyboardVisible = currentHeight < viewportHeight;
        
        if (isKeyboardVisible) {
            // Keyboard is visible
            document.body.classList.add('keyboard-visible');
            
            // Ensure chat container has proper height
            if (chatContainer) {
                chatContainer.style.height = `${currentHeight - (chatInputContainer ? chatInputContainer.offsetHeight : 0)}px`;
            }
            
            // Scroll to bottom after a short delay to ensure layout is complete
            setTimeout(scrollToBottom, 100);
        } else {
            // Keyboard is hidden
            document.body.classList.remove('keyboard-visible');
            
            // Reset chat container height
            if (chatContainer) {
                chatContainer.style.height = '';
            }
        }
    });
    
    // Focus handling for input fields
    userInputs.forEach(input => {
        if (input) {
            // When input is focused, add a class to help with positioning
            input.addEventListener('focus', function() {
                document.body.classList.add('input-focused');
                // Scroll to bottom after a short delay
                setTimeout(scrollToBottom, 100);
            });
            
            // When input loses focus, remove the class
            input.addEventListener('blur', function() {
                document.body.classList.remove('input-focused');
            });
        }
    });
    
    // Function to generate bot response (placeholder)
    function generateBotResponse(message) {
        return "Terima kasih atas pesan Anda. Saya sedang memproses informasi yang Anda berikan.";
    }
});
