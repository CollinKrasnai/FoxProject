// src/fox-card.js
import { LitElement, html, css } from 'lit';
import { DDDStyles } from './ddd.js';

class FoxCard extends LitElement {
  static properties = {
    foxData: { type: Object },
    isIntersecting: { type: Boolean, state: true },
    liked: { type: Boolean, reflect: true },
  };

  static styles = [
    DDDStyles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-background);
        border: 1px solid var(--ddd-theme-default-border);
        border-radius: 8px;
        box-shadow: 0 2px 4px var(--ddd-theme-default-shadow);
        color: var(--ddd-theme-default-text);
        transition: transform 0.2s ease-in-out;
        /* This is a placeholder so the page doesn't jump */
        min-height: 400px; 
      }
      /* When the item is visible, remove its placeholder height */
      :host([isIntersecting]) {
        min-height: auto;
      }
      :host(:hover) {
        transform: translateY(-5px);
      }
      .card-header {
        display: flex;
        align-items: center;
        padding: 12px;
      }
      .author-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 12px;
        background-color: var(--ddd-theme-default-border);
      }
      .author-info { font-size: 14px; }
      .author-name { font-weight: 600; }
      .author-channel {
        font-size: 12px;
        color: var(--ddd-theme-default-shadetext);
      }
      .fox-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        background-color: var(--ddd-theme-default-border);
      }
      .card-body { padding: 12px; }
      .card-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 8px;
      }
      .card-date {
        font-size: 12px;
        color: var(--ddd-theme-default-shadetext);
      }
      .card-actions {
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
        border-top: 1px solid var(--ddd-theme-default-border);
      }
      .action-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        font-size: 14px;
        color: var(--ddd-theme-default-shadetext);
      }
      .action-button:hover {
        color: var(--ddd-theme-default-text);
      }
      .action-button.liked {
        color: var(--ddd-theme-default-accent);
      }
    `,
  ];

  constructor() {
    super();
    this.foxData = { author: {} }; // Default to empty object to avoid errors
    this.isIntersecting = false;
    this.liked = false;
  }

  firstUpdated() {
    if (this.foxData && this.foxData.id) {
      const likeStatus = localStorage.getItem(`fox-like-${this.foxData.id}`);
      if (likeStatus === 'true') {
        this.liked = true;
      }
    }

    // This handles the "Media should load conditionally" requirement
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.isIntersecting = true;
          this.setAttribute('isIntersecting', ''); // for the CSS selector
          observer.unobserve(this);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this);
  }

  _toggleLike() {
    this.liked = !this.liked;
    localStorage.setItem(`fox-like-${this.foxData.id}`, this.liked);
  }

  async _share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.foxData.name,
          text: `Check out this fox photo by ${this.foxData.author.name}!`,
          url: this.foxData.fullSizeSource,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Copy link: ' + this.foxData.fullSizeSource);
    }
  }
  
  _formatDate(dateString) {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  }

  render() {
    // Render only a placeholder until the element is in view
    if (!this.isIntersecting) {
      return html``;
    }

    // Once visible, render the full card
    const { author, name, dateTaken, fullSizeSource } = this.foxData;

    return html`
      <div class="card-container">
        <div class="card-header">
          <img class="author-image" src="${author.image}" alt="${author.name}" />
          <div class="author-info">
            <div class="author-name">${author.name}</div>
            <div class="author-channel">${author.channel} (since ${author.userSince})</div>
          </div>
        </div>
        
        <img class="fox-image" src="${fullSizeSource}" alt="${name}" loading="lazy" />
        
        <div class="card-body">
          <h3 class="card-name">${name}</h3>
          <p class="card-date">Taken on: ${this._formatDate(dateTaken)}</p>
        </div>

        <div class="card-actions">
          <button 
            class="action-button ${this.liked ? 'liked' : ''}" 
            @click="${this._toggleLike}"
            aria-pressed="${this.liked}"
          >
            ${this.liked ? '♥ Liked' : '♡ Like'}
          </button>
          <button class="action-button" @click="${this._share}">
            Share
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('fox-card', FoxCard);
