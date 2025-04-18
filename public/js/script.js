document.addEventListener('DOMContentLoaded', function() {
    // Original code components
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
    
    // ===== KEYBOARD FIX FOR MOBILE DEVICES =====
    
    // Variables to store initial viewport settings
    let viewportInitialHeight;
    let initialClientHeight;
    const rightPanel = document.querySelector('.right-panel');
    const chatContainer = document.querySelector('.chat-container');
    const chatInputContainer = document.querySelector('.chat-input-container');
    
    // Check if this is a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Store initial heights when page loads
        initialClientHeight = document.documentElement.clientHeight;
        viewportInitialHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        
        // Function to handle visual viewport changes (modern browsers)
        function handleVisualViewportResize() {
            const currentViewportHeight = window.visualViewport.height;
            
            // If the viewport height is significantly less than initial, keyboard is likely shown
            const keyboardShown = currentViewportHeight < viewportInitialHeight * 0.75;
            
            if (keyboardShown) {
                // Keyboard is shown - adjust layout
                document.body.classList.add('keyboard-open');
                
                if (rightPanel) {
                    // Fix the height of the chat panel
                    rightPanel.style.height = `${currentViewportHeight}px`;
                }
                
                if (chatContainer) {
                    // Adjust chat container to make room for keyboard and input
                    const inputHeight = chatInputContainer ? chatInputContainer.offsetHeight : 60;
                    chatContainer.style.height = `${currentViewportHeight - inputHeight}px`;
                }
                
                // Scroll to bottom after a brief delay to ensure layout is updated
                setTimeout(scrollToBottom, 100);
            } else {
                // Keyboard is hidden - restore normal layout
                document.body.classList.remove('keyboard-open');
                
                if (rightPanel) {
                    rightPanel.style.height = '';
                }
                
                if (chatContainer) {
                    chatContainer.style.height = '';
                }
            }
        }
        
        // Function to handle resize events (fallback for older browsers)
        function handleResize() {
            const currentHeight = window.innerHeight;
            
            // If the window height is significantly less than initial, keyboard is likely shown
            const keyboardShown = currentHeight < initialClientHeight * 0.75;
            
            if (keyboardShown) {
                // Keyboard is shown - adjust layout
                document.body.classList.add('keyboard-open');
                
                if (rightPanel) {
                    rightPanel.style.height = `${currentHeight}px`;
                }
                
                if (chatContainer) {
                    const inputHeight = chatInputContainer ? chatInputContainer.offsetHeight : 60;
                    chatContainer.style.height = `${currentHeight - inputHeight}px`;
                }
                
                setTimeout(scrollToBottom, 100);
            } else {
                // Keyboard is hidden - restore normal layout
                document.body.classList.remove('keyboard-open');
                
                if (rightPanel) {
                    rightPanel.style.height = '';
                }
                
                if (chatContainer) {
                    chatContainer.style.height = '';
                }
            }
        }
        
        // Add CSS rule for keyboard-open state
        const style = document.createElement('style');
        style.innerHTML = `
            body.keyboard-open {
                overflow: hidden;
                position: fixed;
                width: 100%;
                height: 100%;
            }
            
            body.keyboard-open .right-panel {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
            }
            
            body.keyboard-open .chat-container {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            body.keyboard-open .chat-input-container {
                position: absolute;
                bottom: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners for input focus/blur to manage keyboard state
        userInputs.forEach(input => {
            if (input) {
                input.addEventListener('focus', function() {
                    // When input is focused, keyboard will appear
                    // Add a small delay to ensure keyboard is fully shown
                    setTimeout(function() {
                        if (window.visualViewport) {
                            handleVisualViewportResize();
                        } else {
                            handleResize();
                        }
                        // Scroll to bottom to ensure input is visible
                        scrollToBottom();
                    }, 300);
                });
            }
        });
        
        // Use visualViewport API if available (modern browsers)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleVisualViewportResize);
        } else {
            // Fallback to window resize for older browsers
            window.addEventListener('resize', handleResize);
        }
        
        // Prevent page zoom on iOS when focusing input fields
        const metaViewport = document.querySelector('meta[name=viewport]');
        if (!metaViewport) {
            const newMetaViewport = document.createElement('meta');
            newMetaViewport.name = 'viewport';
            newMetaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1';
            document.head.appendChild(newMetaViewport);
        } else {
            metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1';
        }
        
        // Prevent iOS from trying to scroll to focused input
        document.addEventListener('touchmove', function(e) {
            if (document.body.classList.contains('keyboard-open')) {
                // Allow scrolling only within chat messages
                if (!isDescendant(chatMessages, e.target)) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
        
        // Helper function to check if element is descendant
        function isDescendant(parent, child) {
            let node = child;
            while (node != null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
    }
});
