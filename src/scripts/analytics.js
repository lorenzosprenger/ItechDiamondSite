window.addEventListener('load', () => {
    if (window.location.hostname !== 'localhost' && window.location.hostname.includes('itech-diamond.com.br')) {
        // Speed Insights
        const speedScript = document.createElement('script');
        speedScript.src = '/_vercel/speed-insights/script.js';
        document.head.appendChild(speedScript);

        // Analytics
        const analyticsScript = document.createElement('script');
        analyticsScript.src = '/_vercel/analytics/script.js';
        document.head.appendChild(analyticsScript);
    }
});
