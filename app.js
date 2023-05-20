// модальное окно

let el = document.querySelectorAll('.conteiner__item')
const modal = document.getElementById("modal");
const iframe = modal.querySelector("iframe");

el.forEach(function(item) {
  const height = item.clientHeight
  const width = item.clientWidth
  const iframeSrc = item.dataset.src;

  item.addEventListener('mousemove', handleMove)
  function handleMove(e) {
    const xVal = e.layerX
    const yVal = e.layerY
    
    const yRotation = 10 * ((xVal - width / 2) / width)
    const xRotation = -10 * ((yVal - height / 2) / height)
    const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
   
    item.style.transform = string
  }
  item.addEventListener('mouseout', function() {
    item.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
  })
  
  item.addEventListener('mousedown', function() {
    item.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
  })
  
  item.addEventListener('mouseup', function() {
    item.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
  })

  item.addEventListener('click',function() {
    openModal(iframeSrc, modal, iframe);
  })
})

function openModal(src, modal, iframe) {
  modal.classList.add('modal--open')
  iframe.setAttribute('src', src)
  document.body.classList.add("modal-open");
  document.body.style.overflow = 'hidden';
}

function closeModal(modal, iframe) {
  modal.classList.remove('modal--open')
  iframe.setAttribute('src', '')
  document.body.classList.remove("modal-open");
  document.body.style.overflow = 'auto';
}

document.querySelector('.modal__close, .modal').addEventListener('click', function() {
  closeModal(modal, iframe);
})

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 27) {
    closeModal(modal, iframe);
  }
})


//валидация формы

const email = document.querySelector('.form__email')
const userName = document.querySelector('.form__name')
const message = document.querySelector('.form__message')
const form = document.querySelector('#form')
const submit = document.querySelector('.form__button')

form.addEventListener('submit', (event) => {
  if (email.value === "" || userName.value === "" || message.value === "") {
    email.classList.add("error");
    userName.classList.add("error");
    message.classList.add("error");
    setTimeout(function() {
      email.classList.remove("error");
    userName.classList.remove("error");
      message.classList.remove("error");
    }, 2000);
    event.preventDefault();
  }
})

// якорные ссылки

const links = document.querySelectorAll('.list__link');
const sections = document.querySelectorAll('section');

function setActiveLink() {
  const currentPosition = window.pageYOffset;

  sections.forEach((section, index) => {
    if (index === 0) return; // пропускаем первую секцию

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    const id = section.getAttribute('id');
    const link = links[index - 1]; // вычитаем 1 из индекса

    if (link && currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
      links.forEach((el) => el.classList.remove('active'));
      link.classList.add('active');
    } else if (link) {
      link.classList.remove('active');
    }
  });
}

function addClickListeners() {
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      const top = section.offsetTop;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
      setActiveLink();
    });
  });
}

addClickListeners();
window.addEventListener('scroll', setActiveLink);


// стрелка скролла

const down = document.querySelector('.scroll');
const up = document.querySelector('.scroll_up');
let prevScrollpos = window.pageYOffset + 1; // изменено значение
const windowHeight = window.innerHeight;
const topThreshold = 0;

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const bottomThreshold = documentHeight - windowHeight - 150;

  if (prevScrollpos > currentScrollPos) {
    // скролл вверх
    down.style.display = "none";
    up.style.display = "flex";
    if (currentScrollPos <= topThreshold) {
      // достигли верхней точки
      down.style.display = "flex";
      up.style.display = "none";
    }
  } else {
    // скролл вниз
    down.style.display = "flex";
    up.style.display = "none";
    if (currentScrollPos >= bottomThreshold) {
      // достигли нижней точки
      down.style.display = "none";
      up.style.display = "flex";
    }
  }
  prevScrollpos = currentScrollPos;
}

// бургер-меню 

function closeMenu() {
  document.getElementById("menu-toggle").checked = false;
}




