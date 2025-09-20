# Legalizer

Legalizer is an AI-powered tool that helps people understand legal documents by breaking down complex language into plain English.

## Features

- **Document Analysis**: Upload PDF documents and get AI-powered analysis
- **Simple Explanations**: Complex legal terms explained in simple language
- **Question & Answer**: Ask specific questions about your documents
- **Clause Finder**: Find specific types of clauses (termination, liability, etc.)
- **Secure Processing**: Documents are processed securely and not stored

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **AI Backend**: Python, Streamlit, Google Gemini AI
- **Document Processing**: PyPDF for text extraction
- **UI Components**: Radix UI, Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.9+
- Google AI Studio API key

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd legalizer
```

2. Install frontend dependencies
```bash
pnpm install
```

3. Set up Python environment
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

4. Create environment file
```bash
cp .env.example .env
```
Add your Google AI Studio API key to `.env`:
```
GOOGLE_API_KEY=your_api_key_here
```

### Running the Application

1. Start the AI backend:
```bash
python -m streamlit run app.py --server.port 8512
```

2. Start the frontend (in a new terminal):
```bash
pnpm dev
```

3. Open http://localhost:3000 in your browser

## How It Works

1. **Landing Page**: Professional landing page with feature overview
2. **Document Upload**: Users upload PDF documents through a clean interface
3. **AI Analysis**: Google Gemini AI processes and analyzes the document
4. **Results**: Users get summaries, clause highlights, and can ask questions

## Demo Mode

The app includes a demo mode that works without an API key, perfect for testing and demonstrations.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for learning and building upon.
