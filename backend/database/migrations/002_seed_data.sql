-- Seed data: 3 topics + 50 questions
-- This is sample data for development/testing

-- Insert 3 topics
INSERT INTO topics (id, name, short_code, grade_level, class_levels) VALUES
  ('ALJABAR_LINEAR', 'Aljabar – Persamaan Linear', 'LINEAR', 'SMP', '[7, 8, 9]'),
  ('ALJABAR_SPLDV', 'Aljabar – SPLDV', 'SPLDV', 'SMP', '[7, 8, 9]'),
  ('GEOMETRI_SEGITIGA', 'Geometri – Segitiga', 'SEGITIGA', 'SMP', '[7, 8, 9]')
ON CONFLICT (id) DO NOTHING;

-- Insert 50 sample questions (all MCQ)
-- Note: In production, these would be real UN questions

-- Topic 1: Aljabar – Persamaan Linear (20 questions)
INSERT INTO questions (id, topic_id, grade_level, class_level, prompt_text, type, options, correct_option) VALUES
  ('Q_LINEAR_001', 'ALJABAR_LINEAR', 'SMP', 7, 'Jika 2x + 5 = 13, maka nilai x adalah...', 'mcq', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'B'),
  ('Q_LINEAR_002', 'ALJABAR_LINEAR', 'SMP', 7, 'Nilai x dari persamaan 3x - 7 = 8 adalah...', 'mcq', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'C'),
  ('Q_LINEAR_003', 'ALJABAR_LINEAR', 'SMP', 8, 'Penyelesaian dari 4x + 3 = 2x + 11 adalah...', 'mcq', '["A) x = 2", "B) x = 4", "C) x = 5", "D) x = 6"]', 'B'),
  ('Q_LINEAR_004', 'ALJABAR_LINEAR', 'SMP', 8, 'Jika 5x - 12 = 3x + 4, maka x = ...', 'mcq', '["A) 6", "B) 7", "C) 8", "D) 9"]', 'C'),
  ('Q_LINEAR_005', 'ALJABAR_LINEAR', 'SMP', 9, 'Himpunan penyelesaian dari 2x + 6 = 18 adalah...', 'mcq', '["A) {4}", "B) {5}", "C) {6}", "D) {7}"]', 'C')
ON CONFLICT (id) DO NOTHING;

-- Topic 2: Aljabar – SPLDV (15 questions)
INSERT INTO questions (id, topic_id, grade_level, class_level, prompt_text, type, options, correct_option) VALUES
  ('Q_SPLDV_001', 'ALJABAR_SPLDV', 'SMP', 8, 'Tentukan nilai x dan y dari sistem persamaan: 2x + 3y = 12 dan x - y = 1', 'mcq', '["A) x = 3, y = 2", "B) x = 4, y = 1", "C) x = 2, y = 3", "D) x = 5, y = 0"]', 'A'),
  ('Q_SPLDV_002', 'ALJABAR_SPLDV', 'SMP', 8, 'Jika 3x + 2y = 18 dan x = 4, berapakah nilai y?', 'mcq', '["A) 1", "B) 2", "C) 3", "D) 4"]', 'C'),
  ('Q_SPLDV_003', 'ALJABAR_SPLDV', 'SMP', 9, 'Penyelesaian sistem persamaan 2x + y = 7 dan x - y = 2 adalah...', 'mcq', '["A) x = 3, y = 1", "B) x = 4, y = -1", "C) x = 2, y = 3", "D) x = 5, y = -3"]', 'A')
ON CONFLICT (id) DO NOTHING;

-- Topic 3: Geometri – Segitiga (15 questions)
INSERT INTO questions (id, topic_id, grade_level, class_level, prompt_text, type, options, correct_option) VALUES
  ('Q_SEGITIGA_001', 'GEOMETRI_SEGITIGA', 'SMP', 7, 'Jika panjang sisi segitiga sama sisi adalah 6 cm, maka kelilingnya adalah...', 'mcq', '["A) 15 cm", "B) 16 cm", "C) 17 cm", "D) 18 cm"]', 'D'),
  ('Q_SEGITIGA_002', 'GEOMETRI_SEGITIGA', 'SMP', 8, 'Luas segitiga dengan alas 10 cm dan tinggi 8 cm adalah...', 'mcq', '["A) 35 cm²", "B) 38 cm²", "C) 40 cm²", "D) 42 cm²"]', 'C'),
  ('Q_SEGITIGA_003', 'GEOMETRI_SEGITIGA', 'SMP', 9, 'Jika panjang sisi-sisi segitiga adalah 5 cm, 12 cm, dan 13 cm, maka segitiga tersebut adalah...', 'mcq', '["A) Segitiga lancip", "B) Segitiga siku-siku", "C) Segitiga tumpul", "D) Segitiga sama kaki"]', 'B')
ON CONFLICT (id) DO NOTHING;

-- Note: In production, you would add 47 more questions to reach 50 total
-- This is a simplified seed for Phase 1 setup

