document.addEventListener('DOMContentLoaded', function() {
 const variationsContainer = document.getElementById('variations');
 const addVariationButton = document.getElementById('add-variation');
 let variationCount = 1;

 // Varyasyon ekleme fonksiyonu
 function addVariation() {
   variationCount++;
   const newVariation = `
     <div class="variation-row">
       <label for="variation-${variationCount}-impressions">Varyasyon ${variationCount} - Gösterim:</label>
       <input type="number" id="variation-${variationCount}-impressions" value="0">
       <label for="variation-${variationCount}-conversions">Dönüşüm:</label>
       <input type="number" id="variation-${variationCount}-conversions" value="0">
       <span class="result" id="variation-${variationCount}-cr">-</span>
       <span class="result" id="variation-${variationCount}-lift">-</span>
     </div>
   `;
   variationsContainer.insertAdjacentHTML('beforeend', newVariation);
 }

 // Hesaplama fonksiyonu
 function calculate() {
   // ... (Aşağıda açıklanacak)
 }

 // Event Listenerlar
 addVariationButton.addEventListener('click', addVariation);
 variationsContainer.addEventListener('input', calculate);
 document.getElementById('test-days').addEventListener('input', calculate);

 // Başlangıçta hesaplamayı çalıştır
 calculate();
});

// ... (Hesaplama fonksiyonu detayları aşağıda)

// ... (diğer kodlar)

function calculate() {
 const originalImpressions = parseFloat(document.getElementById('original-impressions').value) || 0;
 const originalConversions = parseFloat(document.getElementById('original-conversions').value) || 0;
 const originalCR = (originalConversions / originalImpressions) * 100 || 0;
 document.getElementById('original-cr').textContent = originalCR.toFixed(2) + '%';

 for (let i = 1; i <= variationCount; i++) {
   const variationImpressions = parseFloat(document.getElementById(`variation-${i}-impressions`).value) || 0;
   const variationConversions = parseFloat(document.getElementById(`variation-${i}-conversions`).value) || 0;
   const variationCR = (variationConversions / variationImpressions) * 100 || 0;
   const lift = ((variationCR - originalCR) / originalCR) * 100 || 0;

   document.getElementById(`variation-${i}-cr`).textContent = variationCR.toFixed(2) + '%';
   document.getElementById(`variation-${i}-lift`).textContent = lift.toFixed(2) + '%';
 }

 // Güven aralığı ve gerekli gün sayısı hesaplama (daha sonra eklenecek)
}

// ... (diğer kodlar)

// ... (diğer kodlar)

function calculate() {
 // ... (Diğer hesaplamalar)

 const testDays = parseFloat(document.getElementById('test-days').value) || 1;
 const zScore = 1.96; // %95 güven aralığı için
 const standardError = Math.sqrt((originalCR * (100 - originalCR)) / originalImpressions); 
 const marginOfError = zScore * standardError;
 const confidenceInterval = `%${(originalCR - marginOfError).toFixed(2)} - %${(originalCR + marginOfError).toFixed(2)}`;
 document.getElementById('confidence-interval').textContent = confidenceInterval;

 // Gerekli gün sayısı (örnek formül, iyileştirme yapılabilir)
 const requiredDays = Math.ceil(Math.pow((zScore * standardError) / 0.01, 2)); // %1'lik farkı tespit etmek için
 document.getElementById('required-days').textContent = requiredDays;

 // Renklendirme
 if (testDays >= requiredDays) {
   document.getElementById('confidence-interval').classList.add('green');
   document.getElementById('confidence-interval').classList.remove('red');
 } else {
   document.getElementById('confidence-interval').classList.add('red');
   document.getElementById('confidence-interval').classList.remove('green');
 }
}

// ... (diğer kodlar)