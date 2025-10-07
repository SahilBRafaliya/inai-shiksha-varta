import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Send, Volume2, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLectureSocket } from '@/hooks/useLectureSocket';
import { useToast } from '@/hooks/use-toast';

export const LecturePlayer = () => {
  const {
    isConnected,
    currentSlide,
    questionResponse,
    isLectureEnded,
    requestNextSlide,
    askQuestion,
  } = useLectureSocket();

  const [question, setQuestion] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (currentSlide?.audioUrl && audioRef.current) {
      audioRef.current.src = currentSlide.audioUrl;
      audioRef.current.play().catch((error) => {
        console.error('Audio playback error:', error);
        toast({
          title: 'Audio Error',
          description: 'Could not play audio. Please check your connection.',
          variant: 'destructive',
        });
      });
    }
  }, [currentSlide, toast]);

  const handleAskQuestion = () => {
    if (question.trim()) {
      askQuestion(question);
      setQuestion('');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Connecting to lecture server...</p>
          <p className="text-sm text-muted-foreground mt-2">લેક્ચર શરૂ થઈ રહ્યું છે...</p>
        </Card>
      </div>
    );
  }

  if (isLectureEnded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-12 text-center shadow-[var(--shadow-card)] animate-scale-in">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-success" />
          <h2 className="text-3xl font-bold mb-2">આભાર મિત્રો!</h2>
          <p className="text-xl text-muted-foreground">Thank you for attending!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <audio
        ref={audioRef}
        onPlay={() => setIsAudioPlaying(true)}
        onEnded={() => setIsAudioPlaying(false)}
        onPause={() => setIsAudioPlaying(false)}
      />

      {/* Current Slide */}
      <Card className="p-8 shadow-[var(--shadow-card)] border-2 border-border animate-slide-up">
        <div className="space-y-6">
          {currentSlide && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Slide {currentSlide.slideNumber}
                </h2>
                {isAudioPlaying && (
                  <div className="flex items-center gap-2 text-accent animate-pulse">
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Playing...</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 font-gujarati">
                    {currentSlide.content}
                  </h3>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-lg leading-relaxed font-gujarati">
                    {currentSlide.explanation}
                  </p>
                </div>
              </div>

              <Button
                onClick={requestNextSlide}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-[var(--shadow-elegant)]"
              >
                Next Slide
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </>
          )}

          {!currentSlide && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg text-muted-foreground">Waiting for slides...</p>
            </div>
          )}
        </div>
      </Card>

      {/* Q&A Section */}
      <Card className="p-8 shadow-[var(--shadow-card)] border-2 border-border animate-slide-up">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">કોઈ પ્રશ્નો છે? (Any Questions?)</h3>

          <div className="flex gap-2">
            <Input
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
              className="flex-1"
            />
            <Button
              onClick={handleAskQuestion}
              disabled={!question.trim()}
              className="bg-accent hover:bg-accent/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {questionResponse && (
            <div className="mt-6 p-6 bg-success/10 rounded-lg border-l-4 border-success animate-fade-in">
              <p className="font-semibold mb-2 text-success-foreground">
                Q: {questionResponse.question}
              </p>
              <p className="text-foreground font-gujarati leading-relaxed">
                A: {questionResponse.answer}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
