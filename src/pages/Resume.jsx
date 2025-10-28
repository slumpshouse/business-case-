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

  // Load resume text from navigation state if available
  useEffect(() => {
    if (location.state?.resumeText) {
      setText(location.state.resumeText);
    }
  }, [location.state]);

  // 🔍 Handle resume analysis directly via OpenAI (structured JSON result)
  const handleAnalyze = async () => {

    if (!text.trim()) return;
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
              content:
                "You are a precise resume evaluator. Always return STRICT JSON only (no markdown).",
            },
            {
              role: "user",
              content:
                `Analyze the following resume text. Produce a JSON object with this exact shape:\n\n{
                  "match_score": number, // 0-100 overall relevance score for typical target roles based on the resume
                  "strengths_skills": string[], // skills clearly demonstrated in the resume
                  "gap_skills": string[], // important skills missing or weak
                  "why_it_matters": string, // why the gap skills matter for employability
                  "recommended_learning_path": [
                    {
                      "topic": string,
                      "reason": string,
                      "suggested_resources": string[]
                    }
                  ]
                }\n\nResume:\n${text}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        const t = await response.text();
        throw new Error(`OpenAI error ${response.status}: ${t}`);
      }

      const data = await response.json();
      let content = data?.choices?.[0]?.message?.content || "";
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
        navigate("/analysis", { state: { result: parsed, resumeText: text } });
      } else {
        navigate("/analysis", { state: { result: content || "No response from AI.", resumeText: text } });
      }
    } catch (err) {
      console.error(err);
      navigate("/analysis", { state: { result: "Error analyzing resume.", resumeText: text } });
    } finally {
      setLoading(false);
    }
  };

  // 💬 Handle sending a chat message to OpenAI
  // const handleSend = async (e) => {
  //   if (!input.trim()) return;

  //   console.log("Sending message:", input);
  //   const userMsg = { sender: "user", text: input };
  //   setMessages((prev) => [...prev, userMsg]);
  //   setInput("");
  //   setLoading(true);

  //   try {
  //     const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-4o-mini",
  //         messages: [
  //           {
  //             role: "system",
  //             content:
  //               "You are a resume analysis assistant that provides detailed feedback on resumes and tells users what skills they should improve.",
  //           },
  //           { role: "user", content: input },
  //         ],
  //       }),
  //     });

  //     const data = await response.json();
  //     const aiText =
  //       data?.choices?.[0]?.message?.content?.trim() ||
  //       "Hmm, I'm not sure how to answer that.";

  //     const aiMsg = { sender: "ai", text: aiText };
  //     setMessages((prev) => [...prev, aiMsg]);
  //   } catch (err) {
  //     console.error(err);
  //     setMessages((prev) => [
  //       ...prev,
  //       { sender: "ai", text: "⚠️ Error: Unable to reach AI server." },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

        <div className="resume-tips">
          <h3 style={{ marginTop: 0 }}>Resume tips</h3>
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <li>Keep bullets short and achievement-focused</li>
            <li>Use numbers to quantify impact</li>
            <li>Match keywords from the job posting</li>
          </ul>
        </div>

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
