// test/image-api.test.js
import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

// Import the component
import '../image-api.js';

describe('ImageApi', () => {
  it('loads and displays the gallery grid', async () => {
    // Mock the fetch call
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: 'Test Fox',
          dateTaken: '2025-10-01T08:30:00Z',
          fullSizeSource: 'https://randomfox.ca/images/1.jpg',
          author: {
            name: 'Test Author',
            image: 'https://api.dicebear.com/8.x/bottts/svg?seed=test',
            userSince: '2020-01-01',
            channel: 'Test Channel',
          },
        },
      ],
    });

    // Use the correct tag <image-api>
    const el = await fixture(
      html`<image-api data-source="./api/foxes.json"></image-api>`
    );
    
    // Wait for component to update after fetch
    await el.updateComplete;

    const grid = el.shadowRoot.querySelector('.gallery-grid');
    expect(grid).to.exist;

    const card = el.shadowRoot.querySelector('fox-card');
    expect(card).to.exist;
    expect(card.foxData.name).to.equal('Test Fox');
  });

  it('passes accessibility audit', async () => {
    const el = await fixture(
      html`<image-api data-source="./api/foxes.json"></image-api>`
    );
    await el.updateComplete;
    await expect(el).to.be.accessible();
  });
});
