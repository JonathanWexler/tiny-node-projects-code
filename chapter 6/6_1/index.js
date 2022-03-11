// npm install sentiment

/**
 * 
 * 1. Start with basic example
 * Explain how sentiment analysis works and how you can leverage the models of trained ML data
 * 2. Then talk about using this with a Journal to analyze your day
 * Keep metrics: overall sentiment, sentiment per line, average sentiment, most used tokens, etc.
 * 3. add a UI tool to accept text and return data values
 */

import Sentiment from 'sentiment';
const  sentiment = new Sentiment();
const result = sentiment.analyze(`Cats are really dumb. I don't hate them.`);
console.log(result);