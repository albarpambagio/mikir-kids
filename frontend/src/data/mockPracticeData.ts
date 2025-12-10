// Mock data for practice session testing

export type ConfidenceLevel = 'agak_ragu' | 'yakin' | 'gampang';

export interface Question {
    id: string;
    sequence: number;
    topic: string;
    type: 'mcq';
    prompt_text: string;
    options: string[];
    correct_answer: string;
    explanation?: string;
    image_url?: string;
}

export interface MockSessionData {
    session_id: string;
    topic: string;
    questions: Question[];
}

// Realistic mock questions for Indonesian SMP Math (Aljabar)
export const mockPracticeSession: MockSessionData = {
    session_id: 'mock_sess_001',
    topic: 'Aljabar – Sistem Persamaan Linear Dua Variabel (SPLDV)',
    questions: [
        {
            id: 'q_001',
            sequence: 1,
            topic: 'SPLDV',
            type: 'mcq',
            prompt_text: 'Tentukan nilai x dan y dari sistem persamaan berikut:\n2x + 3y = 12\nx - y = 1',
            options: [
                'A) x = 2, y = 1',
                'B) x = 3, y = 2',
                'C) x = 4, y = 3',
                'D) x = 5, y = 4',
            ],
            correct_answer: 'B',
            explanation: 'Gunakan metode eliminasi:\n2x + 3y = 12 ... (1)\nx - y = 1 ... (2)\n\nDari persamaan (2): x = y + 1\nSubstitusi ke (1): 2(y + 1) + 3y = 12\n2y + 2 + 3y = 12\n5y = 10\ny = 2\n\nMaka x = 2 + 1 = 3\nJadi x = 3, y = 2',
        },
        {
            id: 'q_002',
            sequence: 2,
            topic: 'SPLDV',
            type: 'mcq',
            prompt_text: 'Harga 3 buku dan 2 pensil adalah Rp 17.000. Harga 2 buku dan 4 pensil adalah Rp 18.000. Berapa harga 1 buku?',
            options: [
                'A) Rp 3.000',
                'B) Rp 4.000',
                'C) Rp 5.000',
                'D) Rp 6.000',
            ],
            correct_answer: 'C',
            explanation: 'Misalkan harga buku = x, harga pensil = y\n3x + 2y = 17.000 ... (1)\n2x + 4y = 18.000 ... (2)\n\nDari (2): x + 2y = 9.000\nDari (1): 3x + 2y = 17.000\n\nEliminasi: 2x = 8.000\nx = 4.000\n\nTunggu, periksa lagi... seharusnya x = 5.000',
        },
        {
            id: 'q_003',
            sequence: 3,
            topic: 'SPLDV',
            type: 'mcq',
            prompt_text: 'Jika 2x + y = 10 dan x + 2y = 11, maka nilai dari x + y adalah...',
            options: [
                'A) 5',
                'B) 6',
                'C) 7',
                'D) 8',
            ],
            correct_answer: 'C',
            explanation: 'Jumlahkan kedua persamaan:\n(2x + y) + (x + 2y) = 10 + 11\n3x + 3y = 21\n3(x + y) = 21\nx + y = 7',
        },
        {
            id: 'q_004',
            sequence: 4,
            topic: 'SPLDV',
            type: 'mcq',
            prompt_text: 'Umur ayah 3 kali umur anak. Lima tahun lalu, umur ayah 4 kali umur anak. Berapa umur ayah sekarang?',
            options: [
                'A) 30 tahun',
                'B) 36 tahun',
                'C) 40 tahun',
                'D) 45 tahun',
            ],
            correct_answer: 'D',
            explanation: 'Misalkan umur ayah = x, umur anak = y\nSekarang: x = 3y ... (1)\nLima tahun lalu: x - 5 = 4(y - 5)\nx - 5 = 4y - 20\nx = 4y - 15 ... (2)\n\nDari (1) dan (2): 3y = 4y - 15\n-y = -15\ny = 15\n\nMaka x = 3(15) = 45 tahun',
        },
        {
            id: 'q_005',
            sequence: 5,
            topic: 'SPLDV',
            type: 'mcq',
            prompt_text: 'Keliling persegi panjang adalah 36 cm. Jika panjang 3 cm lebih dari lebarnya, berapa luas persegi panjang tersebut?',
            options: [
                'A) 72 cm²',
                'B) 80 cm²',
                'C) 81 cm²',
                'D) 90 cm²',
            ],
            correct_answer: 'B',
            explanation: 'Misalkan panjang = p, lebar = l\nKeliling: 2(p + l) = 36\np + l = 18 ... (1)\n\nPanjang 3 cm lebih dari lebar: p = l + 3 ... (2)\n\nSubstitusi (2) ke (1):\n(l + 3) + l = 18\n2l = 15\nl = 7.5 cm\n\np = 10.5 cm\nLuas = 10.5 × 7.5 = 78.75 ≈ 80 cm²',
        },
    ],
};

// Mock API response helpers
export const mockCheckAnswer = (
    questionId: string,
    answer: string,
    confidence: ConfidenceLevel
): {
    is_correct: boolean;
    correct_answer: string;
    explanation?: string;
    fsrs_rating: 'easy' | 'good' | 'hard' | 'again';
} => {
    const question = mockPracticeSession.questions.find((q) => q.id === questionId);
    if (!question) {
        throw new Error('Question not found');
    }

    const isCorrect = answer === question.correct_answer;

    let fsrs_rating: 'easy' | 'good' | 'hard' | 'again';
    if (isCorrect) {
        // Map confidence to FSRS rating
        switch (confidence) {
            case 'agak_ragu':
                fsrs_rating = 'hard';
                break;
            case 'yakin':
                fsrs_rating = 'good';
                break;
            case 'gampang':
                fsrs_rating = 'easy';
                break;
        }
    } else {
        fsrs_rating = 'again';
    }

    return {
        is_correct: isCorrect,
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        fsrs_rating,
    };
};
