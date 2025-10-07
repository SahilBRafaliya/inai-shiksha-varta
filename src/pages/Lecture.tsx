import { LecturePlayer } from '@/components/LecturePlayer';

const Lecture = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            INAI AI Lecture System
          </h1>
          <p className="text-muted-foreground">Real-time AI-powered lectures in Gujarati</p>
        </header>

        <LecturePlayer />
      </div>
    </div>
  );
};

export default Lecture;
