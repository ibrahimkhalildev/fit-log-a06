# 🏋️ FitLog — Train With Intent. Log Every Set.

FitLog is a modern, high-contrast dark-mode fitness tracking web application built with Next.js (App Router). It streamlines workout planning by offering a curated exercise catalog, an enforced 5-lift daily routine split, a dedicated saved workouts collection, and live-updating metric calculations across exercises, training minutes, and caloric burn.

---

## 🛠️ Technologies Used

- **Framework:** Next.js (App Router) ⚡
- **Frontend Library:** React ⚛️
- **Language:** TypeScript 🔷
- **Styling:** Tailwind CSS 🎨
- **State Management:** React Context API (`FitLogContext`) + LocalStorage 💾
- **Feedback & Notifications:** React Toastify 🔔
- **Iconography:** React Icons (`fa`) 🔣
- **Data Source:** Cloudflare Workers REST API ☁️

---

## ✨ 5 Key Features

1. 📚 **Curated Workout Library with Skeleton States**  
   Access a library of lifts covering every major muscle group with details on duration, equipment, calories burned, and user ratings. Integrated client-side data fetching ensures instant page loads with smooth pulse skeleton loading states.

2. 🎯 **Structured Daily Plan (5-Lift Cap)**  
   Enforce training discipline with a strict limit of five exercises per day. Easily track active routines, remove completed items, or mark lifts as completed with one click.

3. 🔖 **Dedicated Saved Workouts Vault**  
   Bookmark go-to routines for quick future access. Seamlessly switch between daily plans and saved lists via synchronized navigation badges and deep URL query parameters (`?tab=plan` and `?tab=saved`).

4. 📊 **Dynamic Real-Time Metrics & Multi-Criteria Sorting**  
   The dashboard summary automatically computes total exercises, minutes, and calories based on the currently selected tab. Workouts can be sorted dynamically by duration, calories (low to high), or ratings.

5. ⚡ **Persistent Storage & Resilient Navigation**  
   All active plans and saved workouts persist across page refreshes via browser `localStorage`. Built with proper suspense boundaries and static-ready routing to ensure smooth reloads after production deployment and a custom 404 handler for missing routes.

---

## 🎨 Design System & Theme

Designed specifically for clear readability under gym lighting:

- 🖤 **Background Canvas:** `#0c0e12`
- 📦 **Card & Component Surface:** `#13161f`
- 🟢 **Primary Accent:** Neon Lime (`#ccff00`)
- 🌿 **Active Tab/Pill Background:** `#19270e`
- 🔘 **Borders & Dividers:** Neutral Dark (`#262626` / `border-neutral-800`)

---

## 🌐 API Reference

FitLog fetches workout routines from a remote REST API:

- **Endpoint:** `GET https://api.api-store.workers.dev/api/fitlog`
- **Response Format:** JSON array containing workout objects (`id`, `name`, `muscleGroups`, `equipment`, `duration`, `calories`, `rating`, `image`).

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18.18 or later) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/fitlog.git](https://github.com/your-username/fitlog.git)
   cd fitlog