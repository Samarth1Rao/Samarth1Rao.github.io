// text_analyser.js

const PRONOUNS = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
const PREPOSITIONS = ['in', 'on', 'at', 'since', 'for', 'ago', 'before', 'to', 'past', 'till', 'until', 'by', 'next', 'beside', 'under', 'below', 'over', 'above', 'across', 'through', 'into', 'towards', 'onto', 'from', 'of', 'off', 'about'];
const ARTICLES = ['a', 'an', 'the'];

function analyzeText() {
  const text = document.getElementById('textInput').value;
  const resultsDiv = document.getElementById('results');
  
  // Clear previous results
  resultsDiv.innerHTML = '';
  
  // Validation checks
  if (!text.trim()) {
    resultsDiv.innerHTML = '<p class="error-message">Please enter some text to analyze.</p>';
    return;
  }

  if (text.length < 10000) {
    resultsDiv.innerHTML = `
      <p class="error-message">Error: Text must contain at least 10,000 characters.</p>
      <p>Current character count: ${text.length}/10,000</p>
    `;
    return;
  }

  // Text processing
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const words = text.match(/\b[\w']+\b/g)?.length || 0;
  const spaces = text.match(/ /g)?.length || 0;
  const newlines = text.match(/\n/g)?.length || 0;
  const specialChars = text.length - letters - spaces - newlines;

  // Linguistic analysis
  const tokens = text.toLowerCase().match(/\b[\w']+\b/g) || [];
  const pronounCounts = countTokens(tokens, PRONOUNS);
  const prepCounts = countTokens(tokens, PREPOSITIONS);
  const articleCounts = countTokens(tokens, ARTICLES);

  // Display results
  resultsDiv.innerHTML = `
    <div class="result-group">
      <h3>Text Statistics</h3>
      <p>Total Characters: ${text.length}</p>
      <p>Letters: ${letters}</p>
      <p>Words: ${words}</p>
      <p>Spaces: ${spaces}</p>
      <p>Newlines: ${newlines}</p>
      <p>Special Characters: ${specialChars}</p>
    </div>
    
    ${createCountSection('Pronouns', pronounCounts)}
    ${createCountSection('Prepositions', prepCounts)}
    ${createCountSection('Articles', articleCounts)}
  `;
}

function countTokens(tokens, targetWords) {
  return targetWords.reduce((counts, word) => {
    counts[word] = tokens.filter(t => t === word).length;
    return counts;
  }, {});
}

function createCountSection(title, counts) {
  const hasContent = Object.values(counts).some(count => count > 0);
  
  return `
    <div class="result-group">
      <h3>${title}</h3>
      ${hasContent ? formatCounts(counts) : '<p>No matches found</p>'}
    </div>
  `;
}

function formatCounts(counts) {
  return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => `<p>${word}: ${count}</p>`)
    .join('');
}

// Event listener initialization
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('analyzeBtn').addEventListener('click', analyzeText);
});
