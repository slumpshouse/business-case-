import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Analysis.css';

function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || '';
  const resumeText = location.state?.resumeText || '';
  const selectedField = location.state?.selectedField || '';
  const fieldName = location.state?.fieldName || '';

  const isStructured = result && typeof result === 'object';
  const matchScore = Math.max(0, Math.min(100, Number(result.match_score) || 0));

  // Function to determine priority based on position in the gap skills array
  const getPriority = (index, total) => {
    if (total <= 2) return 'high priority';
    const percentage = index / (total - 1);
    if (percentage < 0.33) return 'high priority';
    if (percentage < 0.67) return 'medium priority';
    return 'low priority';
  };

  // Function to get priority class for styling
  const getPriorityClass = (priority) => {
    if (priority === 'high priority') return 'priority-high';
    if (priority === 'medium priority') return 'priority-medium';
    return 'priority-low';
  };

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Resume Analysis</h1>
      {fieldName && (
        <div className="field-indicator">
          <span className="field-label">Analysis for:</span>
          <span className="field-name">{fieldName}</span>
        </div>
      )}

      {result ? (
        isStructured ? (
          <div className="analysis-content">
            {/* Overall Match Score Section */}
            <div className="match-score-section">
              <h3>Overall match score</h3>
              <div className="circular-progress">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={`${(matchScore / 100) * 377} 377`}
                    strokeDashoffset="0"
                    transform="rotate(-90 70 70)"
                    strokeLinecap="round"
                  />
                  <text
                    x="70"
                    y="75"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#1f2937"
                  >
                    {matchScore}
                  </text>
                </svg>
              </div>
              <p className="score-subtitle">You have {matchScore}% of the required skills</p>
            </div>

            {/* Current Skills Overview */}
            {result.current_skills && result.current_skills.length > 0 && (
              <div className="current-skills-section">
                <h3>📋 Your Current Skills Inventory</h3>
                <div className="current-skills-grid">
                  {result.current_skills.map((skill, i) => (
                    <div key={i} className="current-skill-tag">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transferable Skills Mapping */}
            {result.transferable_skills && result.transferable_skills.length > 0 && (
              <div className="transferable-skills-section">
                <h3>🔄 How Your Skills Transfer to {fieldName || 'Your Target Field'}</h3>
                <div className="transfer-mapping">
                  {result.transferable_skills.map((transfer, i) => (
                    <div key={i} className="transfer-card">
                      <div className="transfer-skill-name">{transfer.skill}</div>
                      <div className="transfer-arrow">→</div>
                      <div className="transfer-content">
                        <div className="transfer-application">{transfer.how_it_transfers}</div>
                        <div className="leverage-strategy">
                          <strong>Strategy:</strong> {transfer.leverage_strategy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills you have */}
            <div className="skills-section">
              <h3>Your competitive advantages</h3>
              <div className="skills-grid">
                {(result.strengths_skills || []).map((skill, i) => (
                  <div key={i} className="skill-box">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills you need to develop */}
            <div className="skills-section">
              <h3>Skills you need to develop</h3>
              <div className="skills-development">
                {(result.gap_skills || []).map((skill, i) => {
                  const totalSkills = result.gap_skills.length;
                  const priority = getPriority(i, totalSkills);
                  const priorityClass = getPriorityClass(priority);
                  
                  return (
                    <div key={i} className="skill-card">
                      <div className="skill-header">
                        <div className="skill-icon">📚</div>
                        <div className={`skill-priority ${priorityClass}`}>{priority}</div>
                      </div>
                      <h4>{skill}</h4>
                      <p>{result.why_it_matters || 'Essential for career growth and job requirements.'}</p>
                      <div className="skill-actions">
                        <button className="action-btn">Online Course</button>
                        <button className="action-btn">Practice Projects</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended learning path */}
            <div className="learning-path-section">
              <h3>Recommended learning path</h3>
              <div className="learning-path">
                {(result.recommended_learning_path || []).map((step, i) => (
                  <div key={i} className="learning-step">
                    <div className="step-connector">
                      <div className="step-dot"></div>
                      {i < result.recommended_learning_path.length - 1 && <div className="step-line"></div>}
                    </div>
                    <div className="step-content">
                      <div className="step-header">
                        <h4>{step.topic}</h4>
                        {step.priority && (
                          <span className={`priority-badge ${step.priority.toLowerCase()}`}>
                            {step.priority} Priority
                          </span>
                        )}
                      </div>
                      <p className="step-reason">{step.reason}</p>
                      
                      {step.time_investment && (
                        <div className="time-investment">
                          ⏱️ Time investment: {step.time_investment}
                        </div>
                      )}

                      {Array.isArray(step.suggested_resources) && step.suggested_resources.length > 0 && (
                        <div className="step-section">
                          <h5>📚 Learning Resources:</h5>
                          <div className="step-resources">
                            {step.suggested_resources.map((resource, j) => (
                              <span key={j} className="resource-item">
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {Array.isArray(step.experience_opportunities) && step.experience_opportunities.length > 0 && (
                        <div className="step-section">
                          <h5>🚀 Gain Experience Through:</h5>
                          <div className="experience-opportunities">
                            {step.experience_opportunities.map((opportunity, j) => (
                              <div key={j} className="opportunity-item">
                                <span className="opportunity-icon">💼</span>
                                <span className="opportunity-text">{opportunity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Level & Next Steps */}
            {(result.current_level || result.next_career_steps) && (
              <div className="career-insights-section">
                <h3>Career Insights</h3>
                <div className="career-info">
                  {result.current_level && (
                    <div className="current-level">
                      <span className="level-label">Current Level:</span>
                      <span className="level-badge">{result.current_level}</span>
                    </div>
                  )}
                  {result.next_career_steps && result.next_career_steps.length > 0 && (
                    <div className="next-steps">
                      <h4>Recommended Next Positions:</h4>
                      <div className="next-steps-grid">
                        {result.next_career_steps.map((step, i) => (
                          <div key={i} className="next-step-card">
                            <span className="step-icon">🎯</span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Career Readiness & Immediate Actions */}
            {result.career_readiness && (
              <div className="career-readiness-section">
                <h3>Career Readiness Assessment</h3>
                <div className="readiness-status">
                  <span className={`readiness-badge ${result.career_readiness.toLowerCase().replace(/\s+/g, '-')}`}>
                    {result.career_readiness}
                  </span>
                </div>
              </div>
            )}

            {/* Immediate Actions */}
            {result.immediate_actions && result.immediate_actions.length > 0 && (
              <div className="immediate-actions-section">
                <h3>🚀 Your Action Plan</h3>
                <div className="actions-list">
                  {result.immediate_actions.map((action, i) => (
                    <div key={i} className="action-item">
                      <div className="action-header">
                        <span className="action-title">{action.action}</span>
                        <span className={`timeline-badge ${action.timeline?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {action.timeline}
                        </span>
                      </div>
                      <p className="action-impact">{action.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Optimization */}
            {result.resume_optimization && result.resume_optimization.length > 0 && (
              <div className="resume-optimization-section">
                <h3>📝 Resume Optimization</h3>
                <div className="optimization-list">
                  {result.resume_optimization.map((opt, i) => (
                    <div key={i} className="optimization-item">
                      <div className="opt-section">{opt.section}</div>
                      <div className="opt-suggestion">{opt.suggestion}</div>
                      <div className="opt-reason">{opt.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Field-Specific Advice */}
            {result.field_specific_advice && (
              <div className="field-advice-section">
                <h3>{fieldName ? `${fieldName} Field Advice` : 'Career Advice'}</h3>
                <div className="field-advice-content">
                  <div className="advice-icon">💼</div>
                  <p>{result.field_specific_advice}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="fallback-result">
            <strong>AI Feedback:</strong>
            <div>{String(result)}</div>
          </div>
        )
      ) : (
        <div className="no-result">No analysis result found.</div>
      )}

      <button className="analyze-again-btn" onClick={() => navigate('/resume', { state: { resumeText, selectedField, fieldName } })}>
        Update Resume
      </button>
    </div>
  );
}

export default Analysis;
