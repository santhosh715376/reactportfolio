import React, { useEffect, useState } from 'react';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // Dynamic Cursor Elements Creation
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    document.body.appendChild(follower);

    // Cursor Tracking Logic
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate cursor update
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      
      // Maximalist particle trail effect
      createParticle(mouseX, mouseY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Smooth follower animation
    function animateFollower() {
      // easing formula
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      
      animationFrameId = requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Click effects
    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    };
    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hover state for links and interactables
    const handleMouseEnter = () => {
      follower.classList.add('active');
      cursor.style.opacity = '0'; // Hide tiny dot on hover
    };
    const handleMouseLeave = () => {
      follower.classList.remove('active');
      cursor.style.opacity = '1';
    };

    const links = document.querySelectorAll('a, .tag, .hamburger, .social-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    // Maximalist Particle Trail System
    function createParticle(x, y) {
      if (Math.random() > 0.3) return; // limit particle spawn rate
      
      const particle = document.createElement('div');
      const size = Math.random() * 8 + 2;
      const colors = ['#00f3ff', '#ff00ea', '#39ff14', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9997';
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      
      const vx = (Math.random() - 0.5) * 10;
      const vy = (Math.random() - 0.5) * 10 + 2; // slight gravity
      
      document.body.appendChild(particle);
      
      let opacity = 1;
      let posX = x;
      let posY = y;
      
      function animateParticle() {
        opacity -= 0.02;
        posX += vx;
        posY += vy;
        
        particle.style.opacity = opacity.toString();
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.transform = `scale(${opacity})`;
        
        if (opacity <= 0) {
          particle.remove();
        } else {
          requestAnimationFrame(animateParticle);
        }
      }
      
      requestAnimationFrame(animateParticle);
    }

    // Smooth Scrolling
    const smoothScroll = function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      document.body.removeChild(cursor);
      document.body.removeChild(follower);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Background Animated Blobs */}
      <div className="blob shape-1"></div>
      <div className="blob shape-2"></div>
      <div className="blob shape-3"></div>

      <nav className="glass-nav">
        <div className="logo">SK<span className="dot">.</span></div>
        <ul className="nav-links" style={{ display: navOpen ? 'flex' : '' }}>
          <li><a href="#home" onClick={() => setNavOpen(false)}>Home</a></li>
          <li><a href="#education" onClick={() => setNavOpen(false)}>Education</a></li>
          <li><a href="#experience" onClick={() => setNavOpen(false)}>Experience</a></li>
          <li><a href="#skills" onClick={() => setNavOpen(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setNavOpen(false)}>Projects</a></li>
          <li><a href="#achievements" onClick={() => setNavOpen(false)}>More</a></li>
        </ul>
        <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section id="home" className="hero glass-panel fade-in">
          <div className="hero-content">
            <span className="greeting">Hello, I'm</span>
            <h1 className="name">Sri Santhosh <span>K</span></h1>
            <p className="title">Full Stack Developer & AI Enthusiast</p>
            <div className="contact-info">
              <a href="tel:9500205290"><i className="fas fa-phone-alt"></i> 9500205290</a>
              <a href="mailto:srisanthosh112006@gmail.com"><i className="fas fa-envelope"></i> Email</a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i> LinkedIn</a>
              <a href="#" className="social-link"><i className="fab fa-github"></i> GitHub</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="glass-avatar">
              <i className="fas fa-user-astronaut"></i>
            </div>
          </div>
        </section>

        <div className="grid-2-col">
          {/* Education Section */}
          <section id="education" className="glass-panel slide-up">
            <div className="section-header">
              <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Sri Eshwar College of Engineering</h3>
                  <span className="year">2024 - 2028</span>
                  <p>CGPA: 7.0 (3rd-sem)</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Vivek Vidyalaya Matriculation Higher Secondary School</h3>
                  <span className="year">2022 - 2024</span>
                  <p>Percentage: 70.4%</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>PMG Matriculation Higher Secondary School</h3>
                  <span className="year">2021 - 2022</span>
                  <p>Percentage: 86.4%</p>
                </div>
              </div>
            </div>
          </section>

          {/* Experience & Certifications */}
          <section id="experience" className="glass-panel slide-up delay-1">
            <div className="section-header">
              <h2><i className="fas fa-briefcase"></i> Experience</h2>
            </div>
            <div className="exp-card glass-inner">
              <h3>In-House Intern</h3>
              <h4>Better Tomorrow</h4>
              <p>Gained practical exposure to development workflows, collaborated on project tasks, and strengthened problem-solving and technical implementation skills.</p>
            </div>

            <div className="section-header mt-4">
              <h2><i className="fas fa-certificate"></i> Certifications</h2>
            </div>
            <ul className="cert-list">
              <li><i className="fas fa-check-circle"></i> MERN Stack Full-Stack Bootcamp (2025)</li>
              <li><i className="fas fa-check-circle"></i> Intro to Generative AI Learning Path (2026)</li>
              <li><i className="fas fa-check-circle"></i> C Programming - IIT Bombay (2024)</li>
              <li><i className="fas fa-check-circle"></i> C++ Programming - IIT Bombay (2024)</li>
            </ul>
          </section>
        </div>

        {/* Skills Section */}
        <section id="skills" className="glass-panel slide-up">
          <div className="section-header center">
            <h2><i className="fas fa-code"></i> Technical Skills</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category glass-inner">
              <h3><i className="fas fa-laptop-code"></i> Frontend</h3>
              <div className="tags">
                <span className="tag">HTML5</span>
                <span className="tag">CSS3</span>
                <span className="tag">JavaScript</span>
                <span className="tag">ReactJS</span>
                <span className="tag">TailwindCSS</span>
              </div>
            </div>
            <div className="skill-category glass-inner">
              <h3><i className="fas fa-server"></i> Backend & DB</h3>
              <div className="tags">
                <span className="tag">Node.js</span>
                <span className="tag">Express</span>
                <span className="tag">FAST APIs</span>
                <span className="tag">Springboot</span>
                <span className="tag">MongoDB</span>
                <span className="tag">MySQL</span>
              </div>
            </div>
            <div className="skill-category glass-inner">
              <h3><i className="fas fa-brain"></i> Languages & AI</h3>
              <div className="tags">
                <span className="tag">C</span>
                <span className="tag">C++</span>
                <span className="tag">Java</span>
                <span className="tag">Python</span>
                <span className="tag">TensorFlow</span>
                <span className="tag">Pandas</span>
                <span className="tag">NumPy</span>
              </div>
            </div>
            <div className="skill-category glass-inner">
              <h3><i className="fas fa-tools"></i> Cloud & Tools</h3>
              <div className="tags">
                <span className="tag">AWS EC2 / S3</span>
                <span className="tag">Git & GitHub</span>
                <span className="tag">Docker</span>
                <span className="tag">Postman</span>
                <span className="tag">CI/CD</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-spacing">
          <div className="section-header center glass-panel title-panel">
            <h2><i className="fas fa-project-diagram"></i> Featured Projects</h2>
          </div>
          <div className="projects-grid">
            
            {/* Project 1 */}
            <div className="project-card glass-panel flex-col">
              <div className="project-content">
                <span className="status">Ongoing</span>
                <h3>AI Resume Screener & Skill Matching Platform</h3>
                <p>Designed an AI-driven Resume Screener that analyzes resumes, extracts key skills, and performs automated candidate-job matching to support efficient recruitment decisions.</p>
                <div className="tech-stack mt-auto">
                  <span className="tech-badge">Ollama</span>
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">MySQL</span>
                  <span className="tech-badge">JavaScript</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card glass-panel flex-col">
              <div className="project-content">
                <h3>Credit Card Fraud Detection System</h3>
                <p>Designed and implemented a fraud detection system analyzing transaction patterns and flagging anomalous activities using machine learning techniques and data analysis workflows.</p>
                <div className="tech-stack mt-auto">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">Pandas</span>
                  <span className="tech-badge">Scikit-learn</span>
                  <span className="tech-badge">Streamlit</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card glass-panel flex-col">
              <div className="project-content">
                <h3>AURA - E-commerce Website</h3>
                <p>Built AURA, a responsive clothing and accessories platform with dynamic product listings and database integration for efficient product management and user interaction.</p>
                <div className="tech-stack mt-auto">
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">MongoDB</span>
                  <span className="tech-badge">HTML/CSS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className="glass-panel slide-up">
          <div className="section-header">
            <h2><i className="fas fa-trophy"></i> Achievements & Problem Solving</h2>
          </div>
          <div className="achievements-container">
            <div className="achievement-item glass-inner">
              <div className="icon-box">
                <i className="fas fa-code-branch"></i>
              </div>
              <div className="ach-info">
                <h3>Hackathon Participant</h3>
                <p>Participated in the KGiSL Institute of Technology Hackathon, collaborating in a team to develop innovative solutions under time-constrained conditions.</p>
              </div>
            </div>
            
            <div className="achievement-item glass-inner">
              <div className="icon-box leetcode">
                <i className="fas fa-laptop-code"></i>
              </div>
              <div className="ach-info">
                <h3>LeetCode Competitive Programmer</h3>
                <div className="stats-row">
                  <div className="stat"><span className="label">Max Rating:</span> <span className="val">1560</span></div>
                  <div className="stat"><span className="label">Global Rank:</span> <span className="val">1,432,545</span></div>
                  <div className="stat"><span className="label">Problems Solved:</span> <span className="val">110</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="glass-panel text-center">
          <p>&copy; 2026 Sri Santhosh K. All Rights Reserved.</p>
          <p className="built-with">Built with <i className="fas fa-heart"></i>, Glassmorphism & React</p>
        </footer>

      </main>
    </>
  );
}

export default App;
