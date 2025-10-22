import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Buttons from "../components/Buttons";
import "../css/Resume.css";

function Resume() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // ✅ added
  const [input, setInput] = useState("");       // ✅ added
  const navigate = useNavigate();

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
        navigate("/analysis", { state: { result: parsed } });
      } else {
        navigate("/analysis", { state: { result: content || "No response from AI." } });
      }
    } catch (err) {
      console.error(err);
      navigate("/analysis", { state: { result: "Error analyzing resume." } });
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
              onClick={() => navigate(-1)} 
              style={{ 
                padding: '10px 20px', 
                cursor: 'pointer',
                border: '3px solid #222',
                borderRadius: '20px',
                background: '#fff',
                fontSize: '16px',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {loading && <div style={{ marginTop: 16 }}>Analyzing resume...</div>}
      </div>
    </div>
  );
}

export default Resume;
