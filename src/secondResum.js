import React, { useState } from 'react';
import jsPDF from 'jspdf';

const Resume = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    aboutMe: '',
    education: [{ degree: '', institution: '', year: '' }],
    workExperience: [{ title: '', company: '', date: '', description: '' }],
    expertise: '',
    languages: { english: false, french: false },
    references: [{ name: '', position: '', phone: '', email: '' }],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, languages: { ...formData.languages, [name]: checked } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();

    // Adding Personal Information to the PDF
    doc.text(`Name: ${formData.name}`, 10, 10);
    doc.text(`Title: ${formData.title}`, 10, 20);
    doc.text(`Phone: ${formData.phone}`, 10, 30);
    doc.text(`Email: ${formData.email}`, 10, 40);
    doc.text(`Website: ${formData.website}`, 10, 50);
    doc.text(`Address: ${formData.address}`, 10, 60);
    
    // Adding About Me to the PDF
    doc.text('About Me:', 10, 70);
    doc.text(formData.aboutMe, 10, 80);

    // Adding Education
    doc.text('Education:', 10, 100);
    formData.education.forEach((edu, index) => {
      doc.text(`${edu.degree} - ${edu.institution} (${edu.year})`, 10, 110 + (index * 10));
    });

    // Adding Work Experience
    doc.text('Work Experience:', 10, 140);
    formData.workExperience.forEach((exp, index) => {
      doc.text(`${exp.title} at ${exp.company} (${exp.date})`, 10, 150 + (index * 10));
      doc.text(exp.description, 10, 160 + (index * 10));
    });

    // Adding Expertise
    doc.text('Expertise:', 10, 200);
    doc.text(formData.expertise, 10, 210);

    // Adding Languages
    doc.text('Languages:', 10, 230);
    const languagesList = [];
    if (formData.languages.english) languagesList.push('English');
    if (formData.languages.french) languagesList.push('French');
    doc.text(languagesList.join(', '), 10, 240);

    // Adding References
    doc.text('References:', 10, 250);
    formData.references.forEach((ref, index) => {
      doc.text(`${ref.name} (${ref.position}) - ${ref.phone} | ${ref.email}`, 10, 260 + (index * 10));
    });

    // Save the PDF
    doc.save(`${formData.name}_resume.pdf`);
  };

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Job Title"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Phone Number"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Email"
          />
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Website"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Address"
          />
        </div>
      </div>

      {/* About Me */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <textarea
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="4"
          placeholder="Write something about yourself"
        ></textarea>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            type="text"
            name="degree"
            value={formData.education[0].degree}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Degree"
          />
          <input
            type="text"
            name="institution"
            value={formData.education[0].institution}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Institution"
          />
          <input
            type="text"
            name="year"
            value={formData.education[0].year}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Year"
          />
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        {formData.workExperience.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <input
              type="text"
              name="title"
              value={exp.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Job Title"
            />
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Company"
            />
            <input
              type="text"
              name="date"
              value={exp.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Date"
            />
            <textarea
              name="description"
              value={exp.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              rows="3"
              placeholder="Job Description"
            ></textarea>
          </div>
        ))}
      </div>

      {/* Expertise */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Expertise</h2>
        <textarea
          name="expertise"
          value={formData.expertise}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="3"
          placeholder="List your skills and expertise"
        ></textarea>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="english"
              checked={formData.languages.english}
              onChange={handleChange}
              className="mr-2"
            />
            English
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="french"
              checked={formData.languages.french}
              onChange={handleChange}
              className="mr-2"
            />
            French
          </label>
        </div>
      </div>

      {/* References */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">References</h2>
        {formData.references.map((ref, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={ref.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Reference Name"
            />
            <input
              type="text"
              name="position"
              value={ref.position}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Position"
            />
            <input
              type="text"
              name="phone"
              value={ref.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Phone"
            />
            <input
              type="email"
              name="email"
              value={ref.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Email"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold"
      >
        Generate PDF
      </button>
    </form>
  );
};

export default Resume;
