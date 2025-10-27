// fox-gallery.js

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/index.js';
// Import your card component so you can use it in the HTML
import './fox-card.js';

class FoxGallery extends LitElement {
  
  static get properties() {
    return {
      // This array will hold all our fox data objects
      foxes: { type: Array }
    };
  }

  constructor() {
    super();
    this.foxes = []; // Initialize as an empty array
    // This meets the requirement: "when we refresh the new fox appears"
    this.loadFox();
  }

  // This is the function that fetches data from the API
  async loadFox() {
    const API = "https://randomfox.ca/floof/";
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // We add the new fox to the beginning of the array
      // This uses the "mapping" and "storing" concepts
      this.foxes = [data, ...this.foxes];
      
    } catch (error) {
      console.error("Could not fetch fox:", error);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        font-family: sans-serif;
      }

      .controls {
        text-align: center;
        margin-bottom: 24px;
      }

      button {
        padding: 12px 24px;
        font-size: 1rem;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: #0056b3;
      }

      /* This is the "gallery" layout (masonry grid) */
      .gallery-grid {
        display: grid;
        /* Creates 3 columns on desktop, 2 on tablet, 1 on mobile */
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
    `;
  }

  render() {
    return html`
      <div class="controls">
        <button @click="${this.loadFox}">Load a New Fox</button>
      </div>

      <div class="gallery-grid">
        ${this.foxes.map(
          (fox) => html`
            <fox-card 
              image-src="${fox.image}" 
              link="${fox.link}"
            ></fox-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('fox-gallery', FoxGallery);