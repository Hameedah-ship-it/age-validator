
const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const result = document.getElementById("result");

// Prevent users from selecting a future date
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];

dobInput.max = localDate;

ageForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const dob = dobInput.value;

  result.className = "";

  if (!dob) {
    result.textContent = "Please select your date of birth.";
    result.classList.add("error");
    return;
  }

  const [year, month, day] = dob.split("-").map(Number);

  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - year;

  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age--;
  }

  if (age < 18) {
    result.textContent = `Sorry! You are ${age} years old. You are not eligible for this service.`;
    result.classList.add("error");
  } else {
    result.textContent = `Congratulations! You are ${age} years old. You are eligible for this service.`;
    result.classList.add("success");
  }
});

ageForm.addEventListener("reset", function() {
  result.textContent = "";
  result.className = "";
});
