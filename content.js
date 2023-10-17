
let extensionEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleExtension") {
    extensionEnabled = !extensionEnabled;
    if (extensionEnabled) {
      // If the extension is toggled on, defamiliarize the headlines
      const elements = document.querySelectorAll('h1, h2, h3, p, span, li, a, blockquote, caption, td, th');
      elements.forEach((element) => {
        element.textContent = defamiliarize(element.textContent);
      });
      sendResponse({status: "on"});
    } else {
      // If toggled off, you can reload the page to see original content or implement logic to revert changes
      location.reload();
      sendResponse({status: "off"});
    }
  }
});

function defamiliarize(text) {
  const replacements = {
    'war': 'Dance of Shadows',
    'politics': 'Reamscape',
    'election': 'celestial gathering',
    'economy': 'rhythmic balance of stars',
    'president': 'Moon Guardian',
    'government': 'Cosmic Order',
    'protest': 'whispered chants of the ancients',
    'crime': 'shadows embrace',
    'victory': 'ethereal triumph',
    'defeat': 'whisper of the void'
  };

  // Replace common words with poetic/surreal alternatives
  for (let word in replacements) {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    text = text.replace(regex, replacements[word]);
  }

  // Replace words with their poetic synonyms
  text = replaceWithPoeticSynonyms(text);

  // Alter sentence structure
  if (Math.random() < 0.5) { // 50% chance to alter sentence structure
    const parts = text.split(' ');
    if (parts.length > 3) {
      const temp = parts[0];
      parts[0] = parts[2];
      parts[2] = temp;
      text = parts.join(' ');
    }
  }

  // Introduce random poetic phrases
  const poeticPhrases = [
    'under the silver moonlight',
    'whispers of ancient winds',
    'echoes from the void',
    'dances of the ethereal',
    'songs of the stars',
    'in the embrace of twilight',
    'where shadows sing',
    'as the cosmos watches'
  ];
  if (Math.random() < 0.4) { // 40% chance to insert a poetic phrase
    const randomPhrase = poeticPhrases[Math.floor(Math.random() * poeticPhrases.length)];
    const insertPosition = Math.floor(text.split(' ').length / 2);
    const textParts = text.split(' ');
    textParts.splice(insertPosition, 0, randomPhrase);
    text = textParts.join(' ');
  }

  return text;
}

function replaceWithPoeticSynonyms(text) {
  const synonyms = {
    'people': 'dreamers',
    'world': 'cosmos',
    'country': 'realm',
    'city': 'enclave of echoes',
    'leader': 'shepherd of stars',
    'meeting': 'confluence of fates'
  };

  for (let word in synonyms) {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    text = text.replace(regex, synonyms[word]);
  }

  return text;
}
