import React, { useState, useRef, useCallback } from 'react';
import { Upload, Video, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUpload, isAnalyzing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/x-msvideo'];
  const maxSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a video file (MP4, AVI, MOV)",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a video smaller than 100MB",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const simulateUpload = (file: File) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedFile(file);
          onVideoUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      simulateUpload(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (uploadedFile && uploadProgress === 100) {
    return (
      <div className="card-glow rounded-xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-success mr-3" />
          <Video className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Video Uploaded Successfully!</h3>
        <p className="text-muted-foreground mb-4">{uploadedFile.name}</p>
        <Button onClick={removeFile} variant="outline" size="sm">
          <X className="h-4 w-4 mr-2" />
          Remove Video
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className={`upload-zone rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragOver ? 'drag-over' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isAnalyzing}
        />
        
        <Upload className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h2 className="text-2xl font-bold mb-2 gradient-text">
          Upload Your Speaking Video
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Drop your video file here or click to browse. Supports MP4, AVI, MOV formats up to 100MB.
        </p>
        
        <Button size="lg" disabled={isAnalyzing}>
          <Upload className="h-5 w-5 mr-2" />
          Choose Video File
        </Button>
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="card-glow rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Uploading video...</span>
            <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );
};