// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts when they come into view
    const chartContainers = document.querySelectorAll('.chart-container');
    
    if (chartContainers.length === 0) return;
    
    // Set up Intersection Observer to initialize charts when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartCanvas = entry.target.querySelector('canvas');
                
                if (chartCanvas) {
                    const chartId = chartCanvas.id;
                    
                    // Initialize the appropriate chart based on its ID
                    switch(chartId) {
                        case 'attackTypesChart':
                            initAttackTypesChart(chartCanvas);
                            break;
                        case 'vulnerabilityChart':
                            initVulnerabilityChart(chartCanvas);
                            break;
                        case 'jobGrowthChart':
                            initJobGrowthChart(chartCanvas);
                            break;
                        case 'dataBreachChart':
                            initDataBreachChart(chartCanvas);
                            break;
                        default:
                            break;
                    }
                    
                    // Unobserve after initializing to prevent reinitializing
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe each chart container
    chartContainers.forEach(container => {
        observer.observe(container);
    });
    
    // Handle chart action buttons (download, fullscreen)
    const chartActionButtons = document.querySelectorAll('.chart-action-btn');
    
    chartActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.chartAction;
            const chartId = this.dataset.chart;
            const chartCanvas = document.getElementById(chartId);
            
            if (!chartCanvas) return;
            
            switch(action) {
                case 'download':
                    downloadChart(chartCanvas, chartId);
                    break;
                case 'fullscreen':
                    toggleFullscreen(chartCanvas.parentElement);
                    break;
                default:
                    break;
            }
        });
    });
    
    // Function to download chart as image
    function downloadChart(canvas, chartId) {
        const link = document.createElement('a');
        link.download = chartId + '-' + new Date().toISOString().slice(0, 10) + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
    
    // Function to toggle fullscreen
    function toggleFullscreen(element) {
        if (!document.fullscreenElement) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari & Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            }
            
            // Add a class for fullscreen styling
            element.classList.add('fullscreen-chart');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            
            // Remove fullscreen styling
            document.querySelector('.fullscreen-chart')?.classList.remove('fullscreen-chart');
        }
    }
    
    // Chart 1: Cyber Attack Types Distribution (Doughnut Chart)
    function initAttackTypesChart(canvas) {
        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: [
                'Phishing/Social Engineering',
                'Malware/Ransomware',
                'DDoS Attacks',
                'Web Application Attacks',
                'Insider Threats',
                'Zero-day Exploits'
            ],
            datasets: [{
                data: [32, 26, 16, 14, 8, 4],
                backgroundColor: [
                    'rgba(0, 99, 248, 0.8)',
                    'rgba(0, 208, 255, 0.8)',
                    'rgba(255, 62, 140, 0.8)',
                    'rgba(255, 128, 85, 0.8)',
                    'rgba(10, 17, 40, 0.8)',
                    'rgba(108, 117, 125, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 99, 248, 1)',
                    'rgba(0, 208, 255, 1)',
                    'rgba(255, 62, 140, 1)',
                    'rgba(255, 128, 85, 1)',
                    'rgba(10, 17, 40, 1)',
                    'rgba(108, 117, 125, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 15
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        }
                    },
                    padding: 12,
                    backgroundColor: 'rgba(10, 17, 40, 0.8)',
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 13
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            },
            cutout: '60%'
        };
        
        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
    
    // Chart 2: Industry Vulnerability Index (Radar Chart)
    function initVulnerabilityChart(canvas) {
        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: [
                'Healthcare',
                'Financial Services',
                'Government',
                'Retail',
                'Education',
                'Manufacturing',
                'Energy/Utilities'
            ],
            datasets: [
                {
                    label: 'Vulnerability Level',
                    data: [85, 76, 80, 73, 89, 68, 78],
                    backgroundColor: 'rgba(0, 208, 255, 0.2)',
                    borderColor: 'rgba(0, 208, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 99, 248, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 99, 248, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Security Investment',
                    data: [65, 82, 70, 60, 55, 58, 72],
                    backgroundColor: 'rgba(255, 62, 140, 0.2)',
                    borderColor: 'rgba(255, 62, 140, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 62, 140, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 62, 140, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(108, 117, 125, 0.3)'
                    },
                    grid: {
                        color: 'rgba(108, 117, 125, 0.3)'
                    },
                    pointLabels: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent',
                        font: {
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 17, 40, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 13
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        };
        
        new Chart(ctx, {
            type: 'radar',
            data: data,
            options: options
        });
    }
    
    // Chart 3: Job Growth in Cybersecurity (Line Chart)
    function initJobGrowthChart(canvas) {
        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025 (projected)'],
            datasets: [
                {
                    label: 'Security Analyst',
                    data: [80, 95, 110, 128, 155, 178, 201, 230],
                    borderColor: 'rgba(0, 99, 248, 1)',
                    backgroundColor: 'rgba(0, 99, 248, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(0, 99, 248, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Penetration Tester',
                    data: [60, 78, 90, 107, 130, 156, 184, 215],
                    borderColor: 'rgba(0, 208, 255, 1)',
                    backgroundColor: 'rgba(0, 208, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(0, 208, 255, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'CISO',
                    data: [40, 46, 55, 67, 82, 95, 110, 130],
                    borderColor: 'rgba(255, 62, 140, 1)',
                    backgroundColor: 'rgba(255, 62, 140, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(255, 62, 140, 1)',
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Job Openings (thousands)',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(108, 117, 125, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 17, 40, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + 'k jobs';
                            }
                            return label;
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        };
        
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }
    
    // Chart 4: Data Breach Cost by Industry (Bar Chart)
    function initDataBreachChart(canvas) {
        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: ['Healthcare', 'Financial', 'Technology', 'Energy', 'Retail', 'Education', 'Public Sector'],
            datasets: [
                {
                    label: 'Average Cost per Data Breach (millions $)',
                    data: [9.23, 8.64, 5.85, 4.72, 3.88, 3.79, 2.93],
                    backgroundColor: [
                        'rgba(0, 99, 248, 0.8)',
                        'rgba(0, 208, 255, 0.8)',
                        'rgba(255, 62, 140, 0.8)',
                        'rgba(255, 128, 85, 0.8)',
                        'rgba(108, 117, 125, 0.8)',
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(255, 193, 7, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 99, 248, 1)',
                        'rgba(0, 208, 255, 1)',
                        'rgba(255, 62, 140, 1)',
                        'rgba(255, 128, 85, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(40, 167, 69, 1)',
                        'rgba(255, 193, 7, 1)'
                    ],
                    borderWidth: 1,
                    borderRadius: 8,
                    maxBarThickness: 50
                }
            ]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Cost (millions $)',
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(108, 117, 125, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        },
                        callback: function(value) {
                            return '$' + value + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Poppins', sans-serif",
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 17, 40, 0.8)',
                    padding: 12,
                    titleFont: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Poppins', sans-serif",
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y + ' million';
                        }
                    }
                }
            },
            animation: {
                delay: function(context) {
                    return context.dataIndex * 100;
                },
                duration: 1000,
                easing: 'easeOutQuart'
            }
        };
        
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    
    // Add event listeners for tab changes to properly resize charts
    const statisticsTabs = document.querySelectorAll('button[data-bs-toggle="pill"]');
    
    statisticsTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            const targetPane = document.querySelector(event.target.getAttribute('data-bs-target'));
            if (!targetPane) return;
            
            // Find and update charts in the newly active tab
            const charts = targetPane.querySelectorAll('canvas');
            charts.forEach(canvas => {
                const chart = Chart.getChart(canvas);
                if (chart) {
                    chart.resize();
                }
            });
        });
    });

    // Add this to the main.js file or include it here
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            // Fullscreen was exited, resize all charts
            const charts = document.querySelectorAll('canvas');
            charts.forEach(canvas => {
                const chart = Chart.getChart(canvas);
                if (chart) {
                    setTimeout(() => {
                        chart.resize();
                    }, 100);
                }
            });
        }
    });
});