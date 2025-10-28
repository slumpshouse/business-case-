import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Apply.css';

function Apply() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resumeFile: null
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resumeFile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="apply-container">
        <div className="apply-card">
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>
          <h2 className="success-title">Application Submitted Successfully!</h2>
          <p className="success-message">
            Thank you for your application. We've received your information and will review it shortly. 
            You can expect to hear back from us within 3-5 business days.
          </p>
          <div className="success-actions">
            <button 
              className="btn primary"
              onClick={() => navigate('/jobs')}
            >
              Back to Jobs
            </button>
            <button 
              className="btn secondary"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  experience: '',
                  coverLetter: '',
                  resumeFile: null
                });
              }}
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-container">
      <div className="apply-card">
        <div className="apply-header">
          <h1 className="apply-title">Apply for Position</h1>
          <p className="apply-subtitle">
            Join our team and take your career to the next level
          </p>
        </div>

        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Experience Level</h3>
            
            <div className="form-group">
              <label htmlFor="experience">Years of Experience *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-3">2-3 years (Junior)</option>
                <option value="4-6">4-6 years (Mid-Level)</option>
                <option value="7-10">7-10 years (Senior)</option>
                <option value="10+">10+ years (Lead/Principal)</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>
            
            <div className="form-group">
              <label htmlFor="resumeFile">Upload Resume</label>
              <input
                type="file"
                id="resumeFile"
                name="resumeFile"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="file-input"
              />
              <div className="file-hint">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="6"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn secondary"
              onClick={() => navigate('/jobs')}
            >
              Back
            </button>
            <button 
              type="submit" 
              className={`btn primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Apply;