import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export const generateCertificatePDF = async ({
  studentName,
  courseTitle,
  certificateId,
}) => {
  const templatePath = path.join(
    process.cwd(),
    "server",
    "Static",
    "certificate.html"
  );

  let html = fs.readFileSync(templatePath, "utf8");

  html = html
    .replace("{{STUDENT_NAME}}", studentName)
    .replace("{{CERTIFICATE_ID}}", certificateId)
    .replace(
      "{{VERIFY_URL}}",
      `https://www.learningmanagement.com/verify:${certificateId}`
    )
    .replace("{{COURSE_TITLE}}", courseTitle);
  const outputDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const pdfPath = path.join(outputDir, `certificate-${certificateId}.pdf`);

  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: pdfPath,
    width: "800px",
    height: "560px",
    printBackground: true,
  });

  await browser.close();

  return pdfPath;
};
