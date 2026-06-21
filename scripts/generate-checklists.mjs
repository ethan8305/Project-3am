// Generates the downloadable checklist PDFs in public/checklists/.
//
// The checklist content lives here as plain data. Edit the text below, then run
// `npm run checklists` to regenerate the PDFs. The PDFs are committed to the
// repo so the site stays fully static (no PDF generation at build or runtime).
//
// Keep the copy plain, calm and general. No advice about any one person's
// situation, and no em-dashes.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(here, "..", "public", "checklists");

const STD_NOTE =
  "PLACEHOLDER. This is a blank thinking aid, not legal advice. Fill it in at your own pace, offline. Project 3AM does not collect or store anything you write here.";
const FIN_NOTE =
  "PLACEHOLDER. This is a blank thinking aid, not financial or legal advice. Fill it in at your own pace, offline. Project 3AM does not collect or store anything you write here.";
const NOTES_HINT = "(Write freely here. This stays on your own device or paper.)";
const DISCLAIMER =
  "Project 3AM is an educational and signposting tool. This is general information, not legal advice.";

const INK = "#1f2933";
const CALM = "#2b5160";
const GREY = "#4b5563";
const LINE = "#c7dae3";

const checklists = [
  {
    file: "wills-checklist.pdf",
    title: "Wills: preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Before you speak to a professional, it can help to think about",
        type: "check",
        items: [
          "Who would you want to carry out your wishes?",
          "Who would you want to provide for, and roughly how?",
          "Is there a child under 21 who would need a named guardian?",
          "Is there a family member who may need long-term support?",
          "Do you already have an older will that may need reviewing?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "What makes a will valid where I live?",
          "How do I provide for someone who needs ongoing support?",
          "How does my will work alongside CPF nomination and insurance?",
          "When should I review or update it?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "lpa-checklist.pdf",
    title: "Lasting Power of Attorney (LPA): preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "Who would you trust to make decisions on your behalf?",
          "Would that be for money matters, for care and welfare, or both?",
          "Would you want more than one person, and would they act together?",
          "Is the person making the LPA able to understand the decision now?",
          "Have you talked it through with the people you would choose?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "What types of LPA are available where I live?",
          "Who can witness or certify an LPA?",
          "How is an LPA registered, and how long does that take?",
          "What happens if no LPA is in place?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "trusts-checklist.pdf",
    title: "Trusts: preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "Who is the trust meant to support, and what for?",
          "Who would you trust to act as trustees?",
          "Would support be given steadily over time, rather than all at once?",
          "What kind of life and choices do you want the arrangement to support?",
          "Have you involved the person being cared for, where that is possible?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "What kinds of trust exist where I live?",
          "What are the duties of a trustee?",
          "Are there special arrangements for supporting a person with disability?",
          "How does a trust work alongside a will and insurance?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "cpf-nomination-checklist.pdf",
    title: "CPF nomination: preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "Who would you want to receive your CPF savings?",
          "How would you want it shared between them?",
          "Do you have an existing nomination that may need updating?",
          "Does your nomination fit with what your will sets out?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "How do I make or change a CPF nomination?",
          "Who can be nominated?",
          "What happens if there is no nomination?",
          "How does this work alongside my other plans?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "insurance-checklist.pdf",
    title: "Insurance: preparation checklist",
    note: FIN_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "What would the money be for? For example, ongoing care.",
          "How would the money be received and managed, and by whom?",
          "Does this fit with your will and any trust you are considering?",
          "What questions do you want to ask a licensed financial adviser?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "What general types of cover exist?",
          "How would a payout be received and managed for the person being cared for?",
          "How does this sit alongside other parts of my plan?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "testamentary-guardianship-checklist.pdf",
    title: "Testamentary guardianship: preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "Is there a child under 21 who would need a named guardian?",
          "Who understands the child's needs and routines well?",
          "Have you spoken with the person you have in mind?",
          "How would the child's own voice be included as they grow?",
          "What support would a guardian need to continue familiar care?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "How is a guardian named where I live?",
          "What can a guardian decide, and what can they not decide?",
          "How does this fit with my will and any trust?",
          "What changes when the young person reaches adulthood?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "deputyship-checklist.pdf",
    title: "Deputyship: preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "Which decisions does the person need support with?",
          "Which decisions can the person make for themselves?",
          "Who would be willing and suitable to act as a deputy?",
          "How would the person be involved in decisions that affect them?",
          "Was an LPA ever put in place? If so, deputyship may not be needed.",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "How does a deputyship application work where I live?",
          "Who can apply, and what must a deputy do?",
          "How does the court oversee a deputy?",
          "Would an LPA be possible instead?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
  {
    file: "sntc-trust-checklist.pdf",
    title: "SNTC Special Needs Trust: preparation checklist",
    note: STD_NOTE,
    sections: [
      {
        heading: "Things to think about",
        type: "check",
        items: [
          "Who is the trust meant to support, and what kind of life do you want it to support?",
          "Where might the money come from, for example CPF, a will, or insurance?",
          "What would regular payouts be used for?",
          "Who knows the person well and could help shape the care plan?",
          "Have you involved the person being cared for, where that is possible?",
        ],
      },
      {
        heading: "Questions you might want to ask",
        type: "bullet",
        items: [
          "How do I apply to set up an SNTC trust?",
          "What are the current fees, and are there any subsidies?",
          "How are payouts decided and managed?",
          "How does an SNTC trust work alongside CPF, SNSS and insurance?",
        ],
      },
      { heading: "Notes to myself", type: "notes" },
    ],
  },
];

function newPageIfNeeded(doc, space) {
  const bottom = doc.page.height - doc.page.margins.bottom;
  if (doc.y + space > bottom) doc.addPage();
}

function render(doc, data) {
  const left = doc.page.margins.left;
  const width =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  doc.fillColor(CALM).font("Helvetica-Bold").fontSize(19).text(data.title, { width });
  doc.moveDown(0.2);
  doc.fillColor(GREY).font("Helvetica").fontSize(10).text("Project 3AM", { width });
  doc.moveDown(0.5);
  doc.fillColor(GREY).font("Helvetica-Oblique").fontSize(9.5).text(data.note, { width });
  doc.moveDown(0.9);

  for (const section of data.sections) {
    newPageIfNeeded(doc, 60);
    doc.fillColor(CALM).font("Helvetica-Bold").fontSize(12.5).text(section.heading, left, doc.y, { width });
    doc.moveDown(0.4);

    if (section.type === "check") {
      for (const item of section.items) {
        newPageIfNeeded(doc, 24);
        const y = doc.y;
        doc.lineWidth(0.9).strokeColor(CALM).rect(left + 1, y + 2, 9, 9).stroke();
        doc.fillColor(INK).font("Helvetica").fontSize(10.5).text(item, left + 18, y, { width: width - 18 });
        doc.x = left;
        doc.moveDown(0.35);
      }
    } else if (section.type === "bullet") {
      for (const item of section.items) {
        newPageIfNeeded(doc, 24);
        const y = doc.y;
        doc.fillColor(CALM).font("Helvetica").fontSize(10.5).text("•", left + 2, y);
        doc.fillColor(INK).text(item, left + 18, y, { width: width - 18 });
        doc.x = left;
        doc.moveDown(0.35);
      }
    } else if (section.type === "notes") {
      doc.fillColor(GREY).font("Helvetica-Oblique").fontSize(10).text(NOTES_HINT, left, doc.y, { width });
      doc.moveDown(0.7);
      let ly = doc.y;
      for (let i = 0; i < 6; i += 1) {
        newPageIfNeeded(doc, 22);
        ly = doc.y;
        doc.lineWidth(0.5).strokeColor(LINE).moveTo(left, ly).lineTo(left + width, ly).stroke();
        doc.y = ly + 22;
      }
    }
    doc.moveDown(0.7);
  }

  newPageIfNeeded(doc, 30);
  doc.moveDown(0.3);
  doc.fillColor(GREY).font("Helvetica").fontSize(8.5).text(DISCLAIMER, left, doc.y, { width });
}

function build(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margins: { top: 56, bottom: 56, left: 56, right: 56 } });
    const out = fs.createWriteStream(path.join(OUT_DIR, data.file));
    out.on("finish", resolve);
    out.on("error", reject);
    doc.pipe(out);
    render(doc, data);
    doc.end();
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const data of checklists) {
    await build(data);
    console.log("wrote", data.file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
