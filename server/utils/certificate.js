// take the pramerterstudentName: user.name,courseTitle certificateId, mofidy in the html where user can sowad teh ceritificate

const generateCertificateHTML = ({
  studentName,
  courseTitle,
  certificateId,
}) => {
  const templatePath = path.join(
    process.cwd(),
    "server",
    "Static",
    "certificate.html",
  );

  let html = fs.readFileSync(templatePath, "utf8");

  html = html
    .replace("{{STUDENT_NAME}}", studentName)
    .replace("{{CERTIFICATE_ID}}", certificateId)
    .replace(
      "{{VERIFY_URL}}",
      `https://www.learningmanagement.com/verify:${certificateId}`,
    )
    .replace("{{COURSE_TITLE}}", courseTitle);
  return html;
};

// function to call the generateCertificateHTML function as a promise
const generateCertificateHTMLPomise = ({
  studentName,
  courseTitle,
  certificateId,
}) => {
  return new Promise((resolve, reject) => {
    try {
      const html = generateCertificateHTML({
        studentName,
        courseTitle,
        certificateId,
      });
      resolve(html);
    } catch (error) {
      reject(error);
    }
  });
};

export default generateCertificateHTMLPomise;
