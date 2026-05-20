const RecommendationService = require('../recommendationService');

describe('RecommendationService Tests', () => {
  let service;

  // Виконується перед кожним тестом, щоб база даних була чистою
  beforeEach(() => {
    service = new RecommendationService();
  });

  // ==========================================
  // Тести для методу generateFact(category)
  // ==========================================
  describe('Метод generateFact', () => {
    
    test('ТК-07: Повертає об\'єкт факту із бази даних (Валідна категорія)', () => {
      // Техніка: EP (Позитивний)
      
      // Arrange (Підготовка)
      const category = 'business';
      
      // Act (Дія)
      const result = service.generateFact(category);
      
      // Assert (Перевірка)
      expect(result).toBeDefined();
      expect(result.category).toBe(category);
    });

    test('ТК-08: Викидає помилку при порожньому рядку', () => {
      // Техніка: BVA (Негативний)
      
      // Arrange
      const category = '';
      
      // Act & Assert
      expect(() => service.generateFact(category)).toThrow('Категорія має бути непорожнім рядком');
    });

    test('ТК-09: Викидає помилку при null (Некоректний тип)', () => {
      // Техніка: EP (Негативний)
      
      // Arrange
      const category = null;
      
      // Act & Assert
      expect(() => service.generateFact(category)).toThrow('Категорія має бути непорожнім рядком');
    });

    test('ТК-10: Викидає помилку для неіснуючої категорії', () => {
      // Техніка: EP (Негативний)
      
      // Arrange
      const category = 'space';
      
      // Act & Assert
      expect(() => service.generateFact(category)).toThrow('Факти для категорії "space" не знайдені');
    });
  });

  // ==========================================
  // Тести для методу getFactsByCategory(category, limit)
  // ==========================================
  describe('Метод getFactsByCategory', () => {
    
    test('ТК-11: Повертає масив при валідних параметрах', () => {
      // Техніка: EP (Позитивний)
      
      // Arrange
      const category = 'business';
      const limit = 5;
      
      // Act
      const result = service.getFactsByCategory(category, limit);
      
      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(limit);
    });

    test('ТК-12: Повертає 1 факт при мінімальному ліміті', () => {
      // Техніка: BVA (Позитивний) - Нижня границя
      
      // Arrange
      const category = 'party';
      const limit = 1;
      
      // Act
      const result = service.getFactsByCategory(category, limit);
      
      // Assert
      expect(result.length).toBe(1);
    });

    test('ТК-13: Обробляє максимальний ліміт', () => {
      // Техніка: BVA (Позитивний) - Верхня границя
      
      // Arrange
      const category = 'dating';
      const limit = 100;
      
      // Act
      const result = service.getFactsByCategory(category, limit);
      
      // Assert
      expect(result.length).toBeLessThanOrEqual(100);
      expect(result.length).toBeGreaterThan(0);
    });

    test('ТК-14: Викидає помилку при ліміті 0', () => {
      // Техніка: BVA (Негативний) - Поза нижньою границею
      
      // Arrange
      const category = 'business';
      const limit = 0;
      
      // Act & Assert
      expect(() => service.getFactsByCategory(category, limit)).toThrow('Ліміт має бути числом від 1 до 100');
    });

    test('ТК-15: Викидає помилку при ліміті 101', () => {
      // Техніка: BVA (Негативний) - Поза верхньою границею
      
      // Arrange
      const category = 'business';
      const limit = 101;
      
      // Act & Assert
      expect(() => service.getFactsByCategory(category, limit)).toThrow('Ліміт має бути числом від 1 до 100');
    });
  });

  // ==========================================
  // Тести для методу saveToFavorites(userId, factId)
  // ==========================================
  describe('Метод saveToFavorites', () => {
    
    test('ТК-16: Успішне додавання факту', () => {
      // Техніка: EP (Позитивний)
      
      // Arrange
      const userId = 'user1';
      const factId = 1;
      
      // Act
      const result = service.saveToFavorites(userId, factId);
      
      // Assert
      expect(result).toBe(true);
      expect(service.favoritesDB[userId]).toContain(factId);
    });

    test('ТК-17: Запобігання дублікату', () => {
      // Техніка: BVA (Позитивний) - Елемент вже існує
      
      // Arrange
      const userId = 'user1';
      const factId = 1;
      service.saveToFavorites(userId, factId); // Зберігаємо вперше
      
      // Act
      const result = service.saveToFavorites(userId, factId); // Намагаємося зберегти вдруге
      
      // Assert
      expect(result).toBe(false);
      expect(service.favoritesDB[userId].length).toBe(1);
    });

    test('ТК-18: Помилка при неіснуючому ID', () => {
      // Техніка: EP (Негативний)
      
      // Arrange
      const userId = 'user1';
      const factId = 999;
      
      // Act & Assert
      expect(() => service.saveToFavorites(userId, factId)).toThrow('Факт із таким ID не існує');
    });
  });
});