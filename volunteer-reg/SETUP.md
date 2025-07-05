# AIMIM Volunteer System - Database Setup Guide

## Prerequisites
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new Supabase project

## Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project name: "aimim-volunteer-system"
5. Enter a secure database password
6. Choose your region (preferably closest to your users)
7. Click "Create new project"

### 2. Get Your Supabase Credentials
1. Go to your project dashboard
2. Click on "Settings" in the sidebar
3. Click on "API" 
4. Copy the following:
   - Project URL
   - Project API keys (anon/public key)
   - Service role key (keep this secret)

### 3. Set Up Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
\`\`\`

### 4. Create Database Tables
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Copy and paste the contents of `scripts/create-database.sql`
4. Click "Run" to execute the SQL

### 5. Configure Row Level Security (Optional)
If you want to add extra security:
1. Go to "Authentication" > "Policies" in Supabase dashboard
2. Enable RLS on the volunteers table
3. Create policies as needed

### 6. Install Dependencies
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

### 7. Test the Connection
1. Start your development server: `npm run dev`
2. Try registering a volunteer to test the database connection
3. Check the Supabase dashboard to see if the data was inserted

## Database Schema

### Volunteers Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR, NOT NULL)
- `mobile` (VARCHAR, UNIQUE, NOT NULL)
- `taluka` (VARCHAR, NOT NULL)
- `age_group` (VARCHAR, NOT NULL)
- `education` (VARCHAR, NOT NULL)
- `occupation` (VARCHAR, NOT NULL)
- `prabhag` (VARCHAR, NOT NULL)
- `strengthen_party` (TEXT, NOT NULL)
- `ready_to_join` (VARCHAR, NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

## Features Enabled
- ✅ Real PostgreSQL database
- ✅ Automatic timestamps
- ✅ Data validation constraints
- ✅ Unique mobile number constraint
- ✅ Indexed columns for performance
- ✅ Real-time capabilities (if needed)
- ✅ Backup and recovery
- ✅ Scalable infrastructure

## Production Considerations
1. Enable Row Level Security (RLS)
2. Set up proper backup policies
3. Monitor database performance
4. Set up alerts for errors
5. Consider connection pooling for high traffic
\`\`\`

Let's also update the package.json to include the Supabase dependency:
