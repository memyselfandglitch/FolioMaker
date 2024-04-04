import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import { jsPDF } from "jspdf";


function App() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [workExperiences, setWorkExperiences] = useState([{ title: '', description: '' }]);
  const [projects, setProjects] = useState([{ title: '', description: '', link: '' }]);

  const handleAddWorkExperience = () => {
    setWorkExperiences([...workExperiences, { title: '', description: '' }]);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', description: '', link: '' }]);
  };

  const handleGeneratePortfolio = () => {
    console.log('Generating PDF');
    const doc = new jsPDF();
    const margin = 20; // Define a margin for content
  
    // Set font and colors
    doc.setFont("helvetica"); // Example font (adjust based on preference)
    const textColor = '#333333'; // Black for content
    const headingColor = '#666666'; // Gray for headings
  
    // Get content
    let workExperienceContent = ""; 
    for (const item of workExperiences) {
      workExperienceContent+=`\n Job Title: ${item.title}\n Description: ${item.description}\n`
    }
  
    const projectItems = document.querySelectorAll('.project-entry');
    let projectContent = "";
    for (const item of projects) {
      projectContent += `\n Project Title: ${item.title}\n Description: ${item.description}\n`;
      if (item.link) {
        projectContent += `Project Link: ${item.link}\n`; // Add link if provided
      }
    }
  
    // Add name, title, and description with positioning
    doc.setFontSize(16);
    doc.setTextColor(headingColor);
    doc.text("Name:", margin, margin + 10);
    doc.setTextColor(textColor);
    doc.text(name, margin + 30, margin + 10);
  
    doc.setFontSize(14);
    doc.setTextColor(headingColor);
    doc.text("Title:", margin, margin + 20);
    doc.setTextColor(textColor);
    if (title) { // Check if title exists
      doc.text(title, margin + 30, margin + 20);
    }
  
    doc.text(description, margin, margin + 30);
  
    // Add a line separator
    doc.setLineWidth(0.5); // Adjust line width
    doc.setDrawColor('#cccccc'); // Gray for line
    doc.line(margin, margin + 40, doc.internal.pageSize.getWidth() - margin, margin + 40);
  
    // Work experience section
    doc.setFontSize(14);
    doc.setTextColor(headingColor);
    doc.text("Work Experience:", margin, margin + 45);
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text(workExperienceContent, margin + 10, margin + 50); // Add indentation
  
    // Projects section

    doc.setFontSize(14);
    doc.setTextColor(headingColor);
    doc.text("Projects:", margin,margin+ 120);
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text(projectContent, margin + 10, margin+125); 
    console.log(projectContent);
    doc.save('portfolio.pdf');
  };
  

  return (
    <div className="App">
      <h1>Create Your Portfolio</h1>
      <form id="portfolio-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="title">Job Title (Optional):</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Bio (Short Description):</label>
          <textarea id="description" name="description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <h2>Work Experience</h2>
        <div className="work-experience-section">
          {workExperiences.map((experience, index) => (
            <div key={index} className="work-experience-item">
              <label htmlFor="work-experience-title">Job Title:</label>
              <input type="text" id="work-experience-title" name="work-experience-title[]" value={experience.title} onChange={(e) => {
                const updatedWorkExperiences = [...workExperiences];
                updatedWorkExperiences[index].title = e.target.value;
                setWorkExperiences(updatedWorkExperiences);
              }} required />
              <label htmlFor="work-experience-description">Job Description:</label>
              <textarea id="work-experience-description" name="work-experience-description[]" rows="3" value={experience.description} onChange={(e) => {
                const updatedWorkExperiences = [...workExperiences];
                updatedWorkExperiences[index].description = e.target.value;
                setWorkExperiences(updatedWorkExperiences);
              }} required></textarea>
            </div>
          ))}
          <button type="button" className="add-work-experience" onClick={handleAddWorkExperience}>Add Another Work Experience</button>
        </div>
        <h2>Project Information</h2>
        <div className="project-section">
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <label htmlFor="project-title">Project Title:</label>
              <input type="text" id="project-title" name="project-title[]" value={project.title} onChange={(e) => {
                const updatedProjects = [...projects];
                updatedProjects[index].title = e.target.value;
                setProjects(updatedProjects);
              }} required />
              <label htmlFor="project-description">Project Description:</label>
              <textarea id="project-description" name="project-description[]" rows="3" value={project.description} onChange={(e) => {
                const updatedProjects = [...projects];
                updatedProjects[index].description = e.target.value;
                setProjects(updatedProjects);
              }} required></textarea>
              <label htmlFor="project-link">Project Link (Optional):</label>
              <input type="url" id="project-link" name="project-link[]" value={project.link} onChange={(e) => {
                const updatedProjects = [...projects];
                updatedProjects[index].link = e.target.value;
                setProjects(updatedProjects);
              }} />
            </div>
          ))}
          <button type="button" className="add-project" onClick={handleAddProject}>Add Another Project</button>
        </div>
        <button type="button" className='generate-pdf' onClick={handleGeneratePortfolio}>Generate Portfolio</button>
      </form>
    </div>
  );
}

export default App;
