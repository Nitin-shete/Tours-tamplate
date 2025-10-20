// Dashboard JavaScript
$(document).ready(function() {
    console.log('Dashboard loaded successfully!');
    
    // Initialize dashboard components
    initializeSidebar();
    initializeCharts();
    initializeFormHandlers();
    initializePageNavigation();
    
    // Sidebar functionality
    function initializeSidebar() {
        $('#sidebarToggle').on('click', function() {
            $('#sidebar').toggleClass('collapsed');
            $('#mainContent').toggleClass('expanded');
        });
        
        // Handle mobile sidebar
        if ($(window).width() <= 768) {
            $('#sidebar').addClass('collapsed');
            $('#mainContent').addClass('expanded');
        }
        
        // Responsive sidebar
        $(window).resize(function() {
            if ($(window).width() <= 768) {
                $('#sidebar').addClass('collapsed');
                $('#mainContent').addClass('expanded');
            } else {
                $('#sidebar').removeClass('collapsed');
                $('#mainContent').removeClass('expanded');
            }
        });
    }
    
    // Page navigation
    function initializePageNavigation() {
        $('.sidebar-nav .nav-link, [data-page]').on('click', function(e) {
            e.preventDefault();
            
            const targetPage = $(this).data('page');
            if (targetPage) {
                // Update active nav item
                $('.sidebar-nav .nav-link').removeClass('active');
                $(`.sidebar-nav .nav-link[data-page="${targetPage}"]`).addClass('active');
                
                // Show target page
                $('.page-content').removeClass('active');
                $(`#${targetPage}-page`).addClass('active');
                
                // Close sidebar on mobile
                if ($(window).width() <= 768) {
                    $('#sidebar').addClass('collapsed');
                    $('#mainContent').addClass('expanded');
                }
            }
        });
    }
    
    // Initialize Charts
    function initializeCharts() {
        // Enquiry Chart
        const enquiryCtx = document.getElementById('enquiryChart');
        if (enquiryCtx) {
            new Chart(enquiryCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Daily Enquiries',
                        data: [12, 19, 15, 25, 22, 18, 24],
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
        
        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Adventure', 'Cultural', 'Romantic', 'Family', 'Luxury'],
                    datasets: [{
                        data: [30, 25, 20, 15, 10],
                        backgroundColor: [
                            '#007bff',
                            '#28a745',
                            '#dc3545',
                            '#ffc107',
                            '#17a2b8'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
        
        // Sales Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [15000, 22000, 18000, 28000, 25000, 32000],
                        backgroundColor: 'rgba(0, 123, 255, 0.8)',
                        borderColor: '#007bff',
                        borderWidth: 2,
                        borderRadius: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Form handlers
    function initializeFormHandlers() {
        // Add Tour Form
        $('#addTourForm').on('submit', function(e) {
            e.preventDefault();
            
            // Show loading
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.html();
            submitBtn.html('<span class="loading"></span> Saving...');
            submitBtn.prop('disabled', true);
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showAlert('success', 'Tour added successfully!');
                
                // Reset form
                this.reset();
                updateTourPreview();
                
                // Reset button
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
                
                // Redirect to tours list
                setTimeout(() => {
                    $('.sidebar-nav .nav-link').removeClass('active');
                    $('.sidebar-nav .nav-link[data-page="tours-list"]').addClass('active');
                    $('.page-content').removeClass('active');
                    $('#tours-list-page').addClass('active');
                }, 1500);
                
            }, 2000);
        });
        
        // Real-time tour preview
        $('#addTourForm input, #addTourForm textarea, #addTourForm select').on('input change', function() {
            updateTourPreview();
        });
        
        // Preview button
        $('#previewTour').on('click', function() {
            const formData = getFormData();
            if (formData.tourName && formData.tourPrice) {
                showTourPreviewModal(formData);
            } else {
                showAlert('warning', 'Please fill in tour name and price to preview.');
            }
        });
    }
    
    // Update tour preview
    function updateTourPreview() {
        const formData = getFormData();
        const previewContainer = $('#tourPreview');
        
        if (formData.tourName && formData.tourPrice) {
            const previewHtml = `
                <div class="tour-preview-card">
                    ${formData.tourImage ? `<img src="${formData.tourImage}" class="tour-preview-image" alt="Tour Image">` : ''}
                    <div class="tour-preview-content">
                        <h5 class="tour-preview-title">${formData.tourName}</h5>
                        <p class="text-muted mb-2">${formData.tourDestination || 'Destination not specified'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="tour-preview-price">$${formData.tourPrice}</span>
                            <small class="text-muted">${formData.tourDuration || 'N/A'} days</small>
                        </div>
                        ${formData.tourDescription ? `<p class="mt-2 small text-muted">${formData.tourDescription.substring(0, 100)}...</p>` : ''}
                    </div>
                </div>
            `;
            previewContainer.html(previewHtml);
        } else {
            previewContainer.html(`
                <div class="preview-placeholder">
                    <i class="fas fa-image fa-3x text-muted"></i>
                    <p class="text-muted mt-2">Fill the form to see preview</p>
                </div>
            `);
        }
    }
    
    // Get form data
    function getFormData() {
        return {
            tourName: $('#tourName').val(),
            tourDestination: $('#tourDestination').val(),
            tourPrice: $('#tourPrice').val(),
            tourDuration: $('#tourDuration').val(),
            tourCategory: $('#tourCategory').val(),
            tourDescription: $('#tourDescription').val(),
            tourImage: $('#tourImage').val(),
            tourMaxGroup: $('#tourMaxGroup').val(),
            tourHighlights: $('#tourHighlights').val(),
            tourIncludes: $('#tourIncludes').val(),
            tourExcludes: $('#tourExcludes').val(),
            tourStartDate: $('#tourStartDate').val(),
            tourEndDate: $('#tourEndDate').val(),
            tourActive: $('#tourActive').is(':checked')
        };
    }
    
    // Show tour preview modal
    function showTourPreviewModal(formData) {
        const modalHtml = `
            <div class="modal fade" id="tourPreviewModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Tour Preview</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    ${formData.tourImage ? `<img src="${formData.tourImage}" class="img-fluid rounded mb-3" alt="Tour">` : '<div class="bg-light rounded p-5 text-center mb-3"><i class="fas fa-image fa-3x text-muted"></i></div>'}
                                </div>
                                <div class="col-md-6">
                                    <h4>${formData.tourName}</h4>
                                    <p class="text-muted">${formData.tourDestination}</p>
                                    <h5 class="text-primary">$${formData.tourPrice}</h5>
                                    <p><strong>Duration:</strong> ${formData.tourDuration} days</p>
                                    <p><strong>Category:</strong> ${formData.tourCategory}</p>
                                    <p><strong>Max Group:</strong> ${formData.tourMaxGroup || 'Not specified'}</p>
                                </div>
                            </div>
                            <hr>
                            <h6>Description</h6>
                            <p>${formData.tourDescription || 'No description provided'}</p>
                            ${formData.tourHighlights ? `<h6>Highlights</h6><p>${formData.tourHighlights}</p>` : ''}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save Tour</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal and add new one
        $('#tourPreviewModal').remove();
        $('body').append(modalHtml);
        $('#tourPreviewModal').modal('show');
        
        // Remove modal after hiding
        $('#tourPreviewModal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
    }
    
    // Show alert messages
    function showAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
                 style="top: 100px; right: 20px; z-index: 1050; min-width: 300px;" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('body').append(alertHtml);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            $('.alert').fadeOut(500, function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    // Initialize statistics animation
    function animateStats() {
        $('.stats-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text().replace(/,/g, ''));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function() {
                    $this.text(countTo.toLocaleString());
                }
            });
        });
    }
    
    // Initialize fade-in animations
    function initializeAnimations() {
        $('.stats-card, .chart-card, .activity-card, .form-card, .table-card').addClass('fade-in');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Animate stats when home page is visible
    setTimeout(animateStats, 500);
    
    // Handle table actions
    $(document).on('click', '.btn-outline-primary', function() {
        showAlert('info', 'Edit functionality would be implemented here.');
    });
    
    $(document).on('click', '.btn-outline-danger', function() {
        if (confirm('Are you sure you want to delete this tour?')) {
            $(this).closest('tr').fadeOut(500, function() {
                $(this).remove();
            });
            showAlert('success', 'Tour deleted successfully.');
        }
    });
    
    // Search functionality (placeholder)
    function initializeSearch() {
        // This would be implemented for filtering tours, enquiries, etc.
        console.log('Search functionality ready for implementation');
    }
    
    // Export functionality (placeholder)
    function initializeExport() {
        // This would be implemented for exporting data
        console.log('Export functionality ready for implementation');
    }
    
    // Initialize additional features
    initializeSearch();
    initializeExport();
    
    // Console welcome message
    console.log(`
    📊 TourWorld Dashboard Ready! 📊
    ================================
    All systems operational.
    Dashboard features loaded successfully.
    ================================
    `);
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for global use
window.Dashboard = {
    formatCurrency,
    formatDate
};