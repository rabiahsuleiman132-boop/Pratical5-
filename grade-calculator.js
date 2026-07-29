// Pure helper logic to process core grading variables
function evaluateScoreMetrics(score) {
  let grade, remark, statusClass;

  if (score >= 70) {
    grade = "A";
    remark = "Excellent";
    statusClass = "pass";
  } else if (score >= 60) {
    grade = "B";
    remark = "Very Good";
    statusClass = "pass";
  } else if (score >= 50) {
    grade = "C";
    remark = "Good";
    statusClass = "pass";
  } else if (score >= 45) {
    grade = "D";
    remark = "Pass";
    statusClass = "pass";
  } else if (score >= 40) {
    grade = "E";
    remark = "Fair Pass";
    statusClass = "pass";
  } else {
    grade = "F";
    remark = "Fail";
    statusClass = "fail";
  }

  return { grade, remark, statusClass };
}

// Main Interactive Form Evaluation Function
function calculateGrade() {
  const courseTitle = document.getElementById("courseTitle").value.trim();
  const scoreVal = document.getElementById("score").value;
  const score = parseFloat(scoreVal);
  const resultDiv = document.getElementById("result");

  // Form Parameter Content Verification
  if (courseTitle === "" || scoreVal === "") {
    resultDiv.innerHTML =
      "Please populate all fields cleanly before evaluating.";
    resultDiv.className = "result-box show fail";
    return;
  }

  // Constraint Range Boundary Validation
  if (isNaN(score) || score < 0 || score > 100) {
    resultDiv.innerHTML = "Please enter a valid score between 0 and 100.";
    resultDiv.className = "result-box show fail";
    return;
  }

  const report = evaluateScoreMetrics(score);

  // Dynamic Render matching your layout requirements
  resultDiv.innerHTML = `
        <strong class="course-output">${courseTitle}</strong>
        Score: ${score}<br>
        Grade: ${report.grade}<br>
        Remark: ${report.remark}
    `;
  resultDiv.className = `result-box show ${report.statusClass}`;
}

// Automated System Execution Engine (Outputs your 5 batch items instantly)
function runSystemTests() {
  const testCases = [
    { code: "IFT 203 - Web Technologies", score: 85 },
    { code: "COS 201 - Programming I", score: 72 },
    { code: "MTH 201 - Math Methods", score: 64 },
    { code: "CYB 201 - Cybersecurity", score: 51 },
    { code: "GST 201 - Nigerian Culture", score: 39 },
  ];

  const container = document.getElementById("testResultsContainer");
  container.innerHTML = ""; // Wipe past instances cleanly

  testCases.forEach((item) => {
    const metrics = evaluateScoreMetrics(item.score);

    const card = document.createElement("div");
    card.className = "test-card-item";
    card.style.borderLeftColor =
      metrics.statusClass === "fail" ? "#ef4444" : "#003366";

    card.innerHTML = `
            <strong>${item.code}</strong><br>
            Score: ${item.score}<br>
            Grade: ${metrics.grade}<br>
            Remark: ${metrics.remark}
        `;
    container.appendChild(card);
  });
}
