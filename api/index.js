// /api/index.js

// Import the JSON data directly.
// Vercel's build process will bundle this.
import data from './foxes.json' assert { type: 'json' };

// This is the Vercel serverless function handler
export default function handler(req, res) {
  // Set a standard cache header
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  // Send the imported JSON data as the response
  res.status(200).json(data);
}
