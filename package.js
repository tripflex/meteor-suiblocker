Package.describe({
    name: 'tripflex:suiblocker',
    version: '1.0.0',
    summary: 'UI blocker and loading spinner using Semantic UI dimmer and loader CSS',
    git: 'https://github.com/tripflex/meteor-suiblocker',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use(['reactive-var', 'templating'], 'client');
    api.addFiles(['client/main.html', 'client/main.js', 'client/main.css'], 'client');
    api.export('SUIBlock', 'client');
});
