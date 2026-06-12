# 🍭 Kisuke Shop

> *"Candy Shop is open!"*

Welcome to the storefront of **Kisuke** — my personal AI assistant, second brain, and occasional pain in the ass.

Kisuke does his best work invisibly: routing whatever I drop in to the right place, remembering things I forgot I told him, and pinging me two weeks later to call my grandma. The problem with invisible work is that nobody ever sees it. So I built him a shop.

In *Bleach*, Urahara's candy shop is a humble little storefront hiding something far more powerful in the back. Same energy here. 🛍️

## 🛒 What's on the shelves

- **📊 Stats** — what Kisuke actually does all day: tasks handled, reminders fired, things captured and brought back at the right moment
- **🏆 Achievements** — yes, my assistant has an achievement system. He's earned it.
- **🧠 Memory** — a window into what he knows and how it's organized
- **✨ Skills** — everything he can do, no slash commands required
- **🤝 How he helps** — the receipts. Real production data from a system I use every single day.

## 🏗️ How it's built

The Shop is the *front* of the shop — a deliberately read-only display layer.

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────────┐
│ Kisuke Shop │ ───▶ │ Kisuke's Gateway │ ───▶ │ Kisuke himself  │
│ (this repo) │      │ kisukeproject.pl │      │ (private, busy) │
└─────────────┘      └──────────────────┘      └─────────────────┘
```

| Layer    | Tech                          |
| -------- | ----------------------------- |
| Frontend | React · TypeScript · Vite     |
| Gateway  | FastAPI · Python              |
| The back room | Kisuke's own pipeline — not in this repo 🤫 |

Kisuke owns his data; the Shop just displays what he's willing to share. Anything sensitive gets stripped long before it could reach a public dashboard.

## 🚀 Running it locally

```bash
git clone https://github.com/alxhdd/kisuke-shop.git
cd kisuke-shop
npm install
npm run dev
```

You'll need a gateway to talk to:

```env
VITE_API_URL=https://kisukeproject.pl
```

Fair warning: without Kisuke on the other end, the shelves will be empty. He's one of a kind and he knows it.

## ❓ FAQ

**Can I use Kisuke?**
No — he works for me. But the Shop's code is open, so feel free to peek behind the counter and build a shop for *your* assistant.

**Why "Kisuke"?**
If you know, you know. If you don't: go watch *Bleach*, I'll wait.

**Is the assistant in the room with us right now?**
Always. He's probably logging this interaction as we speak.

## 🔗 Around the shop

- 🏪 [Live shop](https://kisukeproject.pl)
- 👩‍💻 [My portfolio](https://alxhdd.com) — built by a pipeline that maintains itself, naturally
- 📝 [Things I write](https://medium.com/@alxhdd)

---

<p align="center">Built with 🍬 by <a href="https://alxhdd.com">Aleksandra Haddad</a> — staffed by Kisuke, who would like a raise.</p>