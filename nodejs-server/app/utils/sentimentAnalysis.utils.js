const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

analyzer = (review) => {
  try {
    const lexedReview = aposToLexForm(review);
    const casedReview = lexedReview.toLowerCase();
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

    tokenizedReview.forEach((word, index) => {
      tokenizedReview[index] = spellCorrector.correct(word);
    });

    const filteredReview = SW.removeStopwords(tokenizedReview);

    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const analysis = analyzer.getSentiment(filteredReview);

    let finalRating = 1 + 0.66 * (analysis + 3);

    if (finalRating > 5) {
      finalRating = 5;
    }

    return finalRating;
  } catch (err) {}
};

const sentimentAnalysis = {
  analyzer,
};
module.exports = {
  sentimentAnalysis,
};
