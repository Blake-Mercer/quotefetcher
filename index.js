const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
// Hide loading
const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Get quote from API
let apiQuotes = [];
const getQuote = async () => {
  showLoadingSpinner();
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote(apiQuotes);
  } catch (err) {
    console.log('No Quote Found', err);
  }
};

const newQuote = () => {
  showLoadingSpinner();
  //pick a random quote from api array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.innerText = 'Unknown';
  } else {
    authorText.innerText = quote.author;
  }
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //  Set Quote, Hide Loader
  quoteText.innerText = quote.text;
  removeLoadingSpinner();
};

//Tweet Quote

const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterURL, '_blank');
};

// Event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
