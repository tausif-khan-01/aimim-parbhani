-- Create the volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mobile VARCHAR(15) NOT NULL UNIQUE,
  taluka VARCHAR(100) NOT NULL,
  age_group VARCHAR(20) NOT NULL,
  education VARCHAR(100) NOT NULL,
  occupation VARCHAR(255) NOT NULL,
  prabhag VARCHAR(255) NOT NULL,
  strengthen_party TEXT NOT NULL,
  ready_to_join VARCHAR(10) NOT NULL CHECK (ready_to_join IN ('yes', 'no')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteers_mobile ON volunteers(mobile);
CREATE INDEX IF NOT EXISTS idx_volunteers_taluka ON volunteers(taluka);
CREATE INDEX IF NOT EXISTS idx_volunteers_age_group ON volunteers(age_group);
CREATE INDEX IF NOT EXISTS idx_volunteers_education ON volunteers(education);
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON volunteers(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_volunteers_updated_at 
    BEFORE UPDATE ON volunteers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add some constraints to ensure data integrity
ALTER TABLE volunteers 
ADD CONSTRAINT chk_taluka CHECK (taluka IN (
  'Parbhani', 'Gangakhed', 'Sonpeth', 'Pathri', 
  'Manwath', 'Palam', 'Selu', 'Jintur', 'Purna'
));

ALTER TABLE volunteers 
ADD CONSTRAINT chk_age_group CHECK (age_group IN ('18-25', '26-35', '36-50', '50+'));

ALTER TABLE volunteers 
ADD CONSTRAINT chk_education CHECK (education IN (
  'Under 10th', '10th Pass', '12th Pass', 'Graduate', 'PG', 'PhD'
));

-- Add Row Level Security (RLS) policies if needed
-- ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Create a policy for public read access (optional)
-- CREATE POLICY "Allow public read access" ON volunteers FOR SELECT USING (true);

-- Create a policy for authenticated insert (optional)
-- CREATE POLICY "Allow authenticated insert" ON volunteers FOR INSERT WITH CHECK (true);
