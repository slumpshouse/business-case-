import React from 'react';
import '../css/Buttons.css';

export default function Buttons({ resumeText = "", onAnalyze, loading }) {
	return (
		<div className="buttons-root">
			<button
				className="btn primary"
				disabled={!resumeText.trim() || loading}
				onClick={onAnalyze}
			>
				{loading ? "Analyzing..." : "Analyze"}
			</button>
			<button className="btn secondary" disabled={loading}>Clear</button>
		</div>
	);
}
