

document.querySelector('#serviceForm').addEventListener('submit', async (e) => {
  e.preventDefault();


  let self = e.currentTarget;
  let serviceformData = new FormData();
  let phone = self.querySelector('#serviceTel').value;

    serviceformData.append('Новая запись на установку', `<a href="tel:${phone}">${phone}</a>`);


    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {


      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Ожидайте звонка от менеджера!')
        }
      }


    }

    await xhr.open('POST', 'mail.php', true);
    await xhr.send(serviceformData);
    self.reset();



});

