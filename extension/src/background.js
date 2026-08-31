// Mouse click counter
let mouse_click_counter = 0;
let click_timeout;

chrome.action.onClicked.addListener(function(tab){
    mouse_click_counter++;
    
    if (mouse_click_counter === 1) {

        // Set timeout of first click
        click_timeout = setTimeout(function() {
        	mouse_click_counter = 0;
            redirectTo(tab, 1);
        }, 400);

    } else if (mouse_click_counter === 2) {
        // Clear timeout
        clearTimeout(click_timeout);
        mouse_click_counter = 0;

        // Redirect to page
        redirectTo(tab, 2);
    }
});

function redirectTo (tab, click) {
    const current_url = new URL(tab.url);

    var base_url = '/web/database/';

    // Clean url and concatenate
    // One click redirect to database selector
    // Two clicks redirect to database manager
    if (click == 1) {
        base_url += 'selector';
    } else {
        base_url += 'manager';
    }

    // Get url to redirect
    const url = current_url.origin + base_url;

    // Reload tab to new url
    chrome.tabs.update(tab.id, {'url': url});
}
