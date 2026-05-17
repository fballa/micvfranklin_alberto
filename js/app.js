/* ==========================================================================
   Franklin Balladares - AI Engineer Portfolio 2026
   JavaScript Application Controller (Bilingual HUD Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MULTI-LANGUAGE CONTROLLER (SEO-FRIENDLY & PERSISTENT)
       ========================================================================== */
    const langSwitch = document.getElementById('lang-switch');
    const body = document.body;
    let currentLang = localStorage.getItem('cv_lang') || 'es';
    let typedInstance = null;

    // Apply active language configuration
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('cv_lang', lang);
        
        if (lang === 'en') {
            body.classList.remove('lang-es');
            body.classList.add('lang-en');
            document.documentElement.setAttribute('lang', 'en');
        } else {
            body.classList.remove('lang-en');
            body.classList.add('lang-es');
            document.documentElement.setAttribute('lang', 'es');
        }
        
        // Reboot dynamic typing animations with appropriate language array
        initTypingText();
    }

    // Toggle switch click listener
    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            const targetLang = currentLang === 'es' ? 'en' : 'es';
            applyLanguage(targetLang);
            createToast(
                targetLang === 'es' ? 'Sistema Bilingüe' : 'Bilingual Engine',
                targetLang === 'es' ? 'Idioma cambiado a Español' : 'Language set to English'
            );
        });
    }

    // Init language state on boot
    applyLanguage(currentLang);

    /* ==========================================================================
       2. TYPED.JS BILINGUAL ENGINE
       ========================================================================== */
    function initTypingText() {
        if (typedInstance) {
            typedInstance.destroy();
        }

        const esPhrases = [
            'AI Software Engineer',
            'Especialista en Desarrollo de Software',
            'Especialista en Bases de Datos Enterprise',
            'Arquitecto de Sistemas & SysAdmin'
        ];

        const enPhrases = [
            'AI Software Engineer',
            'Enterprise Systems Specialist',
            'Expert Database Tuner & Architect',
            'Distributed Architect & SysAdmin'
        ];

        const phrases = currentLang === 'en' ? enPhrases : esPhrases;

        if (typeof Typed !== 'undefined' && document.getElementById('typed-target')) {
            typedInstance = new Typed('#typed-target', {
                strings: phrases,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                startDelay: 400,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    /* ==========================================================================
       3. INTRO HARDWARE PRELOADER
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const statusText = document.getElementById('preloader-status');
    
    const stepsEs = [
        'Cargando módulos de diseño 2026...',
        'Inicializando aceleración por hardware...',
        'Configurando motor de traducción dinámica...',
        'Conexión segura establecida.'
    ];

    const stepsEn = [
        'Loading 2026 visual modules...',
        'Initializing hardware acceleration...',
        'Configuring dynamic translation engine...',
        'Secure synapse link established.'
    ];

    let stepIdx = 0;
    const steps = currentLang === 'en' ? stepsEn : stepsEs;

    const interval = setInterval(() => {
        if (stepIdx < steps.length) {
            if (statusText) {
                statusText.textContent = steps[stepIdx];
            }
            stepIdx++;
        } else {
            clearInterval(interval);
        }
    }, 450);

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger entry staggered elements once preloader clears
                    triggerHeroEntrance();
                }, 800);
            }
        }, 1800);
    });

    /* ==========================================================================
       4. LENIS SMOOTH SCROLL INTEGRATION
       ========================================================================== */
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Bind GSAP ScrollTrigger to Lenis scrolling
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    /* ==========================================================================
       5. DYNAMIC GLASS CARD LIGHTING REFLECTIONS (MOUSE MOVE LISTENERS)
       ========================================================================== */
    const glassCards = document.querySelectorAll('.glass-card, .spec-card, .tech-hud-card, .contact-coordinate-item');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==========================================================================
       6. INTERACTIVE NEURAL NETWORK CANVAS (WITH SYNAPSE PULSES)
       ========================================================================== */
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let impulses = []; // Synaptic pulses traveling along lines
        let mousePosition = { x: null, y: null };
        
        const particleCount = window.innerWidth < 768 ? 30 : 65;
        const maxLinkDist = 115;
        const mouseRadius = 160;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.55 ? 'rgba(0, 242, 254, 0.45)' : 'rgba(124, 0, 255, 0.45)';
                this.baseX = this.x;
                this.baseY = this.y;
            }

            update() {
                // Gravity towards mouse
                if (mousePosition.x !== null) {
                    const dx = mousePosition.x - this.x;
                    const dy = mousePosition.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouseRadius) {
                        const force = (mouseRadius - dist) / mouseRadius;
                        this.x += (dx / dist) * force * 0.8;
                        this.y += (dy / dist) * force * 0.8;
                    }
                }

                // Random walk drift
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off boundaries
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset blur for other operations
            }
        }

        // Synaptic pulse constructor
        class Impulse {
            constructor(pStart, pEnd) {
                this.pStart = pStart;
                this.pEnd = pEnd;
                this.progress = 0; // 0 to 1
                this.speed = Math.random() * 0.015 + 0.008;
            }

            update() {
                this.progress += this.speed;
            }

            draw() {
                const targetX = this.pStart.x + (this.pEnd.x - this.pStart.x) * this.progress;
                const targetY = this.pStart.y + (this.pEnd.y - this.pStart.y) * this.progress;

                ctx.beginPath();
                ctx.arc(targetX, targetY, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 242, 254, 0.95)';
                ctx.shadowColor = 'rgba(0, 242, 254, 1)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function initParticles() {
            particles = [];
            impulses = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function drawLinesAndFireImpulses() {
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxLinkDist) {
                        const alpha = (1 - dist / maxLinkDist) * 0.16;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 82, 255, ${alpha})`;
                        ctx.lineWidth = 0.55;
                        ctx.stroke();

                        // Fire an electrical signal pulse sutilmente along active connections
                        if (Math.random() < 0.00035 && impulses.length < 25) {
                            impulses.push(new Impulse(p1, p2));
                        }
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw line synapses
            drawLinesAndFireImpulses();

            // Update and draw active synaptic pulses
            for (let k = impulses.length - 1; k >= 0; k--) {
                const imp = impulses[k];
                imp.update();
                imp.draw();
                if (imp.progress >= 1) {
                    impulses.splice(k, 1);
                }
            }

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mousePosition.x = null;
            mousePosition.y = null;
        });

        resizeCanvas();
        animateParticles();
    }

    /* ==========================================================================
       7. MOUSE GLOW BACKGROUND FOLLOWER
       ========================================================================== */
    const cursorFollower = document.getElementById('cursor-follower');
    if (cursorFollower) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.85,
                ease: 'power3.out'
            });
        });
    }

    /* ==========================================================================
       8. GSAP ANIMATIONS & VIEWPORT ENTRANCE
       ========================================================================== */
    gsap.registerPlugin(ScrollTrigger);

    function triggerHeroEntrance() {
        const tl = gsap.timeline();
        tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
          .from('.hero-title', { y: 30, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.45')
          .from('.hero-subtitle', { y: 15, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.45')
          .from('.hero-desc', { y: 15, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .from('.hero-actions', { y: 20, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.4')
          .from('.terminal-card', { scale: 0.92, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.6')
          .from('.stat-badge', { scale: 0.7, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }

    // Floating Navbar scroll indicator progress
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPct = (scrollTop / docHeight) * 92; // scales from 4% to 96% beautifully
        const indicator = document.getElementById('scroll-progress');
        if (indicator) {
            indicator.style.width = `${scrollPct + 4}%`;
        }
    });

    // Section headers are displayed statically for bulletproof accessibility and instant loading

    // About grid displays statically to guarantee layout readability

    // Timeline Central Track scrolling progress filler
    gsap.to('#timeline-progress', {
        scrollTrigger: {
            trigger: '.timeline-wrapper',
            start: 'top 25%',
            end: 'bottom 80%',
            scrub: true
        },
        height: '100%',
        ease: 'none'
    });

    // Timeline elements are displayed statically for seamless scrolling and zero delay loading

    // Skills bar filler animations (Fired upon tab trigger or scroll)
    function animateTabSkills(activeTab) {
        const fills = activeTab.querySelectorAll('.tech-hud-fill');
        fills.forEach(fill => {
            const targetLvl = fill.getAttribute('data-level');
            fill.style.width = targetLvl;
        });
    }

    // Scroll trigger for first tab on load
    gsap.to('.stack-sec', {
        scrollTrigger: {
            trigger: '.stack-sec',
            start: 'top 70%',
            onEnter: () => animateTabSkills(document.querySelector('.stack-tab-grid.active'))
        }
    });
    // Crucial layouts are rendered statically for robust SEO and instant contrast visibility

    // Language circular SVG gauge reveal
    gsap.to('.languages-sec', {
        scrollTrigger: {
            trigger: '.languages-sec',
            start: 'top 75%',
            onEnter: () => {
                const fills = document.querySelectorAll('.languages-svg-fill');
                fills.forEach(fill => {
                    const offset = fill.getAttribute('data-offset');
                    fill.style.strokeDashoffset = offset;
                });
            }
        }
    });

    // Contact form panel displays statically for direct link loading and reliability

    /* ==========================================================================
       9. TAB-BASED SKILLS NAVIGATION FILTER
       ========================================================================== */
    const tabTriggers = document.querySelectorAll('.stack-tab-trigger');
    const tabGrids = document.querySelectorAll('.stack-tab-grid');

    tabTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            // Toggle active trigger styling
            tabTriggers.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Swap visible tab content layouts
            tabGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.getAttribute('id') === targetId) {
                    grid.classList.add('active');
                    // Retrigger fill-bar animations
                    setTimeout(() => {
                        animateTabSkills(grid);
                    }, 40);
                }
            });
        });
    });

    /* ==========================================================================
       10. ACTIVE CAPSULE LINK HIGHLIGHT ON SCROLL
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function highlightActiveLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Buffer offset margin
            const id = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightActiveLink);

    /* ==========================================================================
       11. RESPONSIVE HAMBURGER NAVIGATION DRAWER
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            
            // Transform hamburger lines to X
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(3px, -4px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close drawer when clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* ==========================================================================
       12. COPY EMAIL/PHONE TO CLIPBOARD & TOAST SYSTEM
       ========================================================================== */
    const copyButtons = document.querySelectorAll('.contact-copy-action');
    const toastContainer = document.getElementById('toast-container');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                createToast(
                    currentLang === 'en' ? 'Clipboard Copied' : 'Copiado con Éxito',
                    `${currentLang === 'en' ? 'Copied' : 'Copiado'}: ${textToCopy}`
                );
            }).catch(err => {
                createToast(
                    currentLang === 'en' ? 'Copy Failed' : 'Fallo al Copiar',
                    currentLang === 'en' ? 'Please copy manually.' : 'Copia el texto de forma manual.'
                );
                console.error('Clipboard error: ', err);
            });
        });
    });

    function createToast(title, message) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast-hud';
        toast.innerHTML = `
            <i data-lucide="terminal" class="toast-hud-icon" style="width: 18px; height: 18px;"></i>
            <div>
                <strong style="display:block; font-size:0.8rem; color:var(--accent-cyan);">${title}</strong>
                <span style="font-size:0.75rem; color:var(--text-secondary);">${message}</span>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Reinitialize Lucide icons for the newly injected element
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Delay to show anim entry
        setTimeout(() => {
            toast.classList.add('show');
        }, 80);

        // Remove toast after visual delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 450);
        }, 3200);
    }

    /* ==========================================================================
       13. FORMSUBMIT AJAX SMTP INTEGRATION (REAL SECURE MAILER)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formOutput = document.getElementById('form-output');

    if (contactForm && formOutput) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            const errMissing = currentLang === 'en' ? 'ERROR: All fields are strictly required.' : 'ERROR: Todos los campos son estrictamente obligatorios.';
            const errEmail = currentLang === 'en' ? 'ERROR: Invalid email format.' : 'ERROR: Formato de correo electrónico inválido.';

            // Basic visual sanitization audit
            if (!name || !email || !subject || !message) {
                showTerminalFeedback(errMissing, '#ff5f56');
                return;
            }

            if (!validateEmail(email)) {
                showTerminalFeedback(errEmail, '#ff5f56');
                return;
            }

            const step1 = currentLang === 'en' ? 'Establishing secure HTTPS sync link with FormSubmit SMTP relays...' : 'Iniciando enlace HTTPS seguro con la pasarela smtp.formsubmit.co...';
            const step2 = currentLang === 'en' ? 'Ciphers online (SSL/TLS - AES-256 bits). Transmitting packet...' : 'Cifrando paquete transaccional (SSL/TLS - AES-256)...';
            const successMsg = currentLang === 'en' ? 
                `[TRANSMISSION SUCCESS] Hello ${name}, your email has been safely routed to frankball4@yahoo.es. (Note: If this is the first submission, check your inbox for FormSubmit's verification message).` :
                `[MENSAJE ENVIADO] ¡Éxito! Hola ${name}, tu mensaje ha sido enviado directamente al correo frankball4@yahoo.es. (Nota: Si es el primer envío, recuerda verificar tu buzón para confirmar la activación inicial de FormSubmit).`;

            // Display dynamic visual boot logger steps
            showTerminalFeedback(step1, 'var(--accent-cyan)');
            
            setTimeout(() => {
                showTerminalFeedback(step2, 'var(--accent-purple)');
                
                // POST AJAX request directly to FormSubmit REST gateway
                fetch("https://formsubmit.co/ajax/frankball4@yahoo.es", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `[Portfolio CV Contact] ${subject}`,
                        message: message
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        showTerminalFeedback(successMsg, 'var(--accent-green)');
                        contactForm.reset();
                    } else {
                        showTerminalFeedback(`ERROR: ${data.message || 'Transmission failed.'}`, '#ff5f56');
                    }
                })
                .catch(err => {
                    showTerminalFeedback(currentLang === 'en' ? 'ERROR: Connection timeout. Verify your internet status.' : 'ERROR: Fallo de conexión. Verifica tu conexión de red.', '#ff5f56');
                    console.error('Mail submit error: ', err);
                });
                
            }, 1000);
        });
    }

    function showTerminalFeedback(text, borderColor) {
        if (!formOutput) return;
        formOutput.style.display = 'block';
        formOutput.style.borderColor = borderColor;
        formOutput.style.color = borderColor;
        formOutput.textContent = `$ ${text}`;
    }

    function validateEmail(em) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(em).toLowerCase());
    }

    /* ==========================================================================
       14. SCROLL-TO-TOP TRIGGER
       ========================================================================== */
    const scrollTopBtn = document.getElementById('scroll-top-trigger');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.4 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    /* ==========================================================================
       15. INITIALIZE THIRD PARTY COMPACT ENGINE PLUGINS
       ========================================================================= */
    // Initialize Lucide vector renderer
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize Vanilla Tilt 3D mouse card reactions
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.1
        });
    }

});
