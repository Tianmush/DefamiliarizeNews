document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                const currentTab = tabs[0];
                chrome.tabs.sendMessage(currentTab.id, {action: "toggleExtension"}, function(response) {
                    if (response && response.status === "on") {
                        document.getElementById('status').textContent = "Status: On";
                    } else {
                        document.getElementById('status').textContent = "Status: Off";
                    }
                });
            });
        });
    }
});