import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Buttons from "../components/Buttons";
import "../css/Resume.css";

function Resume() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // ✅ added
  const [input, setInput] = useState("");       // ✅ added
  
  // AI Assistant state
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);
  const [lastAnalyzedLength, setLastAnalyzedLength] = useState(0);
  
  // Interactive AI Chat state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [userGoals, setUserGoals] = useState({
    targetRole: '',
    industry: '',
    experienceLevel: '',
    careerGoals: ''
  });
  
  // Store selected field information
  const selectedField = location.state?.selectedField || '';
  const fieldName = location.state?.fieldName || '';

  // Load resume text from navigation state if available
  useEffect(() => {
    if (location.state?.resumeText) {
      setText(location.state.resumeText);
    }
  }, [location.state]);

  // AI Assistant - provide real-time suggestions for any amount of text
  const getAISuggestions = async (resumeText) => {
    if (!resumeText.trim()) {
      setAiSuggestions([]);
      return;
    }

    setAiLoading(true);
    try {
      let prompt;
      let systemMessage;

      // Different prompts based on text length for more relevant feedback
      if (resumeText.length < 20) {
        // Very short text - give encouragement and immediate tips
        systemMessage = "You are a resume writing coach providing instant feedback. Give 2-3 encouraging, actionable tips in simple language.";
        prompt = `The user just started typing: "${resumeText}". Give encouraging feedback and immediate next steps to help them build their resume${fieldName ? ` for the ${fieldName} field` : ''}.`;
      } else if (resumeText.length < 100) {
        // Short text - give structure and content guidance
        systemMessage = "You are a resume writing assistant. Provide 3 brief, specific suggestions to help expand and improve what they've started. Keep suggestions under 12 words each.";
        prompt = `User is building their resume${fieldName ? ` for ${fieldName}` : ''} and has written: "${resumeText}". Give specific suggestions for what to add or improve next.`;
      } else {
        // Longer text - comprehensive analysis
        systemMessage = "You are a resume writing assistant. Provide 3-4 brief, actionable suggestions to improve the resume. Keep each suggestion under 15 words. Focus on content, structure, and impact.";
        prompt = `Analyze this resume draft${fieldName ? ` for the ${fieldName} field` : ''} and provide quick improvement suggestions:\n\n${resumeText}`;
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: systemMessage
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const suggestions = data?.choices?.[0]?.message?.content?.trim() || "";
        
        // Parse suggestions into array (assuming they're separated by newlines or bullet points)
        const suggestionsList = suggestions
          .split(/\n|•|-|\d+\./)
          .filter(s => s.trim().length > 0)
          .map(s => s.trim())
          .slice(0, 4);
        
        setAiSuggestions(suggestionsList);
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
      if (resumeText.length < 20) {
        setAiSuggestions(["Great start! Keep writing - add your name and contact info next."]);
      } else {
        setAiSuggestions(["Keep writing! Add more specific achievements and metrics."]);
      }
    }
    setAiLoading(false);
  };

  // Initialize AI chat with welcome message
  useEffect(() => {
    if (chatMessages.length === 0 && !fieldName) {
      setChatMessages([{
        sender: 'ai',
        text: `Hi! I'm your AI resume coach. I can help you create a tailored resume that stands out. To get started, what type of role are you targeting?`,
        timestamp: Date.now()
      }]);
    } else if (chatMessages.length === 0 && fieldName) {
      setChatMessages([{
        sender: 'ai', 
        text: `Great! I see you're interested in ${fieldName}. I can help you create a ${fieldName} resume that highlights your relevant skills and experience. What specific role within ${fieldName} are you targeting?`,
        timestamp: Date.now()
      }]);
    }
  }, [fieldName, chatMessages.length]);

  // Immediate AI suggestions - trigger for any text change with minimal delay
  useEffect(() => {
    // Provide feedback for any text, even just one word
    const timer = setTimeout(() => {
      getAISuggestions(text);
      setLastAnalyzedLength(text.length);
    }, 800); // Reduced delay to 800ms for more responsive feedback

    return () => clearTimeout(timer);
  }, [text]); // Removed length requirements - analyze any text change

  // Handle AI chat interactions
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      sender: 'user',
      text: chatInput,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a friendly career coach chatting about their resume. Keep messages SHORT and give SPECIFIC resume suggestions based on what they tell you.

RULES:
- Max 1-2 sentences per response
- When they share info, give immediate resume advice
- Use casual, encouraging tone
- Give actionable resume tips like "Add that to your Skills section!" or "Put those numbers in your Experience!"

Context:
- Field: ${fieldName || 'Not specified'}
- Resume: ${text ? 'In progress' : 'Not started'}
- Goals: ${JSON.stringify(userGoals)}

EXAMPLES:
User: "I'm a software engineer with 5 years experience"
You: "Great! Lead with 'Senior Software Engineer' and highlight your tech stack prominently."

User: "I increased sales by 30%"
You: "Perfect! Put '30% sales increase' right at the top of your achievements section."

Give specific resume writing advice based on what they share!`
            },
            ...chatMessages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: chatInput
            }
          ],
          temperature: 0.7,
          max_tokens: 120,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data?.choices?.[0]?.message?.content?.trim() || 'I\'m here to help! Could you tell me more about your career goals?';
        
        const aiMessage = {
          sender: 'ai',
          text: aiResponse,
          timestamp: Date.now()
        };

        setChatMessages(prev => [...prev, aiMessage]);

        // Extract user goals and info from conversation for better context
        const userInput = chatInput.toLowerCase();
        
        // Extract career information
        if (userInput.includes('role') || userInput.includes('position') || userInput.includes('job')) {
          setUserGoals(prev => ({ ...prev, targetRole: chatInput }));
        }
        if (userInput.includes('industry') || userInput.includes('company') || userInput.includes('field')) {
          setUserGoals(prev => ({ ...prev, industry: chatInput }));
        }
        if (userInput.includes('year') || userInput.includes('experience') || userInput.includes('worked')) {
          setUserGoals(prev => ({ ...prev, experienceLevel: chatInput }));
        }
        if (userInput.includes('goal') || userInput.includes('want') || userInput.includes('looking')) {
          setUserGoals(prev => ({ ...prev, careerGoals: chatInput }));
        }

        // Add resume suggestions based on conversation
        if (chatMessages.length > 2 && (
          userInput.includes('increased') || 
          userInput.includes('improved') || 
          userInput.includes('managed') || 
          userInput.includes('led') ||
          userInput.includes('%') ||
          userInput.includes('million') ||
          userInput.includes('thousand')
        )) {
          // They shared an achievement - suggest adding it to resume
          setTimeout(() => {
            setChatMessages(prev => [...prev, {
              sender: 'ai',
              text: '💡 That sounds like a great achievement for your resume! Make sure to highlight those specific results.',
              timestamp: Date.now()
            }]);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: 'Sorry, I had trouble processing that. Could you try again?',
        timestamp: Date.now()
      }]);
    }
    setChatLoading(false);
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  // 🔍 Handle resume analysis directly via OpenAI (structured JSON result)
  const handleAnalyze = async () => {

    if (!text.trim()) {
      alert("Please enter your resume text first!");
      return;
    }

    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      alert("OpenAI API key is missing! Please check your environment variables.");
      return;
    }

    console.log("Starting analysis...");
    setLoading(true);

    try {

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert career advisor and resume analyst specializing in ${fieldName || 'various'} field${fieldName ? '' : 's'}. You provide personalized, actionable feedback based on both resume content and industry requirements. Always return STRICT JSON only (no markdown).`,
            },
            {
              role: "user",
              content: `
TASK: Create a PATHWAY-FOCUSED career roadmap that shows how to leverage their existing skills to successfully transition into ${fieldName ? `the ${fieldName} field` : 'their target career'}.

CORE MISSION: 
- Build on what they ALREADY HAVE, don't just focus on what they lack
- Create clear bridges from their current skills to ${fieldName ? fieldName : 'target field'} success
- Show them they're closer than they think by maximizing their existing strengths

PATHWAY-BUILDING FRAMEWORK:
1. FOUNDATION ASSESSMENT: What strong skills/experiences do they already possess?
2. SKILL BRIDGE MAPPING: How can their current skills be repositioned for ${fieldName ? fieldName : 'target field'} success?
3. STRATEGIC POSITIONING: How to present their background as an ADVANTAGE in ${fieldName ? fieldName : 'target field'}?
4. SKILL ENHANCEMENT: What can they add to their existing foundation (not replace it)?
5. TRANSITION STRATEGY: Step-by-step pathway using their strengths as springboards
6. COMPETITIVE ADVANTAGE: How their unique background gives them an edge in ${fieldName ? fieldName : 'target field'}

Create a personalized career roadmap as a JSON object:

{
  "match_score": number, // 0-100: Current resume alignment with ${fieldName ? fieldName : 'target career'} requirements
  "career_readiness": string, // "Ready", "Nearly Ready", "Needs Development", or "Major Gap" - overall assessment
  "current_skills": string[], // All skills/experiences found in their resume (comprehensive list)
  "transferable_skills": [
    {
      "skill": string, // A skill they already have
      "how_it_transfers": string, // How this skill directly applies to ${fieldName ? fieldName : 'target field'} work
      "leverage_strategy": string // Specific way to position/highlight this skill for ${fieldName ? fieldName : 'target field'} employers
    }
  ],
  "strengths_skills": string[], // Current resume strengths that are ASSETS for ${fieldName ? fieldName : 'target field'} success
  "gap_skills": string[], // Skills to ADD to their foundation (not replace existing skills)
  "skill_building_path": string, // How their existing skills create a natural pathway to ${fieldName ? fieldName : 'target field'} mastery
  "immediate_actions": [
    {
      "action": string, // Specific step they should take first (resume updates, skill development, etc.)
      "timeline": string, // "This week", "Next month", "Within 3 months"
      "impact": string // How this action moves them closer to ${fieldName ? fieldName : 'their goal'}
    }
  ],
  "recommended_learning_path": [
    {
      "priority": string, // "High", "Medium", "Low" based on ${fieldName ? fieldName : 'career'} impact
      "topic": string, // Skill/knowledge area to develop
      "reason": string, // Why this matters for ${fieldName ? `${fieldName} success` : 'their goals'}
      "suggested_resources": string[], // Specific courses, certifications, platforms
      "experience_opportunities": string[], // Practical ways to gain real experience (projects, volunteering, freelancing, etc.)
      "time_investment": string // "2-4 weeks", "3-6 months", etc.
    }
  ],
  "current_level": string, // "Entry", "Junior", "Mid", "Senior", or "Executive"
  "next_career_steps": string[], // Realistic next positions in ${fieldName ? fieldName : 'their field'} progression
  "field_specific_advice": string, // Strategic guidance for ${fieldName ? fieldName : 'their chosen field'} success
  "resume_optimization": [
    {
      "section": string, // "Skills", "Experience", "Summary", etc.
      "suggestion": string, // Specific change to make
      "reason": string // How this helps with ${fieldName ? fieldName : 'target field'} applications
    }
  ]
}

${fieldName ? `
PATHWAY-FOCUSED STRATEGY FOR ${fieldName.toUpperCase()}:
- EXISTING SKILL AMPLIFICATION: How their current skills are already ${fieldName}-relevant (even if they don't realize it)
- SKILL TRANSLATION: Reframe their background using ${fieldName} language and contexts
- NATURAL PROGRESSION: Show how their experience creates logical stepping stones into ${fieldName}
- UNIQUE VALUE PROPOSITION: Position their diverse background as a ${fieldName} competitive advantage
- BRIDGE SKILLS: Identify which of their skills serve as perfect bridges to ${fieldName} mastery
- ENHANCEMENT STRATEGY: What to add to their existing foundation (not replace it) for ${fieldName} success
- TRANSITION CONFIDENCE: Demonstrate they have more ${fieldName}-relevant experience than they think
- PATHWAY ACCELERATION: How to fast-track using their existing foundation

MINDSET: Their background isn't a limitation - it's their secret weapon in ${fieldName}. Show them the direct pathway from where they are to where they want to be, using what they already have as the foundation.
` : 'PATHWAY FOCUS: Show them how their current skills create natural bridges to their career goals.'}

RESUME CONTENT TO ANALYZE:
${text}

Provide detailed, personalized analysis based on what you actually see in this resume combined with ${fieldName ? fieldName : 'general'} field requirements.`,
            },
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const t = await response.text();
        throw new Error(`OpenAI error ${response.status}: ${t}`);
      }

      const data = await response.json();
      let content = data?.choices?.[0]?.message?.content || "";
      console.log("Raw AI response:", content);
      // Strip markdown code fences if present
      content = content.replace(/```json\s*|```/g, "").trim();

      let parsed = null;
      try {
        parsed = JSON.parse(content);
      } catch (_) {
        // Fallback: try to extract JSON block
        const m = content.match(/\{[\s\S]*\}/);
        if (m) {
          parsed = JSON.parse(m[0]);
        }
      }

      if (parsed && typeof parsed === "object") {
        navigate("/analysis", { state: { result: parsed, resumeText: text, selectedField, fieldName } });
      } else {
        navigate("/analysis", { state: { result: content || "No response from AI.", resumeText: text, selectedField, fieldName } });
      }
    } catch (err) {
      console.error("Analysis error:", err);
      alert(`Analysis failed: ${err.message}`);
      navigate("/analysis", { state: { result: "Error analyzing resume.", resumeText: text, selectedField, fieldName } });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="resume-container">
      <div className="resume-card" style={{ position: 'relative' }}>
        <div className="resume-header">Type out your resume</div>

        <div className="resume-textarea-outer">
          <textarea
            aria-label="resume-input"
            placeholder="Paste or type your resume here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* AI Assistant Panel */}
        {showAssistant && (
          <div className="ai-assistant">
            <div className="ai-header">
              <h3>🤖 AI Writing Assistant</h3>
              <div className="ai-header-buttons">
                <button 
                  className="chat-toggle-btn"
                  onClick={() => setShowChat(!showChat)}
                >
                  💬 {showChat ? 'Hide' : 'Chat'}
                </button>
                <button 
                  className="toggle-assistant"
                  onClick={() => setShowAssistant(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            
            {aiLoading ? (
              <div className="ai-loading">
                <div className="loading-spinner"></div>
                <span>Analyzing your resume...</span>
              </div>
            ) : aiSuggestions.length > 0 ? (
              <div className="ai-suggestions">
                <p className="suggestions-intro">
                  {fieldName ? `💡 ${fieldName} field suggestions:` : '💡 Suggestions to improve your resume:'}
                </p>
                <ul className="suggestions-list">
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="suggestion-item">
                      {suggestion}
                    </li>
                  ))}
                </ul>
                <button 
                  className="refresh-suggestions"
                  onClick={() => getAISuggestions(text)}
                  disabled={aiLoading}
                >
                  🔄 Refresh Suggestions
                </button>
              </div>
            ) : text.length > 0 ? (
              <div className="ai-waiting">
                <p>Analyzing your text... Keep writing!</p>
              </div>
            ) : (
              <div className="ai-prompt">
                <p>Start typing your resume and I'll give you instant feedback!</p>
                <div className="ai-starter-tips">
                  <p><strong>💡 Quick Tips:</strong></p>
                  <ul>
                    <li>Start with your name and contact information</li>
                    <li>Use action verbs (achieved, managed, created)</li>
                    <li>Include specific numbers and results</li>
                    {fieldName && <li>Highlight {fieldName}-relevant skills and experience</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* Interactive AI Chat */}
            {showChat && (
              <div className="ai-chat-section">
                <div className="chat-header">
                  <span className="chat-icon">💬</span>
                  <span className="chat-title">Career Coach Chat</span>
                </div>
                
                <div className="chat-messages">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender}`}>
                      <div className="message-content">
                        {message.text}
                      </div>
                      <div className="message-time">
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="chat-message ai">
                      <div className="message-content typing">
                        <div className="typing-indicator">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="chat-input-container">
                  <textarea
                    className="chat-input"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleChatKeyPress}
                    placeholder="Ask me about your career goals, target roles, or resume questions..."
                    rows="2"
                  />
                  <button 
                    className="chat-send-btn"
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim() || chatLoading}
                  >
                    ➤
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!showAssistant && (
          <button 
            className="show-assistant"
            onClick={() => setShowAssistant(true)}
          >
            🤖 Show AI Assistant
          </button>
        )}

        <div className="resume-actions">
          <Buttons resumeText={text} onAnalyze={handleAnalyze} loading={loading} />
          
          <div style={{ marginTop: 16 }}>
            <button 
              onClick={() => navigate('/home')} 
              style={{ 
                padding: '12px 24px', 
                cursor: 'pointer',
                border: '2px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#667eea',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.8) 100%)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
              }}
            >
              Back
            </button>
          </div>
        </div>

        {loading && <div style={{ marginTop: 16 }}>Analyzing resume...</div>}
      </div>
    </div>
  );
}

export default Resume;
