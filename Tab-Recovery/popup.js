function onError(error) {
  console.log(`Error: ${error}`);
}

function tabStorage() {
  var querying = browser.tabs.query({});
  querying.then((tabs) => {
    // for (let tab of tabs) {
    //   console.log(`tab:${tab.url}`);
    // }
    browser.storage.local.set({'tabs': tabs});
  }, onError)
}

function tabRecovery() {
  var tabs = browser.storage.local.get('tabs');
  tabs.then((item) => {
    if (item.tabs instanceof Array) {
      for (let i of item.tabs) {
        browser.tabs.create({active: false, url: i.url})
            .then(
                (t => { console.log(`Created new tab: ${t.url}`); }), onError);
      }
    }
  }, onError);
}

function tabClear() {
  browser.storage.local.remove('tabs').then(
      () => { console.log('tabs remove OK'); }, onError);
}

var btn_storage = document.getElementById('storage');
btn_storage.onclick = tabStorage;

var btn_recovery = document.getElementById('recovery');
btn_recovery.onclick = tabRecovery;

var btn_clear = document.getElementById('clear');
btn_clear.onclick = tabClear;