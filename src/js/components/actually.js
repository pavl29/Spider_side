
let date = new Date();

let nowDay = date.getDay();

let nowHour = date.getHours();

const isOpen = document.querySelector('#open');

const isClosed = document.querySelector('#closed');

function workTime(day, hour) {

  if (day < '6' && hour >= '10' && hour < '19') {
    isOpen.style.display = 'block';
  } else if (day == '6' && hour >= '10' && hour < '18') {
    isOpen.style.display = 'block';
  } else if (day == '0' && hour >= '10' && hour < '18') {
    isOpen.style.display = 'block';
  } else {
    isClosed.style.display = 'block';
  }
}

workTime(nowDay, nowHour)

