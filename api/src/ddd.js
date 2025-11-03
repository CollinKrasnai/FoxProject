import { css } from 'lit';

export const DDDStyles = css`
  :host {
    display: block;
    --ddd-font-primary: "sans-serif";
    --ddd-theme-default-accent: #007ac1;
    --ddd-theme-default-text: #000000;
    --ddd-theme-default-background: #ffffff;
    --ddd-theme-default-shadetext: #333333;
    --ddd-theme-default-border: #cccccc;
    --ddd-theme-default-shadow: rgba(0, 0, 0, 0.1);

    font-family: var(--ddd-font-primary);
  }

  :host([dark-mode]) {
    --ddd-theme-default-accent: #4dabf7;
    --ddd-theme-default-text: #ffffff;
    --ddd-theme-default-background: #1a1a1a;
    --ddd-theme-default-shadetext: #cccccc;
    --ddd-theme-default-border: #444444;
    --ddd-theme-default-shadow: rgba(255, 255, 255, 0.1);
  }

  /* Handle OS-level preference */
  @media (prefers-color-scheme: dark) {
    :host(:not([dark-mode="false"])) {
      --ddd-theme-default-accent: #4dabf7;
      --ddd-theme-default-text: #ffffff;
      --ddd-theme-default-background: #1a1a1a;
      --ddd-theme-default-shadetext: #cccccc;
      --ddd-theme-default-border: #444444;
      --ddd-theme-default-shadow: rgba(255, 255, 255, 0.1);
    }
  }
`;
