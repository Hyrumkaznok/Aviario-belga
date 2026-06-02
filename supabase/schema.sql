-- ============================================================
-- Aviário Belga — Supabase Schema
-- Execute este SQL no SQL Editor do seu projeto Supabase
-- ============================================================

-- 1. Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT          NOT NULL,
  description   TEXT          NOT NULL DEFAULT '',
  price         DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category      TEXT          NOT NULL
                  CHECK (category IN ('cachorros','gatos','passaros','peixes','outros')),
  image         TEXT          NOT NULL DEFAULT '',
  in_stock      BOOLEAN       NOT NULL DEFAULT true,
  featured      BOOLEAN       NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- 2. Habilitar Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acesso
-- Leitura pública (páginas do site)
CREATE POLICY "Leitura pública"
  ON products FOR SELECT
  USING (true);

-- Inserção somente para usuários autenticados (admin)
CREATE POLICY "Admin pode inserir"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Atualização somente para usuários autenticados (admin)
CREATE POLICY "Admin pode atualizar"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Exclusão somente para usuários autenticados (admin)
CREATE POLICY "Admin pode excluir"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 4. Storage bucket para imagens
-- Faça isso em: Supabase Dashboard > Storage > New Bucket
--   - Name: product-images
--   - Public: SIM (marque "Public bucket")
-- ============================================================

-- Política de leitura pública para o bucket (se precisar via SQL)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- CREATE POLICY "Imagens públicas"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');

-- CREATE POLICY "Admin faz upload"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- CREATE POLICY "Admin exclui imagens"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
