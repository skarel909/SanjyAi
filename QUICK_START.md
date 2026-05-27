# Sanjy AI - Quick Start Guide

## 1. Setup Awal

### Clone & Install
```bash
cd project
npm install
```

### Environment Variables
File `.env` sudah tersedia dengan Supabase credentials:
```env
VITE_SUPABASE_URL=https://pnqcabcpirueuzddljgx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 2. Database Setup

Database schema sudah di-setup otomatis melalui migrations:
- Tabel `chats` untuk menyimpan riwayat chat
- Tabel `messages` untuk menyimpan pesan
- RLS policies untuk keamanan data

## 3. Jalankan Aplikasi

### Development
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 4. User Flow

### Register
1. Klik "Sign up" di login page
2. Isi nama, email, dan password
3. Sistem akan membuat akun otomatis

### Login
1. Masukkan email dan password
2. Akan redirect ke chat page

### Start Chatting
1. Klik "New Chat" untuk membuat chat baru
2. Ketik pesan di input field
3. Tekan Enter atau klik Send button
4. AI akan merespons secara otomatis

### Manage Chats
- **Search**: Gunakan search box di sidebar untuk mencari chat
- **Delete**: Hover di chat dan klik icon trash
- **Switch**: Klik chat lain untuk beralih percakapan

### Settings
- Klik icon Settings di navbar
- Adjust dark mode, notifications, font size, AI model

## 5. Feature Highlights

### Responsive Design
- Desktop: Sidebar + Chat window
- Mobile: Sidebar hidden, swipe atau tap untuk akses

### AI Model Selection
- GPT-4 (default)
- GPT-3.5
- Claude

### Chat Features
- Typing animation untuk AI responses
- File upload button (ready untuk implementasi)
- Voice input button (ready untuk implementasi)
- Message history yang persistent di database

## 6. Architecture Overview

```
┌─────────────────────────────────────┐
│         Sanjy AI Frontend            │
│  (React + TypeScript + Tailwind)     │
├─────────────────────────────────────┤
│                                      │
│ ┌──────────────┐  ┌──────────────┐  │
│ │  Auth Pages  │  │ Chat Pages   │  │
│ │ (Login/Signup)│ │(Main UI)     │  │
│ └──────────────┘  └──────────────┘  │
│                                      │
├─────────────────────────────────────┤
│        Supabase (Backend)            │
├─────────────────────────────────────┤
│                                      │
│ ┌─────────────────────────────────┐ │
│ │     PostgreSQL Database         │ │
│ │ (Chats + Messages + RLS)        │ │
│ └─────────────────────────────────┘ │
│                                      │
│ ┌─────────────────────────────────┐ │
│ │  Edge Function (chat-assistant) │ │
│ │ (AI response processing)        │ │
│ └─────────────────────────────────┘ │
│                                      │
└─────────────────────────────────────┘
```

## 7. Key Files

| File | Fungsi |
|------|--------|
| `src/App.tsx` | Main router & app setup |
| `src/pages/ChatPage.tsx` | Chat interface utama |
| `src/pages/LoginPage.tsx` | Login form |
| `src/pages/SignupPage.tsx` | Registration form |
| `src/context/AuthContext.tsx` | Auth state management |
| `src/lib/supabase.ts` | Supabase client |
| `tailwind.config.js` | Dark theme configuration |
| `src/index.css` | Global styles & animations |

## 8. Testing

### Test Registration
```
Email: test@example.com
Password: Test@123456
```

### Test Chat
1. Login dengan akun baru
2. Klik "New Chat"
3. Ketik pesan apapun
4. AI akan merespons

## 9. Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  'sanjy': {
    'primary': '#ffffff',
    'bg': '#0a0a0a',
    // ... more colors
  }
}
```

### Add New Features
- Tambah component baru di `src/components/`
- Tambah page baru di `src/pages/`
- Update routes di `src/App.tsx`
- Create migration untuk database changes

### Connect Real AI API
Edit `src/pages/ChatPage.tsx` atau `supabase/functions/chat-assistant/index.ts`:
- OpenAI API: https://api.openai.com/v1/chat/completions
- Anthropic Claude: https://api.anthropic.com/v1/messages
- Atau API AI provider lainnya

## 10. Deployment

### Deploy ke Vercel
```bash
npm install -g vercel
vercel
```

### Deploy ke Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy ke Firebase
```bash
npm run build
firebase deploy
```

## 11. Troubleshooting

### Aplikasi tidak loading
- Check console untuk error messages
- Verify `.env` file Supabase credentials
- Clear browser cache

### Cannot login/register
- Check Supabase Auth settings
- Verify database migrations applied
- Check RLS policies

### Pesan tidak tersimpan
- Check database connection
- Verify user_id di messages
- Check RLS policies pada tabel messages

### Styling tidak benar
- Clear `dist/` folder
- Run `npm run build` lagi
- Hard refresh browser (Ctrl+Shift+R)

## 12. Support

Untuk bantuan lebih lanjut, lihat file `CLAUDE.md` untuk dokumentasi lengkap.
