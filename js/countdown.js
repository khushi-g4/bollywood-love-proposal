/* ==========================================
   COUNTDOWN.JS
   Relationship Timer
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       Relationship Start Date
    ====================================== */

    const startDate = new Date("2026-02-07T00:00:00");

    const yearsEl = document.getElementById("years");
    const monthsEl = document.getElementById("months");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");

    if (!yearsEl || !monthsEl || !daysEl || !hoursEl) return;

    function updateCountdown() {

        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {

            months--;

            const previousMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

            days += previousMonth.getDate();

        }

        if (months < 0) {

            years--;

            months += 12;

        }

        const diff = now - startDate;

        const totalHours = Math.floor(diff / (1000 * 60 * 60));

        const hours = totalHours % 24;

        yearsEl.textContent = years;
        monthsEl.textContent = months;
        daysEl.textContent = days;
        hoursEl.textContent = hours;

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

});