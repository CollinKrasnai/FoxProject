import { LitElement, html, css } from 'lit';
import { DDDStyles } from './ddd.js';

class FoxCard extends LitElement {
  static properties = {
    foxData: { type: Object },
    isIntersecting: { type: Boolean, reflect: true },
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
        margin-bottom: 16px;
        color: var(--ddd-theme-default-text);
        transition: transform 0.2s ease-in-out;
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

      .author-info {
        font-size: 14px;
      }
      .author-name {
        font-weight: 600;
      }
      .author-channel {
        font-size: 12px;
        color: var(--ddd-theme-default-shadetext);
      }

      .fox-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        /* Placeholder background */
        background-color: var(--ddd-theme-default-border);
        min-height: 300px;
      }

      .card-body {
        padding: 12px;
      }
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
    this.foxData = {};
    this.isIntersecting = false;
    this.liked = false;
  }

  firstUpdated() {
    // Check local storage for like status
    const likeStatus = localStorage.getItem(`fox-like-${this.foxData.id}`);
    if (likeStatus === 'true') {
      this.liked = true;
    }

    // Set up IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.isIntersecting = true;
          observer.unobserve(this);
        }
      },
      { threshold: 0.1 } // Load when 10% visible
    );
    observer.observe(this);
  }

  _toggleLike() {
    this.liked = !this.liked;
    // Store like status in local storage
    localStorage.setItem(
      `fox-like-${this.foxData.id}`,
      this.liked
    );
    this.requestUpdate();
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
      // Fallback for browsers that don't support Web Share API
      alert('Web Share API not supported. Copy this link: ' + this.foxData.fullSizeSource);
    }
  }
  
  // Helper to format the date
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
    const { author, name, dateTaken, thumbnailSource, fullSizeSource } = this.foxData;

    // Conditionally render the full-size image only when intersecting
    const imageUrl = this.isIntersecting ? fullSizeSource : thumbnailSource;

    return html`
      <div class="card-container">
        <div class="card-header">
          <img class="author-image" src="${author.image}" alt="${author.name}" />
          <div class="author-info">
            <div class="author-name">${author.name}</div>
            <div class="author-channel">${author.channel} (since ${author.userSince})</div>
          </div>
        </div>
        
        <img class="fox-image" src="${imageUrl}" alt="${name}" />
        
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
