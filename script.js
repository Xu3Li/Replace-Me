  // Game state
        const gameState = {
            playerName: '',
            stressLevel: 0,
            scene: 'intro',
            dialogueIndex: 0,
            timerRunning: false,
            timeRemaining: 0,
            shadowPosition: 0,
            interactionItems: [],
            currentConversation: null,
            testIndex: 0,
            runPromptShown: false,


            
            numberGameActive: false,
            numberGameCurrentNumber: 1,
            numberGameTimeRemaining: 60,
            numberGameTimer: null,

             essayGameActive: false,
            selectedWords: [],
                 essayWords: [
            // Positive growth words (from research)
            { word: "resilience", correct: true, tooltip: "Steare's study shows resilience buffers against academic stress" },
            { word: "self-worth", correct: true, tooltip: "Sakamoto emphasizes separating worth from grades" },
            { word: "balance", correct: true, tooltip: "Key to preventing burnout (APA guidelines)" },
            
            // Negative perfectionism words
            { word: "perfect", correct: false, tooltip: "Perfectionism correlates with depression (Steare)" },
            { word: "failure", correct: false, tooltip: "Okechukwu links this perception to suicidal ideation" },
            { word: "worthless", correct: false, tooltip: "Extreme outcome of performance-based identity" },
            
            // Social media influence
            { word: "comparison", correct: false, tooltip: "McLean shows how social media exacerbates stress" },
            { word: "validation", correct: false, tooltip: "Penn Medicine notes dopamine-seeking behavior" },
            
            // Recovery words
            { word: "therapy", correct: true, tooltip: "Clinical intervention for academic stress" },
            { word: "boundaries", correct: true, tooltip: "Protective factor against burnout" }
        ]
            
        };
        
        // Game elements
        const gameContainer = document.getElementById('game-container');
        const roomContainer = document.getElementById('room-container');
        const mainStar = document.getElementById('main-star');
        const textContainer = document.getElementById('text-container');
        const nameInput = document.getElementById('name-input');
        const enterButton = document.getElementById('enter-button');
        const mirrorScene = document.getElementById('mirror-scene');
        const roomScene = document.getElementById('room-scene');
        const kitchenScene = document.getElementById('kitchen-scene');
        const schoolScene = document.getElementById('school-scene');
        const hallwayScene = document.getElementById('hallway-scene');
        const hospitalScene = document.getElementById('hospital-scene');
        const stressMeterContainer = document.getElementById('stress-meter-container');
        const stressMeter = document.getElementById('stress-meter');
        const stressValue = document.getElementById('stress-value');
        const timerContainer = document.getElementById('timer-container');
        const timerValue = document.getElementById('timer-value');
        const phoneContainer = document.getElementById('phone-container');
        const phoneContent = document.getElementById('phone-content');
        const phoneCloseButton = document.getElementById('phone-close-button');
        const dialogueContainer = document.getElementById('dialogue-container');
        const dialogueText = document.getElementById('dialogue-text');
        const dialogueOptions = document.getElementById('dialogue-options');
        const shadowFollower = document.getElementById('shadow-follower');
        const questionContainer = document.getElementById('question-container');
        const questionText = document.getElementById('question-text');
        const answerOptions = document.getElementById('answer-options');
        const countdown = document.getElementById('countdown');
        
        const essayGameContainer = document.getElementById('essay-game-container');
const essayGameText = document.getElementById('essay-game-text');
const essayGameWords = document.getElementById('essay-game-words');
const essayGameFeedback = document.getElementById('essay-game-feedback');
const essayGameSubmit = document.getElementById('essay-game-submit');

const nextButton = document.getElementById('next-button');
const hospitalText1 = document.getElementById('hospital-text-1');
const hospitalText2 = document.getElementById('hospital-text-2');

        // Center the star initially
        mainStar.style.top = '50%';
        mainStar.style.left = '50%';
        mainStar.style.transform = 'translate(-50%, -50%)';
        
        // Event listener for the Enter button
        enterButton.addEventListener('click', startGame);
        
        // Allow pressing Enter key to start the game
        nameInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                startGame();
            }
        });
        
        // Phone close button event listener
        phoneCloseButton.addEventListener('click', closePhone);
        
        // Game functions
       function startGame() {
    gameState.playerName = nameInput.value.trim() || 'Student';
    
    if (!gameState.playerName) {
        alert("Please enter a name or click Enter to continue as 'Student'");
        return;
    }
    
    // Float up the star
    mainStar.classList.add('float-up');
    
    // Clear the text container
    textContainer.innerHTML = '';
    
    // Show the mystery message first
    const mysteryMessage = document.getElementById('mystery-message');
    mysteryMessage.style.display = 'block';
    
    // After showing the message, start the typewriter sequence
    setTimeout(() => {
        mysteryMessage.style.display = 'none';
        startTypewriterSequence();
    }, 8000); // Show for 5 seconds
}

function startTypewriterSequence() {
    // Create typewriter container
    const typewriterContainer = document.createElement('div');
    typewriterContainer.className = 'typewriter-container';
    gameContainer.appendChild(typewriterContainer);
    
    // Display first text with typewriter effect
    showTypewriterText(
        typewriterContainer, 
        "You wake up on a desk to an empty room. You look around. The room is unfamiliar...you think. You stare at yourself in the mirror",
        () => {
            // After typewriter completes, show the mirror button
            const mirrorButton = document.createElement('button');
            mirrorButton.className = 'mirror-button';
            mirrorButton.textContent = 'Look in the mirror';
            mirrorButton.style.display = 'inline-block';
            mirrorButton.addEventListener('click', () => {
                // When button is clicked, show second text
                mirrorButton.style.display = 'none';
                showTypewriterText(
                    typewriterContainer,
                    "You don't recognize yourself. Who is this person? And...",
                    () => {
                        // After second text, show Wake Up button
                        setTimeout(showWakeUpPrompt, 1000);
                        // Remove typewriter container
                        typewriterContainer.remove();
                    }
                );
            });
            typewriterContainer.appendChild(mirrorButton);
        }
    );
}

function showTypewriterText(container, text, callback) {
    // Clear container first
    container.innerHTML = '';
    
    // Create text element
    const textElement = document.createElement('div');
    textElement.className = 'typewriter-text typing-animation';
    textElement.textContent = text;
    container.appendChild(textElement);
    
    // Call callback after animation finishes
    setTimeout(() => {
        if (callback) callback();
    }, 3500); // Match to the CSS animation duration
}
        function showErrorMessages() {
            // Clear any existing content
            textContainer.innerHTML = '';
            
            // Generate random error messages
            const errorMessages = [
                "ERROR: Identity not found.",
                "ERROR: Self-perception corrupted.",
                "ERROR: Perfectionism overload.",
                "ERROR: Expectations exceed capacity.",
                "ERROR: Mental health critical.",
                "ERROR: Academic pressure exceeding limits.",
                "ERROR: Anxiety levels at threshold.",
                "ERROR: Sleep deprivation detected.",
                "ERROR: Social isolation increasing.",
                "ERROR: Self-worth unrecognized.",
                "ERROR: Burnout imminent.",
                "ERROR: Performance cannot be sustained."
            ];
            
            // Display error messages at random positions
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];
                    
                    // Random position
                    errorMessage.style.left = Math.random() * 70 + 15 + '%';
                    errorMessage.style.top = Math.random() * 70 + 15 + '%';
                    
                    gameContainer.appendChild(errorMessage);
                    
                    // Remove after a delay
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 2000);
                }, i * 150);
            }
            
            // After all errors, show "Wake Up" text
            setTimeout(showWakeUpPrompt, 4000);
            startTypewriterSequence();
        }
        
        function showWakeUpPrompt() {
            // Clear all error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            // Add "Wake Up" text
            textContainer.innerHTML = '<div class="shake-text">[ Wake Up. ]</div>';
            
            // Add a button after a delay
            setTimeout(() => {
                const wakeUpButton = document.createElement('button');
                wakeUpButton.className = 'wake-up-button';
                wakeUpButton.textContent = 'Wake Up';
                wakeUpButton.addEventListener('click', startMirrorScene);
                textContainer.appendChild(wakeUpButton);
            }, 1500);
        }
        
        function startMirrorScene() {
            // Hide the game container and show the room container
            gameContainer.style.display = 'none';
            roomContainer.style.display = 'flex'; // Changed to flex
            
            // Show the mirror scene
            mirrorScene.style.display = 'flex';
            
            // Set initial scene state
            gameState.scene = 'mirror';
            
            // Create dialogue for mirror scene
            showDialogue('Who are you?', [], () => {
                // After this dialogue, transition to the room scene
                setTimeout(() => {
                    mirrorScene.classList.add('fade-out');
                    setTimeout(() => {
                        mirrorScene.style.display = 'none';
                        startRoomScene();
                    }, 2000);
                }, 0);
            });
        }
        
        function startRoomScene() {
            // Show room scene
            roomScene.style.display = 'flex';
            roomScene.classList.add('fade-in');
            
            // Show stress meter
            stressMeterContainer.style.display = 'block';
            updateStressLevel(30); // Starting stress level
            
            // Create interaction items in the room
            createRoomInteractions();
            
            // Show initial dialogue for room scene
            showDialogue('You\'re in a room. Look around.', [], null);
        }
        
        function createRoomInteractions() {
            // Clear any existing interaction items
            gameState.interactionItems.forEach(item => item.element.remove());
            gameState.interactionItems = [];
            
            // Create desk interaction
            const deskItem = createInteractionItem('Desk', '20%', '70%');
            deskItem.element.addEventListener('click', () => {
                showDialogue('A desk with a phone and school materials.', [
                    { text: 'Check phone', action: openPhone }
                ], null);
            });
            
            // Create bed interaction
            const bedItem = createInteractionItem('Bed', '70%', '70%');
            bedItem.element.addEventListener('click', () => {
                showDialogue('A neatly made bed. Not much time for sleep lately.', [], null);
                updateStressLevel(-5); // Reduce stress slightly
            });
            
            // Create bookshelf interaction
            const bookshelfItem = createInteractionItem('Bookshelf', '85%', '40%');
            bookshelfItem.element.addEventListener('click', () => {
                showDialogue('Shelves packed with textbooks, AP guides, and college prep materials.', [], null);
                updateStressLevel(5); // Increase stress slightly
            });
            
            // Create door interaction
            const doorItem = createInteractionItem('Door', '50%', '20%');
            doorItem.element.addEventListener('click', () => {
                // Only allow going through the door after the phone interaction
                if (gameState.scene === 'room-after-phone') {
                    startNumberGame(); // Changed from startKitchenCountdown to startNumberGame
                } else {
                    showDialogue('The door to the hallway. Your mom might be waiting downstairs.', [], null);
                }
            });
        }
        
        function createInteractionItem(text, leftPos, topPos) {
            const item = {
                text: text,
                element: document.createElement('div')
            };
            
            item.element.className = 'interaction-item';
            item.element.textContent = text;
            item.element.style.left = leftPos;
            item.element.style.top = topPos;
            
            roomScene.appendChild(item.element);
            gameState.interactionItems.push(item);
            
            return item;
        }
        
        function showDialogue(text, options, callback, isHospital = false) {
    // Set dialogue text
    dialogueText.textContent = text;
    
    // Clear previous options
    dialogueOptions.innerHTML = '';
    
    // Position differently for hospital scene
    if (isHospital) {
        dialogueContainer.style.bottom = '40%';
        dialogueContainer.style.width = '60%';
        dialogueContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        dialogueText.style.color = 'black';
    } else {
        dialogueContainer.style.bottom = '20px';
        dialogueContainer.style.width = '80%';
        dialogueContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        dialogueText.style.color = 'white';
    }
    
    // Add click handler to the entire container if there are no options
    if (!options || options.length === 0) {
        dialogueContainer.onclick = function() {
            if (callback) {
                callback();
            }
            // Remove the click handler after it's used
            dialogueContainer.onclick = null;
        };
    } else {
        // If there are options, don't make the container clickable
        dialogueContainer.onclick = null;
        
        // Add new options if provided
        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'dialogue-option';
            optionElement.textContent = option.text;
            
            // Style differently for hospital scene
            if (isHospital) {
                optionElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                optionElement.style.color = 'white';
            }
            
            optionElement.addEventListener('click', () => {
                if (option.action) {
                    option.action();
                }
                if (callback) {
                    callback();
                }
            });
            dialogueOptions.appendChild(optionElement);
        });
    }
    
    // Show dialogue container
    dialogueContainer.style.display = 'block';
}
        
        function updateStressLevel(change) {
            gameState.stressLevel += change;
            
            // Ensure stress level stays within bounds (0-100)
            gameState.stressLevel = Math.max(0, Math.min(100, gameState.stressLevel));
            
            // Update stress meter display
            stressMeter.style.width = gameState.stressLevel + '%';
            stressValue.textContent = gameState.stressLevel + '%';
            
            // Check for game over condition
            if (gameState.stressLevel >= 80) {
                showDialogue('Your stress level is too high! You need to take a break.', [
                    { text: 'Continue', action: startHospitalScene }
                ], null);
            }
        }
        
        function openPhone() {
            // Define conversation
            const conversation = [
                { sender: 'friend', text: 'Hey! How\'s your college app coming along?' },
                { options: [
                    { text: 'It\'s going well!', stressChange: 5 },
                    { text: 'I\'m so stressed about it...', stressChange: -5 },
                    { text: 'Haven\'t started yet 😬', stressChange: 10 }
                ]},
                { sender: 'friend', text: 'Did you finish the AP Lang essay?' },
                { options: [
                    { text: 'Yes, spent all night on it', stressChange: 5 },
                    { text: 'Still working on it', stressChange: 10 },
                    { text: 'I\'ll do it tomorrow morning', stressChange: 15 }
                ]},
                { sender: 'friend', text: 'Don\'t forget we have that huge calc test tomorrow! Mr. Chen said it\'ll be 40% of our grade this quarter...' },
                { options: [
                    { text: 'I\'ve been studying all week', stressChange: 5 },
                    { text: 'Thanks for the reminder!', stressChange: 10 },
                    { text: '*Internally screaming*', stressChange: 15 }
                ]},
                { sender: 'friend', text: 'BTW, did you hear back from Princeton yet? They sent out some early responses!' }
            ];
            
            // Store the conversation
            gameState.currentConversation = conversation;
            gameState.dialogueIndex = 0;
            
            // Clear previous messages
            phoneContent.innerHTML = '';
            
            // Show phone container
            phoneContainer.style.display = 'flex';
            
            // Start conversation
            continuePhoneConversation();
        }
        
        function continuePhoneConversation() {
            const conversation = gameState.currentConversation;
            const currentMessage = conversation[gameState.dialogueIndex];
            
            if (!currentMessage) {
                // End of conversation
                showTutorialMessage();
                return;
            }
            
            if (currentMessage.sender) {
                // Add message from sender
                const messageElement = document.createElement('div');
                messageElement.className = 'message received';
                messageElement.textContent = currentMessage.text;
                phoneContent.appendChild(messageElement);
                phoneContent.scrollTop = phoneContent.scrollHeight;
                
                // Move to next message after a delay
                setTimeout(() => {
                   gameState.dialogueIndex++;
                    continuePhoneConversation();
                }, 1500);
            } else if (currentMessage.options) {
                // Show reply options
                const replyOptionsElement = document.createElement('div');
                replyOptionsElement.className = 'reply-options';
                
                currentMessage.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'reply-option';
                    optionElement.textContent = option.text;
                    optionElement.addEventListener('click', () => {
                        // Add selected reply
                        const replyElement = document.createElement('div');
                        replyElement.className = 'message sent';
                        replyElement.textContent = option.text;
                        phoneContent.appendChild(replyElement);
                        
                        // Remove reply options
                        replyOptionsElement.remove();
                        
                        // Update stress level
                        updateStressLevel(option.stressChange);
                        
                        // Move to next message after a delay
                        setTimeout(() => {
                            gameState.dialogueIndex++;
                            continuePhoneConversation();
                        }, 1000);
                    });
                    replyOptionsElement.appendChild(optionElement);
                });
                
                phoneContent.appendChild(replyOptionsElement);
                phoneContent.scrollTop = phoneContent.scrollHeight;
            }
        }
        
        function showTutorialMessage() {
            // Add final phone message
            const finalMessage = document.createElement('div');
            finalMessage.className = 'message received';
            finalMessage.textContent = "Oh! And don't forget about your essay due tomorrow! Need to nail it for your application.";
            phoneContent.appendChild(finalMessage);
            phoneContent.scrollTop = phoneContent.scrollHeight;
            
            // Show stress tip after a delay
            setTimeout(() => {
                const tipElement = document.createElement('div');
                tipElement.className = 'message received';
                tipElement.style.backgroundColor = '#663399';
                tipElement.innerHTML = '<b>GAME TIP:</b> Your answers will impact the game.<br>Watch your stress meter - do not let it go beyond 80%.';
                phoneContent.appendChild(tipElement);
                phoneContent.scrollTop = phoneContent.scrollHeight;
                
                // Update game state to allow leaving room
                gameState.scene = 'room-after-phone';
                
                // Add a message from mom
                setTimeout(() => {
                    const momMessage = document.createElement('div');
                    momMessage.className = 'message received';
                    momMessage.style.backgroundColor = '#990000';
                    momMessage.textContent = "MOM: Come downstairs now.";
                    phoneContent.appendChild(momMessage);
                    phoneContent.scrollTop = phoneContent.scrollHeight;
                }, 2000);
            }, 2000);
        }
        
        function startNumberGame() {
            // Hide dialogue
            dialogueContainer.style.display = 'none';
            
            // Show the number game container
            const numberGameContainer = document.getElementById('number-game-container');
            numberGameContainer.style.display = 'flex';
            
            // Set game state
            gameState.numberGameActive = true;
            gameState.numberGameCurrentNumber = 1;
            gameState.numberGameTimeRemaining = 60;
            
            // Create the number buttons (1-20, including 3)
            createNumberButtons();
            
            // Start the timer
            gameState.numberGameTimer = setInterval(updateNumberGameTimer, 1000);
        }

        function createNumberButtons() {
            const gameArea = document.getElementById('number-game-area');
            gameArea.innerHTML = '';
            
            // Create buttons 1-20 in random positions (including 3)
            for (let i = 1; i <= 20; i++) {
                const button = document.createElement('div');
                button.className = 'number-game-button';
                button.textContent = i;
                button.dataset.number = i;
                
                // Random position
                const left = Math.floor(Math.random() * 80) + 5; // 5% to 85%
                const top = Math.floor(Math.random() * 80) + 5; // 5% to 85%
                button.style.left = left + '%';
                button.style.top = top + '%';
                
                // Add click event
                button.addEventListener('click', () => {
                    const number = parseInt(button.dataset.number);
                    if (number === gameState.numberGameCurrentNumber) {
                        button.classList.add('clicked');
                        gameState.numberGameCurrentNumber++;
                        
                        // Check if all numbers are clicked
                        if (gameState.numberGameCurrentNumber > 20) {
                            endNumberGame(true);
                        }
                    } else {
                        // Wrong number - flash red
                        button.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                        setTimeout(() => {
                            button.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                        }, 300);
                        
                        // Penalty
                        updateStressLevel(2);
                    }
                });
                
                gameArea.appendChild(button);
            }
        }

        function updateNumberGameTimer() {
            if (!gameState.numberGameActive) return;
            
            gameState.numberGameTimeRemaining--;
            
            // Update timer display
            const timerElement = document.getElementById('number-game-timer');
            timerElement.textContent = `Time: ${gameState.numberGameTimeRemaining}`;
            
            // Check if time's up
            if (gameState.numberGameTimeRemaining <= 0) {
                endNumberGame(false);
            }
        }

       function endNumberGame(success) {
    // Clear timer
    clearInterval(gameState.numberGameTimer);
    gameState.numberGameActive = false;
    
    // Update game area
    const gameArea = document.getElementById('number-game-area');
    gameArea.innerHTML = '';
    
    // Update header with result
    const header = document.querySelector('.number-game-header');
    if (success) {
        header.textContent = 'Great job! You did it!';
        updateStressLevel(-10); // Reduce stress for success
    } else {
        header.textContent = 'Time\'s up! Try to be faster next time.';
        updateStressLevel(20); // Increased stress penalty to 20 for failure
        
        // Hide number game container immediately
        document.getElementById('number-game-container').style.display = 'none';
        
        // Go directly to kitchen scene
        startKitchenScene();
        return;
    }
    
    // Update instructions
    const instructions = document.querySelector('.number-game-instructions');
    instructions.textContent = success ? 
        'You can now go downstairs.' : 
        'Your mom is waiting, you better hurry!';
    
    // Show continue button only if successful
    if (success) {
        const continueButton = document.getElementById('number-game-continue');
        continueButton.style.display = 'block';
        continueButton.addEventListener('click', () => {
            document.getElementById('number-game-container').style.display = 'none';
            startKitchenScene();
        });
    }
}


        function closePhone() {
            // Hide phone container
            phoneContainer.style.display = 'none';
            
            // If we've gone through the phone tutorial
            if (gameState.scene === 'room-after-phone') {
                showDialogue('Your mom is calling you downstairs, but you need to organize your thoughts first.', [
                    { 
                        text: 'Get ready (Play minigame)', 
                        action: startNumberGame 
                    }
                ], null);
            }
        }
        
        function startKitchenCountdown() {
            // Hide dialogue
            dialogueContainer.style.display = 'none';
            
            // Start countdown
            gameState.timerRunning = true;
            gameState.timeRemaining = 40;
            
            // Show timer
            timerContainer.style.display = 'block';
            updateTimer();
            
            // Show countdown message
            showDialogue('You have 40 seconds to get to the kitchen. Do not be late.', [
                { text: 'Go downstairs now', action: goToKitchen }
            ], null);
            
            // Start timer interval
            const timerInterval = setInterval(() => {
                if (gameState.timerRunning) {
                    gameState.timeRemaining--;
                    updateTimer();
                    
                    if (gameState.timeRemaining <= 0) {
                        clearInterval(timerInterval);
                        gameState.timerRunning = false;
                        
                        // Penalize for being late
                        updateStressLevel(15);
                        showDialogue('You\'re late. Your mom looks disappointed.', [
                            { text: 'Continue', action: startKitchenScene }
                        ], null);
                    }
                } else {
                    clearInterval(timerInterval);
                }
            }, 1000);
        }
        
        function updateTimer() {
            timerValue.textContent = gameState.timeRemaining;
        }
        
        function goToKitchen() {
            // Stop the timer
            gameState.timerRunning = false;
            
            // Hide the timer
            timerContainer.style.display = 'none';
            
            // Start kitchen scene
            startKitchenScene();
        }
        
        function startKitchenScene() {
            // Hide room scene and show kitchen scene
            roomScene.style.display = 'none';
            kitchenScene.style.display = 'flex';
            
            // Hide dialogue
            dialogueContainer.style.display = 'none';
            
            // Start parent conversation
            startParentConversation();
        }
        
        function startParentConversation() {
            const parentDialogues = [
                {
                    text: "Mom: There you are. Your father and I wanted to talk about your college applications.",
                    options: [
                        { text: "I've been working on them.", stressChange: 2, correct: true },
                        { text: "Can we talk about this later?", stressChange: 10, correct: false },
                        { text: "I'm really stressed about them...", stressChange: 0, correct: true }
                    ]
                },
                {
                    text: "Dad: We noticed your grade in AP Calculus dropped to an A-. What happened?",
                    options: [
                        { text: "I'll bring it back up, I promise.", stressChange: 4, correct: true },
                        { text: "An A- is still a good grade.", stressChange: 15, correct: false },
                        { text: "I've been focusing on my applications.", stressChange: 10, correct: false }
                    ]
                },
                {
                    text: "Mom: Harvard doesn't accept students with A-minuses. You know that, right?",
                    options: [
                        { text: "Yes, I know. I'll do better.", stressChange: 3, correct: true },
                        { text: "That's not actually true...", stressChange: 15, correct: false },
                        { text: "I'm trying my best.", stressChange: 10, correct: false }
                    ]
                },
                {
                    text: "Dad: Your cousin got into Princeton with a perfect GPA. We expect the same from you.",
                    options: [
                        { text: "I understand.", stressChange: 2, correct: true },
                        { text: "We're different people.", stressChange: 15, correct: false },
                        { text: "I'll work harder.", stressChange: 10, correct: true }
                    ]
                },
                {
                    text: "Mom: Remember, all of our sacrifices are for your future. Don't disappoint us.",
                    options: [
                        { text: "I won't disappoint you.", stressChange: 10, correct: true },
                        { text: "I feel a lot of pressure.", stressChange: 5, correct: true },
                        { text: "Can we talk about something else?", stressChange: 15, correct: false }
                    ]
                }
            ];

            let currentDialogueIndex = 0;

            function showNextDialogue() {
                if (currentDialogueIndex >= parentDialogues.length) {
                    // End of conversation, move to school scene
                    endParentConversation();
                    return;
                }

                const dialogue = parentDialogues[currentDialogueIndex];
                
                // Show the dialogue with clickable options
                showDialogue(dialogue.text, dialogue.options.map(option => {
                    return {
                        text: option.text,
                        action: () => {
                            // Update stress level based on selection
                            updateStressLevel(option.stressChange);
                            
                            // Move to next dialogue
                            currentDialogueIndex++;
                            showNextDialogue();
                        }
                    };
                }), null);
            }
            
            // Start the first dialogue
            showNextDialogue();
        }
        
        function endParentConversation() {
    // Hide kitchen scene after a short delay
    setTimeout(() => {
        kitchenScene.style.display = 'none';
        
        // Show transition dialogue
        showDialogue('You gather your things and prepare to leave for school.', [
            { 
                text: 'Go to school', 
                action: startSchoolScene 
            }
        ], null);
    }, 500);
}
        
       function startSchoolScene() {
    // Show school scene
    schoolScene.style.display = 'flex';
    
    // Show teacher dialogue before test
    showDialogue('Teacher: "Alright class, settle down. This test will determine 40% of your final grade. I hope you all studied hard - your future depends on it."', [
        { text: 'Begin test', action: startTestScene }
    ], null);
}
        
        function startTestScene() {
            // Hide dialogue
            dialogueContainer.style.display = 'none';
            
            // Define test questions
            const testQuestions = [
                {
                    text: "If f(x) = 3x² - 4x + 2, what is f'(x)?",
                    options: [
                        { text: "6x - 4", stressChange: -5, correct: true },
                        { text: "3x² - 4", stressChange: 5, correct: false },
                        { text: "6x² - 4", stressChange: 5, correct: false },
                        { text: "3x - 4", stressChange: 5, correct: false }
                    ]
                },
                {
                    text: "Solve for x: log₃(x+1) + log₃(x-1) = 2",
                    options: [
                        { text: "x = 2", stressChange: 5, correct: false },
                        { text: "x = 5", stressChange: -5, correct: true },
                        { text: "x = 3", stressChange: 5, correct: false },
                        { text: "x = 4", stressChange: 5, correct: false }
                    ]
                },
                {
                    text: "∫ (2x + 3)⁵ dx =",
                    options: [
                        { text: "(2x + 3)⁶/12 + C", stressChange: -5, correct: true },
                        { text: "(2x + 3)⁶/6 + C", stressChange: 10, correct: false },
                        { text: "2(2x + 3)⁶/6 + C", stressChange: 10, correct: false },
                        { text: "(2x + 3)⁵/10 + C", stressChange: 10, correct: false }
                    ]
                },
                {
                    text: "Find the limit: lim x→∞ (1 + 3/x)ˣ",
                    options: [
                        { text: "e", stressChange: 10, correct: false },
                        { text: "e³", stressChange: -5, correct: true },
                        { text: "3", stressChange: 10, correct: false },
                        { text: "1", stressChange: 10, correct: false }
                    ]
                },
                {
                    text: "If a function f(x) is continuous on [a,b] and F'(x) = f(x), then ∫ₐᵇ f(x) dx =",
                    options: [
                        { text: "F(b) - F(a)", stressChange: -5, correct: true },
                        { text: "F(a) - F(b)", stressChange: 5, correct: false },
                        { text: "F(b) + F(a)", stressChange: 5, correct: false },
                        { text: "F(b) × F(a)", stressChange: 5, correct: false }
                    ]
                }
            ];
            
            // Start with the first question
            showTestQuestion(0, testQuestions);
        }

        function showTestQuestion(index, testQuestions) {
            if (index >= testQuestions.length) {
                endTestScene();
                return;
            }
            
            const question = testQuestions[index];
            
            // Position and show question container
            questionContainer.style.display = 'block';
            questionText.textContent = question.text;
            answerOptions.innerHTML = '';
            
            let timeLeft = 10;
            countdown.textContent = `Time left: ${timeLeft}`;
            
            const glitchInterval = setInterval(() => {
                if (Math.random() < 0.3) {
                    schoolScene.classList.add('glitch');
                    setTimeout(() => {
                        schoolScene.classList.remove('glitch');
                    }, 300);
                }
            }, 2000);
            
            const countdownInterval = setInterval(() => {
                timeLeft--;
                countdown.textContent = `Time left: ${timeLeft}`;
                
                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    clearInterval(glitchInterval);
                    updateStressLevel(15);
                    questionContainer.style.display = 'none';
                    setTimeout(() => showTestQuestion(index + 1, testQuestions), 1000);
                }
            }, 1000);
            
            question.options.forEach(option => {
                const optionElement = document.createElement('button');
                optionElement.className = 'answer-option';
                optionElement.textContent = option.text;
                optionElement.addEventListener('click', function() {
                    clearInterval(countdownInterval);
                    clearInterval(glitchInterval);
                    
                    // Update stress based on the selected option
                    updateStressLevel(option.stressChange);
                    
                    // Highlight if the answer is correct or incorrect
                    if (option.correct) {
                        optionElement.style.backgroundColor = 'rgba(0, 100, 0, 0.5)';
                    } else {
                        optionElement.style.backgroundColor = 'rgba(100, 0, 0, 0.5)';
                    }
                    
                    // Disable all options after selection
                    const allOptions = document.querySelectorAll('.answer-option');
                    allOptions.forEach(opt => {
                        opt.disabled = true;
                    });
                    
                    // Move to the next question after a short delay
                    setTimeout(() => {
                        questionContainer.style.display = 'none';
                        setTimeout(() => showTestQuestion(index + 1, testQuestions), 1000);
                    }, 1000);
                });
                answerOptions.appendChild(optionElement);
            });
        }
        
        function endTestScene() {
            // Show dialogue to end test scene
            showDialogue('The test is over. You feel exhausted.', [
                { text: 'Go home', action: goHomeAfterTest }
            ], null);
        }
        
function startEssayGame() {
    // Hide dialogue
    dialogueContainer.style.display = 'none';
    
    // Show essay game container
    essayGameContainer.style.display = 'flex';
    essayGameFeedback.textContent = '';
    gameState.selectedWords = [];
    
    // Clear and populate word selection
    const wordsContainer = document.getElementById('essay-game-words');
    wordsContainer.innerHTML = '';
    
    // Shuffle words
    const shuffledWords = [...gameState.essayWords].sort(() => Math.random() - 0.5);
    
    // Create word elements
    shuffledWords.forEach(wordObj => {
        const wordElement = document.createElement('div');
        wordElement.className = 'essay-word';
        wordElement.textContent = wordObj.word;
        wordElement.dataset.correct = wordObj.correct;
        
        wordElement.addEventListener('click', () => {
            if (wordElement.classList.contains('selected')) {
                // Deselect word
                wordElement.classList.remove('selected');
                gameState.selectedWords = gameState.selectedWords.filter(w => w !== wordObj.word);
            } else {
                // Select word
                if (gameState.selectedWords.length < 10) {
                    wordElement.classList.add('selected');
                    wordElement.classList.toggle('bad', !wordObj.correct);
                    gameState.selectedWords.push(wordObj.word);
                } else {
                    essayGameFeedback.textContent = 'Maximum of 10 words allowed';
                    setTimeout(() => {
                        essayGameFeedback.textContent = '';
                    }, 2000);
                }
            }
        });
        
        wordsContainer.appendChild(wordElement);
    });
    
    // Set up submit button
    essayGameSubmit.onclick = checkEssay;
    essayGameSubmit.textContent = 'Submit Essay';
    
    // Set game state
    gameState.essayGameActive = true;
}

function checkEssay() {
    if (gameState.selectedWords.length < 5) {
        essayGameFeedback.textContent = 'Please select at least 5 words';
        return;
    }
    
    let stressChange = 0;
    let feedback = [];
    let goodWords = 0;
    let badWords = 0;
    
    // Calculate score based on selected words
    gameState.selectedWords.forEach(word => {
        const wordObj = gameState.essayWords.find(w => w.word === word);
        if (wordObj) {
            if (wordObj.correct) {
                goodWords++;
                stressChange -= 2;
            } else {
                badWords++;
                stressChange += 5;
            }
        }
    });
    
    // Provide feedback

    
if (goodWords >= 5 && badWords === 0) {
                feedback.push("Excellent! Your word choices reflect healthy coping mechanisms.<br><small>(Steare et al. found students with this mindset had 40% lower anxiety)</small>");
        stressChange -= 10;
    } else if (goodWords > badWords) {
        feedback.push("Good overall word choices, but could be more positive.");
        feedback.push("<br><small>Research: Academic perfectionism increases depression risk by 3.2x (Steare, 2022)</small>");
            
            essayGameFeedback.innerHTML = feedback.join('<br>');
    } else if (goodWords === badWords) {
        feedback.push("Mixed word choices - try to focus more on positive growth.");
        stressChange += 5;
    } else {
        feedback.push("Too many negative words - this suggests poor self-perception.");
        stressChange += 15;
    }
    
    feedback.push(`Selected ${goodWords} positive and ${badWords} negative words.`);
    
    essayGameFeedback.innerHTML = feedback.join('<br>');
    updateStressLevel(stressChange);
    
    setTimeout(() => {
        essayGameSubmit.onclick = () => {
            essayGameContainer.style.display = 'none';
            showDialogue('You finish your essay and prepare for bed.', [
                { text: 'Go to sleep', action: startDreamSequence }
            ], null);
        };
        essayGameSubmit.textContent = 'Continue';
    }, 1000);
}



      function goHomeAfterTest() {
    // Hide school scene
    schoolScene.style.display = 'none';
    
    // Show dialogue for going home and writing essay
    showDialogue('You return home, exhausted. But you remember your college essay is due tomorrow.', [
        { text: 'Start writing essay', action: startEssayGame }
    ], null);
}
        
      function startDreamSequence() {
    // Hide dialogue
    dialogueContainer.style.display = 'none';
    
    // Start nightmare game
    startNightmareGame();
}

        function startHallwaySequence() {
            // Hide dialogue
            dialogueContainer.style.display = 'none';
            
            // Reset run prompt flag
            gameState.runPromptShown = false;
            
            shadowFollower.style.display = 'block';
            shadowFollower.style.left = '10%';
            
         
            let playerPosition = 60;
            let shadowPosition = 10;
            let distanceTraveled = 0;
            let playerSpeed = 0.5;
            
        
            const followInterval = setInterval(() => {
       
                playerPosition += playerSpeed;
                distanceTraveled += playerSpeed;
                
    
                shadowPosition += 0.7;
                shadowFollower.style.left = shadowPosition + '%';
                
              
                if (Math.random() < 0.2) {
                    hallwayScene.classList.add('glitch');
                    setTimeout(() => {
                        hallwayScene.classList.remove('glitch');
                    }, 300);
                }
                
            
                const proximity = playerPosition - shadowPosition;
                if (proximity < 30) {
                    updateStressLevel(1);
                }
                
                // Check if shadow is close enough to trigger run prompt
                if (proximity < 20 && !gameState.runPromptShown) {
                    gameState.runPromptShown = true;
                    showDialogue('Run.', [
                        { 
                            text: 'Run faster', 
                            action: () => { 
                                playerSpeed = 1.5; // Increase player speed significantly
                                dialogueContainer.style.display = 'none';
                            } 
                        }
                    ], null);
                }
                
                // Check if shadow catches player or stress is too high
                if (shadowPosition >= playerPosition || gameState.stressLevel >= 80) {
                    clearInterval(followInterval);
                    endHallwaySequence(true);
                }
                
                // Successful escape if traveled enough distance
                if (distanceTraveled > 150) {
                    clearInterval(followInterval);
                    endHallwaySequence(false);
                }
            }, 100);
        }

        function endHallwaySequence(caught) {
            // Hide shadow follower
            shadowFollower.style.display = 'none';
            
            if (caught) {
               
                hallwayScene.classList.add('glitch');
                setTimeout(() => {
                    hallwayScene.classList.remove('glitch');
                    hallwayScene.style.display = 'none'; 
                    startHospitalScene();
                }, 1000);
            } else {
                
                const overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'white';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 2s';
                overlay.style.zIndex = '50';
                hallwayScene.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    setTimeout(() => {
                        hallwayScene.style.display = 'none'; 
                        hallwayScene.removeChild(overlay);
                        startHospitalScene();
                    }, 2000);
                }, 100);
            }
        }

        function startHospitalScene() {
            // Hide all other scenes
            mirrorScene.style.display = 'none';
            roomScene.style.display = 'none';
            kitchenScene.style.display = 'none';
            schoolScene.style.display = 'none';
            hallwayScene.style.display = 'none';
            
            // Show hospital scene
            hospitalScene.style.display = 'flex';
            
            // Hide stress meter
            stressMeterContainer.style.display = 'none';
            
            // Final dialogue after a delay
            setTimeout(() => {
                showDialogue('You\'re awake. You\'re alive.', [
                    { 
                        text: 'Restart Game', 
                        action: resetGame 
                    },
                    { 
                        text: 'Reflect on Experience', 
                        action: showFinalReflection 
                    }
                ], null);
            }, 2000);
        }

        function showFinalReflection() {
            // Hide the previous dialogue
            dialogueContainer.style.display = 'none';
            
            // Create a reflection message based on player's stress level
            let reflectionMessage = '';
            if (gameState.stressLevel >= 80) {
                reflectionMessage = 'You pushed yourself too hard. The pressure became too much. Remember - your worth isn\'t defined by perfection.';
            } else if (gameState.stressLevel >= 50) {
                reflectionMessage = 'You managed, but at what cost? The constant pressure took its toll. Balance is key.';
            } else {
                reflectionMessage = 'You navigated the challenges better than most. But was it worth the constant anxiety?';
            }
            
            // Show reflection with restart option
            setTimeout(() => {
                showDialogue(reflectionMessage, [
                    { 
                        text: 'Restart Journey', 
                        action: resetGame 
                    }
                ], null);
            }, 1000);
        }
        

        let nightmareGameActive = false;
let nightmareButtonClicks = 0;
let nightmareButtonSpeed = 1;
let nightmareButtonPosition = { x: 0, y: 0 };
let nightmareGameInterval;
let nightmareButtonSize = 1;

// Add these to gameState
gameState.nightmareGameActive = false;
gameState.nightmareGameCompleted = false;

function startNightmareGame() {
    // Hide dialogue
    dialogueContainer.style.display = 'none';
    
    // Show nightmare game container
    const nightmareGameContainer = document.getElementById('nightmare-game-container');
    nightmareGameContainer.style.display = 'flex';
    
    // Show and start the red timer
    const redTimer = document.getElementById('red-timer');
    redTimer.style.display = 'block';
    let timeLeft = 45;
    redTimer.textContent = timeLeft;
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        redTimer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endNightmareGame(false);
        }
    }, 1000);
    
    // Reset game variables
    nightmareButtonClicks = 0;
    nightmareButtonSpeed = 1;
    nightmareButtonSize = 1;
    gameState.nightmareGameActive = true;
    gameState.nightmareGameCompleted = false;
    
    // Get button and progress bar elements
    const nightmareButton = document.getElementById('nightmare-game-button');
    const progressBar = document.getElementById('nightmare-game-progress-bar');
    
    // Reset button and progress
    nightmareButton.textContent = 'Click Me';
    nightmareButton.style.transform = 'scale(1)';
    progressBar.style.width = '0%';
    
    // Set initial random position
    moveButtonRandomly(nightmareButton);
    
    // Add click event
    nightmareButton.onclick = function() {
        if (!gameState.nightmareGameActive) return;
        
        nightmareButtonClicks++;
        progressBar.style.width = (nightmareButtonClicks * 5) + '%';
        
        // Increase difficulty
        nightmareButtonSpeed += 0.2;
        nightmareButtonSize -= 0.05;
        nightmareButton.style.transform = `scale(${nightmareButtonSize})`;
        
        // Increase button movement range
        const container = document.getElementById('nightmare-game-container');
        container.style.width = (80 + nightmareButtonClicks * 2) + '%';
        container.style.height = (70 + nightmareButtonClicks * 2) + '%';
        
        // Update button text randomly
        const buttonTexts = [
            'Again!', 'Faster!', 'More!', 'Keep going!', 
            'Almost there!', 'Don\'t stop!', 'You can do it!',
            'ERROR: TOO SLOW', 'SYSTEM FAILURE', 'CRITICAL ERROR',
            'PERFORMANCE LOW', 'NOT GOOD ENOUGH'
        ];
        nightmareButton.textContent = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
        
        // Move button to new random position
        moveButtonRandomly(nightmareButton);
        
        // Check if game is completed
        if (nightmareButtonClicks >= 20) {
            clearInterval(timerInterval);
            endNightmareGame(true);
        }
    };
    
      const nightmareTexts = [
        "I can't do it.",
        "There's so much to do",
        "I need to do more.",
        "faster.",
        "There's no time.",
        "How can they do this?",
        "Why can't I be like them?",
        "Not good enough",
        "I'm falling behind",
        "They expect too much"
    ];

    const addFloatingText = () => {
        if (!gameState.nightmareGameActive) return;
        
        const text = document.createElement('div');
        text.className = 'nightmare-text';
        text.textContent = nightmareTexts[Math.floor(Math.random() * nightmareTexts.length)];
        
        // Random starting position
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 80 + 10;
        
        // Random movement direction
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        
        text.style.setProperty('--tx', tx + 'px');
        text.style.setProperty('--ty', ty + 'px');
        text.style.left = startX + '%';
        text.style.top = startY + '%';
        
        document.body.appendChild(text);
        
        // Remove after animation completes
        setTimeout(() => {
            text.remove();
        }, 10000);
        
        // Schedule next text
        setTimeout(addFloatingText, 1000 + Math.random() * 2000);
    };
    
    // Start adding floating text
    setTimeout(addFloatingText, 500);

    // Start moving the button automatically
    nightmareGameInterval = setInterval(() => {
        if (!gameState.nightmareGameActive) return;
        moveButtonRandomly(nightmareButton);
    }, 1000 / nightmareButtonSpeed);

    



}

function moveButtonRandomly(button) {
    const container = document.getElementById('nightmare-game-container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate max positions (accounting for button size)
    const maxX = containerRect.width - buttonRect.width * nightmareButtonSize;
    const maxY = containerRect.height - buttonRect.height * nightmareButtonSize - 50; // Leave space for instructions
    
    // Set new random position
    nightmareButtonPosition.x = Math.floor(Math.random() * maxX);
    nightmareButtonPosition.y = Math.floor(Math.random() * maxY);
    
    button.style.left = nightmareButtonPosition.x + 'px';
    button.style.top = nightmareButtonPosition.y + 'px';
}

function endNightmareGame(success) {
    // Clear interval
    clearInterval(nightmareGameInterval);
    gameState.nightmareGameActive = false;
    
    // Hide the red timer
    document.getElementById('red-timer').style.display = 'none';
    
    if (success) {
        gameState.nightmareGameCompleted = true;
        
        // Start whiteout sequence
        startWhiteoutSequence();
    } else {
        // Show error message
        showDialogue('You were too slow! The nightmare continues...', [
            { text: 'Try again', action: startNightmareGame }
        ], null);
    }
}

function startWhiteoutSequence() {
    nextButton.style.display = 'none';
    const whiteOverlay = document.getElementById('white-overlay');
    const hospitalReveal = document.getElementById('hospital-reveal');
    
    // Start fading to white
    whiteOverlay.style.opacity = '1';
    whiteOverlay.classList.add('active');
    
    // After full white, show hospital text
    setTimeout(() => {
        hospitalReveal.style.display = 'block';
        hospitalReveal.innerHTML = `${gameState.playerName}, you're awake.<br>You're alive.<br>Do you remember what happened?`;
        
        // Fade in text
        setTimeout(() => {
            hospitalReveal.style.opacity = '1';
            
            // Show next button after text is visible
            setTimeout(() => {
                nextButton.style.display = 'block';
                nextButton.style.zIndex = '1003'; // Ensure it's above everything
                nextButton.onclick = () => {
                    hospitalReveal.style.opacity = '0';
                    nextButton.style.display = 'none';
                    whiteOverlay.classList.remove('active');
                    showHospitalText(hospitalText1, () => {
                        showHospitalText(hospitalText2, () => {
                            // Final transition to black
                            whiteOverlay.style.backgroundColor = 'black';
                            setTimeout(() => {
                                showDialogue('', [
                                    { 
                                        text: 'Restart Game', 
                                        action: resetGame 
                                    },
                                    { 
                                        text: 'Reflect on Experience', 
                                        action: showFinalReflection 
                                    }
                                ], null, true);
                            }, 100);
                        });
                    });
                };
            }, 200);
        }, 100);
    }, 200);
}

// Helper function to show hospital text with next button
function showHospitalText(textElement, callback) {
    textElement.style.display = 'block';
    setTimeout(() => {
        textElement.style.opacity = '1';
        setTimeout(() => {
            nextButton.style.display = 'block';
            nextButton.style.zIndex = '1003'; // Ensure it's above everything
            nextButton.onclick = () => {
                textElement.style.opacity = '0';
                nextButton.style.display = 'none';
                if (callback) callback();
            };
        }, 200);
    }, 100);
}


        function resetGame() {
            // Reset game state
            gameState.stressLevel = 0;
            gameState.scene = 'intro';
            gameState.dialogueIndex = 0;
            gameState.timerRunning = false;
            gameState.timeRemaining = 0;
            gameState.shadowPosition = 0;
            gameState.interactionItems = [];
            gameState.currentConversation = null;
            gameState.testIndex = 0;
            gameState.runPromptShown = false;
            
            // Hide all scenes
            gameContainer.style.display = 'flex';
            roomContainer.style.display = 'none';
            mirrorScene.style.display = 'none';
            roomScene.style.display = 'none';
            kitchenScene.style.display = 'none';
            schoolScene.style.display = 'none';
            hallwayScene.style.display = 'none';
            hospitalScene.style.display = 'none';
            
            // Reset UI elements
            stressMeter.style.width = '0%';
            stressValue.textContent = '0%';
            stressMeterContainer.style.display = 'none';
            timerContainer.style.display = 'none';
            phoneContainer.style.display = 'none';
            dialogueContainer.style.display = 'none';
            questionContainer.style.display = 'none';
            shadowFollower.style.display = 'none';
            
            // Reset star animation
            mainStar.classList.remove('float-up');
            mainStar.style.top = '50%';
            mainStar.style.left = '50%';
            mainStar.style.transform = 'translate(-50%, -50%)';
            mainStar.style.opacity = '1';

             nextButton.style.display = 'none';
    hospitalText1.style.display = 'none';
    hospitalText1.style.opacity = '0';
    hospitalText2.style.display = 'none';
    hospitalText2.style.opacity = '0';
    document.getElementById('white-overlay').style.backgroundColor = 'white';
document.getElementById('white-overlay').classList.remove('active');

    document.getElementById('white-overlay').style.opacity = '0';


            // Reset text container
            textContainer.innerHTML = `
                <div class="shake-text">[ Insert Your Name ]</div>
                <div class="input-container">
                    <input type="text" id="name-input" maxlength="20">
                    <br>
                    <button id="enter-button">Enter</button>
                </div>
            `;

            // Reset white overlay and hospital reveal
document.getElementById('white-overlay').style.opacity = '0';
document.getElementById('hospital-reveal').style.opacity = '0';
document.getElementById('hospital-reveal').style.display = 'none';
document.getElementById('nightmare-game-container').style.display = 'none';

            
            // Reattach event listeners
            document.getElementById('enter-button').addEventListener('click', startGame);
            document.getElementById('name-input').addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    startGame();
                }
            });
        }