# Shelter Booking App

A full-stack animal shelter booking app built with **Next.js + Supabase**.  
Users can sign in (Google OAuth) or manually create an account, browse available animals, and schedule visits with the shelter. Admin users can manage animals and view all bookings.

> ⚠️ Note: The free tier of Supabase pauses inactive databases. To test this project or build your own, feel free to copy my database structure and code.

---

## 1) What this project does

This app helps a shelter team manage visit requests:

- Visitors browse animals (dog, cat, bird, rabbit, other).
- Signed-in users can create bookings for a selected date/time.
- User profile data is stored in `public.profiles` with role support (`user`, `admin`, etc.).
- Bookings are connected to both users and animals.

---

## 2) Tech stack

- **Frontend:** Next.js (App Router), TypeScript
- **Backend:** Supabase
- **Auth Provider:** Google OAuth via Supabase Auth
- **Database:** PostgreSQL (Supabase-managed)
- **Storage:** Supabase Storage (for animal images)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

> ⚠️ Note: this project follows a Next.js version with breaking changes.  
> Always check docs in `node_modules/next/dist/docs/` and deprecation notices before making framework-level changes.

---

## 3) Core data model

### `animals`

Stores each pet shown in the app.

- `id` (uuid, PK)
- `name`
- `type` (`dog/cat/bird/rabbit/other`, case-insensitive check)
- `age` (must be `>= 0`)
- `description`
- `image_url`
- `created_at`

### `bookings`

Stores user visit requests tied to animals.

- `id` (uuid, PK)
- `animal_id` (FK → `animals.id`)
- `guest_name`
- `guest_email`
- `visit_datetime`
- `user_id` (auth user)
- `created_at`

### `profiles`

Stores app-level user metadata and role.

- `user_id` (PK, FK → `auth.users.id`)
- `email`
- `username`
- `role` (`public.app_role`, default `user`)
- `created_at`

---

## 4) App logic (how it works)

1. Public list of the animals is fetched from Supabase and displayed on the home page.
2. Clicking an animal opens a details page with a booking form only by signed-in users.
3. Booking form validates input and submits to Supabase, creating a new booking record.
4. Signed-in users can view their bookings in given animal details, with options to cancel or reschedule (if implemented).
5. Admin users can manage animals and view all bookings.
6. Supabase RLS policies enforce that users can only see their own bookings, while admins can see all.

---

## 5) Practical tricks used

- **Strict TypeScript types** for `Animal`, `Booking`, and auth user.
- **Enum-like union for animal types** in frontend (`ANIMAL_TYPES`) to prevent invalid values.
- **DB constraints** as a second safety net:
  - animal type check
  - age >= 0
  - foreign keys for referential integrity
- **Indexes** on frequently queried fields (`bookings.created_at`, `bookings.animal_id`, `profiles.role`).
- **Server-backed auth/session** through Supabase to avoid custom auth complexity.

---

## 6) Local setup (quick start)

### Prerequisites

- Node.js 18+ (or your project-required version)
- npm / pnpm / yarn
- A Supabase project

### Clone & install

```bash
git clone https://github.com/Victor-starr/shelter.git
cd shelter
npm install
```

### Environment variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### Run app

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## 7) Supabase database setup

Run this SQL in **Supabase SQL Editor**.

```sql
-- (Optional) if app_role does not already exist:
-- create type public.app_role as enum ('user', 'admin');

create table public.profiles (
  user_id uuid not null,
  email text not null,
  username text not null,
  role public.app_role not null default 'user'::app_role,
  created_at timestamp with time zone not null default now(),
  constraint profiles_pkey primary key (user_id),
  constraint profiles_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
) tablespace pg_default;

create index if not exists profiles_role_idx on public.profiles using btree (role) tablespace pg_default;

create table public.bookings (
  id uuid not null default gen_random_uuid(),
  animal_id uuid not null,
  guest_name text not null,
  guest_email text not null,
  visit_datetime timestamp with time zone not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid not null,
  constraint bookings_pkey primary key (id),
  constraint bookings_animal_id_fkey foreign key (animal_id) references animals (id) on delete cascade
) tablespace pg_default;

create index if not exists bookings_animal_id_idx on public.bookings using btree (animal_id) tablespace pg_default;
create index if not exists bookings_created_at_idx on public.bookings using btree (created_at) tablespace pg_default;

create table public.animals (
  id uuid not null default gen_random_uuid(),
  name text not null,
  type text not null,
  age integer not null,
  description text null default ''::text,
  image_url text null default ''::text,
  created_at timestamp with time zone null default now(),
  constraint animals_pkey primary key (id),
  constraint animals_age_check check ((age >= 0)),
  constraint animals_type_check check (
    (
      lower(type) = any (
        array[
          'dog'::text,
          'cat'::text,
          'bird'::text,
          'rabbit'::text,
          'other'::text
        ]
      )
    )
  )
) tablespace pg_default;
```

> Recommended next step: add **RLS policies** for `profiles`, `bookings`, and `animals` according to your security model.

---

## 8) Google Auth setup (Supabase)

Use the official Supabase guide (recommended):  
**https://supabase.com/docs/guides/auth/social-login/auth-google**

General flow:

1. Configure OAuth consent screen in Google Cloud.
2. Create OAuth credentials.
3. Add redirect/callback URL from Supabase in Google console.
4. Enable Google provider in Supabase Auth settings.
5. Test login from your app.

---

This project can be extended with features like:

- In the Dashboard to Add section for adding adopted animals and keeping a list of them. (This can be done by adding a new table `adopted_animals` and linking it to the `animals` table with a foreign key.)

- In the Animal Details page we can create a section for all the legal medical, and historical documents of the animal. (This can be done by adding a column to the `animals` table or creating a new table `animal_documents` and linking it to the `animals` table with a foreign key.)

> if you have any questions or suggestions, feel free to reach out to me on GitHub or via email. ( i am always happy to help and collaborate on open-source projects! )
