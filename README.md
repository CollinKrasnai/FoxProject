# Dog Gallery Project

A responsive, "Instagram-style" photo gallery built with Lit web components. This project fulfills the requirements for [**Your Course Name Here, e.g., IST 256**] by demonstrating a complete front-to-back web application.

This project fetches 50 random dog images from the `dog.ceo` API and enriches them with mock author and metadata via a custom Vercel serverless function (`/api`) to simulate a real-world, complex API.

### Live Demo

[**https://your-project-name.vercel.app**](https://your-project-name.vercel.app)

*(Replace the link above with your final Vercel deployment URL)*

---

## Screenshots

*(It's highly recommended to add screenshots of your finished project here!)*

| Light Mode | Dark Mode |
| :---: | :---: |
| `` | `

[Image of Dark Mode]
` |

---

## Features

* **Modern Web Components:** Built with [Lit](https://lit.dev/) for fast, lightweight components (`<image-api>` and `<dog-card>`).
* **Vercel Serverless API:** A custom API endpoint (`/api/index.js`) fetches data from an external API (`dog.ceo`), enriches it with fake author and date metadata, and serves the complex JSON to the client.
* **Responsive Design:** A mobile-first CSS grid layout that looks great on all screen sizes.
* **Dark Mode:** Automatically adapts to the user's OS preference using DDD-based CSS variables.
* **Local Storage:** The "Like" button state is saved to the user's `localStorage` and persists between visits.
* **Web Share API:** Uses the native `navigator.share` API on supported devices (like mobile phones).
* **Clipboard Fallback:** On desktop, the share button copies the image link directly to the user's clipboard.
* **Performance Optimized:** Images are lazy-loaded as they enter the viewport using the `IntersectionObserver` API to ensure fast initial page loads.

---

## Running Locally

To run this project on your local machine, you will need [Node.js](https://nodejs.org/) installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/FoxProject.git](https://github.com/YOUR_USERNAME/FoxProject.git)
    ```
    *(Replace with your repository's URL)*

2.  **Navigate to the project folder:**
    ```bash
    cd FoxProject
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the Vercel development server:**
    This command will run your project just as it would on Vercel, including the `/api` serverless function.
    ```bash
    vercel dev
    ```

5.  **Open the site:**
    Your project will be available at `http://localhost:3000`.

---

## Scripts

* `npm start`: Runs the project with Web Dev Server (does not run the Vercel API).
* `npm run build`: Creates a production-ready, optimized build in the `/dist` folder.
* `npm test`: Runs the complete test suite using Web Test Runner.

---

## Project Requirements Checklist

- [x] **Uses DDD:** Styling is managed via `ddd.js` and CSS variables.
- [x] **Loads Multiple Images from JSON:** Fetches 50 items from the `/api` endpoint.
- [x] **Uses `hax` CLI tooling:** Project is structured with `package.json` dependencies from `@haxtheweb`.
- [x] **Working Vercel Demo:** Project is built to be deployed on Vercel.
- [x] **Vercel `/api/` Endpoint:** The `/api/index.js` file acts as the serverless function.
- [x] **Mobile Responsive:** The gallery uses a responsive `auto-fill` grid.
- [x] **Dark Mode:** Automatically supported via `@media (prefers-color-scheme: dark)`.
- [x] **Loads 50 Images:** The API fetches and formats 50 images.
- [x] **Conditional Media Loading:** `IntersectionObserver` is used to lazy-load cards.
- [x] **Complex API Structure:** The API constructs data with all required fields (name, date, author info).
- [x] **Visual Card Display:** The `<dog-card>` component displays the image, author details, and actions.
- [x] **Share & Like/Dislike:** All card actions (Share, Like) are fully implemented.

---

## Author

* **Collin Krasnai**
