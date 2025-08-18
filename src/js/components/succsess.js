 document.addEventListener('DOMContentLoaded', function() {
            const modalOverlay = document.getElementById('modalOverlay');
            const modalContainer = document.getElementById('modalContainer');
            const openModalBtn = document.getElementById('openModalBtn');
            const closeModalBtn = document.getElementById('closeModalBtn');

            // Open modal
            openModalBtn.addEventListener('click', function() {
                modalOverlay.classList.remove('hidden');
                modalContainer.classList.add('modal-animate');
            });

            // Close modal when clicking X button
            closeModalBtn.addEventListener('click', function() {
                closeModal();
            });

            // Close modal when clicking outside
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
                    closeModal();
                }
            });

            function closeModal() {
                modalContainer.classList.remove('modal-animate');
                modalContainer.classList.add('animate__fadeOut');
                setTimeout(() => {
                    modalOverlay.classList.add('hidden');
                }, 300);
            }

            // For demo purposes - simulate order processing
            if (window.location.hash === '#order-confirmed') {
                setTimeout(() => {
                    modalOverlay.classList.remove('hidden');
                    modalContainer.classList.add('modal-animate');
                }, 500);
            }
        });
