# Матриця трасованості вимог (Traceability Matrix)
## Проєкт: Touch Up Smart

*Виконав: Баістов Гліб*

| Вимога | Use Case | Класи | Sequence |
| :--- | :--- | :--- | :--- |
| **FR-01** (Вибір контексту події) | **UC-01** | User, Category, RecommendationService | — |
| **FR-02** (Генерація випадкового факту) | **UC-02** | FactCard, RecommendationService | **SD-01** (Генерація факту) |
| **FR-03** (Офлайн-доступ до контенту) | **UC-03** | CacheManager, FactCard | — |
| **FR-04** (Управління «Обраним») | **UC-04** | User, FactCard, FavoriteFolder | — |
| **FR-05** (Модерація контенту — Admin) | **UC-05** | Administrator, FactCard, AdminService | — |
| **FR-06** (Система Push-сповіщень) | **UC-06** | NotificationManager, User, Event | — |
