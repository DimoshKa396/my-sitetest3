        let totalTests = 0;
        let testedTests = 0;
        let currentPage = 1;
        
        const testCards = [];

        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.test-card');
            cards.forEach(card => {
                testCards.push(card);
            });
            
            totalTests = testCards.length;
            document.getElementById('total-count').textContent = totalTests;
            document.getElementById('final-total').textContent = totalTests;
            
            updateProgress();
        });

        function startTesting() {
            document.getElementById('start-screen').classList.add('hidden');
            document.getElementById('app-content').classList.add('visible');
            resetProgress();
        }

        function switchPage(pageNumber) {
            document.getElementById('page1').classList.remove('active');
            document.getElementById('page2').classList.remove('active');
            document.getElementById('page3').classList.remove('active');
            document.getElementById('page4').classList.remove('active');
            
            document.getElementById(`page${pageNumber}`).classList.add('active');
            
            const navButtons = document.querySelectorAll('.nav-button');
            navButtons.forEach((button, index) => {
                if (index + 1 === pageNumber) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
            
            currentPage = pageNumber;
        }

        function updateTestStatus(element) {
            const card = element.closest('.test-card');
            if (!card) return;
            
            const checkbox = card.querySelector('.status-checkbox');
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                updateProgress();
            }
        }

        function updateProgress() {
            const checkboxes = document.querySelectorAll('.test-card .status-checkbox');
            testedTests = 0;
            
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    testedTests++;
                }
            });
            
            const percent = Math.round((testedTests / totalTests) * 100);
            
            document.getElementById('progress-percent').textContent = percent + '%';
            document.getElementById('tested-count').textContent = testedTests;
            
            document.getElementById('final-tested').textContent = testedTests;
            document.getElementById('final-percent').textContent = percent + '%';
            
            let message = '';
            if (percent === 100) {
                message = 'Отлично! Вы протестировали все элементы.';
            } else if (percent >= 75) {
                message = 'Хороший результат. Протестировано больше 75%.';
            } else if (percent >= 50) {
                message = 'Средний результат. Протестировано больше половины.';
            } else if (percent >= 25) {
                message = 'Начало положено. Продолжайте тестирование!';
            } else {
                message = 'Вы только начали. Тестируйте больше элементов!';
            }
            document.getElementById('completion-message').textContent = message;
            
            checkboxes.forEach(checkbox => {
                const label = checkbox.closest('.test-status').querySelector('.status-label');
                if (checkbox.checked) {
                    label.classList.add('tested');
                    label.textContent = 'Протестировано';
                } else {
                    label.classList.remove('tested');
                    label.textContent = 'Отметить как протестировано';
                }
            });
        }

        function resetProgress() {
            const checkboxes = document.querySelectorAll('.test-card .status-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            const inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea');
            inputs.forEach(input => {
                if (input.type !== 'checkbox' && input.type !== 'radio') {
                    input.value = '';
                }
            });
            
            const radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => radio.checked = false);
            
            const checkboxes2 = document.querySelectorAll('input[type="checkbox"]:not(.status-checkbox)');
            checkboxes2.forEach(checkbox => checkbox.checked = false);
            
            updateProgress();
            switchPage(1);
        }

        function showFinishModal() {
            updateProgress();
            document.getElementById('finish-modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('finish-modal').classList.remove('active');
        }

        function completeTesting() {
            setTimeout(() => {
                document.getElementById('finish-modal').classList.remove('active');
                resetProgress();
                document.getElementById('app-content').classList.remove('visible');
                document.getElementById('start-screen').classList.remove('hidden');
            }, 500);
        }