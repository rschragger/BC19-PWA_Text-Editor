const buttonInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    buttonInstall.classList.toggle('hidden', false);
});
 
// A click event handler on the `buttonInstall` element
buttonInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) { return; }
    promptEvent.prompt();
    window.deferredPrompt = null;
    buttonInstall.classList.toggle('hidden', true);
});

// A handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
