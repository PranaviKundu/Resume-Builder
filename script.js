document.addEventListener('DOMContentLoaded', () => {
    // Add Education
    const addEducationBtn = document.getElementById('addEducation');
    addEducationBtn.addEventListener('click', () => {
        const educationSection = document.querySelector('.input-section:nth-child(2)');
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = `
            <input type="text" placeholder="Degree">
            <input type="text" placeholder="Institution">
            <input type="text" placeholder="Graduation Date">
        `;
        educationSection.insertBefore(newEntry, addEducationBtn);
    });

    // Add Skill
    const addSkillBtn = document.getElementById('addSkill');
    const skillInput = document.getElementById('skillInput');
    const skillList = document.getElementById('skillList');
    addSkillBtn.addEventListener('click', () => {
        if (skillInput.value.trim()) {
            const skillTag = document.createElement('span');
            skillTag.textContent = skillInput.value;
            skillList.appendChild(skillTag);
            skillInput.value = '';
        }
    });

    // Add Experience
    const addExperienceBtn = document.getElementById('addExperience');
    addExperienceBtn.addEventListener('click', () => {
        const experienceSection = document.querySelector('.input-section:nth-child(4)');
        const newEntry = document.createElement('div');
        newEntry.classList.add('experience-entry');
        newEntry.innerHTML = `
            <input type="text" placeholder="Job Title">
            <input type="text" placeholder="Company">
            <textarea placeholder="Description"></textarea>
        `;
        experienceSection.insertBefore(newEntry, addExperienceBtn);
    });

    // Preview Resume
    const previewBtn = document.getElementById('previewBtn');
    const resumePreview = document.getElementById('resumePreview');
    const resumeContent = document.getElementById('resumeContent');
    const downloadBtn = document.getElementById('downloadBtn');

    previewBtn.addEventListener('click', () => {
        // Gather input data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const educationEntries = document.querySelectorAll('.education-entry');
        const educationDetails = Array.from(educationEntries).map(entry => {
            const degree = entry.children[0].value;
            const institution = entry.children[1].value;
            const date = entry.children[2].value;
            return `<p><strong>${degree}</strong> - ${institution} (${date})</p>`;
        });

        const skills = Array.from(skillList.children).map(skill => skill.textContent);

        const experienceEntries = document.querySelectorAll('.experience-entry');
        const experienceDetails = Array.from(experienceEntries).map(entry => {
            const title = entry.children[0].value;
            const company = entry.children[1].value;
            const description = entry.children[2].value;
            return `<p><strong>${title}</strong> at ${company}<br>${description}</p>`;
        });

        // Generate Resume Content
        resumeContent.innerHTML = `
            <h3>${name}</h3>
            <p>Email: ${email}<br>Phone: ${phone}</p>
            <h4>Education</h4>
            ${educationDetails.join('')}
            <h4>Skills</h4>
            <p>${skills.join(', ')}</p>
            <h4>Experience</h4>
            ${experienceDetails.join('')}
        `;

        // Show preview and download button
        resumePreview.classList.remove('hidden');
        downloadBtn.classList.remove('hidden');
    });

    // Download PDF
    downloadBtn.addEventListener('click', () => {
        const resumeHTML = resumeContent.innerHTML;
        const blob = new Blob([resumeHTML], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    });
});
