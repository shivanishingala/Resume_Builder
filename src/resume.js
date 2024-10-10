import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jobTitle: "",
    company: "",
    startDate: "",
    // endDate: '',
    responsibilities: [],
    programmingSkills: "",
    frameworks: "",
    databases: "",
    tools: "",
    degree: "",
    institution: "",
    location: "",
    years: "",
    projectName: "",
    projectDescription: "",
    technologiesUsed: [],
    languages: [],
  });
  const [color, setColor] = useState('#787FCE'); // Default color

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setColor(e.target.value);
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        languages: [...prevData.languages, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        languages: prevData.languages.filter((lang) => lang !== value),
      }));
    }
  };

  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
   }

  const generatePDF = () => {
    const doc = new jsPDF();
    const [r, g, b] = hexToRgb(color);

    const boxX = 0;
    const boxY = 13;
    const boxWidth = 15;
    const boxHeight = 15;
    doc.setFillColor(r, g, b);
    doc.rect(boxX, boxY, boxWidth, boxHeight, "F");

    const pageWidth = doc.internal.pageSize.getWidth();
    const lineHeight = 0.5; 
    const rightMargin = 90;
    doc.setFontSize(30);
    doc.setFont("Helvetica", "bold");
    doc.text(formData.name, 24, 24);
    doc.setDrawColor(r,g,b);    doc.setLineWidth(0.7);
    doc.line(pageWidth - rightMargin, 37, pageWidth - rightMargin - 100, 37);

    const leftMargin = 85;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`${formData.phone}`, 144, 18);
    doc.text(`${formData.email}`, 144, 26);
    doc.setDrawColor(r,g,b);
    doc.setLineWidth(5);
    doc.line(leftMargin + 120, 37, leftMargin + 50, 37);

let currentYPosition = 48; 

doc.setFontSize(15);
doc.setFont("Helvetica", "bold");
doc.text("EXPERIENCE", 22, currentYPosition);
currentYPosition += 10;
doc.setFontSize(12);
doc.setFont("Helvetica", "bold");
doc.text(`${formData.jobTitle},`, 22, currentYPosition);
doc.text(`${formData.company}`, 65, currentYPosition);

currentYPosition += 8;
const formatDate = (dateStr) => {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const startDate = formatDate(formData.startDate);

doc.setFontSize(12);
doc.setFont("Helvetica", "bold");
doc.text(`${startDate} - Present`, 22, currentYPosition);

currentYPosition += 12 * lineHeight; 

doc.setFontSize(12);
doc.setFont("Helvetica", "normal");

const mxTextWidth = 105; 

const responsibilitiesLines = doc.splitTextToSize(formData.responsibilities, mxTextWidth);
responsibilitiesLines.forEach((line) => {
  doc.text(line, 23, currentYPosition);
  currentYPosition += 12 * lineHeight; 
});
currentYPosition += 5;
doc.setDrawColor(r,g,b);
doc.setLineWidth(0.5);
doc.line(22, currentYPosition, 120, currentYPosition); 
currentYPosition += 10;

doc.setFontSize(18);
doc.setFont("Helvetica", "bold");
doc.text("PROJECTS", 23, currentYPosition); 

currentYPosition += 10; 

doc.setFontSize(12);
doc.setFont("Helvetica", "bold");
const splitData = formData.technologiesUsed.split(",");
doc.text(`${formData.projectName}: ( ${splitData.join(" | ")} )`, 23, currentYPosition);

currentYPosition += 6;

doc.setFontSize(12);
doc.setFont("Helvetica", "normal");
const maxDesWidth = 100;
const projectDescriptionLines = doc.splitTextToSize(formData.projectDescription, maxDesWidth);
projectDescriptionLines.forEach((line) => {
    doc.text(line, 23, currentYPosition);
    currentYPosition += 6; 
});


    doc.setFontSize(15);
    doc.setFont("Helvetica", "bold");
    doc.text("SKILLS", 144, 50);


     currentYPosition = 58; 
      
    

    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("• Programming :-", 142, currentYPosition );
    
    currentYPosition += 12 * lineHeight;
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "normal");
    
    const maxTextWidth = 50;
    const programmingSkillsLines = doc.splitTextToSize(formData.programmingSkills, maxTextWidth);
    
    programmingSkillsLines.forEach((line) => {
        doc.text(line, 145, currentYPosition); 
        currentYPosition += 11 * lineHeight;
    });
    


     currentYPosition += 4;

    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("• Frameworks :-", 142, currentYPosition);
    
    currentYPosition += 10 * lineHeight;

    doc.setFontSize(11);
    doc.setFont("Helvetica", "normal");
    
    const maTextWidth = 50;

    const frameworksLines = doc.splitTextToSize(formData.frameworks, maTextWidth);
    
    frameworksLines.forEach((line) => {
        doc.text(line, 145, currentYPosition); 
        currentYPosition += 11 * lineHeight;
    });

currentYPosition += 4; 

doc.setFontSize(12);
doc.setFont("Helvetica", "bold");
doc.text("• Database :-", 142, currentYPosition);

currentYPosition += 10 * lineHeight; 

doc.setFontSize(11);
doc.setFont("Helvetica", "normal");

const databaseMaxWidth = 50; 
const databaseLines = doc.splitTextToSize(formData.databases, databaseMaxWidth); 

databaseLines.forEach((line) => {
    doc.text(line, 145, currentYPosition);
    currentYPosition += 11 * lineHeight;
});

currentYPosition += 4;

doc.setFontSize(12);
doc.setFont("Helvetica", "bold");
doc.text("• Tools/Platform :-", 142, currentYPosition);

currentYPosition += 10 * lineHeight; 


doc.setFontSize(11);
doc.setFont("Helvetica", "normal");

const toolsMaxWidth = 50; 
const toolsLines = doc.splitTextToSize(formData.tools, toolsMaxWidth);

toolsLines.forEach((line) => {
    doc.text(line, 145, currentYPosition); 
    currentYPosition += 11 * lineHeight;
});

currentYPosition += -11; 

    currentYPosition += 10; 
    
    doc.setDrawColor(r,g,b);
    doc.setLineWidth(0.5);   
    doc.line(135, currentYPosition, 205, currentYPosition);
    
    currentYPosition += 10;

    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text("EDUCATION", 144, currentYPosition);
    
    currentYPosition += 10;
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "bold");
    doc.text(`${formData.degree}`, 144, currentYPosition);
    currentYPosition += 5;
    doc.text(`${formData.institution}`, 144, currentYPosition);
    currentYPosition += 5;
    doc.text(`${formData.location} - ${formData.years}`, 144, currentYPosition);

    currentYPosition += 7; 
    
    doc.setDrawColor(r,g,b);
    doc.setLineWidth(0.5);
    doc.line(135, currentYPosition, 205, currentYPosition);

    currentYPosition += 8; 
    
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text("LANGUAGES", 144, currentYPosition);

    currentYPosition += 13 * lineHeight;
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "bold");
    
    formData.languages.forEach((language, index) => {
      doc.text(`${language}`, 144, currentYPosition);
      currentYPosition += 11 * lineHeight;
    });



    doc.save("resume.pdf");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();

    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Resume Builder
      </h2>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Personal Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Experience</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        /> */}
      </div>
      <textarea
        name="responsibilities"
        placeholder="Job Responsibilities"
        value={formData.responsibilities}
        onChange={handleChange}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full mb-6"
      />

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <textarea
          name="programmingSkills"
          placeholder="Programming Languages"
          value={formData.programmingSkills}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="frameworks"
          placeholder="Frameworks"
          value={formData.frameworks}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="databases"
          placeholder="Databases"
          value={formData.databases}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="tools"
          placeholder="Tools/Platforms"
          value={formData.tools}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Education</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="institution"
          placeholder="Institution Name"
          value={formData.institution}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="years"
          placeholder="Years Attended"
          value={formData.years}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Projects</h3>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="projectDescription"
          placeholder="Project Description"
          value={formData.projectDescription}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="technologiesUsed"
          placeholder="Technologies Used sprated by comma"
          value={formData.technologiesUsed}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Languages</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="languages"
            value="English"
            onChange={handleLanguageChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span>English</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="languages"
            value="Hindi"
            onChange={handleLanguageChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span>Hindi</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="languages"
            value="Spanish"
            onChange={handleLanguageChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span>Spanish</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="languages"
            value="French"
            onChange={handleLanguageChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span>French</span>
        </label>
        <div>
      <input
        type="color"
        value={color}
        onChange={handleChange}
        style={{ width: '100px', height: '40px', border: 'none', cursor: 'pointer' }} // Customize style if needed
      />
      {/* <p style={{ marginTop: '10px' }}>Selected Color: {color}</p> Display the selected color */}
    </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-6"
      >
        Submit
      </button>
    </form>
  );
};

export default ResumeForm;


