document.addEventListener("DOMContentLoaded", () => {
  // Başlangıç: Statik Alanlar
  const inputLimits = {
    "name": 30,
    "title": 20,
    "phone-number": 11,
    "email": 50,
    "website": 50,
    "address": 100,
    "education-infos": 150,
    "skill-infos": 150,
    "about-me": 200,
    "job-experience-text": 200
  };

  const allStaticInputs = document.querySelectorAll("input, textarea, select");
  allStaticInputs.forEach((el) => {
    const limit = inputLimits[el.id];
    if (!limit) return;

    // Statik alanlarda tooltip şeklinde gösterme
    el.addEventListener("focus", () => {
      const tooltip = document.createElement("div");
      tooltip.className = "static-tooltip";
      tooltip.textContent = `En fazla ${limit} karakter girebilirsiniz.`;
      el.insertAdjacentElement("afterend", tooltip);
      tooltip.style.display = "block";

      el.addEventListener("blur", () => {
        tooltip.remove();
      }, { once: true });
    });

    el.addEventListener("input", () => {
      if (el.value.length > limit) {
        el.value = el.value.slice(0, limit);
        const warnTooltip = document.createElement("div");
        warnTooltip.className = "static-tooltip warning";
        warnTooltip.textContent = `Karakter sınırını aştınız! (Max: ${limit})`;
        el.insertAdjacentElement("afterend", warnTooltip);
        setTimeout(() => {
          warnTooltip.remove();
        }, 2000);
      }
    });
  });
  // Bitiş: Statik Alanlar

  // Başlangıç: Statik Alanlar Devam (Ad, İletişim vb.)
  const nameInput = document.getElementById("name");
  const titleInput = document.getElementById("title");
  const displayName = document.getElementById("display-name");
  const displayTitle = document.getElementById("display-title");
  const defaultNameText = "{ Kişinin Adı ve Soyadı }";
  const defaultTitleText = "{ Ünvanı }";

  nameInput.addEventListener("input", () => {
    displayName.textContent = nameInput.value || defaultNameText;
  });
  titleInput.addEventListener("input", () => {
    displayTitle.textContent = titleInput.value || defaultTitleText;
  });

  const phoneInput = document.getElementById("phone-number");
  const emailInput = document.getElementById("email");
  const websiteInput = document.getElementById("website");
  const addressInput = document.getElementById("address");

  const displayPhone = document.getElementById("display-phone");
  const displayEmail = document.getElementById("display-email");
  const displayWebsite = document.getElementById("display-website");
  const displayAddress = document.getElementById("display-address");

  const defaultPhoneText = "Telefon: 123-456-7890";
  const defaultEmailText = "Email: example@example.com";
  const defaultWebsiteText = "Web Sitesi: www.example.com";
  const defaultAddressText = "Adres: Lorem Ipsum, Dolor Sit Amet";

  phoneInput.addEventListener("input", () => {
    displayPhone.textContent = phoneInput.value
      ? `Telefon: ${phoneInput.value}`
      : defaultPhoneText;
  });
  emailInput.addEventListener("input", () => {
    displayEmail.textContent = emailInput.value
      ? `Email: ${emailInput.value}`
      : defaultEmailText;
  });
  websiteInput.addEventListener("input", () => {
    displayWebsite.textContent = websiteInput.value
      ? `Web Sitesi: ${websiteInput.value}`
      : defaultWebsiteText;
  });
  addressInput.addEventListener("input", () => {
    displayAddress.textContent = addressInput.value
      ? `Adres: ${addressInput.value}`
      : defaultAddressText;
  });

  const educationInfosInput = document.getElementById("education-infos");
  const displayEducationInfos = document.getElementById("display-education-infos");
  const schoolNumbersSelect = document.getElementById("school-numbers");
  const schoolInputsContainer = document.getElementById("school-inputs-container");
  const schoolList = document.getElementById("school-list");

  const defaultEducationInfosText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem in itaque veritatis porro, nihil expedita...";

  educationInfosInput.addEventListener("input", () => {
    displayEducationInfos.querySelector("p").textContent =
      educationInfosInput.value || defaultEducationInfosText;
  });

  const skillInfosInput = document.getElementById("skill-infos");
  const displaySkillInfos = document.getElementById("display-skill-infos");
  const skillNumbersSelect = document.getElementById("skill-numbers");
  const skillInputsContainer = document.getElementById("skill-inputs-container");
  const skillList = document.getElementById("skill-list");

  skillInfosInput.addEventListener("input", () => {
    displaySkillInfos.textContent =
      skillInfosInput.value ||
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero id eveniet...";
  });
  // Bitiş: Statik Alanlar Devam (Ad, İletişim vb.)

  // Başlangıç: Dinamik Alanlar için (Okul ve Yetenek) Tooltip Ekleme
  function applyCharLimitDynamic(element, limit) {
    let reminder = null;

    element.addEventListener("focus", () => {
      if (!reminder) {
        reminder = document.createElement("small");
        reminder.classList.add("char-limit-hint");
        reminder.textContent = `En fazla ${limit} karakter girebilirsiniz.`;
        element.insertAdjacentElement("afterend", reminder);
      }
      reminder.style.display = "block";
    });

    element.addEventListener("blur", () => {
      if (reminder) {
        reminder.style.display = "none";
      }
    });

    element.addEventListener("input", () => {
      if (element.value.length > limit) {
        element.value = element.value.slice(0, limit);
        alert(`Karakter sınırını aştınız! (Max: ${limit})`);
      }
    });
  }
  // Bitiş: Dinamik Alanlar için (Okul ve Yetenek) Tooltip Ekleme

  // Başlangıç: Dinamik Okul Alanları
  schoolNumbersSelect.addEventListener("change", () => {
    const numberOfSchools = parseInt(schoolNumbersSelect.value);
    schoolInputsContainer.innerHTML = "";

    for (let i = 1; i <= numberOfSchools; i++) {
      const entryDiv = document.createElement("div");
      entryDiv.className = "school-entry";

      const field1 = document.createElement("div");
      field1.className = "school-field";

      const label1 = document.createElement("label");
      label1.textContent = `${i}. Okul:`;
      field1.appendChild(label1);

      const inputSchool = document.createElement("input");
      inputSchool.type = "text";
      inputSchool.id = `school-${i}`;
      inputSchool.name = `school-${i}`;
      inputSchool.addEventListener("input", updateSchoolDisplay);
      applyCharLimitDynamic(inputSchool, 50);
      field1.appendChild(inputSchool);

      const field2 = document.createElement("div");
      field2.className = "school-field";

      const label2 = document.createElement("label");
      label2.textContent = "Açıklama:";
      field2.appendChild(label2);

      const inputDesc = document.createElement("input");
      inputDesc.type = "text";
      inputDesc.id = `description-${i}`;
      inputDesc.name = `description-${i}`;
      inputDesc.addEventListener("input", updateSchoolDisplay);
      applyCharLimitDynamic(inputDesc, 100);
      field2.appendChild(inputDesc);

      entryDiv.appendChild(field1);
      entryDiv.appendChild(field2);
      schoolInputsContainer.appendChild(entryDiv);
    }
  });

  function updateSchoolDisplay() {
    const schoolEntries = document.querySelectorAll(".school-entry");
    schoolList.innerHTML = "";

    schoolEntries.forEach((entry, index) => {
      const sInput = entry.querySelector(`input[name="school-${index + 1}"]`);
      const dInput = entry.querySelector(`input[name="description-${index + 1}"]`);
      if (sInput && dInput) {
        const li = document.createElement("li");
        li.textContent = `${sInput.value || ""} - ${dInput.value || ""}`;
        schoolList.appendChild(li);
      }
    });
  }
  // Bitiş: Dinamik Okul Alanları

  // Başlangıç: Dinamik Yetenek Alanları
  skillNumbersSelect.addEventListener("change", () => {
    const numberOfSkills = parseInt(skillNumbersSelect.value);
    skillInputsContainer.innerHTML = "";

    for (let i = 1; i <= numberOfSkills; i++) {
      const skillDiv = document.createElement("div");
      skillDiv.className = "school-entry"; // Aynı stil kullanıyoruz

      const field1 = document.createElement("div");
      field1.className = "school-field";

      const skillLabel = document.createElement("label");
      skillLabel.textContent = `${i}. Yetenek:`;
      field1.appendChild(skillLabel);

      const skillInput = document.createElement("input");
      skillInput.type = "text";
      skillInput.id = `skill-${i}`;
      skillInput.name = `skill-${i}`;
      skillInput.addEventListener("input", updateSkillDisplay);
      applyCharLimitDynamic(skillInput, 30);
      field1.appendChild(skillInput);

      const field2 = document.createElement("div");
      field2.className = "school-field";

      const descLabel = document.createElement("label");
      descLabel.textContent = "Açıklama:";
      field2.appendChild(descLabel);

      const descSelect = document.createElement("select");
      descSelect.id = `skill-description-${i}`;
      descSelect.name = `skill-description-${i}`;
      const options = ["Seçiniz", "Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"];
      options.forEach((val, idx) => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = val;
        if (idx === 0) {
          opt.disabled = true;
          opt.selected = true;
        }
        descSelect.appendChild(opt);
      });
      descSelect.addEventListener("change", updateSkillDisplay);
      field2.appendChild(descSelect);

      skillDiv.appendChild(field1);
      skillDiv.appendChild(field2);
      skillInputsContainer.appendChild(skillDiv);
    }
  });

  function updateSkillDisplay() {
    const skillEntries = document.querySelectorAll(".school-entry");
    let output = "";
    skillEntries.forEach((entry, idx) => {
      const skillInput = entry.querySelector(`input[name="skill-${idx + 1}"]`);
      const descSelect = entry.querySelector(`select[name="skill-description-${idx + 1}"]`);
      if (skillInput && descSelect) {
        const skillVal = skillInput.value || "";
        const descVal = descSelect.value || "";
        if (descVal === "Seçiniz") {
          output += `<li>${skillVal}</li>`;
        } else {
          output += `<li>${skillVal} - ${descVal}</li>`;
        }
      }
    });
    skillList.innerHTML = output;
  }
  // Bitiş: Dinamik Yetenek Alanları

  // Başlangıç: Hakkımda
  const aboutMeInput = document.getElementById("about-me");
  const displayAboutMe = document.querySelector(".about-me-container p");
  const defaultAboutMeText =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima illum...";

  aboutMeInput.addEventListener("input", () => {
    displayAboutMe.textContent = aboutMeInput.value || defaultAboutMeText;
  });
  // Bitiş: Hakkımda

  // Başlangıç: İş Deneyimi
  const jobExperienceInput = document.getElementById("job-experience-text");
  const displayJobExperience = document.querySelector(".work-experience-container p");
  const defaultJobExperienceText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci perspiciatis...";

  jobExperienceInput.addEventListener("input", () => {
    displayJobExperience.textContent =
      jobExperienceInput.value || defaultJobExperienceText;
  });
  // Bitiş: İş Deneyimi

  // Başlangıç: Renk, Fotoğraf, Yazı Ayarları
  const backgroundColorInput = document.getElementById("background-color");
  const leftColumnColorInput = document.getElementById("left-column-colour");
  const nameBoxColorInput = document.getElementById("name-box-colour");
  const nameBoxTextColorInput = document.getElementById("name-box-text-colour");
  const fontTypeSelect = document.getElementById("font-type");
  const photoFrameShapeSelect = document.getElementById("photo-frame-shape");

  const cvShowContainer = document.querySelector(".cv-show-container");
  const leftColumn = document.querySelector(".left-column");
  const rightColumn = document.querySelector(".right-column");
  const userHeader = document.querySelector(".user-header");
  const photo = document.querySelector(".photo");

  backgroundColorInput.addEventListener("input", () => {
    cvShowContainer.style.backgroundColor = backgroundColorInput.value;
    rightColumn.style.backgroundColor = backgroundColorInput.value;
  });
  leftColumnColorInput.addEventListener("input", () => {
    leftColumn.style.backgroundColor = leftColumnColorInput.value;
  });
  nameBoxColorInput.addEventListener("input", () => {
    userHeader.style.backgroundColor = nameBoxColorInput.value;
  });
  nameBoxTextColorInput.addEventListener("input", () => {
    displayName.style.color = nameBoxTextColorInput.value;
    displayTitle.style.color = nameBoxTextColorInput.value;
  });
  fontTypeSelect.addEventListener("change", () => {
    cvShowContainer.style.fontFamily = fontTypeSelect.value;
  });
  photoFrameShapeSelect.addEventListener("change", () => {
    switch (photoFrameShapeSelect.value) {
      case "square":
        photo.style.borderRadius = "0";
        photo.style.borderWidth = "4px";
        break;
      case "oval":
        photo.style.borderRadius = "50%";
        photo.style.borderWidth = "4px";
        break;
      case "rounded":
        photo.style.borderRadius = "15px";
        photo.style.borderWidth = "4px";
        break;
      default:
        photo.style.borderRadius = "50%";
        photo.style.borderWidth = "2px";
    }
  });
  // Bitiş: Renk, Fotoğraf, Yazı Ayarları

  // Başlangıç: Çizgi Rengi/Şekli
  const lineShapeSelect = document.getElementById("line-shape");
  const lineColorInput = document.getElementById("line-colour");

  lineShapeSelect.addEventListener("change", updateLineStyles);
  lineColorInput.addEventListener("input", updateLineStyles);

  function updateLineStyles() {
    const lineColor = lineColorInput.value;
    const lineShape = lineShapeSelect.value;
    const lines = document.querySelectorAll(".cv-line");

    if (!lineShape) {
      lines.forEach((line) => {
        line.style.borderTop = `1px solid ${lineColor}`;
        line.style.margin = "10px 0";
      });
      return;
    }
    lines.forEach((line) => {
      line.style.borderTop = `2px ${lineShape} ${lineColor}`;
      line.style.margin = "10px 0";
    });
  }
  // Bitiş: Çizgi Rengi/Şekli

  // Başlangıç: Sayfa Varsayılanları
  updateLineStyles();
  cvShowContainer.style.backgroundColor = backgroundColorInput.value;
  rightColumn.style.backgroundColor = backgroundColorInput.value;
  leftColumn.style.backgroundColor = leftColumnColorInput.value;
  userHeader.style.backgroundColor = nameBoxColorInput.value;
  displayName.style.color = nameBoxTextColorInput.value;
  displayTitle.style.color = nameBoxTextColorInput.value;
  cvShowContainer.style.fontFamily = fontTypeSelect.value;
  photo.style.borderRadius = "50%";
  photo.style.borderWidth = "2px";
  // Bitiş: Sayfa Varsayılanları
});
