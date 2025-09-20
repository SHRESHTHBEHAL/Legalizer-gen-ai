# Legal Document AI Analyzer
import streamlit as st
import google.generativeai as genai
import pypdf
import os
from typing import Union
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Page configuration
st.set_page_config(
    page_title="Legalizer - AI Legal Doc Analyzer",
    page_icon="⚖️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for modern UI styling
st.markdown("""
<style>
    /* Main container styling */
    .main-header {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 15px;
        margin-bottom: 2rem;
        color: white;
    }
    
    .main-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    
    .main-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        font-weight: 300;
    }
    
    /* Upload area styling */
    .upload-card {
        border: 2px dashed #cccccc;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.02);
        margin: 1rem 0;
        transition: all 0.3s ease;
    }
    
    .upload-card:hover {
        border-color: #667eea;
        background-color: rgba(102, 126, 234, 0.05);
    }
    
    /* Tab styling */
    .stTabs [data-baseweb="tab-list"] {
        gap: 8px;
    }
    
    .stTabs [data-baseweb="tab"] {
        border-radius: 10px;
        padding: 0.5rem 1rem;
    }
    
    /* Card styling */
    .info-card {
        background-color: rgba(0, 0, 0, 0.05);
        padding: 1.5rem;
        border-radius: 15px;
        margin: 1rem 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Footer styling */
    .footer {
        text-align: center;
        padding: 2rem 0;
        color: #666;
        font-size: 0.9rem;
        border-top: 1px solid #eee;
        margin-top: 3rem;
    }
</style>
""", unsafe_allow_html=True)

# Google AI configuration
try:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        st.warning("⚠️ Google AI Studio API key not found. Using demo mode.")
        USE_DEMO_MODE = True
    else:
        genai.configure(api_key=api_key)
        USE_DEMO_MODE = False
except Exception as e:
    st.warning(f"⚠️ AI initialization issue: {e}. Using demo mode.")
    USE_DEMO_MODE = True

# AI Functions
def call_gemini(prompt: str, model_name="gemini-2.0-flash-exp") -> Union[str, None]:
    """Call the Gemini API with a prompt."""
    if USE_DEMO_MODE:
        return "**Demo Mode Response:** This is a simulated AI response for demonstration purposes."
    
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        st.error(f"An error occurred with the AI analysis: {e}")
        return None

def analyze_document(document_text: str) -> Union[str, None]:
    """Analyze the document and provide summary."""
    if USE_DEMO_MODE:
        return """**Document Analysis:**

**Key Points:**
- This appears to be a legal agreement between two parties
- Contains standard confidentiality clauses
- Includes termination and penalty provisions

**Important Clauses:**
- Confidentiality requirements for 2 years
- 30-day notice period for termination
- Penalty amount specified for breaches

**Recommendations:**
- Review termination conditions carefully
- Understand penalty implications
- Consider duration of confidentiality obligations"""
    
    prompt = f"""
Analyze this legal document and provide:
1. Key Clauses: Most important sections
2. Parties: Who is involved and their roles
3. Risks: Potential issues or unfavorable terms
4. Obligations: Main duties and deadlines

Document: {document_text}
"""
    return call_gemini(prompt)

def explain_like_i_am_5(document_text: str) -> Union[str, None]:
    """Provide a simple explanation of the document."""
    if USE_DEMO_MODE:
        return """**Simple Explanation:**

Think of this document like a promise between two people. One person shares important information, and the other person promises to keep it secret.

If someone breaks this promise, they might have to pay money as a penalty - like breaking something valuable and having to replace it.

The document also says how long the promise lasts and what happens if someone wants to stop the agreement."""
    
    prompt = f"Explain this legal document in very simple terms: {document_text}"
    return call_gemini(prompt)

def answer_question(document_text: str, question: str) -> Union[str, None]:
    """Answer a specific question about the document."""
    if USE_DEMO_MODE:
        return f"""**Answer for: "{question}"**

Based on the document, here's what I found: This is a demonstration response. With a real document, I would analyze the specific content and provide detailed answers citing relevant sections."""
    
    prompt = f"Based on this document: {document_text}\n\nQuestion: {question}\n\nAnswer:"
    return call_gemini(prompt)

def find_clauses(document_text: str, clause_type: str) -> Union[str, None]:
    """Find specific types of clauses in the document."""
    if USE_DEMO_MODE:
        demo_results = {
            "Confidentiality": "Found confidentiality clauses requiring information to remain secret for 2 years.",
            "Termination": "Termination allowed with 30 days written notice to the other party.",
            "Liability": "Breach of agreement may result in financial penalties.",
            "Governing Law": "Agreement governed by state law where signed.",
            "Payment Terms": "No specific payment terms found in this document.",
            "Force Majeure": "No force majeure clause found in this document."
        }
        return demo_results.get(clause_type, f"No {clause_type} clauses found in this document.")
    
    prompt = f"Find all {clause_type} clauses in this document: {document_text}"
    return call_gemini(prompt)

def categorize_risks(analysis_text: str) -> dict:
    """Categorize text into risk levels for highlighting."""
    # Simple keyword-based categorization for demo
    lines = analysis_text.split('\n')
    categorized = {'safe': [], 'attention': [], 'risk': []}
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if any(word in line.lower() for word in ['risk', 'danger', 'unfavorable', 'penalty', 'liable']):
            categorized['risk'].append(line)
        elif any(word in line.lower() for word in ['attention', 'notice', 'deadline', 'termination', 'review']):
            categorized['attention'].append(line)
        else:
            categorized['safe'].append(line)
    
    return categorized

# Header
st.markdown("""
<div class="main-header">
    <h1 class="main-title">⚖️ Legalizer</h1>
    <p class="main-subtitle">Upload, summarize, and understand your legal documents instantly</p>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'text' not in st.session_state:
    st.session_state.text = None
if 'analysis' not in st.session_state:
    st.session_state.analysis = None

# Sidebar
with st.sidebar:
    st.header("� Document Upload")
    uploaded_file = st.file_uploader(
        "Choose a PDF file",
        type=["pdf"], 
        help="Maximum file size: 200MB"
    )
    
    if uploaded_file:
        try:
            pdf_reader = pypdf.PdfReader(uploaded_file)
            text = ""
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            
            if text:
                st.session_state.text = text
                st.success("✅ File uploaded and text extracted successfully!")
                st.info(f"📊 File size: {uploaded_file.size / (1024*1024):.2f} MB")
            else:
                st.warning("Could not extract text. The PDF might be image-based or empty.")
                st.session_state.text = None
        except Exception as e:
            st.error(f"An error occurred: {e}")
            st.session_state.text = None
    
    st.markdown("---")
    
    # About & Privacy section
    st.header("🔒 About & Privacy")
    st.markdown("""
    <div class="info-card">
        <p><strong>🛡️ Secure Processing</strong></p>
        <p>This demo runs securely. Documents are not stored.</p>
        <p><strong>🤖 Powered by:</strong><br>Google Gemini AI</p>
    </div>
    """, unsafe_allow_html=True)

# Main page content
def show_illustration():
    st.markdown("""
    <div class="upload-card">
        <div style="font-size: 120px;">📄</div>
        <h3>Drop your PDF here</h3>
        <p>Supported format: <strong>PDF</strong> | Max size: <strong>200MB</strong></p>
        <p style="color: #666; font-size: 0.9rem;">Upload your document using the sidebar to get started</p>
    </div>
    """, unsafe_allow_html=True)

if not st.session_state.text:
    # Main content area
    col1, col2, col3 = st.columns([1, 6, 1])
    
    with col2:
        st.markdown("### 📤 Upload Your Document")
        show_illustration()
        
        st.markdown("---")
        
        # Preview of what users will get
        st.markdown("### 📊 What You'll Get")
        
        tab1, tab2, tab3 = st.tabs(["📝 Summary", "🔍 Clause Highlights", "💬 Ask AI"])
        
        with tab1:
            st.markdown("""
            <div class="info-card">
                <h4>📋 Document Summary</h4>
                <p style="color: #666;">Upload a document to see an AI-generated summary here.</p>
                <p style="color: #888; font-size: 0.9rem;">The summary will highlight key points, parties involved, and important terms.</p>
            </div>
            """, unsafe_allow_html=True)
        
        with tab2:
            st.markdown("""
            <div class="info-card">
                <h4>🔍 Important Clauses</h4>
                <p style="color: #666;">Upload a document to see highlighted important clauses here.</p>
                <p style="color: #888; font-size: 0.9rem;">We'll identify critical terms, obligations, and potential risks.</p>
            </div>
            """, unsafe_allow_html=True)
        
        with tab3:
            st.markdown("""
            <div class="info-card">
                <h4>💬 Ask AI About Your Document</h4>
                <p style="color: #666;">Upload a document to start asking questions here.</p>
                <p style="color: #888; font-size: 0.9rem;">You can ask about specific clauses, obligations, risks, or get clarifications on legal terms.</p>
            </div>
            """, unsafe_allow_html=True)
else:
    # Main content area
    col1, col2, col3 = st.columns([1, 6, 1])
    
    with col2:
        st.markdown("### 📊 Analysis Results")
        
        tabs = st.tabs(["� Summary", "🔍 Clause Highlights", "💬 Ask AI"])
        
        with tabs[0]:
            st.markdown("""
            <div class="info-card">
                <h4>📊 Document Summary</h4>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button("🔄 Analyze Document", key="analyze_button", type="primary"):
                with st.spinner("AI is analyzing your document..."):
                    st.session_state.analysis = analyze_document(st.session_state.text)
            
            if st.session_state.analysis:
                # Display the analysis in a user-friendly format
                st.markdown("**📋 AI Analysis Results:**")
                
                # Show the full analysis as formatted text
                analysis_text = st.session_state.analysis
                
                # Split into sections if the analysis contains headers
                if "**Key Clauses:**" in analysis_text:
                    sections = analysis_text.split("**")
                    for i, section in enumerate(sections):
                        if section.strip():
                            if "Key Clauses" in section:
                                st.markdown("### 🔑 Key Clauses")
                                st.write(section.replace("Key Clauses:", "").strip())
                            elif "Parties Involved" in section:
                                st.markdown("### 👥 Parties Involved")
                                st.write(section.replace("Parties Involved:", "").strip())
                            elif "Potential Risks" in section:
                                st.markdown("### ⚠️ Potential Risks")
                                st.error(section.replace("Potential Risks:", "").strip())
                            elif "Obligations" in section:
                                st.markdown("### 📝 Obligations")
                                st.info(section.replace("Obligations:", "").strip())
                            elif not any(header in section for header in ["Key Clauses", "Parties Involved", "Potential Risks", "Obligations"]):
                                if len(section.strip()) > 20:  # Only show substantial content
                                    st.write(section.strip())
                else:
                    # If no structured format, just show the analysis as paragraphs
                    st.write(analysis_text)
                
                # Download button
                st.download_button(
                    label="📥 Download Analysis",
                    data=st.session_state.analysis,
                    file_name="ai_analysis.txt",
                    mime="text/plain"
                )
                
                # Simple explanation
                with st.expander("🤔 Explain Like I'm 5"):
                    with st.spinner("Simplifying explanation..."):
                        simple_analysis = explain_like_i_am_5(st.session_state.text)
                        if simple_analysis:
                            st.markdown(simple_analysis)
            else:
                st.markdown("Click **Analyze Document** to get AI-powered insights.")

        with tabs[1]:
            st.markdown("""
            <div class="info-card">
                <h4>🔍 Clause Highlights</h4>
            </div>
            """, unsafe_allow_html=True)
            
            clause_options = ["Confidentiality", "Termination", "Liability", "Governing Law", "Payment Terms", "Force Majeure"]
            selected_clause = st.selectbox("Which type of clause are you looking for?", clause_options)
            
            if st.button("🔍 Find Clauses", key="find_clauses_button", type="primary"):
                with st.spinner(f"Searching for {selected_clause} clauses..."):
                    clauses = find_clauses(st.session_state.text, selected_clause)
                    if clauses:
                        st.markdown(f"**Found {selected_clause} Clauses:**")
                        st.markdown(clauses)
                    else:
                        st.warning(f"No {selected_clause} clauses found in this document.")

        with tabs[2]:
            st.markdown("""
            <div class="info-card">
                <h4>💬 Ask Questions About Your Document</h4>
            </div>
            """, unsafe_allow_html=True)
            
            question = st.text_input(
                "Ask anything about your document:",
                placeholder="e.g., What are the termination conditions?"
            )
            
            if st.button("🚀 Ask AI", key="ask_button", type="primary"):
                if question:
                    with st.spinner("AI is analyzing your question..."):
                        answer = answer_question(st.session_state.text, question)
                        if answer:
                            st.markdown(f"""
                            <div class="info-card">
                                <p><strong>Your question:</strong> {question}</p>
                                <p><strong>AI Response:</strong></p>
                            </div>
                            """, unsafe_allow_html=True)
                            st.markdown(answer)
                else:
                    st.warning("Please enter a question first.")

# Footer
st.markdown("""
<div class="footer">
    🚀 Built with Google Gemini AI
</div>
""", unsafe_allow_html=True)