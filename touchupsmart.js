class TouchUpSmart {
    constructor() {
        this.topics = {
            smalltalk: [
                "Recent movies and series",
                "Travel experiences and recommendations",
                "Food and cooking trends",
                "Technology innovations",
                "Sports and fitness"
            ],
            deepTopics: [
                "Career development strategies",
                "Personal growth and psychology",
                "Current events and politics",
                "Philosophy and ethics",
                "Science breakthroughs"
            ],
            icebreakers: [
                "What's something interesting you learned recently?",
                "Any exciting plans coming up?",
                "What's your favorite way to spend free time?",
                "Any book, podcast, or show you'd recommend?",
                "What's a skill you'd like to learn?"
            ]
        };
    }

    getRandomTopic(category = 'smalltalk') {
        const items = this.topics[category];
        return items[Math.floor(Math.random() * items.length)];
    }

    generateConversationKit(eventType) {
        return {
            topics: [this.getRandomTopic('smalltalk'), this.getRandomTopic('deepTopics')],
            icebreaker: this.getRandomTopic('icebreakers'),
            tips: [
                "Ask open-ended questions",
                "Listen actively",
                "Share genuine experiences"
            ]
        };
    }

    addCustomTopic(category, topic) {
        if (this.topics[category]) {
            this.topics[category].push(topic);
        }
    }
}
const app = new TouchUpSmart();

console.log("--- Випадкова тема (Smalltalk) ---");
console.log(app.getRandomTopic('smalltalk'));

console.log("\n--- Готовий набір для бесіди ---");
console.log(app.generateConversationKit());