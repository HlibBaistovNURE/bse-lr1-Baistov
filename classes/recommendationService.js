class RecommendationService {
  constructor() {
    // Імітація бази даних фактів
    this.factsDB = [
      { id: 1, category: 'business', content: '70% людей вважають, що рукостискання формує перше враження.' },
      { id: 2, category: 'party', content: 'Найдовша вечірка у світі тривала 58 годин.' },
      { id: 3, category: 'dating', content: 'Зоровий контакт понад 3 секунди підвищує рівень довіри.' },
      { id: 4, category: 'business', content: 'Колір вашої краватки може впливати на хід переговорів.' }
    ];
    // Імітація бази "Обране" (userId -> масив збережених factId)
    this.favoritesDB = {};
  }

  // Метод 1: Отримати випадковий факт за категорією (з перевірками та рандомом)
  generateFact(category) {
    if (!category || typeof category !== 'string') {
      throw new Error('Категорія має бути непорожнім рядком');
    }

    const filteredFacts = this.factsDB.filter(fact => fact.category === category.toLowerCase());

    if (filteredFacts.length === 0) {
      throw new Error(`Факти для категорії "${category}" не знайдені`);
    }

    const randomIndex = Math.floor(Math.random() * filteredFacts.length);
    return filteredFacts[randomIndex];
  }

  // Метод 2: Отримати список фактів із перевіркою граничних значень (ліміт)
  getFactsByCategory(category, limit) {
    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      throw new Error('Ліміт має бути числом від 1 до 100');
    }

    const facts = this.factsDB.filter(fact => fact.category === category.toLowerCase());
    return facts.slice(0, limit);
  }

  // Метод 3: Збереження в "Обране" з перевіркою дублікатів
  saveToFavorites(userId, factId) {
    if (!userId || typeof factId !== 'number') {
      throw new Error('Некоректні дані користувача або ID факту');
    }

    const factExists = this.factsDB.some(fact => fact.id === factId);
    if (!factExists) {
      throw new Error('Факт із таким ID не існує');
    }

    // Якщо користувач вперше щось зберігає, створюємо йому масив
    if (!this.favoritesDB[userId]) {
      this.favoritesDB[userId] = [];
    }

    // Запобігаємо дублюванню
    if (this.favoritesDB[userId].includes(factId)) {
      return false; // Вже є в обраному
    }

    this.favoritesDB[userId].push(factId);
    return true; // Успішно збережено
  }
}

// Експортуємо клас для подальшого тестування
module.exports = RecommendationService;