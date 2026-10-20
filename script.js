// Paste your survey link between the quotes (Google Forms, Microsoft Forms, Qualtrics...).
// Every "Take the survey" button on the page uses it.
const SURVEY_URL = "";

// --- survey buttons ---
document.querySelectorAll(".survey-link").forEach((link) => {
  if (SURVEY_URL) {
    link.href = SURVEY_URL;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.addEventListener("click", () => {
      document.getElementById("survey-note").hidden = false;
    });
  }
});

// --- the springboard bounce ---
const stage = document.querySelector(".logo-stage");
const lockup = stage.querySelector(".lockup");
const hit = stage.querySelector(".hit");
let bouncing = false;

function bounce() {
  if (bouncing) return;
  bouncing = true;
  stage.classList.add("played");
  lockup.classList.add("boing");
}

lockup.querySelector(".launch").addEventListener("animationend", () => {
  lockup.classList.remove("boing");
  bouncing = false;
});

hit.addEventListener("mouseenter", bounce);
hit.addEventListener("click", bounce);
hit.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    bounce();
  }
});

// With reduced motion there is no animation, so animationend never fires.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  lockup.querySelector(".launch").dispatchEvent(new Event("animationend"));
  hit.removeEventListener("mouseenter", bounce);
}
