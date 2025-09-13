function startTime() {
  const time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  const clock = document.getElementById('clock');
  if (clock) clock.innerHTML = `${h}:${m}:${s}`;
  setTimeout(startTime, 1000);
}

function startDate() {
  const today = new Date();
  let mo = today.getMonth() + 1;
  let d = today.getDate();
  let y = today.getFullYear();
  mo = checkTime(mo);
  d = checkTime(d);
  y = checkTime(y);
  const date = document.getElementById('date');
  if (date) date.innerHTML = `${mo}/${d}/${y}`;
}

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, startX = 0, startY = 0;

  element.addEventListener('mousedown', function (e) {
    if (e.target.closest('input, textarea, select, button')) return;
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;

    function mouseMoveHandler(e) {
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      element.style.left = (element.offsetLeft + offsetX) + 'px';
      element.style.top = (element.offsetTop + offsetY) + 'px';
      startX = e.clientX;
      startY = e.clientY;
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  element.addEventListener('touchstart', function (e) {
    if (e.target.closest('input, textarea, select, button')) return;
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    function touchMoveHandler(e) {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      offsetX = touch.clientX - startX;
      offsetY = touch.clientY - startY;
      element.style.left = (element.offsetLeft + offsetX) + 'px';
      element.style.top = (element.offsetTop + offsetY) + 'px';
      startX = touch.clientX;
      startY = touch.clientY;
      e.preventDefault();
    }

    function touchEndHandler() {
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
    }

    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler);
  });
}

document.addEventListener('DOMContentLoaded', () => {

  startTime();
  startDate();

  const draggablePopups = document.querySelectorAll('.popup');
  draggablePopups.forEach(el => makeDraggable(el));

  let zIndexCounter = 1000;

  function bringToFront(popup) {
    popup.style.zIndex = ++zIndexCounter;
  }

  function openPopup(popup) {
    popup.style.display = 'block';
    bringToFront(popup);
  }

  function closePopup(popup) {
    popup.style.display = 'none';
  }

  const config = [
    { iconKey: 'work', popupId: 'work-popup', closeId: 'close-work-popup' },
    { iconKey: 'contact', popupId: 'contact-popup', closeId: 'close-contact-popup' },
    { iconKey: 'about', popupId: 'about-popup', closeId: 'close-about-popup' },
    { iconKey: 'resume', popupId: 'resume-popup', closeId: 'close-resume-popup' },
    { popupId: 'intro-popup', closeId: 'close-intro-popup' }, // No icon
  ];

  config.forEach(({ iconKey, popupId, closeId }) => {
    const popup = document.getElementById(popupId);
    const closeBtn = document.getElementById(closeId);
 
    if (popup) {
      ['mousedown', 'touchstart'].forEach(evt => {
        popup.addEventListener(evt, () => bringToFront(popup));
      });
    }

    if (iconKey && popup) {
      const icons = document.querySelectorAll(`.icon[data-icon="${iconKey}"]`);
      icons.forEach(icon => {
        icon.addEventListener('click', () => openPopup(popup));
      });
    }

    if (closeBtn && popup) {
      closeBtn.addEventListener('click', () => closePopup(popup));
    }
  });

  const introPopup = document.getElementById('intro-popup');
  if (introPopup) {
    openPopup(introPopup);
  }
});