# NoCliques

**NoCliques** is a team generator app designed to create fair and balanced teams for casual soccer matches. By analyzing players' skills and positions, it ensures fairness and prevents the formation of "cliques".

---

## 🌍 Internationalization (i18n)

NoCliques now supports multiple languages!  
You can use the app in:

- English (`/en`)
- Portuguese (`/pt`)

The UI adapts automatically based on your browser’s language or selected route.

---

## ✨ Features

- **Skill-Based Team Generation**: Uses skill levels (e.g., 'low', 'medium', 'high') to create balanced teams.
- **Position Analysis**: Ensures each team has the right mix of positions for optimal gameplay.
- **Fair and Transparent**: Randomized sorting eliminates the formation of "cliques."
- **Simple Interface**: User-friendly design for quick and hassle-free team generation.
- **Customizable Settings**: Adjust parameters such as number of players, number of teams, and more.
- **Language Support**: Dynamic translation using [`next-intl`](https://next-intl.js.org/) with locale-based routing.

---

## 🚀 Usage

1. Select the number of players, input player names, positions and skill levels.
2. Select the number of teams and input teams names.
3. Click **"Generate Teams"** to create balanced teams.
4. Share results via copy, download, or share integration.

---

## 🛠 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/docs/app)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **i18n**: [next-intl](https://next-intl.js.org/)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Logic**: Custom TypeScript algorithms for team balancing

---

## 🧪 Development Notes

- Localized routes use dynamic segments like `/en` or `/pt`, powered by middleware for automatic locale detection.

---

## 📫 Contact

For questions, suggestions, or contributions:

- **Developer**: Antonio Poloni
- **Email**: [antoniopolonijr@gmail.com](mailto:antoniopolonijr@gmail.com)
- **GitHub**: [@antoniopolonijr](https://github.com/antoniopolonijr)
- **LinkedIn**: [Antonio Poloni](https://www.linkedin.com/in/antonio-br%C3%A1s-poloni-j%C3%BAnior-27148390/)
- **Portfolio**: [antoniopolonijr.github.io](https://antoniopolonijr.github.io/index.html)

---

Enjoy fair and fun games with **NoCliques**! ⚽✨
