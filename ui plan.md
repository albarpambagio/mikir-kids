Here’s a set of React + shadcn UI screens that match your PRD and the locker reference image. 

I’ll keep them presentational; you can wire real data/API later.

---

## Shared types

```tsx
// types.ts
export type GradeLevel = "SMP" | "SMA";

export interface UserProfile {
  id: string; // "12345678"
  gradeLevel: GradeLevel;
  classLevel: 7 | 8 | 9 | 10 | 11 | 12;
}

export interface Topic {
  id: string;
  name: string;
  shortCode: string;
  gradeLevel: GradeLevel;
  classLevels: number[];
  // optional stats
  lastScorePercent?: number;
  dueCount?: number; // FSRS-due questions
}

export type QuestionType = "mcq" | "numeric";

export interface Question {
  id: string;
  sequence: number;
  type: QuestionType;
  promptText: string;
  promptImageUrl?: string | null;
  options?: string[]; // ["A) 2", "B) 3", ...] for MCQ
}
```

---

## 1. Shell layout (locker hero + content)

```tsx
// components/layout/AuthShell.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 md:gap-12">
        {/* Left hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg bg-black/5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/lockers.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/0" />
          <div className="relative h-[260px] md:h-[520px] flex flex-col justify-between p-6 md:p-8 text-white">
            <header className="space-y-2">
              <p className="text-sm font-medium tracking-[0.2em] uppercase">
                Mikir Kids
              </p>
              <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
                Latihan Matematika,
                <br />
                satu soal sekali.
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-xs md:max-w-sm">
                Pilih topik yang kamu mau, kerjain 15 soal, sistem yang
                ngatur kapan soal balik lagi.
              </p>
            </header>

            <footer className="text-xs md:text-sm text-white/80">
              “Dua tiga mie tektek, ayo kita praktek”
            </footer>
          </div>
        </div>

        {/* Right content */}
        <div className="flex items-center">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
```

---

## 2. Onboarding: create / use User ID

```tsx
// screens/AuthLanding.tsx
import * as React from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Loader2 } from "lucide-react";

interface AuthLandingProps {
  onGenerateUserId: () => Promise<string>;
  onUseExisting: (userId: string) => Promise<void>;
  onContinueWithNewUser: (userId: string) => void;
}

export function AuthLanding({
  onGenerateUserId,
  onUseExisting,
  onContinueWithNewUser,
}: AuthLandingProps) {
  const [tab, setTab] = React.useState<"new" | "existing">("new");
  const [generatedId, setGeneratedId] = React.useState<string | null>(null);
  const [loadingGenerate, setLoadingGenerate] = React.useState(false);
  const [existingId, setExistingId] = React.useState("");
  const [loadingExisting, setLoadingExisting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  async function handleGenerate() {
    try {
      setError(null);
      setLoadingGenerate(true);
      const id = await onGenerateUserId();
      setGeneratedId(id);
    } catch (e) {
      setError("Gagal bikin User ID. Coba lagi sebentar lagi.");
    } finally {
      setLoadingGenerate(false);
    }
  }

  async function handleUseExisting(e: React.FormEvent) {
    e.preventDefault();
    if (!existingId.trim()) return;
    try {
      setError(null);
      setLoadingExisting(true);
      await onUseExisting(existingId.trim());
    } catch (e) {
      setError("User ID tidak ditemukan. Cek lagi angkanya, ya.");
    } finally {
      setLoadingExisting(false);
    }
  }

  function handleCopy() {
    if (!generatedId) return;
    navigator.clipboard.writeText(generatedId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <AuthShell>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl md:text-3xl">
            Masuk ke <span className="font-semibold">Mikir Kids</span>
          </CardTitle>
          <CardDescription className="text-base">
            Semua progres latihanmu disimpan pakai <span className="font-semibold">User ID</span>.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 pt-4 space-y-6">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">Buat User ID baru</TabsTrigger>
              <TabsTrigger value="existing">Pakai User ID</TabsTrigger>
            </TabsList>

            {/* New user */}
            <TabsContent value="new" className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Kita akan membuat <strong>8-digit User ID</strong> khusus buat kamu.
                  Simpan baik-baik supaya progres latihanmu tidak hilang.
                </p>

                {generatedId ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Label className="text-xs uppercase text-muted-foreground">
                          User ID kamu
                        </Label>
                        <div className="mt-1 flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2.5">
                          <span className="font-mono text-lg tracking-[0.3em]">
                            {generatedId}
                          </span>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="ml-auto"
                            onClick={handleCopy}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {copied ? "Disalin ke clipboard ✔" : "Catat atau screenshot User ID ini ya."}
                    </p>

                    <Button
                      className="w-full"
                      onClick={() => onContinueWithNewUser(generatedId)}
                    >
                      Lanjut pilih kelas
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={loadingGenerate}
                  >
                    {loadingGenerate && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Buat User ID
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Existing user */}
            <TabsContent value="existing" className="pt-4">
              <form className="space-y-4" onSubmit={handleUseExisting}>
                <div className="space-y-2">
                  <Label htmlFor="userId">Masukkan User ID kamu</Label>
                  <Input
                    id="userId"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="Contoh: 12345678"
                    value={existingId}
                    onChange={(e) => setExistingId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    8 digit angka yang kamu dapat waktu pertama kali daftar.
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loadingExisting || !existingId.trim()}
                >
                  {loadingExisting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Masuk
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    </AuthShell>
  );
}
```

---

## 3. Grade & class selection

```tsx
// screens/GradeSelection.tsx
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { GradeLevel } from "@/types";

interface GradeSelectionProps {
  userId: string;
  onConfirm: (gradeLevel: GradeLevel, classLevel: number) => void;
}

const SMP_CLASSES = [7, 8, 9];
const SMA_CLASSES = [10, 11, 12];

export function GradeSelection({ userId, onConfirm }: GradeSelectionProps) {
  const [grade, setGrade] = React.useState<GradeLevel>("SMP");
  const [selectedClass, setSelectedClass] = React.useState<number | null>(null);

  const classes = grade === "SMP" ? SMP_CLASSES : SMA_CLASSES;

  return (
    <AuthShell>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl md:text-3xl">Pilih kelasmu</CardTitle>
          <CardDescription className="text-base">
            Ini dipakai untuk menampilkan topik yang sesuai tingkatmu.
          </CardDescription>
          <div className="mt-3">
            <Badge variant="outline" className="font-mono tracking-[0.25em]">
              ID: {userId}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-0 pt-6 space-y-6">
          <Tabs value={grade} onValueChange={(v) => setGrade(v as GradeLevel)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="SMP">SMP</TabsTrigger>
              <TabsTrigger value="SMA">SMA</TabsTrigger>
            </TabsList>

            <TabsContent value="SMP" className="pt-4" />
            <TabsContent value="SMA" className="pt-4" />
          </Tabs>

          <div className="grid grid-cols-3 gap-3">
            {classes.map((c) => (
              <Button
                key={c}
                type="button"
                variant={selectedClass === c ? "default" : "outline"}
                className="h-16 text-lg"
                onClick={() => setSelectedClass(c)}
              >
                {grade} {c}
              </Button>
            ))}
          </div>

          <Button
            className="w-full"
            disabled={!selectedClass}
            onClick={() => {
              if (selectedClass) onConfirm(grade, selectedClass);
            }}
          >
            Masuk ke dashboard
          </Button>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
```

---

## 4. Dashboard & topic list

```tsx
// screens/Dashboard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import type { Topic, UserProfile } from "@/types";
import { Brain, History } from "lucide-react";

interface DashboardProps {
  user: UserProfile;
  topics: Topic[];
  onStartPractice: (topicId: string) => void;
  onViewHistory: () => void;
}

export function Dashboard({ user, topics, onStartPractice, onViewHistory }: DashboardProps) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-6">
      <div className="max-w-5xl w-full grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Main */}
        <Card className="rounded-3xl shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-xl md:text-2xl">
                Halo, <span className="font-semibold">pejuang angka</span> 👋
              </CardTitle>
              <CardDescription>
                Pilih satu topik dan kerjain{" "}
                <span className="font-semibold">15 soal</span>. Soal yang salah
                bakal balik lagi otomatis.
              </CardDescription>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline" className="font-mono text-xs">
                  ID: {user.id}
                </Badge>
                <Badge variant="secondary">
                  {user.gradeLevel} {user.classLevel}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={onViewHistory}
              title="Riwayat sesi"
            >
              <History className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <Brain className="h-4 w-4" />
              <span>
                Prioritas kita: <strong>soal yang sudah jatuh tempo</strong> (FSRS).
              </span>
            </div>

            <ScrollArea className="h-[360px] pr-2">
              <div className="space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onStartPractice(topic.id)}
                    className="w-full text-left rounded-2xl border bg-card hover:bg-accent/60 transition-colors px-4 py-3.5 flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">
                          {topic.name}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {topic.shortCode}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">
                        {topic.dueCount && topic.dueCount > 0
                          ? `${topic.dueCount} soal butuh diulang hari ini`
                          : "Belum ada sesi sebelumnya — mulai dari soal baru"}
                      </p>
                      {typeof topic.lastScorePercent === "number" && (
                        <div className="mt-2 space-y-1">
                          <Progress value={topic.lastScorePercent} className="h-1.5" />
                          <p className="text-[11px] text-muted-foreground">
                            Sesi terakhir: {topic.lastScorePercent}% benar
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="ml-2 shrink-0"
                      variant="default"
                    >
                      Latihan
                    </Button>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Side panel: simple explainer */}
        <Card className="rounded-3xl shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base">Cara kerja Mikir Kids</CardTitle>
            <CardDescription>
              Loop sederhana yang diulang terus sampai kamu makin jago.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ol className="space-y-2 list-decimal list-inside">
              <li>Pilih satu topik yang mau kamu latih.</li>
              <li>Kerjakan 15 soal satu per satu.</li>
              <li>
                Setelah selesai, lihat soal mana yang salah beserta jawaban
                benarnya.
              </li>
              <li>
                Sistem akan menjadwalkan ulang soal-soal lemah supaya muncul lagi
                di sesi berikutnya.
              </li>
            </ol>
            <p className="text-xs text-muted-foreground pt-1">
              Tidak ada XP / streak. Fokus ke latihan yang konsisten dan terarah.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 5. Practice session screen

```tsx
// screens/PracticeSession.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import type { Question } from "@/types";
import { CheckCircle2 } from "lucide-react";

interface PracticeSessionProps {
  topicName: string;
  totalQuestions: number;
  currentIndex: number; // 0-based
  question: Question;
  onAnswer: (answer: string) => Promise<void>;
  onQuit: () => void;
}

export function PracticeSession({
  topicName,
  totalQuestions,
  currentIndex,
  question,
  onAnswer,
  onQuit,
}: PracticeSessionProps) {
  const [answer, setAnswer] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim() || submitting) return;
    setSubmitting(true);
    await onAnswer(answer.trim());
    setSubmitting(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 500);
    setAnswer("");
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-6">
      <div className="max-w-3xl w-full">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg md:text-xl">
                  Latihan: {topicName}
                </CardTitle>
                <CardDescription className="text-sm">
                  Jawab sejujurnya — sistem akan membawa balik soal yang kamu
                  lemah.
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className="text-xs">
                  Soal {currentIndex + 1} dari {totalQuestions}
                </Badge>
                <Progress value={progress} className="w-32 h-1.5" />
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium whitespace-pre-line">
                  {question.promptText}
                </p>
                {question.promptImageUrl && (
                  <div className="mt-2">
                    <img
                      src={question.promptImageUrl}
                      alt="Diagram soal"
                      className="rounded-xl max-h-64 object-contain border bg-muted"
                    />
                  </div>
                )}
              </div>

              {/* Answer input */}
              {question.type === "mcq" && question.options ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((opt) => {
                    const [label, ...rest] = opt.split(")");
                    const letter = label.trim();
                    const text = rest.join(")").trim();
                    const isSelected = answer === letter;
                    return (
                      <Button
                        key={letter}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        className="justify-start h-auto py-3 px-4"
                        onClick={() => setAnswer(letter)}
                      >
                        <span className="font-semibold mr-2">{letter})</span>
                        <span className="text-sm text-left">{text}</span>
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 max-w-xs">
                  <label className="text-sm font-medium">
                    Jawaban kamu
                  </label>
                  <Input
                    inputMode="decimal"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Tulis angka di sini"
                  />
                  <p className="text-xs text-muted-foreground">
                    Gunakan koma atau titik sesuai soal. Contoh: 3,14 atau 3.14
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onQuit}
              >
                Keluar sesi
              </Button>

              <div className="flex items-center gap-3">
                {saved && (
                  <span className="inline-flex items-center text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                    Tersimpan
                  </span>
                )}
                <Button
                  type="submit"
                  disabled={submitting || !answer.trim()}
                >
                  {currentIndex + 1 === totalQuestions
                    ? "Kirim & lihat hasil"
                    : "Kirim jawaban"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
```

---

## 6. Session summary screen

```tsx
// screens/SessionSummary.tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";

interface WeakQuestion {
  id: string;
  sequence: number;
  promptText: string;
  userAnswer: string;
  correctAnswer: string;
  type: "mcq" | "numeric";
}

interface SummaryItem {
  id: string;
  sequence: number;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
}

interface SessionSummaryProps {
  topicName: string;
  total: number;
  correct: number;
  incorrect: number;
  weakQuestions: WeakQuestion[];
  allQuestions: SummaryItem[];
  onPracticeAgain: () => void;
  onBackToDashboard: () => void;
}

export function SessionSummary({
  topicName,
  total,
  correct,
  incorrect,
  weakQuestions,
  allQuestions,
  onPracticeAgain,
  onBackToDashboard,
}: SessionSummaryProps) {
  const score = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-6">
      <div className="max-w-5xl w-full grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Left: summary & wrong questions */}
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Ringkasan sesi
            </CardTitle>
            <CardDescription className="text-sm">
              Topik: <span className="font-medium">{topicName}</span>
            </CardDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">
                Skor: {correct}/{total} benar ({score}%)
              </Badge>
              <Badge variant="secondary">
                {incorrect === 0
                  ? "Mantap! Semua benar 🎉"
                  : `${incorrect} soal perlu diulang`}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span>⚠️ Soal yang perlu kamu perhatikan lagi</span>
              <span className="text-xs text-muted-foreground">
                ({incorrect} soal)
              </span>
            </h3>

            {incorrect === 0 ? (
              <p className="text-sm text-muted-foreground">
                Tidak ada soal yang salah di sesi ini. Sistem tetap akan
                menjadwalkan beberapa soal untuk diulang di masa depan.
              </p>
            ) : (
              <ScrollArea className="h-[260px] pr-3">
                <div className="space-y-3">
                  {weakQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-2xl border bg-muted/60 p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Soal #{q.sequence}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-destructive/40 text-destructive"
                        >
                          Salah
                        </Badge>
                      </div>
                      <p className="text-sm whitespace-pre-line">
                        {q.promptText}
                      </p>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="rounded-xl bg-background border px-2.5 py-1.5">
                          <span className="text-muted-foreground">
                            Jawaban kamu:
                          </span>{" "}
                          <span className="font-medium">{q.userAnswer}</span>
                        </div>
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-2.5 py-1.5">
                          <span className="text-emerald-700">
                            Jawaban benar:
                          </span>{" "}
                          <span className="font-semibold">
                            {q.correctAnswer}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>

          <CardFooter className="flex flex-wrap gap-3 justify-between">
            <Button variant="outline" onClick={onBackToDashboard}>
              Kembali ke dashboard
            </Button>
            <Button onClick={onPracticeAgain}>Latihan lagi topik ini</Button>
          </CardFooter>
        </Card>

        {/* Right: all questions list */}
        <Card className="rounded-3xl shadow-sm h-full">
          <CardHeader>
            <CardTitle className="text-base">Semua soal</CardTitle>
            <CardDescription className="text-xs">
              Rekap singkat 15 soal di sesi ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-[360px] pr-3">
              <div className="divide-y">
                {allQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center gap-2 py-2.5 text-xs"
                  >
                    <span className="w-6 shrink-0 text-muted-foreground">
                      {q.sequence}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {q.isCorrect ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive" />
                        )}
                        <span
                          className={
                            "font-medium " +
                            (q.isCorrect ? "text-emerald-700" : "text-destructive")
                          }
                        >
                          {q.isCorrect ? "Benar" : "Salah"}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        Kamu: <span className="font-mono">{q.userAnswer}</span>{" "}
                        · Kunci:{" "}
                        <span className="font-mono font-semibold">
                          {q.correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <Separator />
          <CardFooter className="text-[11px] text-muted-foreground">
            Soal yang salah akan dijadwalkan ulang dengan interval lebih pendek.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
```

---

## How to plug into your app

* Use these as page components in your router (React Router / Next.js).
* Replace callback props (`onGenerateUserId`, `onStartPractice`, etc.) with your real API calls that follow the PRD contracts. 
* Keep the hero layout & spacing to stay close to your reference screenshot; just swap `/images/lockers.jpg` with your actual asset.

If you want, next step I can:

* Add a minimal `App.tsx` that wires fake data + simple in-memory navigation so you can vibe-run it immediately.
