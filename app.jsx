import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BarChart, FileText, Smile, Frown } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Advanced sentiment analysis simulation
const analyzeSentiment = (text) => {
  const wordList = text.toLowerCase().split(/\s+/);
  const wordCount = wordList.length;

  const positiveWords = ['good', 'great', 'excellent', 'awesome', 'wonderful', 'happy', 'love', 'amazing', 'fantastic'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'sad', 'hate', 'disappointing', 'frustrating'];
  const neutralWords = ['okay', 'fine', 'neutral', 'average', 'standard'];

  const positiveCount = positiveWords.reduce(
    (count, word) => count + wordList.filter((w) => w === word).length,
    0
  );
  const negativeCount = negativeWords.reduce(
    (count, word) => count + wordList.filter((w) => w === word).length,
    0
  );
  const neutralCount = neutralWords.reduce(
    (count, word) => count + wordList.filter((w) => w === word).length,
    0
  );

  const sentimentScore = (positiveCount - negativeCount) / wordCount;

  const emotions = {
    joy: positiveCount / wordCount,
    sadness: negativeCount / wordCount,
    neutral: neutralCount / wordCount,
  };

  const averageWordLength = text.replace(/[^\w\s]/g, '').split(/\s+/).reduce((sum, word) => sum + word.length, 0) / wordCount;

  const sentimentClassification =
    sentimentScore > 0.1 ? 'Positive' : sentimentScore < -0.1 ? 'Negative' : 'Neutral';

  return {
    score: sentimentScore,
    classification: sentimentClassification,
    wordCount,
    complexity: {
      averageWordLength: averageWordLength.toFixed(2),
      readingLevel:
        averageWordLength > 5 ? 'Advanced' : averageWordLength > 4 ? 'Intermediate' : 'Basic',
    },
    emotions,
    wordAnalysis: {
      positiveWords: positiveCount,
      negativeWords: negativeCount,
      neutralWords: neutralCount,
    },
  };
};

// Word frequency analysis
const analyzeWordFrequency = (text) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);

  const frequency = words
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {});

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
};

const TextAnalysisComponent = () => {
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (text.trim().length < 10) {
      alert('Please enter more text for analysis');
      return;
    }

    setIsLoading(true);
    try {
      setTimeout(() => {
        const sentimentResult = analyzeSentiment(text);
        const wordFrequency = analyzeWordFrequency(text);

        setAnalysisResult({
          sentiment: sentimentResult,
          wordFrequency,
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('An error occurred during text analysis');
      setIsLoading(false);
    }
  }, [text]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileText = e.target?.result;
        setText(fileText);
      };
      reader.readAsText(file);
    }
  };

  const sentimentIcon = useMemo(() => {
    if (!analysisResult) return null;
    const classification = analysisResult.sentiment.classification;
    return classification === 'Positive' ? (
      <Smile className="text-green-500" />
    ) : classification === 'Negative' ? (
      <Frown className="text-red-500" />
    ) : null;
  }, [analysisResult]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* UI code remains the same */}
    </div>
  );
};

export default TextAnalysisComponent;
