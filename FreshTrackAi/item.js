// ========== Upload / Scan Logic ==========
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const uploadResultSection = document.getElementById('uploadResultSection');
const preview = document.getElementById('preview');
const uploadItemName = document.getElementById('uploadItemName');
const uploadExpiryDate = document.getElementById('uploadExpiryDate');
const uploadStatus = document.getElementById('uploadStatus');

// Mock AI-detection
function mockDetect(imageFile) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Tomato Sauce',
        date: '2025-02-18',
        isExpired: new Date() > new Date('2025-02-18'),
      });
    }, 1500);
  });
}

async function analyzeImage() {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please choose an image first.');
    return;
  }

  // show preview
  const reader = new FileReader();
  reader.onload = e => preview.style.backgroundImage = `url('${e.target.result}')`;
  reader.readAsDataURL(file);

  // disable button
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing…';

  const result = await mockDetect(file);

  analyzeBtn.disabled = false;
  analyzeBtn.textContent = 'Analyze';

  // populate upload result
  uploadItemName.textContent = result.name;
  uploadExpiryDate.textContent = result.date;
  uploadStatus.textContent = result.isExpired ? 'Expired' : 'Fresh';
  uploadStatus.className = result.isExpired ? 'expired' : 'fresh';

  uploadResultSection.classList.remove('hidden');
}

analyzeBtn.addEventListener('click', analyzeImage);


// ========== Manual Entry Logic ==========
const manualItemNameInput = document.getElementById('manualItemNameInput');
const manualExpiryDateInput = document.getElementById('manualExpiryDateInput');
const manualStatusSelect = document.getElementById('manualStatusSelect');
const manualSubmitBtn = document.getElementById('manualSubmitBtn');
const manualResultSection = document.getElementById('manualResultSection');
const manualItemName = document.getElementById('manualItemName');
const manualExpiryDate = document.getElementById('manualExpiryDate');
const manualStatus = document.getElementById('manualStatus');

manualSubmitBtn.addEventListener('click', () => {
  const nameVal = manualItemNameInput.value.trim();
  const dateVal = manualExpiryDateInput.value;
  const statusVal = manualStatusSelect.value;

  if (!nameVal || !dateVal) {
    alert('Please fill out both Item Name and Expiry Date.');
    return;
  }

  manualItemName.textContent = nameVal;
  manualExpiryDate.textContent = new Date(dateVal).toLocaleDateString();
  manualStatus.textContent = statusVal.charAt(0).toUpperCase() + statusVal.slice(1);
  manualStatus.className = statusVal;

  manualResultSection.classList.remove('hidden');
});
