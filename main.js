// AI Food Security Platform - Main JavaScript
// Advanced interactive features and animations

class FoodSecurityPlatform {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.loadRealTimeData();
        this.initializeCharts();
    }

    init() {
        // Initialize platform state
        this.currentRegion = null;
        this.alertSystem = null;
        this.dataUpdateInterval = null;
        
        console.log('🌾 AI Food Security Platform Initialized');
    }

    setupEventListeners() {
        // Navigation smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Region indicators on world map
        document.querySelectorAll('.region-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                this.showRegionInfo(e.target.dataset.region, e.target);
            });

            indicator.addEventListener('mouseenter', (e) => {
                this.showRegionPreview(e.target.dataset.region);
            });

            indicator.addEventListener('mouseleave', () => {
                this.hideRegionPreview();
            });
        });

        // Mobile menu functionality - منفصل تماماً
        this.setupMobileMenu();

        // Button interactions - للأزرار الرئيسية فقط (ليست في navigation)
        document.querySelectorAll('button:not(#mobile-menu-button)').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleButtonClick(e.target);
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                mobileMenu.classList.toggle('hidden');
                
                // تغيير الأيقونة عند الفتح/الإغلاق
                const icon = mobileMenuButton.querySelector('svg');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                } else {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
                }
            });

            // إغلاق القائمة عند النقر على رابط
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                });
            });

            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                }
            });
        }
    }

    initializeAnimations() {
        // Animate statistics counters
        this.animateCounters();
        
        // Initialize scroll animations
        this.setupScrollAnimations();
        
        // Floating elements animation
        this.setupFloatingAnimations();
        
        // Typewriter effect for hero text
        this.setupTypewriter();
    }

    animateCounters() {
        const counters = [
            { id: 'regions-count', target: 127, suffix: '' },
            { id: 'crisis-count', target: 8, suffix: '' },
            { id: 'countries-count', target: 43, suffix: '' },
            { id: 'accuracy-percent', target: 94.7, suffix: '%' }
        ];

        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (element) {
                this.animateCounter(element, 0, counter.target, 2000, counter.suffix);
            }
        });
    }

    animateCounter(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOut;
            
            element.textContent = Math.floor(current) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all data cards
        document.querySelectorAll('.data-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }

    setupFloatingAnimations() {
        // Animate floating elements with anime.js
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.floating-element',
                translateY: [-20, 20],
                duration: 4000,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        }
    }

    setupTypewriter() {
        // Initialize typed.js for hero text
        if (document.querySelector('.typewriter') && typeof Typed !== 'undefined') {
            new Typed('.typewriter', {
                strings: ['الذكاء الاصطناعي', 'التحليلات المتقدمة', 'التنبؤ المبكر'],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    loadRealTimeData() {
        // Simulate real-time data updates
        this.updateAlertSystem();
        
        // Update data every 30 seconds
        this.dataUpdateInterval = setInterval(() => {
            this.updateAlertSystem();
            this.updateMetrics();
        }, 30000);
    }

    updateAlertSystem() {
        const alerts = [
            {
                level: 'critical',
                region: 'الصومال',
                status: 'المجاعة المحتملة',
                population: '7.8 مليون شخص',
                risk: 'مخاطر عالية جداً'
            },
            {
                level: 'warning',
                region: 'السودان',
                status: 'نقص حاد في الغذاء',
                population: '18 مليون شخص',
                risk: 'مخاطر متوسطة إلى عالية'
            },
            {
                level: 'safe',
                region: 'الجزائر',
                status: 'وضع مستقر',
                population: '44 مليون شخص',
                risk: 'مخاطر منخفضة'
            }
        ];

        // Update alert cards with new data
        const alertCards = document.querySelectorAll('.alert-critical, .alert-warning, .alert-safe');
        alertCards.forEach((card, index) => {
            if (alerts[index]) {
                this.updateAlertCard(card, alerts[index]);
            }
        });
    }

    updateAlertCard(card, data) {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        if (title && description) {
            title.textContent = this.getAlertTitle(data.level);
            description.textContent = `${data.region} - ${data.status}`;
        }
    }

    getAlertTitle(level) {
        const titles = {
            'critical': 'حالة طارئة',
            'warning': 'تنبيه متوسط',
            'safe': 'مستقر'
        };
        return titles[level] || 'غير محدد';
    }

    updateMetrics() {
        // Simulate metric updates
        const metrics = {
            regions: Math.floor(Math.random() * 10) + 120,
            crisis: Math.floor(Math.random() * 3) + 7,
            countries: Math.floor(Math.random() * 5) + 40,
            accuracy: (Math.random() * 2 + 93.5).toFixed(1)
        };

        // Update counter elements
        Object.entries(metrics).forEach(([key, value]) => {
            const element = document.getElementById(`${key}-count`);
            if (element) {
                const currentValue = parseInt(element.textContent) || 0;
                this.animateCounter(element, currentValue, value, 1000, key === 'accuracy' ? '%' : '');
            }
        });
    }

    showRegionInfo(region, indicator) {
        const regionData = this.getRegionData(region);
        const infoPanel = document.getElementById('region-info');
        
        if (infoPanel && regionData) {
            document.getElementById('region-name').textContent = regionData.name;
            document.getElementById('region-status').textContent = `الحالة: ${regionData.status}`;
            document.getElementById('region-population').textContent = `السكان: ${regionData.population}`;
            document.getElementById('region-risk').textContent = `مستوى الخطر: ${regionData.risk}`;
            
            infoPanel.classList.remove('hidden');
            
            // Position panel near the indicator
            const rect = indicator.getBoundingClientRect();
            infoPanel.style.top = `${rect.top - 100}px`;
            infoPanel.style.right = '20px';
            
            this.currentRegion = region;
        }
    }

    showRegionPreview(region) {
        // Show quick preview on hover
        const regionData = this.getRegionData(region);
        if (regionData) {
            // Add hover effect to indicator
            const indicator = document.querySelector(`[data-region="${region}"]`);
            if (indicator) {
                indicator.style.transform = 'scale(1.5)';
                indicator.style.zIndex = '10';
            }
        }
    }

    hideRegionPreview() {
        // Reset hover effects
        document.querySelectorAll('.region-indicator').forEach(indicator => {
            indicator.style.transform = 'scale(1)';
            indicator.style.zIndex = '1';
        });
    }

    getRegionData(region) {
        const regionDatabase = {
            'somalia': {
                name: 'الصومال',
                status: 'حالة طارئة - مجاعة محتملة',
                population: '7.8 مليون شخص',
                risk: 'عالية جداً',
                coordinates: { lat: 5.1521, lng: 46.1996 }
            },
            'sudan': {
                name: 'السودان',
                status: 'نقص حاد في الغذاء',
                population: '18 مليون شخص',
                risk: 'متوسطة إلى عالية',
                coordinates: { lat: 15.5007, lng: 32.5599 }
            },
            'algeria': {
                name: 'الجزائر',
                status: 'وضع مستقر',
                population: '44 مليون شخص',
                risk: 'منخفضة',
                coordinates: { lat: 28.0339, lng: 1.6596 }
            },
            'yemen': {
                name: 'اليمن',
                status: 'أزمة إنسانية حادة',
                population: '23 مليون شخص',
                risk: 'عالية',
                coordinates: { lat: 15.5527, lng: 48.5164 }
            },
            'syria': {
                name: 'سوريا',
                status: 'نقص غذاء متزايد',
                population: '12 مليون شخص',
                risk: 'متوسطة',
                coordinates: { lat: 34.8021, lng: 38.9968 }
            }
        };
        
        return regionDatabase[region] || null;
    }

    initializeCharts() {
        this.initializeFamineForecastChart();
        this.initializeResourceAllocationChart();
    }

    initializeFamineForecastChart() {
        const chartElement = document.getElementById('famine-forecast-chart');
        if (!chartElement || typeof echarts === 'undefined') return;

        const chart = echarts.init(chartElement);
        
        const option = {
            title: {
                text: 'توقعات مستوى الأمن الغذائي',
                textStyle: {
                    color: '#374151',
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['المجاعة', 'أزمة غذائية', 'ضغط غذائي', 'مستقر'],
                bottom: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                axisLabel: {
                    color: '#6b7280'
                }
            },
            yAxis: {
                type: 'value',
                name: 'عدد المناطق',
                axisLabel: {
                    color: '#6b7280'
                }
            },
            series: [
                {
                    name: 'المجاعة',
                    type: 'line',
                    data: [2, 3, 2, 4, 5, 3],
                    itemStyle: { color: '#dc2626' },
                    lineStyle: { color: '#dc2626' }
                },
                {
                    name: 'أزمة غذائية',
                    type: 'line',
                    data: [8, 9, 7, 12, 15, 11],
                    itemStyle: { color: '#f59e0b' },
                    lineStyle: { color: '#f59e0b' }
                },
                {
                    name: 'ضغط غذائي',
                    type: 'line',
                    data: [15, 18, 16, 22, 25, 20],
                    itemStyle: { color: '#d97706' },
                    lineStyle: { color: '#d97706' }
                },
                {
                    name: 'مستقر',
                    type: 'line',
                    data: [102, 98, 105, 89, 82, 93],
                    itemStyle: { color: '#10b981' },
                    lineStyle: { color: '#10b981' }
                }
            ]
        };

        chart.setOption(option);
        
        // Make chart responsive
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    initializeResourceAllocationChart() {
        const chartElement = document.getElementById('resource-allocation-chart');
        if (!chartElement || typeof echarts === 'undefined') return;

        const chart = echarts.init(chartElement);
        
        const option = {
            title: {
                text: 'توزيع الموارد حسب النوع',
                textStyle: {
                    color: '#374151',
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} مليون دولار ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['الغذاء', 'الدواء', 'المياه', 'الإيواء', 'الخدمات اللوجستية']
            },
            series: [
                {
                    name: 'الموارد',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['60%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 335, name: 'الغذاء', itemStyle: { color: '#3b82f6' } },
                        { value: 310, name: 'الدواء', itemStyle: { color: '#10b981' } },
                        { value: 234, name: 'المياه', itemStyle: { color: '#06b6d4' } },
                        { value: 135, name: 'الإيواء', itemStyle: { color: '#f59e0b' } },
                        { value: 148, name: 'الخدمات اللوجستية', itemStyle: { color: '#8b5cf6' } }
                    ]
                }
            ]
        };

        chart.setOption(option);
        
        // Make chart responsive
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    handleButtonClick(button) {
        const buttonText = button.textContent.trim();
        
        switch (buttonText) {
            case 'ابدأ الآن':
                this.showComingSoonModal('سيتم توجيهك إلى لوحة التحكم قريباً');
                break;
            case 'شاهد الفيديو':
                this.showComingSoonModal('سيتم تشغيل الفيديو التعريفي قريباً');
                break;
            default:
                this.showComingSoonModal('هذه الميزة قيد التطوير');
        }
    }

    showComingSoonModal(message) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-2xl p-8 max-w-md mx-4 text-center';
        modal.innerHTML = `
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">قريباً جداً</h3>
            <p class="text-gray-600 mb-6">${message}</p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                حسناً
            </button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Close modal on click
        const closeButton = modal.querySelector('button');
        const closeModal = () => {
            document.body.removeChild(overlay);
        };
        
        closeButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        // Auto close after 3 seconds
        setTimeout(closeModal, 3000);
    }

    destroy() {
        // Cleanup intervals and event listeners
        if (this.dataUpdateInterval) {
            clearInterval(this.dataUpdateInterval);
        }
        
        console.log('🌾 Platform destroyed');
    }
}

// Initialize platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.foodSecurityPlatform = new FoodSecurityPlatform();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause real-time updates when page is hidden
        if (window.foodSecurityPlatform) {
            window.foodSecurityPlatform.destroy();
        }
    } else {
        // Resume updates when page becomes visible
        if (!window.foodSecurityPlatform) {
            window.foodSecurityPlatform = new FoodSecurityPlatform();
        }
    }
});

// Export for global access
window.FoodSecurityPlatform = FoodSecurityPlatform;