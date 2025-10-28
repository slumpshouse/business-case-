import FieldSelection from '../components/FieldSelection';
import ProgressTracking from '../components/ProgressTracking';
import '../css/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Career 
            <span className="hero-gradient">Journey</span>
          </h1>
          <p className="hero-subtitle">
            Unlock your potential with AI-powered resume analysis and personalized career guidance
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <span>Smart Analysis</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <span>Career Growth</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💼</div>
              <span>Job Matching</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="home-content">
        <div className="content-section">
          <FieldSelection />
        </div>
        <div className="content-section">
          <ProgressTracking />
        </div>
      </div>
    </div>
  );
}

export default Home;