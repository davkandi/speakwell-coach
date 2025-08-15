import React, { useState } from 'react';
import { Mic, Brain, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoUploader } from '@/components/VideoUploader';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AnalysisLoading } from '@/components/AnalysisLoading';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Processing Video');
  const { toast } = useToast();

  // Mock analysis data for demonstration
  const mockAnalysisData = {
    emotion: {
      dominant: 'Confident',
      confidence: 78,
      breakdown: [
        { emotion: 'Confident', percentage: 45 },
        { emotion: 'Enthusiastic', percentage: 30 },
        { emotion: 'Nervous', percentage: 15 },
        { emotion: 'Calm', percentage: 10 }
      ]
    },
    sentiment: {
      overall: 'Positive',
      score: 0.6,
      positivity: 75
    },
    eyeContact: {
      percentage: 68,
      rating: 'Good',
      avgDuration: 3.2
    },
    vocalVariety: {
      pace: 72,
      volume: 85,
      pitch: 65,
      clarity: 88
    },
    bodyLanguage: {
      posture: 'Confident',
      gestures: 12,
      energy: 80
    },
    fillerWords: {
      count: 23,
      percentage: 3.2,
      words: [
        { word: 'um', count: 8 },
        { word: 'uh', count: 7 },
        { word: 'like', count: 5 },
        { word: 'you know', count: 3 }
      ]
    },
    overallScore: 74,
    transcript: "Welcome everyone to this presentation. Um, today I'll be discussing the, uh, importance of effective communication in the workplace. You know, good communication is like the foundation of any successful team. Um, it helps us collaborate better and, uh, achieve our goals more efficiently. So let's dive into the key strategies that can help improve our communication skills."
  };

  const handleVideoUpload = (file: File) => {
    setCurrentView('analyzing');
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    const steps = [
      'Processing Video',
      'Speech Recognition', 
      'Facial Analysis',
      'Vocal Analysis',
      'Generating Insights'
    ];

    let stepIndex = 0;
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        progress = 100;
        setAnalysisProgress(progress);
        clearInterval(interval);
        
        setTimeout(() => {
          setCurrentView('results');
          toast({
            title: "Analysis Complete!",
            description: "Your speaking performance has been analyzed successfully.",
          });
        }, 1000);
      } else {
        if (progress > (stepIndex + 1) * 20) {
          stepIndex = Math.min(stepIndex + 1, steps.length - 1);
          setCurrentStep(steps[stepIndex]);
        }
        setAnalysisProgress(progress);
      }
    }, 800);
  };

  const handleTryDemo = () => {
    toast({
      title: "Demo Analysis Started",
      description: "Running analysis on sample video...",
    });
    simulateAnalysis();
    setCurrentView('analyzing');
  };

  const resetToUpload = () => {
    setCurrentView('upload');
    setAnalysisProgress(0);
    setCurrentStep('Processing Video');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">
              AI Public Speaking Coach
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your speaking video and get comprehensive AI-powered analysis on emotion, 
            eye contact, vocal variety, body language, and speaking fluency.
          </p>
        </div>

        {/* Features */}
        {currentView === 'upload' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="card-glow text-center">
                <CardHeader>
                  <Brain className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Emotion & Sentiment</CardTitle>
                  <CardDescription>
                    Analyze facial expressions and speech sentiment for emotional intelligence insights
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-glow text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Vocal & Body Analysis</CardTitle>
                  <CardDescription>
                    Evaluate vocal variety, eye contact, posture, and gestures for impactful delivery
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-glow text-center">
                <CardHeader>
                  <Star className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Comprehensive Feedback</CardTitle>
                  <CardDescription>
                    Get detailed insights and actionable recommendations to improve your speaking skills
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Upload Section */}
            <div className="max-w-4xl mx-auto mb-8">
              <VideoUploader 
                onVideoUpload={handleVideoUpload}
                isAnalyzing={currentView !== 'upload'}
              />
            </div>

            {/* Demo Button */}
            <div className="text-center">
              <Button onClick={handleTryDemo} variant="outline" size="lg">
                <Star className="h-5 w-5 mr-2" />
                Try Demo Analysis
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                See how the analysis works with sample data
              </p>
            </div>
          </>
        )}

        {/* Analysis Loading */}
        {currentView === 'analyzing' && (
          <div className="max-w-4xl mx-auto">
            <AnalysisLoading progress={analysisProgress} currentStep={currentStep} />
          </div>
        )}

        {/* Results */}
        {currentView === 'results' && (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Your Speaking Analysis</h2>
              <Button onClick={resetToUpload} variant="outline">
                Analyze Another Video
              </Button>
            </div>
            <AnalysisResults data={mockAnalysisData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
