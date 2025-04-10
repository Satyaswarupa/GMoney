function toggleMenu() {
  const drawer = document.getElementById('drawer');
  drawer.style.display = drawer.style.display === 'flex' ? 'none' : 'flex';
}


let currentSlide = 0;
const slides = document.querySelectorAll('.slides');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);


const counters = document.querySelectorAll('.counter');
let counted = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = Math.ceil(target / 100); // adjust speed

          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      counted = true; // prevent re-triggering
    }
  });
});

observer.observe(document.querySelector('.counter-section'));

