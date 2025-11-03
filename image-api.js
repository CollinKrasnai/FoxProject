import { LitElement, html, css } from 'lit';
import { DDDStyles } from './src/ddd.js'; 
import './src/fox-card.js'; 

class ImageApi extends LitElement {
  static properties = {
    dataSource: { type: String, attribute: 'data-source' },
    foxes: { type: Array, state: true },
    loading: { type: Boolean, state: true },
    darkMode: { type: Boolean, reflect: true, attribute: 'dark-mode' }
  };

  static styles = [
    DDDStyles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-background);
        color: var(--ddd-theme-default-text);
        padding: 16px;
      }
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
      .loader {
        font-size: 24px;
        text-align: center;
        padding: 48px;
      }
    `,
  ];

  constructor() {
    super();
    this.dataSource = '';
    this.foxes = [];
    this.loading = true;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = mediaQuery.matches;
    mediaQuery.addEventListener('change', (e) => {
      this.darkMode = e.matches;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.dataSource) {
      this.fetchData();
    }
  }

  async fetchData() {
    this.loading = true;
    try {
      const response = await fetch(this.dataSource);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.foxes = await response.json();
    } catch (error) {
      console.error('Error fetching fox data:', error);
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loader">Loading...</div>`;
    }

    return html`
      <div class="gallery-grid">
        ${this.foxes.map(
          (fox) => html`
            <fox-card .foxData="${fox}"></fox-card>
          `
        )}
      </div>
    `;
  }
}

// This defines the <image-api> tag for your HTML
customElements.define('image-api', ImageApi);
