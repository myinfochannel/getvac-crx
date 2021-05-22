let color = '#3aa757';

try {  //service worker do not support dom based libraries
 //  importScripts("jquery.min.js");
  // importScripts("myscript.js");
  // importScripts("popper.min.js");
  // importScripts("bootstrap.min.js");
} catch (e) {
 
  console.error(e);
}

 
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
