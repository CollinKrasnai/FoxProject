// fox-card.js

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3/index.js';
// Import the SuperClass
import { IntersectionElementSuper } from './IntersectionElementSuper.js';

// Extend IntersectionElementSuper(LitElement) instead of just LitElement
class FoxCard extends IntersectionElementSuper(LitElement) {
  
  static get properties() {
    return {
      // The image source URL
      imageSrc: { type: String, attribute: 'image-src' },
      // The link to the fox page
      link: { type: String },
      // This property comes from IntersectionElementSuper
      elementVisible: { type: Boolean, reflect: true, attribute: 'element-visible' }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        /* This ensures the card takes up space even before loading */
        min-height: 250px;
      }
      
      .card {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #fff;
      }
      
      .card-placeholder {
        width: 100%;
        height: 250px; /* Same as min-height */
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #aaa;
      }

      img {
        width: 100%;
        height: auto;
        display: block;
      }

      .card-link {
        display: block;
        text-align: center;
        padding: 8px;
        background-color: #f9f9f9;
        color: #337ab7;
        text-decoration: none;
        font-family: sans-serif;
        font-size: 0.9rem;
      }
      .card-link:hover {
        background-color: #f0f0f0;
      }
    `;
  }

  render() {
    // This is the conditional rendering based on the professor's hint
    // It only renders the full card HTML *after* it becomes visible.
    return this.elementVisible
      ? html`
          <div class="card">
            <img src="${this.imageSrc}" alt="A random fox" loading="lazy" />
            <a class="card-link" href="${this.link}" target="_blank">View Source</a>
          </div>
        `
      : html`
          <div class="card-placeholder">Loading...</div>
        `;
  }
}

customElements.define('fox-card', FoxCard);