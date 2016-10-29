$(document).ready(function() {
  var quotes = [
    ["Television is where you watch people in your living room that you would not want near your house.", "Groucho Marx"],
    ["Education's purpose is to replace an empty mind with an open one.", "Malcolm Forbes"],
    ["Today, you always know whether you are on the Internet or on your PC's hard drive. Tomorrow, you will not care and may not even know.", "Bill Gates"],
    ["Anyone without a sense of humor is at the mercy of everyone else.", "William Rotsler"],
    ["Analyzing humor is like dissecting a frog. Few people are interested and the frog dies of it.", "E.B. White"],
    ["What do you know and how do you know it?", "Ayn Rand"],
    ["When I study philosophical works I feel I am swallowing something which I don't have in my mouth.", "Albert Einstein"],
    ["Reading makes a full man, conference a ready man, and writing an exact man.", "Francis Bacon"],
    ["Always do sober what you said you'd do drunk. That will teach you to keep your mouth shut.", "Ernest Hemingway"],
    ["If everyone is thinking alike, someone isn't thinking.", "George Patton"],
    ["I'll be more enthusiastic about encouraging thinking outside the box when there's evidence of any thinking going on inside it.", "Terry Pratchett"],
    ["The fool doth think he is wise, but the wise man knows himself to be a fool.", "William Shakespeare"],
    ["I do not like work even when someone else does it.", "Mark Twain"],
    ["I am a strong believer in luck and I find the harder I work the more I have of it.", "Benjamin Franklin"],
    ["The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane.", "Nikola Tesla"]
  ];

  var currentQuote;
  var tweetURL;
  var randnum;
  var quotesLen = quotes.length;

  function getRandomQuote() {
    randnum = Math.floor((Math.random() * quotesLen) + 1)
    currentQuote = quotes[randnum];
    $("#quote").text('"' + currentQuote[0] + '"');
    $("#author").text(currentQuote[1]);
  }

  // initial quote on page load
  getRandomQuote();

  function tweetQuote() {
    tweetURL = "https://twitter.com/intent/tweet" + "?text=" + '"' + currentQuote[0] + '"' + " &hashtags=" + currentQuote[1];
    window.open(tweetURL, '_blank');
  };

  $(".btn-quote").click(function() {
    getRandomQuote();
  });

  $(".btn-tweet").click(function() {
    tweetQuote();
  });
});