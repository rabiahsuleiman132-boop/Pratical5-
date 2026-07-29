/**
 * Task 5.5: Newgate University Course Array Dataset
 * Houses 6 specific tracking elements containing structural unit sizes and costs per unit.
 */
const courseDataset = [
  { code: "IFT 203", title: "Web Technologies", units: 4, feePerUnit: 5500 },
  { code: "COS 201", title: "Programming I", units: 3, feePerUnit: 5000 },
  { code: "MTH 201", title: "Math Methods", units: 3, feePerUnit: 4500 },
  {
    code: "CYB 201",
    title: "Cybersecurity Concepts",
    units: 3,
    feePerUnit: 6000,
  },
  {
    code: "GST 201",
    title: "Nigerian Culture & Social Development",
    units: 2,
    feePerUnit: 4000,
  },
  {
    code: "COS 202",
    title: "Data Structures & Algorithms",
    units: 4,
    feePerUnit: 5000,
  },
];

// Instantly fire dynamic generation of UI checkboxes when the web interface finishes loading
window.onload = function () {
  renderCourseSelectionUI();
};

/**
 * Iterates over the data array to build structural DOM check cards dynamically
 */
function renderCourseSelectionUI() {
  const listWrapper = document.getElementById("courseSelectionList");
  listWrapper.innerHTML = ""; // Wipe past text nodes cleanly

  courseDataset.forEach((course, index) => {
    // Build individual outer structural label elements
    const cardLabel = document.createElement("label");
    cardLabel.className = "course-checkbox-card";

    // Create the core selection node token checkbox
    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.value = index;
    inputCheck.className = "course-selector-box";

    // Construct formatting label flex wrappers
    const infoDiv = document.createElement("div");
    infoDiv.className = "course-info-labels";

    const textDetails = document.createElement("div");
    textDetails.className = "course-details";

    const titleSpan = document.createElement("span");
    titleSpan.className = "course-code-title";
    titleSpan.textContent = `${course.code} - ${course.title}`;

    const unitSpan = document.createElement("span");
    unitSpan.className = "course-unit-subtext";
    unitSpan.textContent = `${course.units} Credit Units (₦${course.feePerUnit.toLocaleString()}/Unit)`;

    const costBadge = document.createElement("span");
    costBadge.className = "course-cost-badge";
    // Aggregate full course potential value for transparency
    const courseTotalCost = course.units * course.feePerUnit;
    costBadge.textContent = `₦${courseTotalCost.toLocaleString()}`;

    // Assemble structural fragments sequentially
    textDetails.appendChild(titleSpan);
    textDetails.appendChild(unitSpan);
    infoDiv.appendChild(textDetails);
    infoDiv.appendChild(costBadge);

    cardLabel.appendChild(inputCheck);
    cardLabel.appendChild(infoDiv);
    listWrapper.appendChild(cardLabel);
  });
}

/**
 * Scans checked nodes to sum up academic unit sizes and structural tuition costs
 */
function computeRegistrationFees() {
  const checkboxes = document.querySelectorAll(".course-selector-box");
  let calculatedUnitsSum = 0;
  let calculatedTuitionSum = 0;
  let selectionTrackCount = 0;

  checkboxes.forEach((box) => {
    if (box.checked) {
      selectionTrackCount++;
      const dataIndex = parseInt(box.value);
      const targetCourse = courseDataset[dataIndex];

      // Perform algebraic metric aggregation
      calculatedUnitsSum += targetCourse.units;
      calculatedTuitionSum += targetCourse.units * targetCourse.feePerUnit;
    }
  });

  // Provide quick visual alert validation feedback if clicked with zero selections
  if (selectionTrackCount === 0) {
    alert(
      "Please select at least one course checkbox before computing academic invoice sheets.",
    );
    document.getElementById("invoiceSummaryBox").style.display = "none";
    return;
  }

  // Dynamic numeric swap out targeted directly at the placeholder value text nodes
  document.getElementById("totalUnitsValue").textContent = calculatedUnitsSum;
  document.getElementById("totalTuitionValue").textContent =
    calculatedTuitionSum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Unhide the completed calculation summary block cleanly
  document.getElementById("invoiceSummaryBox").style.display = "block";
}
