-- ============================================================
-- BRC — Buró Reputacional Ciudadano
-- Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Cases ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cases (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo        text        NOT NULL,
  titulo_en     text,                          -- English translation (optional)
  empresa       text        NOT NULL,
  ciudad        text        NOT NULL,
  riesgo        text        NOT NULL CHECK (riesgo IN ('alto', 'medio', 'bajo')),
  conflicto     text        NOT NULL,
  conflicto_en  text,                          -- English translation (optional)
  impacto       text,
  descripcion   text        NOT NULL,
  descripcion_en text,                         -- English translation (optional)
  empresas_vinculadas text[] DEFAULT '{}',
  status        text        DEFAULT 'published'
                            CHECK (status IN ('published', 'pending', 'rejected')),
  created_at    timestamptz DEFAULT now()
);

-- ── Evidence (linked to cases) ───────────────────────────────
CREATE TABLE IF NOT EXISTS evidence (
  id        uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id   uuid        NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  tipo      text        NOT NULL,           -- e.g. DOC, FOTO, QUEJA, LAB
  titulo    text        NOT NULL,
  titulo_en text,                           -- English translation (optional)
  url       text,
  fuente    text,
  created_at timestamptz DEFAULT now()
);

-- ── Contacts (linked to cases) ───────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id       uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id  uuid  NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  nombre   text  NOT NULL,
  rol      text,
  email    text,
  created_at timestamptz DEFAULT now()
);

-- ── Submissions (user-submitted cases, pending review) ───────
CREATE TABLE IF NOT EXISTS submissions (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa        text        NOT NULL,
  ciudad         text        NOT NULL,
  titulo         text        NOT NULL,
  descripcion    text        NOT NULL,
  riesgo         text        NOT NULL CHECK (riesgo IN ('alto', 'medio', 'bajo')),
  conflicto      text        NOT NULL,
  impacto        text,
  evidencia_url  text,
  nombre         text,                     -- submitter name (optional)
  email          text,                     -- submitter email (optional)
  files          text[],                   -- storage paths of uploaded files
  status         text        DEFAULT 'pending'
                             CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at     timestamptz DEFAULT now()
);

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE cases       ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence    ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public can read published cases and their evidence/contacts
CREATE POLICY "Public read cases"
  ON cases FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public read evidence"
  ON evidence FOR SELECT
  USING (true);

CREATE POLICY "Public read contacts"
  ON contacts FOR SELECT
  USING (true);

-- Anyone can read submissions
CREATE POLICY "Public read submissions"
  ON submissions FOR SELECT
  USING (true);

-- Anyone can submit (insert) a new submission
CREATE POLICY "Public insert submissions"
  ON submissions FOR INSERT
  WITH CHECK (true);

-- ── Storage bucket for submission files ───────────────────────
-- Run this separately in Supabase Dashboard → Storage → New bucket
-- Bucket name: submissions-files
-- Public: false (files visible only to admins)
-- Allowed MIME types: image/*, video/*, application/pdf,
--   application/msword,
--   application/vnd.openxmlformats-officedocument.wordprocessingml.document

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS cases_riesgo_idx   ON cases (riesgo);
CREATE INDEX IF NOT EXISTS cases_ciudad_idx   ON cases (ciudad);
CREATE INDEX IF NOT EXISTS cases_empresa_idx  ON cases (empresa);
CREATE INDEX IF NOT EXISTS evidence_case_idx  ON evidence (case_id);
CREATE INDEX IF NOT EXISTS contacts_case_idx  ON contacts (case_id);
CREATE INDEX IF NOT EXISTS submissions_status ON submissions (status);
