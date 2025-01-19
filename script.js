// Array-ul pentru citate
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode"); // Adaugă/elimină clasa "dark-mode"
});
let quotes = [];

// Încărcare citate salvate din localStorage
const savedQuotes = localStorage.getItem("quotes");
if (savedQuotes) {
  quotes = JSON.parse(savedQuotes); // Suprascrie `quotes` cu cele salvate
}

// Elemente din DOM
const quoteElement = document.getElementById("quote");
const button = document.getElementById("new-quote");
const totalTracker = document.getElementById("no-quotes");

// Actualizare număr total de citate
updateQuoteTracker();

// Afișare citat random la click pe buton
const noQuotesMessage = document.getElementById("no-quotes-message");

button.addEventListener("click", () => {
    if (quotes.length === 0) {
        // Afișează mesajul informativ
        noQuotesMessage.textContent = "No quotes saved! Please generate a quote using the API or add one manually.";
        noQuotesMessage.style.display = "block"; // Afișează mesajul
        return; // Oprește execuția
    }

    // Ascunde mesajul dacă există citate
    noQuotesMessage.style.display = "none";

    quoteElement.classList.add("hidden"); // Ascunde citatul

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
        quoteElement.classList.remove("hidden"); // Afișează citatul nou
    }, 500); // Așteaptă 0.5 secunde (cât durează animația)
});
// Formularul de adăugare citat
const form = document.getElementById("add-quote-form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previne reîncărcarea paginii

  const newQuote = document.getElementById("new-quote-id");
  if (newQuote.value.trim() !== '') {
    quotes.push(newQuote.value.trim()); // Adaugă citatul în array
    saveQuotesToLocalStorage(); // Salvează în localStorage
    updateQuoteTracker(); // Actualizează numărul de citate
    clearInputQuote(newQuote); // Golește input-ul
  } else {
    alert("Please enter a quote before submitting");
  }
});


const shareButton = document.getElementById("share-quote");
shareButton.addEventListener('click', () => {
  const quoteText = quoteElement.textContent;
  const twitterURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quoteText);
  window.open(twitterURL, "_blank");
});


const getButton = document.getElementById("get-quote");
getButton.addEventListener('click', () =>{
  fetch("https://zenquotes.io/api/random")
  .then((response) => response.json())
  .then((data) => {
    const quoteText = data[0].q;
    fetchedQuote.textContent = quoteText;
  })
})
const fetchedQuote = document.getElementById("fetched-quote");
const saveButton = document.getElementById("save-quote");
saveButton.addEventListener('click', () => {
  quotes.push(fetchedQuote.textContent)
  saveQuotesToLocalStorage();
  updateQuoteTracker();
}
);

// Selectează elementele relevante ||| copy to clipboard 
const copyButton = document.getElementById("copy-quote");
const feedbackMessage = document.getElementById("copy-feedback");

copyButton.addEventListener("click", () => {
  // Copiază textul citatului în clipboard
  const quoteText = quoteElement.textContent;
  navigator.clipboard.writeText(quoteText).then(() => {
    // Afișează mesajul de feedback
    feedbackMessage.style.display = "inline";

    // Ascunde mesajul după 2 secunde
    setTimeout(() => {
      feedbackMessage.style.display = "none";
    }, 2000);
  }).catch((err) => {
    console.error("Failed to copy text: ", err);
  });
});

// Salvează citatele în localStorage
function saveQuotesToLocalStorage() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Actualizare număr total citate
function updateQuoteTracker() {
  totalTracker.textContent = "Total quotes stored: " + quotes.length;
}

// Golește input-ul
function clearInputQuote(input) {
  input.value = '';
}
