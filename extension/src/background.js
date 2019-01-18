// Mouse click counter
var mouse_click_counter = 0;

chrome.browserAction.onClicked.addListener(function(tab){
    mouse_click_counter++;
    
    if (mouse_click_counter === 1) {

        // Set timeout of first click
        sct = setTimeout(function() {
        	mouse_click_counter = 0;
            redirectTo(tab, click=1);
        }, 400);

    } else if (mouse_click_counter === 2) {
        // Clear timeout
        clearTimeout(sct);
        mouse_click_counter = 0;

        // Redirect to page
        redirectTo(tab, click=2);
    }
});

function redirectTo (tab, click) {
    
    // Create <a> element</a>
    const el = document.createElement('a');

    //Update href attribute receive url of current tab
    el.href = tab.url;

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
    const url = el.origin + base_url;

    // Reload tab to new url
    chrome.tabs.update(tab.id, {'url': url});
}
