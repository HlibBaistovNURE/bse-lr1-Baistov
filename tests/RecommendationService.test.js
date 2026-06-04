/* global describe, beforeEach, test, expect */
const RecommendationService = require('./classes/recommendationService');

describe('RecommendationService Tests', () => {
  let service;

  // Створюємо новий екземпляр сервісу перед кожним тестом для ізоляції стану
  beforeEach(() => {
    service = new RecommendationService();
  });

  // ==========================================
  // Тести для методу generateFact(category)
  // ==========================================
  describe('Метод generateFact', () => {
    
    test('ТК-07: Повертає об\'єкт факту із бази даних (Валідна категорія)', () => {
      const category = 'business';
      const result = service.generateFact(category);
      expect(result).toBeDefined();
      expect(result.category).toBe(category);
    });

    test('ТК-08: Викидає помилку при порожньому рядку', () => {
      const category = '';
      expect(() => service.generateFact(category)).toThrow('Категорія має бути непорожнім рядком');
    });

    test('ТК-09: Викидає помилку при null (Некоректний тип)', () => {
      const category = null;
      expect(() => service.generateFact(category)).toThrow('Категорія має бути непорожнім рядком');
    });

    test('ТК-10: Викидає помилку для неіснуючої категорії', () => {
      const category = 'space';
      expect(() => service.generateFact(category)).toThrow('Факти для категорії "space" не знайдені');
    });
  });

  // ==========================================
  // Тести для методу getFactsByCategory(category, limit)
  // ==========================================
  describe('Метод getFactsByCategory', () => {
    
    test('ТК-11: Повертає масив при валідних параметрах', () => {
      const category = 'business';
      const limit = 5;
      const result = service.getFactsByCategory(category, limit);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(limit);
    });

    test('ТК-12: Повертає 1 факт при мінімальному ліміті', () => {
      const category = 'party';
      const limit = 1;
      const result = service.getFactsByCategory(category, limit);
      expect(result.length).toBe(1);
    });

    test('ТК-13: Обробляє максимальний ліміт', () => {
      // Змінено категорію на 'business', щоб точно знати кількість наявних фактів (їх 2)
      const category = 'business';
      const limit = 100;
      const result = service.getFactsByCategory(category, limit);
      
      // Сувора перевірка: маємо отримати всі наявні факти цієї категорії
      expect(result.length).toBe(2);
    });

    test('ТК-14: Викидає помилку при ліміті 0', () => {
      const category = 'business';
      const limit = 0;
      expect(() => service.getFactsByCategory(category, limit)).toThrow('Ліміт має бути числом від 1 до 100');
    });

    test('ТК-15: Викидає помилку при ліміті 101', () => {
      const category = 'business';
      const limit = 101;
      expect(() => service.getFactsByCategory(category, limit)).toThrow('Ліміт має бути числом від 1 до 100');
    });
  });

  // ==========================================
  // Тести для методу saveToFavorites(userId, factId)
  // ==========================================
  describe('Метод saveToFavorites', () => {
    
    // Винесено спільні змінні для усунення дублювання
    const userId = 'user1';
    const factId = 1;

    test('ТК-16: Успішне додавання факту', () => {
      const result = service.saveToFavorites(userId, factId);
      expect(result).toBe(true);
      expect(service.favoritesDB[userId]).toContain(factId);
    });

    test('ТК-17: Запобігання дублікату', () => {
      service.saveToFavorites(userId, factId); 
      const result = service.saveToFavorites(userId, factId); 
      expect(result).toBe(false);
      expect(service.favoritesDB[userId].length).toBe(1);
    });

    test('ТК-18: Помилка при неіснуючому ID', () => {
      const invalidFactId = 999;
      expect(() => service.saveToFavorites(userId, invalidFactId)).toThrow('Факт із таким ID не існує');
    });
  });
});