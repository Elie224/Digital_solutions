document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Header scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Filtre portfolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animation des chiffres
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000; // 2 secondes
            const step = target / (duration / 16); // 16ms pour 60fps
            
            let current = 0;
            const increment = () => {
                current += step;
                if (current < target) {
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    number.textContent = target;
                }
            };
            
            increment();
        });
    }
    
    // Observer pour l'animation des chiffres
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
    
    // Chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'bot');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function handleChatbotSend() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';
            setTimeout(() => {
                const botReply = getFaqAnswer(message);
                addBotMessage(botReply);
            }, 500);
        }
    }
    chatbotSend.addEventListener('click', handleChatbotSend);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleChatbotSend();
        }
    });
    
    // Animation au scroll
    const animateElements = document.querySelectorAll('.fade-in');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ici vous pouvez ajouter le code pour envoyer le formulaire
            // Par exemple avec Fetch API vers un backend
            
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }
    
    // Accordéon FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            // Fermer toutes les autres
            faqQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));
            // Ouvrir/cacher celle cliquée
            this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
    });

    // Mode sombre
    const darkToggle = document.querySelector('.dark-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
    darkToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 600);
    });

    // Chatbot FAQ simple
    const faq = [
      {
        question: /bonjour|salut|hello/i,
        answer: "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
      },
      {
        question: /devis|prix|tarif/i,
        answer: "Pour obtenir un devis, cliquez sur le bouton 'Devis gratuit' ou rendez-vous sur la page Devis."
      },
      {
        question: /services?|proposez|offres?/i,
        answer: "Nous proposons : développement web, applications mobiles, design graphique, transport digitalisé, automatisation, logistique, et service informatique (vente, achat, réparation d'ordinateurs)."
      },
      {
        question: /contact|joindre|email|téléphone/i,
        answer: "Vous pouvez nous contacter via le formulaire de contact ou par email à kouroumaelisee@gmail.com."
      },
      {
        question: /adresse|localisation|où/i,
        answer: "Nous sommes situés à Rue du Commerce, Conakry, Guinée."
      },
      {
        question: /horaires?|ouvert|fermé/i,
        answer: "Nous sommes ouverts du lundi au vendredi de 9h à 18h."
      },
      {
        question: /merci|thanks/i,
        answer: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions."
      }
    ];

    function getFaqAnswer(message) {
      for (const item of faq) {
        if (item.question.test(message)) {
          return item.answer;
        }
      }
      return "Je suis désolé, je n'ai pas compris votre question. Vous pouvez consulter la FAQ ou reformuler votre demande.";
    }

    // SUPPRESSION de la logique doublonnée : on utilise addUserMessage/addBotMessage déjà définies plus haut
});