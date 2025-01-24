import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis,
  LineChart,
  Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Download, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

// Enhanced interfaces with more detailed analysis
interface LinguisticAnalysis {
  wordDiversity: number;
  averageWordLength: number;
  punctuationDensity: number;
  uniqueWordCount: number;
}

interface SentimentAnalysis {
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
  historicalTrend: Array<{date: string, score: number}>;
}

interface AdvancedAnalysisProps {
  enableSimulation?: boolean;
}

interface AnalysisData {
  sentiment: SentimentAnalysis;
  wordFrequency: Array<{word: string, count: number}>;
  linguisticFeatures: LinguisticAnalysis;
}

const AdvancedTextAnalyzer: React.FC<AdvancedAnalysisProps> = ({ 
  enableSimulation = true 
}) => {
  const [inputText, setInputText] = useState('');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // Simulated text analysis function
  const performTextAnalysis = (text: string): AnalysisData | null => {
    if (!text.trim()) return null;

    // Word frequency calculation
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFrequencyMap = words.reduce((acc: { [key: string]: number }, word: string) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const wordFrequency = Object.entries(wordFrequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    // Sentiment simulation (naive implementation)
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst'];
    
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    const totalWords = words.length || 1; // Prevent division by zero

    const sentiment: SentimentAnalysis = {
      positiveScore: (positiveCount / totalWords) * 100,
      negativeScore: (negativeCount / totalWords) * 100,
      neutralScore: 100 - ((positiveCount + negativeCount) / totalWords) * 100,
      historicalTrend: [
        { date: '2024-01-01', score: 50 + Math.random() * 20 },
        { date: '2024-02-01', score: 50 + Math.random() * 20 },
        { date: '2024-03-01', score: 50 + Math.random() * 20 },
        { date: '2024-04-01', score: 50 + Math.random() * 20 },
      ]
    };

    // Linguistic features simulation
    const linguisticFeatures: LinguisticAnalysis = {
      wordDiversity: words.length / (new Set(words).size || 1),
      averageWordLength: words.reduce((acc: number, word: string) => acc + word.length, 0) / (words.length || 1),
      punctuationDensity: (text.match(/[.,!?]/g)?.length || 0) / (text.length || 1),
      uniqueWordCount: new Set(words).size
    };

    return { sentiment, wordFrequency, linguisticFeatures };
  };

  // Analyze text on button click
  const handleAnalyzeText = () => {
    const analysis = performTextAnalysis(inputText);
    setAnalysisData(analysis);
  };

  // Color schemes
  const COLORS = ['#00C49F', '#FF6384', '#FFCE56'];

  // Prepare data for charts
  const sentimentData = analysisData ? [
    { name: 'Positive', value: analysisData.sentiment.positiveScore },
    { name: 'Negative', value: analysisData.sentiment.negativeScore },
    { name: 'Neutral', value: analysisData.sentiment.neutralScore }
  ] : [];

  const wordFrequencyData = analysisData?.wordFrequency || [];

  const linguisticRadarData = analysisData ? [
    { 
      subject: 'Word Diversity', 
      value: (analysisData.linguisticFeatures.wordDiversity) * 100 
    },
    { 
      subject: 'Avg Word Length', 
      value: (analysisData.linguisticFeatures.averageWordLength) * 10 
    },
    { 
      subject: 'Punctuation Density', 
      value: (analysisData.linguisticFeatures.punctuationDensity) * 500 
    },
    { 
      subject: 'Unique Words', 
      value: (analysisData.linguisticFeatures.uniqueWordCount) / 5 
    }
  ] : [];

  // Export functionality
  const handleExportData = () => {
    if (!analysisData) return;
    
    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'text_analysis_export.json';
    link.click();
  };

  // Simulation example texts
  const simulationExamples = [
    "This is a great day! Everything is wonderful and amazing.",
    "The project was challenging but ultimately very successful and rewarding.",
    "Sometimes things are not as bad as they seem. There's always hope and opportunity.",
    "Technology continues to advance at an incredible pace, bringing both excitement and challenges."
  ];

  const handleRandomSimulation = () => {
    const randomText = simulationExamples[Math.floor(Math.random() * simulationExamples.length)];
    setInputText(randomText);
    const analysis = performTextAnalysis(randomText);
    setAnalysisData(analysis);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 text-purple-500" /> 
            Advanced Text Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Textarea
                placeholder="Enter text for analysis..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mb-4 min-h-[150px]"
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={handleAnalyzeText}
                  disabled={!inputText.trim()}
                >
                  Analyze Text
                </Button>
                {enableSimulation && (
                  <Button 
                    variant="outline" 
                    onClick={handleRandomSimulation}
                  >
                    Random Simulation
                  </Button>
                )}
                {analysisData && (
                  <Button 
                    variant="ghost" 
                    onClick={handleExportData}
                  >
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                )}
              </div>
            </div>
            
            {analysisData && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Analysis Summary</h3>
                <ul className="space-y-1 text-sm">
                  <li>Positive Sentiment: {analysisData.sentiment.positiveScore.toFixed(2)}%</li>
                  <li>Negative Sentiment: {analysisData.sentiment.negativeScore.toFixed(2)}%</li>
                  <li>Unique Words: {analysisData.linguisticFeatures.uniqueWordCount}</li>
                  <li>Average Word Length: {analysisData.linguisticFeatures.averageWordLength.toFixed(2)}</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {analysisData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Sentiment Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Word Frequency Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Word Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wordFrequencyData}>
                  <XAxis dataKey="word" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Trend Line Chart */}
          {analysisData.sentiment.historicalTrend && (
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysisData.sentiment.historicalTrend}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Linguistic Features Radar Chart */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Linguistic Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={linguisticRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar 
                    dataKey="value" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6} 
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdvancedTextAnalyzer;