import { useNavigate } from 'react-router-dom';
import { UploadCard } from '@/components/UploadCard';
import { BookOpen, Brain, Mic, MessageCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    navigate('/lecture');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-50" />
        
        <div className="container relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              INAI AI Lecture System
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              AI-Powered Lectures in Gujarati
            </p>
            <p className="text-lg text-muted-foreground font-gujarati">
              ગુજરાતીમાં AI સંચાલિત લેક્ચર્સ
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up">
            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Slides</h3>
              <p className="text-sm text-muted-foreground">
                Auto-generated slides from your .tex files
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-secondary/50 transition-all duration-300 shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">AI Explanations</h3>
              <p className="text-sm text-muted-foreground">
                Clear explanations in Gujarati language
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Voice Narration</h3>
              <p className="text-sm text-muted-foreground">
                Natural text-to-speech for each slide
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-success/50 transition-all duration-300 shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Q&A</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions and get instant answers
              </p>
            </div>
          </div>

          {/* Upload Card */}
          <div className="max-w-2xl mx-auto animate-scale-in">
            <UploadCard onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Info Section */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Upload your LaTeX lecture file to begin • Powered by AI • Real-time streaming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
