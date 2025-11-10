// /api/index.js

// --- Helper Data to Invent ---

//cycle through these names
const FAKE_AUTHORS = [
  'DogLover123',
  'PawsomePics',
  'Mr. Wiggles',
  'BarkleyFan',
  'The Good Boy',
  'WoofWeekly',
];
// cycle through these, too
const FAKE_CHANNELS = [
  'Canine Candids',
  'Daily Doggo',
  'PupLife',
  'Happy Hounds',
  'For the Love of Dogs',
];

function getFakeYear(index) {
  // This will just give a year between 2018 and 2023
  return 2018 + (index % 6);
}

function getFakeDate(index) {
  // This will just make each photo look like it was taken 1 day apart
  const date = new Date();
  date.setDate(date.getDate() - index);
  return date.toISOString();
}

// This helper function tries to get the breed name from the URL
function getBreedName(url) {
  try {
    // The URL looks like: https://images.dog.ceo/breeds/hound-blood/n...jpg
    // I split by '/' and get the 5th part (index 4)
    const breed = url.split('/')[4];
    // This turns "hound-blood" into "Hound Blood"
    return breed
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  } catch (e) {
    return 'A Good Dog';
  }
}

export default async function handler(req, res) {
  try {
    // 1. Fetch 50 random image URLs from the Dog API
    const response = await fetch('https://dog.ceo/api/breeds/image/random/50');
    if (!response.ok) {
      throw new Error(`Dog API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    const imageUrls = data.message; // This is an array of 50 strings

    // Transform the simple URL list into the complex JSON 
    const formattedData = imageUrls.map((url, index) => {
      const authorName = FAKE_AUTHORS[index % FAKE_AUTHORS.length];
      
      return {
        id: index + 1,
        name: getBreedName(url),
        dateTaken: getFakeDate(index),
        thumbnailSource: url,
        fullSizeSource: url,
        author: {
          name: authorName,
          image: `https://api.dicebear.com/8.x/bottts/svg?seed=${authorName}`, // Uses the same avatar service you had
          userSince: `${getFakeYear(index)}-01-01`,
          channel: FAKE_CHANNELS[index % FAKE_CHANNELS.length],
        },
      };
    });

    // 3. Send the new, complex array as the API response
    // We'll set a 1-hour cache
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(formattedData);
    
  } catch (error) {
    // If anything fails, send an error
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch and process dog images' });
  }
}
