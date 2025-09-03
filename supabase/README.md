# Supabase Database Setup for Alx Polly

This document provides instructions for setting up the Supabase database schema for the Alx Polly polling application.

## Database Schema

The application uses the following tables:

1. **polls** - Stores poll information
   - `id` (UUID, primary key)
   - `title` (TEXT, required)
   - `description` (TEXT)
   - `created_at` (TIMESTAMP)
   - `created_by` (UUID, references auth.users)
   - `total_votes` (INTEGER)

2. **options** - Stores poll options
   - `id` (UUID, primary key)
   - `poll_id` (UUID, references polls)
   - `text` (TEXT, required)
   - `votes` (INTEGER)

3. **votes** - Tracks individual user votes
   - `id` (UUID, primary key)
   - `poll_id` (UUID, references polls)
   - `option_id` (UUID, references options)
   - `user_id` (UUID, references auth.users)
   - `created_at` (TIMESTAMP)
   - Unique constraint on (poll_id, user_id) to ensure one vote per poll

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Create a new project
3. Note your project URL and anon key for environment variables

### 2. Set Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run Migrations

You can apply the database migrations in one of two ways:

#### Option 1: Using the Supabase CLI

1. Install the Supabase CLI: `npm install -g supabase`
2. Login to Supabase: `supabase login`
3. Link your project: `supabase link --project-ref your-project-id`
4. Apply migrations: `supabase db push`

#### Option 2: Using the Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase/migrations/20230601000000_create_polls_tables.sql`
4. Paste into the SQL Editor and run the query

## Row Level Security (RLS) Policies

The migration includes RLS policies that ensure:

- Anyone can view polls, options, and votes
- Only authenticated users can create polls
- Users can only update or delete their own polls
- Only poll creators can add, update, or delete options
- Users can only vote once per poll
- Users can delete their own votes

## Automatic Vote Counting

The schema includes triggers that automatically:

- Increment option and poll vote counts when a vote is cast
- Decrement option and poll vote counts when a vote is deleted

## Type Definitions

The TypeScript type definitions for the database schema are in `types/database.ts`. These types are used with the Supabase client to provide type safety when interacting with the database.