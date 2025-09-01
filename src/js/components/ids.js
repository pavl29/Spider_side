class StaticIdManager {
    constructor() {
        this.config = {
            domain: window.location.hostname,
            storageKey: 'guaranteed_static_ids',
            attribute: 'data-id'
        };

        this.initialize();
    }

    initialize() {
        if (!this.checkStorageSupport()) return;

        this.loadData();
        this.processPage();
        this.saveData();
    }

    checkStorageSupport() {
        try {
            return typeof Storage !== 'undefined' && localStorage !== null;
        } catch {
            return false;
        }
    }

    loadData() {
        try {
            const data = JSON.parse(localStorage.getItem(this.config.storageKey) || '{}');
            this.domainData = data[this.config.domain] || {
                counter: 0,
                elementMap: {},
                created: new Date().toISOString()
            };
        } catch {
            this.domainData = {
                counter: 0,
                elementMap: {},
                created: new Date().toISOString()
            };
        }
    }

    saveData() {
        try {
            const allData = JSON.parse(localStorage.getItem(this.config.storageKey) || '{}');
            allData[this.config.domain] = this.domainData;
            localStorage.setItem(this.config.storageKey, JSON.stringify(allData));
        } catch (error) {
            console.warn('Не удалось сохранить данные:', error);
        }
    }

    generateElementSignature(element) {
        // Создаем уникальную сигнатуру элемента на основе содержимого и контекста
        const content = element.textContent.trim().substring(0, 100);
        const classes = element.className;
        const parent = element.parentNode ? element.parentNode.tagName : '';
        const siblings = element.parentNode ? element.parentNode.children.length : 0;
        const index = Array.from(element.parentNode?.children || []).indexOf(element);

        return `${content}|${classes}|${parent}|${siblings}|${index}`;
    }

    processPage() {
        const elements = document.querySelectorAll('li');
        let processed = 0;

        elements.forEach(element => {
            // Пропускаем элементы с уже установленным data-id
            if (element.hasAttribute(this.config.attribute)) {
                return;
            }

            const signature = this.generateElementSignature(element);
            const existingId = this.domainData.elementMap[signature];

            if (existingId !== undefined) {
                // Используем существующий ID
                element.setAttribute(this.config.attribute, existingId);
                element.setAttribute('data-id-static', 'true');
            } else {
                // Создаем новый ID
                this.domainData.counter++;
                element.setAttribute(this.config.attribute, this.domainData.counter);
                element.setAttribute('data-id-static', 'true');
                element.setAttribute('data-id-domain', this.config.domain);
                this.domainData.elementMap[signature] = this.domainData.counter;
            }

            processed++;
        });

        if (processed > 0) {
            
        }
    }

    // Статические методы для управления
    static getStats() {
        try {
            const data = JSON.parse(localStorage.getItem('guaranteed_static_ids') || '{}');
            const domain = window.location.hostname;
            return {
                domain: domain,
                totalIds: data[domain] ? data[domain].counter : 0,
                elementCount: data[domain] ? Object.keys(data[domain].elementMap).length : 0
            };
        } catch {
            return { error: 'Не удалось получить статистику' };
        }
    }

    static resetDomain() {
        try {
            const data = JSON.parse(localStorage.getItem('guaranteed_static_ids') || '{}');
            delete data[window.location.hostname];
            localStorage.setItem('guaranteed_static_ids', JSON.stringify(data));
            return true;
        } catch {
            return false;
        }
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', function() {
    new StaticIdManager();
});

// Глобальный доступ
window.StaticIDManager = StaticIdManager;
