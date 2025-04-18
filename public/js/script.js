document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const chatMessages = document.getElementById('chat-messages');
    
    // Store original window dimensions
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    
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
            // Scroll to bottom after loading chat history
            setTimeout(scrollToBottom, 100);
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
                        // Focus the input field again for mobile
                        refocusInputAfterSend();
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
                
                // Adding focus event for mobile
                input.addEventListener('focus', function() {
                    // Short delay to ensure keyboard is fully opened
                    setTimeout(() => {
                        handleKeyboardAppearance(true);
                    }, 300);
                });
                
                input.addEventListener('blur', function() {
                    setTimeout(() => {
                        handleKeyboardAppearance(false);
                    }, 300);
                });
            }
        });
    }

    // Function to refocus input after sending a message (better mobile UX)
    function refocusInputAfterSend() {
        // On mobile, focus the mobile input
        if (window.innerWidth <= 992) {
            const mobileInput = document.querySelector('#mobile-user-input') || document.querySelector('.chat-input');
            if (mobileInput) {
                mobileInput.focus();
            }
        }
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
    
    // Function to generate bot responses - you'll need to implement your own logic here
    function generateBotResponse(message) {
        // Simple example response
        return "Terimakasih atas pesan Anda: \"" + message + "\". Kami akan segera memproses pertanyaan Anda.";
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
            <div class="message-time">${timeString}</div>
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
            <div class="message-time">${timeString}</div>
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
    
    // Enhanced scroll to bottom function
    function scrollToBottom() {
        if (chatMessages) {
            // Use smoothScroll for better UX when possible
            if ('scrollBehavior' in document.documentElement.style) {
                chatMessages.scrollTo({
                    top: chatMessages.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for browsers that don't support smooth scrolling
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
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
    
    // ===== MOBILE KEYBOARD HANDLING =====
    
    // Function to handle keyboard appearance/disappearance
    function handleKeyboardAppearance(isKeyboardVisible) {
        const chatContainer = document.querySelector('.chat-container');
        const chatInput = document.querySelector('.chat-input-container');
        
        if (!chatContainer || !chatInput) return;
        
        if (isKeyboardVisible) {
            // When keyboard is visible
            chatContainer.classList.add('keyboard-open');
            document.body.classList.add('keyboard-open');
            
            // Make sure chat area remains scrollable
            chatMessages.style.flexGrow = '1';
            chatMessages.style.overflow = 'auto';
            
            // Scroll to bottom with a slight delay to ensure keyboard is fully opened
            setTimeout(scrollToBottom, 300);
        } else {
            // When keyboard is hidden
            chatContainer.classList.remove('keyboard-open');
            document.body.classList.remove('keyboard-open');
            
            // Reset any temporary styles
            chatMessages.style.paddingBottom = '';
        }
    }
    
    // Detect keyboard visibility changes through window resize events
    function setupKeyboardDetection() {
        // Only for mobile devices
        if (window.innerWidth <= 992) {
            window.addEventListener('resize', function() {
                // If height significantly decreases, keyboard is likely visible
                const isKeyboardVisible = window.innerHeight < windowHeight * 0.75;
                handleKeyboardAppearance(isKeyboardVisible);
                
                // Update stored dimensions for future comparisons
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth;
            });
            
            // Support for iOS devices
            if ('visualViewport' in window) {
                window.visualViewport.addEventListener('resize', function() {
                    const isKeyboardVisible = window.visualViewport.height < windowHeight * 0.75;
                    handleKeyboardAppearance(isKeyboardVisible);
                });
            }
        }
    }
    
    // Setup keyboard detection
    setupKeyboardDetection();
    
    // Orientation change handler
    window.addEventListener('orientationchange', function() {
        // Small delay to allow the browser to complete orientation change
        setTimeout(() => {
            windowHeight = window.innerHeight;
            windowWidth = window.innerWidth;
            scrollToBottom();
        }, 300);
    });
    
    // Add CSS rules for keyboard handling
    function addKeyboardStyles() {
        const style = document.createElement('style');
        style.textContent = `
            body.keyboard-open {
                height: 100% !important;
                position: fixed;
                width: 100%;
            }
            
            .chat-container.keyboard-open {
                bottom: 0 !important;
                position: absolute;
                height: 100% !important;
            }
            
            .chat-container.keyboard-open .chat-messages {
                flex: 1;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            @media (max-width: 992px) {
                .chat-input-container {
                    position: sticky !important;
                    bottom: 0 !important;
                    z-index: 1000;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add keyboard styles
    addKeyboardStyles();
});
