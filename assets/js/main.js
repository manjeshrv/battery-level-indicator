/*=============== BATTERY ===============*/
initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector('.battery__liquid');
  const batteryStatus = document.querySelector('.battery__status');
  const batteryPercentage = document.querySelector('.battery__percentage');

  navigator.getBattery().then(batt => {
    // Remove color classes function
    function removeColorClass() {
      batteryLiquid.classList.remove(
        'gradient-color-red',
        'gradient-color-orange',
        'gradient-color-yellow',
        'gradient-color-green'
      );
    }

    const updateBattery = () => {
      // 1. We update the number level of battery
      let level = Math.floor(batt.level * 100);
      batteryPercentage.textContent = level + '%';

      // 2. We update the background level of battery
      batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

      // 3. We validate full battery, low battery and if its charging or not
      if (level === 100) {
        // We validate if battery is full
        batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill color-green"></i>`;
        batteryLiquid.style.height = '103%'; // To hide the ellipse
      } else if ((level <= 20) & !batt.charging) {
        // We validate if battery is low
        batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
      } else if (batt.charging) {
        // We validate if battery is charging
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        // If not loading then dont show anything
        batteryStatus.innerHTML = '';
      }

      // 4. We change the colors of the battery and remove the other colors
      if (level <= 20) {
        removeColorClass();
        batteryLiquid.classList.add('gradient-color-red');
      } else if (level <= 40) {
        removeColorClass();
        batteryLiquid.classList.add('gradient-color-orange');
      } else if (level <= 80) {
        removeColorClass();
        batteryLiquid.classList.add('gradient-color-yellow');
      } else {
        removeColorClass();
        batteryLiquid.classList.add('gradient-color-green');
      }
    };

    updateBattery();

    // 5 Battery status events
    batt.addEventListener('chargingchange', () => {
      updateBattery();
    });
    batt.addEventListener('levelchange', () => {
      updateBattery();
    });
  });
}
