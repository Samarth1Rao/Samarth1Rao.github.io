const PRONOUNS = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
const PREPOSITIONS = ['in', 'on', 'at', 'since', 'for', 'ago', 'before', 'to', 'past', 'till', 'until', 'by', 'next', 'beside', 'under', 'below', 'over', 'above', 'across', 'through', 'into', 'towards', 'onto', 'from', 'of', 'off', 'about'];
const ARTICLES = ['a', 'an', 'the'];

function analyzeText() {
  const text = document.getElementById('textInput').value;
  const resultsDiv = document.getElementById('results');
  
  // Clear previous results
  resultsDiv.innerHTML = '';
  
  if (!text.trim()) {
    resultsDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
    return;
  }

  // Basic text statistics
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const words = text.match(/\b[\w']+\b/g)?.length || 0;
  const spaces = text.match(/ /g)?.length || 0;
  const newlines = text.match(/\n/g)?.length || 0;
  const specialChars = text.length - letters - spaces - newlines;

  // Tokenize and count linguistic features
  const tokens = text.toLowerCase().match(/\b[\w']+\b/g) || [];
  const pronounCounts = countTokens(tokens, PRONOUNS);
  const prepCounts = countTokens(tokens, PREPOSITIONS);
  const articleCounts = countTokens(tokens, ARTICLES);

  // Display results
  resultsDiv.innerHTML = `
    <div class="result-group">
      <h3>Basic Text Statistics</h3>
      <p>Letters: ${letters}</p>
      <p>Words: ${words}</p>
      <p>Spaces: ${spaces}</p>
      <p>Newlines: ${newlines}</p>
      <p>Special Characters: ${specialChars}</p>
    </div>
    
    <div class="result-group">
      <h3>Pronouns</h3>
      ${formatCounts(pronounCounts)}
    </div>
    
    <div class="result-group">
      <h3>Prepositions</h3>
      ${formatCounts(prepCounts)}
    </div>
    
    <div class="result-group">
      <h3>Articles</h3>
      ${formatCounts(articleCounts)}
    </div>
  `;
}

function countTokens(tokens, targetWords) {
  const counts = {};
  targetWords.forEach(word => counts[word] = 0);
  
  tokens.forEach(token => {
    if (targetWords.includes(token)) {
      counts[token]++;
    }
  });
  
  return counts;
}

// if(text.length < 10000) {
//     resultsDiv.innerHTML = '<p>Error: Text must contain at least 10,000 characters.</p>';
//     return;
// }

function formatCounts(counts) {
  return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .map(([word, count]) => `<p>${word}: ${count}</p>`)
    .join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('analyzeBtn').addEventListener('click', analyzeText);
});