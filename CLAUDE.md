# Sanjy AI - Dokumentasi Proyek

## Deskripsi
Sanjy AI adalah aplikasi chat berbasis AI modern dengan desain minimalis, elegan, dan nyaman digunakan. Dibangun dengan React, TypeScript, Tailwind CSS, dan Supabase untuk pengalaman pengguna yang premium.

## Arsitektur & Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling dengan custom dark theme
- **React Router DOM** - Navigation
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend & Database
- **Supabase** - Authentication & Database
- **PostgreSQL** - Database dengan RLS policies
- **Edge Functions** - Serverless chat processing

### Design System
- **Palet Warna**: Hitam matte (#0a0a0a), abu-abu gelap (#1a1a1a), putih lembut (#ffffff)
- **Animasi**: Glassmorphism, fade-in, slide-up, typing animation
- **Responsive**: Mobile-first design (hidden sidebar di mobile, visible di desktop)

## Struktur Direktori

```
src/
├── components/          # Reusable UI components
│   ├── ChatInput.tsx   # Input field dengan file upload & voice
│   ├── ChatSidebar.tsx # Chat history sidebar
│   ├── ChatWindow.tsx  # Message display area
│   ├── Navbar.tsx      # Top navigation bar
│   ├── SettingsModal.tsx # Settings dialog
│   └── SplashScreen.tsx # Loading/intro screen
├── context/
│   └── AuthContext.tsx # Authentication state management
├── lib/
│   ├── router.tsx      # Route protection logic
│   └── supabase.ts     # Supabase client instance
├── pages/
│   ├── ChatPage.tsx    # Main chat interface
│   ├── LoginPage.tsx   # Login form
│   └── SignupPage.tsx  # Registration form
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx             # Main app router
├── index.css           # Global styles & animations
└── main.tsx            # Entry point

supabase/
├── migrations/
│   └── create_chats_and_messages_tables.sql
└── functions/
    └── chat-assistant/ # Edge function untuk AI responses
        └── index.ts
```

## Database Schema

### Tabel: chats
```sql
- id (uuid, pk)
- user_id (uuid, fk to auth.users)
- title (text)
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Tabel: messages
```sql
- id (uuid, pk)
- chat_id (uuid, fk to chats)
- user_id (uuid, fk to auth.users)
- content (text)
- role (text: 'user' | 'assistant')
- model (text: 'gpt-4' | 'gpt-3.5' | 'claude')
- created_at (timestamptz)
```

## Fitur Utama

### Authentication
- Sign up dengan email & password
- Login dengan validasi
- Session management dengan Supabase Auth
- Protected routes

### Chat Interface
- Real-time message display
- Chat history dengan sidebar
- Search & filter chats
- Delete chat functionality
- Model selector (GPT-4, GPT-3.5, Claude)

### UI/UX
- Splash screen dengan animasi
- Dark mode minimalis
- Typing animation untuk AI responses
- File upload support
- Voice input button
- Settings modal
- Responsive design (mobile & desktop)

## Environment Variables

```env
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
```

## Setup & Development

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build untuk Production
```bash
npm run build
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## Key Components

### ChatPage
- Load chats dari database
- Load messages untuk chat yang dipilih
- Handle new chat creation
- Handle message sending
- Manage chat deletion

### AuthContext
- Manage user authentication state
- Provide login/signup/logout functions
- Listen untuk auth state changes

### ChatSidebar
- Display list of chats
- Search functionality
- Delete chat option
- Select active chat

### ChatInput
- Send messages
- File upload
- Voice input button
- Model selector

## Security

### Row Level Security (RLS)
- Semua tabel memiliki RLS enabled
- Users hanya bisa akses data mereka sendiri
- Policies mengecek user ownership

### Authentication
- Supabase built-in auth dengan email/password
- JWT-based session management
- Protected routes dengan ProtectedRoute component

## Styling & Animations

### Custom Tailwind Classes
- `.glass` - Glassmorphism effect
- `.btn-primary` / `.btn-secondary` - Button styles
- `.input-field` - Input styling
- `.chat-bubble-user` / `.chat-bubble-ai` - Chat bubbles

### Animations
- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up from bottom
- `animate-pulse-soft` - Soft pulsing
- `animate-typing` - Blinking cursor effect

## API Integration

### Edge Function: chat-assistant
- URL: `{SUPABASE_URL}/functions/v1/chat-assistant`
- Method: POST
- Payload: `{ message: string, model: string }`
- Response: `{ success: boolean, response: string, model: string }`

## Performance

### Bundle Size
- CSS: ~3.7KB (gzipped)
- JS: ~93.8KB (gzipped)
- Total: ~97.5KB

### Optimizations
- Code splitting dengan React Router
- Lazy loading untuk components
- CSS classes tree-shaking
- Minified production build

## Browser Support
- Modern browsers dengan ES2020 support
- Mobile responsive (iOS Safari, Chrome Mobile)
- Desktop (Chrome, Firefox, Safari, Edge)

## Future Enhancements
- Real AI API integration (OpenAI, Anthropic, etc)
- Voice input processing
- Image upload & processing
- Chat export functionality
- User preferences storage
- Team/collaboration features
- Conversation analytics

## Troubleshooting

### Database Connection Issues
- Check `.env` file for correct Supabase credentials
- Verify database migration applied successfully
- Check RLS policies are not blocking access

### Authentication Issues
- Clear browser cache/cookies
- Check Supabase Auth configuration
- Verify JWT token validity

### Edge Function Issues
- Check function deployment status
- Monitor Edge Function logs in Supabase dashboard
- Verify CORS headers are correct

## Support & Maintenance
Untuk questions atau issues, silakan buka issue di repository atau hubungi tim development.
