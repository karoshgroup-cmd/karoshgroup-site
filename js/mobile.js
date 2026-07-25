(function () {
  var isCapacitor = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

  if (isCapacitor) {
    document.documentElement.style.setProperty('--safe-top', 'env(safe-area-inset-top)');
    var style = document.createElement('style');
    style.textContent =
      '.header,.topbar{padding-top:max(0px, env(safe-area-inset-top));}' +
      '.wa-float{bottom:calc(24px + env(safe-area-inset-bottom));}';
    document.head.appendChild(style);

    if (window.Capacitor.Plugins && window.Capacitor.Plugins.StatusBar) {
      window.Capacitor.Plugins.StatusBar.setStyle({ style: 'DARK' }).catch(function () {});
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    var isExternal =
      href.indexOf('http://') === 0 ||
      href.indexOf('https://') === 0 ||
      href.indexOf('mailto:') === 0 ||
      href.indexOf('tel:') === 0;

    if (!isExternal) return;

    if (isCapacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser) {
      event.preventDefault();
      window.Capacitor.Plugins.Browser.open({ url: href }).catch(function () {
        window.open(href, '_blank');
      });
    }
  });
})();
