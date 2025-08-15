import React from 'react';
import { 
  Brain, 
  Heart, 
  Eye, 
  Mic, 
  MessageSquare, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AnalysisData {
  emotion: {
    dominant: string;
    confidence: number;
    breakdown: { emotion: string; percentage: number }[];
  };
  sentiment: {
    overall: string;
    score: number;
    positivity: number;
  };
  eyeContact: {
    percentage: number;
    rating: string;
    avgDuration: number;
  };
  vocalVariety: {
    pace: number;
    volume: number;
    pitch: number;
    clarity: number;
  };
  bodyLanguage: {
    posture: string;
    gestures: number;
    energy: number;
  };
  fillerWords: {
    count: number;
    percentage: number;
    words: { word: string; count: number }[];
  };
  overallScore: number;
  transcript: string;
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="card-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl gradient-text">Overall Speaking Score</CardTitle>
          <CardDescription>Your comprehensive public speaking assessment</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(data.overallScore)}`}>
              {data.overallScore}
            </div>
            <div className="text-2xl text-muted-foreground ml-2">/100</div>
          </div>
          <Progress value={data.overallScore} className="h-4 mb-4" />
          <Badge variant={getScoreBadge(data.overallScore)} className="text-lg px-4 py-2">
            {data.overallScore >= 80 ? 'Excellent' : 
             data.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
          </Badge>
        </CardContent>
      </Card>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Emotion Analysis */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Emotion Analysis
            </CardTitle>
            <CardDescription>Emotional expression throughout speech</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{data.emotion.dominant}</span>
                  <span className="text-sm text-muted-foreground">
                    {data.emotion.confidence}%
                  </span>
                </div>
                <Progress value={data.emotion.confidence} className="h-2" />
              </div>
              
              <div className="space-y-2">
                {data.emotion.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.emotion}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Sentiment
            </CardTitle>
            <CardDescription>Overall tone and positivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{data.sentiment.overall}</div>
                <Badge variant="outline">{data.sentiment.score > 0 ? 'Positive' : 'Negative'}</Badge>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Positivity Score</span>
                  <span className="text-sm font-medium">{data.sentiment.positivity}%</span>
                </div>
                <Progress value={data.sentiment.positivity} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eye Contact */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Eye Contact
            </CardTitle>
            <CardDescription>Audience engagement through eye contact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{data.eyeContact.percentage}%</div>
                <Badge variant={getScoreBadge(data.eyeContact.percentage)}>
                  {data.eyeContact.rating}
                </Badge>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 inline mr-1" />
                Avg Duration: {data.eyeContact.avgDuration}s
              </div>
              
              <Progress value={data.eyeContact.percentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Vocal Variety */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Vocal Variety
            </CardTitle>
            <CardDescription>Voice modulation and delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Pace', value: data.vocalVariety.pace },
                { label: 'Volume', value: data.vocalVariety.volume },
                { label: 'Pitch', value: data.vocalVariety.pitch },
                { label: 'Clarity', value: data.vocalVariety.clarity }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Body Language */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Body Language
            </CardTitle>
            <CardDescription>Physical presence and gestures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Posture</span>
                <div className="font-medium">{data.bodyLanguage.posture}</div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Gestures</span>
                <div className="font-medium">{data.bodyLanguage.gestures} per minute</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Energy Level</span>
                  <span className="text-sm font-medium">{data.bodyLanguage.energy}%</span>
                </div>
                <Progress value={data.bodyLanguage.energy} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filler Words */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Filler Words
            </CardTitle>
            <CardDescription>Speech fluency analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{data.fillerWords.count}</div>
                <div className="text-sm text-muted-foreground">
                  {data.fillerWords.percentage}% of total words
                </div>
              </div>
              
              <div className="space-y-2">
                {data.fillerWords.words.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Badge variant="outline">"{item.word}"</Badge>
                    <span className="text-sm text-muted-foreground">{item.count}x</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transcript */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle>Speech Transcript</CardTitle>
          <CardDescription>Your speech with filler words highlighted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-4 text-sm leading-relaxed">
            {data.transcript.split(' ').map((word, index) => {
              const isFillerWord = data.fillerWords.words.some(fw => 
                fw.word.toLowerCase() === word.toLowerCase().replace(/[.,!?]/g, '')
              );
              
              return (
                <span
                  key={index}
                  className={isFillerWord ? 'bg-destructive/20 px-1 rounded' : ''}
                >
                  {word}{' '}
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};