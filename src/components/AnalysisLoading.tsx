import React from 'react';
import { Loader2, Brain, Eye, Mic, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisLoadingProps {
  progress: number;
  currentStep: string;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ progress, currentStep }) => {
  const analysisSteps = [
    { icon: Brain, label: 'Processing Video', description: 'Extracting audio and visual data' },
    { icon: MessageSquare, label: 'Speech Recognition', description: 'Converting speech to text' },
    { icon: Eye, label: 'Facial Analysis', description: 'Analyzing facial expressions and eye contact' },
    { icon: Mic, label: 'Vocal Analysis', description: 'Evaluating vocal variety and filler words' },
    { icon: TrendingUp, label: 'Generating Insights', description: 'Compiling comprehensive analysis' }
  ];

  const currentStepIndex = analysisSteps.findIndex(step => step.label === currentStep);

  return (
    <div className="space-y-8">
      <Card className="card-glow">
        <CardContent className="pt-8">
          <div className="text-center mb-8">
            <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Analyzing Your Speech Performance
            </h2>
            <p className="text-muted-foreground">
              Our AI is processing your video to provide comprehensive feedback
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Analysis Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="space-y-4">
            {analysisSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success/10 border border-success/20'
                      : isCurrent
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-muted/30 border border-border'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg mr-4 ${
                      isCompleted
                        ? 'bg-success text-white'
                        : isCurrent
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCurrent ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        isCompleted
                          ? 'text-success'
                          : isCurrent
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {isCompleted && (
                    <div className="text-success">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        This analysis typically takes 2-3 minutes depending on video length
      </div>
    </div>
  );
};