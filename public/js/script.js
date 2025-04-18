document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const chatMessages = document.getElementById('chat-messages');
    const chatContainer = document.querySelector('.chat-container');
    const chatInputContainer = document.querySelector('.chat-input-container');
    
    // Get all input fields and send buttons (both mobile and desktop)
    const userInputs = document.querySelectorAll('#user-input, #mobile-user-input, .chat-input, .search-input');
    const sendButtons = document.querySelectorAll('#send-button, #mobile-send-button');
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Track viewport height for mobile keyboard adjustments
    let viewportHeight = window.innerHeight;
    let isKeyboardVisible = false;
    
    // Mobile keyboard detection and handling
    function setupMobileKeyboardHandling() {
        // Store original viewport height
        viewportHeight = window.innerHeight;
        
        // Handle resize events (keyboard showing/hiding)
        window.addEventListener('resize', function() {
            // On mobile devices, when keyboard appears, window height decreases
            if (window.innerWidth <= 992) { // Mobile breakpoint from your CSS
                const heightDifference = viewportHeight - window.innerHeight;
                
                // If height decreased significantly, keyboard is likely visible
                if (heightDifference > 150) {
                    isKeyboardVisible = true;
                    handleKeyboardVisible();
                } else {
                    isKeyboardVisible = false;
                    handleKeyboardHidden();
                }
            }
        });
        
        // Handle focus/blur events on input fields
        userInputs.forEach(function(input) {
            if (input) {
                input.addEventListener('focus', function() {
                    if (window.innerWidth <= 992) {
                        setTimeout(function() {
                            handleKeyboardVisible();
                            scrollToBottom();
                        }, 300); // Slight delay to allow keyboard to appear
                    }
                });
                
                input.addEventListener('blur', function() {
                    if (window.innerWidth <= 992) {
                        setTimeout(function() {
                            handleKeyboardHidden();
                        }, 100);
                    }
                });
            }
        });
    }
    
    // Function to handle keyboard becoming visible
    function handleKeyboardVisible() {
        if (chatContainer && chatInputContainer) {
            // Add class for when keyboard is visible
            document.body.classList.add('keyboard-visible');
            
            // Make sure the input stays in view
            chatInputContainer.style.position = 'fixed';
            chatInputContainer.style.bottom = '0';
            chatInputContainer.style.left = '15px';
            chatInputContainer.style.right = '15px';
            chatInputContainer.style.zIndex = '999';
            
            // Adjust chat messages container to not overlap with input
            const inputHeight = chatInputContainer.offsetHeight;
            chatMessages.style.paddingBottom = (inputHeight + 15) + 'px';
            
            // Scroll to the latest message
            scrollToBottom();
        }
    }
    
    // Function to handle keyboard hiding
    function handleKeyboardHidden() {
        if (chatContainer && chatInputContainer) {
            // Remove keyboard visible class
            document.body.classList.remove('keyboard-visible');
            
            // Reset styles if needed
            // For most cases we can keep the fixed positioning as it works well for the chat interface
            
            // Ensure messages don't hide behind input
            const inputHeight = chatInputContainer.offsetHeight;
            chatMessages.style.paddingBottom = (inputHeight + 15) + 'px';
            
            // Make sure everything is properly positioned after keyboard hides
            setTimeout(function() {
                scrollToBottom();
                // Reset viewportHeight in case it changed
                viewportHeight = window.innerHeight;
            }, 300);
        }
    }
    
    // Initialize mobile keyboard handling
    setupMobileKeyboardHandling();
    
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
                scrollToBottom();
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
                            
                            // Keep focus on input after sending
                            if (window.innerWidth <= 992) {
                                this.focus();
                            }
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
    
    // Improved function to scroll chat to bottom
    function scrollToBottom() {
        if (chatMessages) {
            // Use smooth scrolling for better UX
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
            
            // Fallback in case smooth scrolling doesn't work
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 50);
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
});
