document.addEventListener('DOMContentLoaded', function() {
    // Existing DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const chatMessages = document.getElementById('chat-messages');
    
    // Get all input fields and send buttons (both mobile and desktop)
    const userInputs = document.querySelectorAll('#user-input, #mobile-user-input, .chat-input, .search-input');
    const sendButtons = document.querySelectorAll('#send-button, #mobile-send-button');
    const navButtons = document.querySelectorAll('.nav-button');
    const chatContainer = document.querySelector('.chat-container');
    const chatInputContainer = document.querySelector('.chat-input-container');
    
    // Track keyboard state
    let isKeyboardVisible = false;
    let originalWindowHeight = window.innerHeight;
    
    // Function to handle keyboard appearance
    function handleKeyboardVisibility() {
        // On iOS we can detect keyboard by comparing window height
        const currentWindowHeight = window.innerHeight;
        const heightDifference = Math.abs(originalWindowHeight - currentWindowHeight);
        
        // If height difference is significant, keyboard is likely visible
        if (heightDifference > 150 && currentWindowHeight < originalWindowHeight) {
            if (!isKeyboardVisible) {
                isKeyboardVisible = true;
                adjustForKeyboard(true);
            }
        } else {
            if (isKeyboardVisible) {
                isKeyboardVisible = false;
                adjustForKeyboard(false);
            }
        }
    }
    
    // Function to adjust layout when keyboard appears/disappears
    function adjustForKeyboard(keyboardVisible) {
        if (keyboardVisible) {
            // When keyboard appears
            if (chatContainer) {
                // Ensure chat container is properly sized when keyboard is visible
                chatContainer.style.height = `${window.innerHeight}px`;
                chatContainer.classList.add('keyboard-visible');
            }
            
            if (chatInputContainer) {
                // Keep input container visible above keyboard
                chatInputContainer.style.position = 'fixed';
                chatInputContainer.style.bottom = '0';
                chatInputContainer.style.zIndex = '1000';
            }
            
            // Scroll to bottom when keyboard appears
            setTimeout(scrollToBottom, 100);
            
        } else {
            // When keyboard disappears
            if (chatContainer) {
                chatContainer.style.height = '';
                chatContainer.classList.remove('keyboard-visible');
            }
            
            if (chatInputContainer) {
                // Reset position when keyboard is hidden (use original CSS)
                chatInputContainer.style.position = '';
                chatInputContainer.style.bottom = '';
            }
            
            // Restore scroll position
            setTimeout(scrollToBottom, 100);
        }
    }
    
    // Event listeners for keyboard appearance
    window.addEventListener('resize', handleKeyboardVisibility);
    
    // For iOS/Android, focus and blur can help detect keyboard
    userInputs.forEach(input => {
        if (input) {
            input.addEventListener('focus', function() {
                // On input focus, adjust layout for keyboard
                setTimeout(() => {
                    isKeyboardVisible = true;
                    adjustForKeyboard(true);
                }, 300); // Delay to allow keyboard to fully appear
            });
            
            input.addEventListener('blur', function() {
                // On input blur, reset layout
                setTimeout(() => {
                    isKeyboardVisible = false;
                    adjustForKeyboard(false);
                }, 100);
            });
        }
    });
    
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
    
    // Fix viewport height issues on mobile (especially iOS)
    function setMobileViewportHeight() {
        // Set the --vh custom property based on the actual viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Update chat container height
        if (chatContainer) {
            chatContainer.style.height = `calc(var(--vh, 1vh) * 100)`;
        }
    }
    
    // Set initial viewport height
    setMobileViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setMobileViewportHeight);
    window.addEventListener('orientationchange', () => {
        // Small delay to ensure correct calculation after orientation change
        setTimeout(setMobileViewportHeight, 100);
        
        // Reset keyboard detection
        originalWindowHeight = window.innerHeight;
        isKeyboardVisible = false;
        
        // Adjust layout
        adjustForKeyboard(false);
    });
    
    // Additional iOS-specific fixes
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // iOS scrolling issues fix
        document.addEventListener('touchmove', function(e) {
            if (e.target.closest('.chat-messages')) {
                e.stopPropagation();
            }
        }, { passive: true });
        
        // Prevent elastic scrolling on body
        document.body.addEventListener('touchmove', function(e) {
            if (!e.target.closest('.chat-messages')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});
