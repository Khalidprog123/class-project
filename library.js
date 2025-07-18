// Digital Library Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // 1. Highlight current page in navigation
  const navLinks = document.querySelectorAll('.dashboard-link');
  const current = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if(link.getAttribute('href') === current) {
      link.classList.add('active-page');
    }
  });

  // 2. Dark/Light mode toggle
  const modeToggle = document.getElementById('mode-toggle');
  if(modeToggle) {
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      modeToggle.classList.toggle('active');
      localStorage.setItem('library-dark', document.body.classList.contains('dark-mode'));
    });
    // Load mode from storage
    if(localStorage.getItem('library-dark') === 'true') {
      document.body.classList.add('dark-mode');
      modeToggle.classList.add('active');
    }
  }

  // 3. Toast notification on download
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function(e) {
      showToast('Download started!');
    });
  });

  // 4. Animate buttons/cards
  document.querySelectorAll('button, .main-content').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('hover-animate'));
    el.addEventListener('mouseleave', () => el.classList.remove('hover-animate'));
  });

  // 5. Smooth scroll for nav
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      if(this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({behavior: 'smooth'});
      }
    });
  });
});

// Toast notification function
function showToast(msg) {
  let toast = document.createElement('div');
  toast.className = 'library-toast';
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); }, 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}
