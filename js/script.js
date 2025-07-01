        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Portfolio Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });

        // Form Submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission logic
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Appointment Calendar - 12-hour format
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const currentMonthEl = document.getElementById('currentMonth');
        const calendarGrid = document.querySelector('.calendar-grid');
        const timeSlotsContainer = document.getElementById('timeSlots');
        const appointmentForm = document.getElementById('appointmentForm');

        let currentDate = new Date(2025, 5, 1); // June 2025

        function renderCalendar() {
            // Clear existing calendar cells
            while (calendarGrid.children.length > 7) {
                calendarGrid.removeChild(calendarGrid.lastChild);
            }
            
            // Set current month text
            currentMonthEl.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            
            // Get first day of month and number of days
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            
            // Create empty cells for days before first day
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('calendar-cell');
                calendarGrid.appendChild(emptyCell);
            }
            
            // Create cells for each day
            for (let day = 1; day <= daysInMonth; day++) {
                const cell = document.createElement('div');
                cell.classList.add('calendar-cell');
                cell.textContent = day;
                
                // Mark weekends with a different style
                if ((firstDay + day - 1) % 7 === 0 || (firstDay + day - 1) % 7 === 6) {
                    cell.classList.add('weekend');
                }
                
                // Mark booked dates (for demo purposes)
                if (day % 0 === 0 || day % 0 === 0) {
                    cell.classList.add('booked');
                } else {
                    cell.addEventListener('click', () => selectDate(day));
                }
                
                calendarGrid.appendChild(cell);
            }
        }

        function selectDate(day) {
            // Remove selected class from all cells
            document.querySelectorAll('.calendar-cell').forEach(cell => {
                cell.classList.remove('selected');
            });
            
            // Add selected class to clicked cell
            const selectedCell = [...document.querySelectorAll('.calendar-cell')].find(cell => 
                cell.textContent == day && !cell.classList.contains('booked')
            );
            
            if (selectedCell) {
                selectedCell.classList.add('selected');
                
                // Show time slots
                timeSlotsContainer.style.display = 'grid';
                timeSlotsContainer.innerHTML = '';
                
                // Generate time slots in 12-hour format (every 30 minutes from 9AM to 5PM)
                for (let hour = 9; hour <= 16; hour++) {
                    for (let minute = 0; minute < 60; minute += 30) {
                        const timeSlot = document.createElement('div');
                        timeSlot.classList.add('time-slot');
                        
                        // Convert to 12-hour format
                        let period = hour >= 12 ? 'PM' : 'AM';
                        let displayHour = hour % 12 || 12;
                        let displayMinute = minute === 0 ? '00' : minute;
                        
                        timeSlot.textContent = `${displayHour}:${displayMinute} ${period}`;
                        
                        timeSlot.addEventListener('click', () => {
                            // Remove selected class from all time slots
                            document.querySelectorAll('.time-slot').forEach(slot => {
                                slot.classList.remove('selected');
                            });
                            
                            // Add selected class to clicked slot
                            timeSlot.classList.add('selected');
                            
                            // Show appointment form
                            appointmentForm.style.display = 'block';
                        });
                        
                        timeSlotsContainer.appendChild(timeSlot);
                    }
                }
            }
        }

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
            // Hide time slots and form when changing month
            timeSlotsContainer.style.display = 'none';
            appointmentForm.style.display = 'none';
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
            // Hide time slots and form when changing month
            timeSlotsContainer.style.display = 'none';
            appointmentForm.style.display = 'none';
        });

        // Appointment form submission
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('appointmentName').value;
            const email = document.getElementById('appointmentEmail').value;
            const phone = document.getElementById('appointmentPhone').value;
            
            if (!name || !email || !phone) {
                alert('Please fill all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Get selected date and time
            const selectedDate = document.querySelector('.calendar-cell.selected');
            const selectedTime = document.querySelector('.time-slot.selected');
            
            if (!selectedDate || !selectedTime) {
                alert('Please select a date and time');
                return;
            }
            
            const date = selectedDate.textContent;
            const time = selectedTime.textContent;
            const month = currentDate.toLocaleString('default', { month: 'long' });
            
            // Form submission logic
            alert(`Your appointment has been scheduled!\nDate: ${month} ${date}\nTime: ${time}\nWe will send a confirmation to ${email}`);
            
            // Reset form
            appointmentForm.reset();
            document.querySelectorAll('.calendar-cell.selected').forEach(cell => cell.classList.remove('selected'));
            document.querySelectorAll('.time-slot.selected').forEach(slot => slot.classList.remove('selected'));
            timeSlotsContainer.style.display = 'none';
            appointmentForm.style.display = 'none';
        });

        // Initialize calendar
        renderCalendar()