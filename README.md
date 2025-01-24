# AI Text Analyst

A modern React application for advanced text analysis with interactive visualizations. This tool provides sentiment analysis, word frequency analysis, and linguistic feature analysis with beautiful, interactive charts.

## Features

- **Sentiment Analysis**: Analyze text for positive, negative, and neutral sentiment
- **Word Frequency Analysis**: Visualize the most common words in your text
- **Linguistic Features**: Analyze text complexity through metrics like:
  - Word Diversity
  - Average Word Length
  - Punctuation Density
  - Unique Word Count
- **Interactive Visualizations**:
  - Sentiment Distribution (Pie Chart)
  - Word Frequency (Bar Chart)
  - Sentiment Trend (Line Chart)
  - Linguistic Features (Radar Chart)
- **Export Functionality**: Export analysis results in JSON format
- **Random Text Simulation**: Test the tool with pre-defined example texts

## Technologies Used

- React 18
- TypeScript
- Recharts for data visualization
- TailwindCSS for styling
- Lucide React for icons
- Modern component architecture with React hooks

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AI-Text-Analyst.git
   cd AI-Text-Analyst
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. Enter or paste your text in the input area
2. Click "Analyze Text" to see the results
3. View different aspects of the analysis through various charts
4. Use the "Random Simulation" button to test with example texts
5. Export results using the "Export" button

## Project Structure

```
src/
├── components/
│   ├── text-analysis/
│   │   └── AdvancedTextAnalyzer.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts
├── App.tsx
└── index.tsx
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 