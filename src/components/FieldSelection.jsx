// Import React and the useState hook from the React library
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import external CSS file for styling this component
import '../css/FieldSelection.css';  

// Define the FieldSelection component (a function component)
const FieldSelection = () => {
  // Create state variable `selectedField` with default value '' (empty string).
  // `setSelectedField` is the function used to update it.
  const [selectedField, setSelectedField] = useState('');
  const navigate = useNavigate();

  // Define an array of objects, each representing a career field with an id, name, emoji icon, and color
  const fields = [
    { id: 'tech', name: 'Technology', icon: '💻', color: '#3b82f6' },
    { id: 'design', name: 'Design', icon: '🎨', color: '#ef4444' },
    { id: 'marketing', name: 'Marketing', icon: '📈', color: '#10b981' },
    { id: 'finance', name: 'Finance', icon: '💰', color: '#f59e0b' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#8b5cf6' },
    { id: 'education', name: 'Education', icon: '📚', color: '#06b6d4' },
    { id: 'business', name: 'Business', icon: '💼', color: '#64748b' },
    { id: 'creative', name: 'Creative Arts', icon: '🎭', color: '#ec4899' }
  ];

  // Component’s return (the UI that will be rendered)
  return (
    <div className="field-selection">  
      {/* Section title */}
      <h2>What field do you want to work in?</h2>  

      {/* Subtitle text */}
      <p>Choose the area that interests you most to get personalized recommendations</p>  

      {/* Grid container for all fields */}
      <div className="field-grid">  
        {/* Loop over the fields array and render a card for each field */}
        {fields.map((field) => (
          <div
            key={field.id}  // Unique key required for React list rendering
            className={`field-card ${selectedField === field.id ? 'selected' : ''}`}  
            // If this field is selected, add the 'selected' CSS class

            // When a card is clicked, update `selectedField` with the field’s id
            onClick={() => setSelectedField(field.id)}  

            // Inline styles for selected state:
            // - border color matches field color when selected
            // - background color is a transparent shade of the field’s color
            style={{
              borderColor: selectedField === field.id ? field.color : undefined,
              backgroundColor: selectedField === field.id ? `${field.color}10` : undefined
            }}
          >
            {/* Display the emoji icon */}
            <div className="field-icon">{field.icon}</div>  

            {/* Display the field name, colored if selected */}
            <h3
              className="field-name"
              style={{ color: selectedField === field.id ? field.color : undefined }}
            >
              {field.name}
            </h3>
          </div>
        ))}
      </div>

      {/* If a field is selected, show the "Get Started" button */}
      {selectedField && (
        <div className="get-started">
          <button
            // Button color matches the color of the selected field
            style={{
              backgroundColor: fields.find(f => f.id === selectedField)?.color || '#3b82f6'
            }}
            onClick={() => navigate('/resume', { 
              state: { 
                selectedField: selectedField,
                fieldName: fields.find(f => f.id === selectedField)?.name 
              } 
            })}
          >
            {/* Button text includes the selected field name */}
            Get Started in {fields.find(f => f.id === selectedField)?.name}
          </button>
        </div>
      )}
    </div>
  );
};

// Export this component so it can be imported and used in other files
export default FieldSelection;
