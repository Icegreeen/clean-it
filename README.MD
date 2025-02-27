# 🧹 Clean-IT CLI

**A powerful tool to analyze, optimize, and clean Frontend projects!**

## 🚀 About Clean-IT

**Clean-IT** is a CLI (Command Line Interface) that scans **React** and **Next.js** projects, identifying **unused files** and displaying a detailed report. It helps keep your repository clean and optimized, reducing dead code and improving project maintainability.

## 📌 Features

✅ **Recursively scans directories** to identify unused files.
✅ **Categorizes unused files** (`components/`, `pages/`, `public/`, `utils/`, `styles/`, etc.).
✅ **Calculates the percentage of dead code vs. used code**.
✅ **Highlights broken imports** (files that should exist but were removed).
✅ **Automatically ignores irrelevant directories** (`node_modules`, `.git`, `.next`, `dist`, etc.).
✅ **Ignores irrelevant files** such as `package.json`, `yarn.lock`, `tsconfig.json`, etc.
✅ **Displays an animated loading effect** for a better user experience.

## 📂 **Supported Projects**

**Clean-IT** works best with:
- **React.js** (files `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.scss`)
- **Next.js** (files inside `pages/`, `public/`, `components/`, and `styles/`)
- **Any frontend project** using JavaScript or TypeScript

---

## 📥 **Installation**

1️⃣ Clone this repository or install via npm:
```sh
npm install -g clean-it
```

2️⃣ Navigate to the project folder and run:
```sh
npx clean-it .
```

---

## 🛠 **How to Use**

### 🔹 Test in the current project
Run this command inside the project directory to analyze files:
```sh
node dist/bin/cli.js .
```

### 🔹 Test in another project
Pass the full path of the project you want to scan:
```sh
node dist/bin/cli.js ../test-project
```

### 🔹 Recompile after updates
Whenever you make changes to Clean-IT, recompile before running:
```sh
npx tsc
```

---

## 📊 **Example Report**

```sh
✅ Analysis completed!

🔗 /components/Header.tsx IMPORTS /components/Button.tsx
🔗 /pages/Home.tsx IMPORTS /components/Header.tsx

❌ Unused Files:

📂 COMPONENTS (1):
  ❌ /components/UnusedComponent.tsx

📂 PAGES (2):
  ❌ /pages/About.tsx
  ❌ /pages/UnusedPage.tsx

📂 PUBLIC (2):
  ❌ /public/logo.png
  ❌ /public/logo.svg

📂 STYLES (2):
  ❌ /styles/global.css
  ❌ /styles/unusedStyle.css

📂 OTHER (3):
  ❌ /context/context.tsx
  ❌ /context/provider.tsx
  ❌ /src/index.tsx

📊 Final Summary:
| Total Files | Orphans | % Code Used | % Dead Code |
|------------|--------|------------|------------|
| 17         | 13     | 23.53%     | 76.47%     |
```

---

## 🛠 **Contributing**
If you’d like to contribute, feel free to open an issue or a pull request! 🚀

---

## 📝 **License**
This project is licensed under the MIT License.

---

💡 **Keep your project clean and organized with Clean-IT!** 🚀

