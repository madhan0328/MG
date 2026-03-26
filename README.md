# Madhangokul — Portfolio

Modern personal portfolio built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root — composes all sections
    │
    ├── data/
    │   └── index.js          # ⭐ ALL your content lives here
    │
    ├── styles/
    │   └── globals.css       # Tailwind + reusable component classes
    │
    ├── hooks/
    │   └── useScrollReveal.js  # Intersection Observer hook
    │
    ├── assets/
    │   └── images/           # Drop profile.jpg, cert images here
    │
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Experience.jsx
        ├── Skills.jsx
        ├── Certificates.jsx
        ├── Interests.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

---

## How to Edit Content

**All personal data is in `src/data/index.js`** — one file, clearly labelled sections.

### Profile photo
1. Add `profile.jpg` to `src/assets/images/`
2. In `src/data/index.js`:
```js
import profileImg from '../assets/images/profile.jpg'

export const PERSONAL = {
  profileImage: profileImg,  // was null
}
```

### Certificate images
```js
import cert1 from '../assets/images/cert1.jpg'

export const CERTIFICATES = [
  { id: 1, title: '...', issuer: '...', year: '2024', image: cert1 },
]
```

---

## Email Setup (EmailJS — free, no server)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service → copy **Service ID**
3. Create a Template with these variables:
   ```
   From: {{from_name}} ({{from_email}})
   Subject: {{subject}}
   {{message}}
   ```
   Copy **Template ID**
4. Account → API Keys → copy **Public Key**
5. Paste into `src/data/index.js`:
```js
export const EMAILJS = {
  serviceId:  'service_abc123',
  templateId: 'template_xyz456',
  publicKey:  'aB1cD2eF3gH4',
}
```

---

## Style System

All shared styles live in `src/styles/globals.css` under `@layer components`:

| Class           | Usage                         |
|-----------------|-------------------------------|
| `.section`      | Page section wrapper + max-width |
| `.section-heading` | `<h2>` style            |
| `.section-divider` | Thin rule under heading   |
| `.card`         | White bordered card           |
| `.tag`          | Small pill/badge              |
| `.btn-primary`  | Dark filled button            |
| `.btn-ghost`    | Outlined button               |
| `.input`        | Form input field              |
| `.textarea`     | Form textarea                 |
| `.skill-card`   | Hover-fill skill card         |

---

## Deploy

```bash
npm run build       # output in /dist
npm run deploy      # builds + pushes to gh-pages branch
```

---

## Tech Stack

| Tool           | Purpose             |
|----------------|---------------------|
| React 18       | UI framework        |
| Vite           | Build tool          |
| Tailwind CSS   | Styling             |
| Framer Motion  | Animations          |
| EmailJS        | Contact form emails |
