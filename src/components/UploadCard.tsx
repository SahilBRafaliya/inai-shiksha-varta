import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface UploadCardProps {
  onUploadSuccess: () => void;
}

export const UploadCard = ({ onUploadSuccess }: UploadCardProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.tex')) {
        setFile(selectedFile);
      } else {
        toast({
          title: 'Invalid File',
          description: 'Please upload a .tex file',
          variant: 'destructive',
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please select a .tex file to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      toast({
        title: 'Upload Successful',
        description: 'Your lecture is ready!',
      });

      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload the lecture file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-8 shadow-[var(--shadow-card)] border-2 border-border hover:border-primary/30 transition-all duration-300">
      <div className="flex flex-col items-center space-y-6">
        <div className="p-4 rounded-full bg-gradient-to-br from-primary to-secondary">
          <FileText className="w-12 h-12 text-primary-foreground" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold">Upload Your Lecture</h3>
          <p className="text-muted-foreground">
            Upload a .tex file to start your AI-powered lecture
          </p>
        </div>

        <div className="w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">.tex files only</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".tex"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {file && (
          <div className="w-full p-3 bg-primary/10 rounded-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium truncate">{file.name}</span>
            </div>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-[var(--shadow-elegant)]"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Start Lecture
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
