// Generates the blank "Future Caregiver Folder" template PDF in
// public/templates/.
//
// This is a BLANK template. It contains no personal data. Caregivers print or
// fill it in privately and never upload it. The structure is adapted from the
// ARC "Life After Death" Playbook (see the source note at the end). Edit the
// content here and run `npm run folder` to regenerate.
//
// Keep the copy plain, calm and general. No advice, no em-dashes.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(here, "..", "public", "templates");
const OUT_FILE = "future-caregiver-folder.pdf";

const INK = "#1f2933";
const CALM = "#2b5160";
const GREY = "#4b5563";
const LINE = "#c7dae3";

function newPageIfNeeded(doc, space) {
  const bottom = doc.page.height - doc.page.margins.bottom;
  if (doc.y + space > bottom) doc.addPage();
}

function left(doc) {
  return doc.page.margins.left;
}
function width(doc) {
  return doc.page.width - doc.page.margins.left - doc.page.margins.right;
}

function title(doc, text) {
  doc.fillColor(CALM).font("Helvetica-Bold").fontSize(20).text(text, { width: width(doc) });
  doc.moveDown(0.3);
}

function topic(doc, text) {
  newPageIfNeeded(doc, 60);
  doc.moveDown(0.4);
  doc.fillColor(CALM).font("Helvetica-Bold").fontSize(14).text(text, left(doc), doc.y, { width: width(doc) });
  doc.moveDown(0.3);
}

function subheading(doc, text) {
  newPageIfNeeded(doc, 40);
  doc.fillColor(CALM).font("Helvetica-Bold").fontSize(11).text(text, left(doc), doc.y, { width: width(doc) });
  doc.moveDown(0.25);
}

function para(doc, text, color = GREY, size = 9.5) {
  doc.fillColor(color).font("Helvetica").fontSize(size).text(text, left(doc), doc.y, { width: width(doc) });
  doc.moveDown(0.4);
}

function note(doc, text) {
  doc.fillColor(GREY).font("Helvetica-Oblique").fontSize(9.5).text(text, left(doc), doc.y, { width: width(doc) });
  doc.moveDown(0.5);
}

function field(doc, label) {
  newPageIfNeeded(doc, 24);
  const y = doc.y;
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(10.5).text(label, left(doc), y);
  const lw = doc.widthOfString(label);
  const lineY = y + 12;
  doc.lineWidth(0.5).strokeColor(LINE).moveTo(left(doc) + lw + 8, lineY).lineTo(left(doc) + width(doc), lineY).stroke();
  doc.x = left(doc);
  doc.y = y + 24;
}

function lines(doc, n) {
  for (let i = 0; i < n; i += 1) {
    newPageIfNeeded(doc, 22);
    const y = doc.y;
    doc.lineWidth(0.5).strokeColor(LINE).moveTo(left(doc), y).lineTo(left(doc) + width(doc), y).stroke();
    doc.y = y + 22;
  }
  doc.moveDown(0.2);
}

function checkboxes(doc, items) {
  for (const item of items) {
    newPageIfNeeded(doc, 24);
    const y = doc.y;
    doc.lineWidth(0.9).strokeColor(CALM).rect(left(doc) + 1, y + 2, 9, 9).stroke();
    doc.fillColor(INK).font("Helvetica").fontSize(10.5).text(item, left(doc) + 18, y, { width: width(doc) - 18 });
    doc.x = left(doc);
    doc.moveDown(0.35);
  }
  doc.moveDown(0.2);
}

function render(doc) {
  // Cover
  title(doc, "Folder for My Child's Future Caregiver");
  doc.fillColor(GREY).font("Helvetica").fontSize(11).text("A blank planning template. Project 3AM.", { width: width(doc) });
  doc.moveDown(0.6);
  note(
    doc,
    "PLACEHOLDER. This is a blank template to help you gather your thoughts privately. Do not upload it anywhere. Project 3AM does not collect or store anything you write here. This is general information, not legal advice.",
  );
  para(
    doc,
    "The person being cared for should be part of this plan wherever possible. It is about their life, their preferences and their future.",
    INK,
    10,
  );
  doc.moveDown(0.3);
  field(doc, "Name of the person being cared for:");
  field(doc, "Prepared by:");
  field(doc, "Date:");

  // Topic 01
  topic(doc, "Topic 1: Towards a Flourishing Life");
  subheading(doc, "Our hopes for the future");
  para(doc, "What does a good, flourishing life look like for them?");
  lines(doc, 4);
  subheading(doc, "Their profile");
  field(doc, "Things they like and prefer:");
  field(doc, "Their interests:");
  field(doc, "Where they need support:");
  field(doc, "Their strengths:");
  subheading(doc, "Their support network");
  para(doc, "Two people who regularly support them.");
  field(doc, "1. Name:");
  field(doc, "   Contact and relationship:");
  field(doc, "2. Name:");
  field(doc, "   Contact and relationship:");
  subheading(doc, "Emergency plan");
  para(doc, "Who to contact and what helps keep them calm.");
  lines(doc, 3);

  // Topic 02
  topic(doc, "Topic 2: Health Matters");
  subheading(doc, "Are you prepared? Tick where you stand today.");
  checkboxes(doc, [
    "We know who to call to look after them temporarily in a medical emergency.",
    "We have a care support team for when we are no longer around.",
    "We are familiar with the relevant health schemes and subsidies.",
    "They have cover for large health-related expenses.",
    "We have a record of their health history.",
    "They have a regular family doctor.",
  ]);
  subheading(doc, "Health record");
  field(doc, "Name:");
  field(doc, "Date of birth:");
  field(doc, "Blood type:");
  subheading(doc, "Health support team");
  para(doc, "For example, doctor, dentist, counsellor.");
  field(doc, "1. Role, name and contact:");
  field(doc, "2. Role, name and contact:");
  subheading(doc, "Conditions, medication and allergies");
  lines(doc, 3);

  // Topic 03
  topic(doc, "Topic 3: Housing Matters");
  subheading(doc, "Is the current home suitable?");
  lines(doc, 3);
  subheading(doc, "Housing plan");
  para(doc, "What kind of home and what level of daily support would suit them?");
  lines(doc, 4);

  // Topic 04
  topic(doc, "Topic 4: Meaningful Engagement");
  subheading(doc, "Interests and talents");
  lines(doc, 3);
  subheading(doc, "How they might spend their time meaningfully");
  para(doc, "For example, work, learning, volunteering, hobbies.");
  lines(doc, 3);

  // Topic 05
  topic(doc, "Topic 5: Money Matters");
  note(
    doc,
    "For your safety, do not write full bank or policy numbers into any document you might share. Keep this private.",
  );
  subheading(doc, "Options for your financial plan. Tick the ones you are looking at.");
  checkboxes(doc, [
    "Lasting Power of Attorney (LPA)",
    "Trust",
    "Will",
    "CPF nomination (regular)",
    "CPF nomination: Special Needs Savings Scheme (SNSS)",
    "Insurance policies",
    "Testamentary guardian",
    "Deputyship application",
  ]);
  subheading(doc, "A simple plan");
  para(doc, "How will money be set aside, and how will it reach them safely?");
  lines(doc, 4);

  // Source
  newPageIfNeeded(doc, 60);
  doc.moveDown(0.5);
  doc.fillColor(GREY).font("Helvetica-Oblique").fontSize(8.5).text(
    "Structure adapted as a blank template from the Life After Death Playbook: A Future Life Planning Guide for Caregivers, by Autism Resource Centre (Singapore), https://lifeafterdeath.autism.org.sg. This simplified template is not the official document. Project 3AM is an educational and signposting tool, not legal advice.",
    left(doc),
    doc.y,
    { width: width(doc) },
  );
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const doc = new PDFDocument({ size: "A4", margins: { top: 56, bottom: 56, left: 56, right: 56 } });
  const out = fs.createWriteStream(path.join(OUT_DIR, OUT_FILE));
  out.on("finish", () => console.log("wrote", OUT_FILE));
  out.on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
  doc.pipe(out);
  render(doc);
  doc.end();
}

main();
