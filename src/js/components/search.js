// search-widget.js
class SearchWidget {
  constructor() {
    this.searchForm = document.getElementById('search-form');
    this.searchInput = document.getElementById('search-input');

    this.init();
  }

  init() {
    // Обработчики событий
    this.searchForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  // Обработка отправки формы
  handleSubmit(e) {
    e.preventDefault();

    const query = this.searchInput.value.trim();

    if (query.length < 2) {
      this.showMessage('Введите хотя бы 2 символа для поиска', 'error');
      return;
    }

    // Перенаправляем на страницу поиска
    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
  }

  // Показать сообщение
  showMessage(message, type = 'info') {
    // Создаем элемент сообщения
    const messageEl = document.createElement('div');
    messageEl.className = `search-message search-message--${type}`;
    messageEl.textContent = message;

    // Добавляем стили
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.left = '50%';
    messageEl.style.transform = 'translateX(-50%)';
    messageEl.style.padding = '10px 20px';
    messageEl.style.background = type === 'info' ? '#2196F3' : '#F44336';
    messageEl.style.color = 'white';
    messageEl.style.borderRadius = '4px';
    messageEl.style.zIndex = '10000';
    messageEl.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

    // Добавляем в DOM
    document.body.appendChild(messageEl);

    // Удаляем через 3 секунды
    setTimeout(() => {
      messageEl.style.opacity = '0';
      messageEl.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        if (document.body.contains(messageEl)) {
          document.body.removeChild(messageEl);
        }
      }, 500);
    }, 3000);
  }
}

// Инициализация виджета поиска после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  new SearchWidget();
});
