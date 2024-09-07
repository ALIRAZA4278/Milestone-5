const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
const profilePicturePreview = document.getElementById("profilePicturePreview") as HTMLImageElement;

type Education = {
  school: string;
  degree: string;
  field: string;
  years: string;
};

type WorkExperience = {
  company: string;
  jobTitle: string;
  years: string;
  description: string;
};

type Skill = {
  name: string;
  level: string;
};

let educations: Education[] = [];
let workExperiences: WorkExperience[] = [];
let skills: Skill[] = [];
let profilePictureURL: string | undefined = undefined;

const renderResume = () => {
  resumeOutput.innerHTML = `
    <div class="resume-container">
      <h2 class="resume-title">Resume</h2>
      
      <h3 class="section-title">Personal Information</h3>
      <div class="personal-info">
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">` : ""}
        <p><strong>Name:</strong> ${(<HTMLInputElement>document.getElementById("name")).value}</p>
        <p><strong>Email:</strong> ${(<HTMLInputElement>document.getElementById("email")).value}</p>
        <p><strong>Phone:</strong> ${(<HTMLInputElement>document.getElementById("phone")).value}</p>
      </div>

      <h3 class="section-title">Education</h3>
      <ul class="education-list">
        ${educations
          .map(
            (edu, index) => `
            <li class="education-item">
              ${edu.school} - ${edu.degree}, ${edu.field} (${edu.years})
              <button type="button" class="edit-btn" onclick="editEducation(${index})">Edit</button>
              <button type="button" class="delete-btn" onclick="deleteEducation(${index})">Delete</button>
            </li>
          `
          )
          .join('')}
      </ul>

      <h3 class="section-title">Skills</h3>
      <ul class="skills-list">
        ${skills
          .map(
            (skill, index) => `
            <li class="skills-item">
              ${skill.name} (${skill.level})
              <button type="button" class="delete-btn" onclick="deleteSkill(${index})">Delete</button>
            </li>
          `
          )
          .join('')}
      </ul>
      
      <h3 class="section-title">Work Experience</h3>
      <ul class="work-experience-list">
        ${workExperiences
          .map(
            (exp, index) => `
            <li class="work-experience-item">
              ${exp.company} - ${exp.jobTitle} (${exp.years})
              <br><span class="work-description">${exp.description}</span>
              <button type="button" class="edit-btn" onclick="editExperience(${index})">Edit</button>
              <button type="button" class="delete-btn" onclick="deleteExperience(${index})">Delete</button>
            </li>
          `
          )
          .join('')}
      </ul>
    </div>
  `;
};


document.getElementById("add-education")?.addEventListener("click", (e) => {
  e.preventDefault();
  const school = (document.getElementById("school") as HTMLInputElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const field = (document.getElementById("field") as HTMLInputElement).value;
  const years = (document.getElementById("years") as HTMLInputElement).value;

  if (school && degree && field && years) {
    educations.push({ school, degree, field, years });
    renderResume();
  }
});

document.getElementById("addExperience")?.addEventListener("click", (e) => {
  e.preventDefault();
  const company = (document.getElementById("company") as HTMLInputElement).value;
  const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
  const years = (document.getElementById("years") as HTMLInputElement).value;
  const description = (document.getElementById("jobDescription") as HTMLInputElement).value;

  if (company && jobTitle && years && description) {
    workExperiences.push({ company, jobTitle, years, description });
    renderResume();
  }
});

document.getElementById("add-Skills")?.addEventListener("click", (e) => {
  e.preventDefault();
  const name = (document.getElementById("text") as HTMLInputElement).value;
  const level = (document.getElementById("option") as HTMLSelectElement).value;

  if (name && level) {
    skills.push({ name, level });
    renderResume();
  }
});

resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderResume();
});


document.getElementById("printResume")?.addEventListener("click", () => {
  window.print();
});

profilePictureInput.addEventListener("change", (event) => {
  const file = profilePictureInput.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePictureURL = e.target?.result as string;
      profilePicturePreview.src = profilePictureURL;
      profilePicturePreview.style.display = "block"; 
    };
    reader.readAsDataURL(file);
  }
});


(window as any).editEducation = (index: number) => {
  const education = educations[index];
  (document.getElementById("school") as HTMLInputElement).value = education.school;
  (document.getElementById("degree") as HTMLInputElement).value = education.degree;
  (document.getElementById("field") as HTMLInputElement).value = education.field;
  (document.getElementById("years") as HTMLInputElement).value = education.years;

  educations.splice(index, 1); 
  renderResume();
};

(window as any).deleteEducation = (index: number) => {
  educations.splice(index, 1); 
  renderResume();
};


(window as any).editExperience = (index: number) => {
  const experience = workExperiences[index];
  (document.getElementById("company") as HTMLInputElement).value = experience.company;
  (document.getElementById("jobTitle") as HTMLInputElement).value = experience.jobTitle;
  (document.getElementById("years") as HTMLInputElement).value = experience.years;
  (document.getElementById("jobDescription") as HTMLInputElement).value = experience.description;

  workExperiences.splice(index, 1); 
  renderResume();
};

(window as any).deleteExperience = (index: number) => {
  workExperiences.splice(index, 1); 
  renderResume();
};


(window as any).deleteSkill = (index: number) => {
  skills.splice(index, 1);
  renderResume();
};
