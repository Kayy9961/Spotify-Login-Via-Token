document.getElementById('save').addEventListener('click', async () => {
  const token = document.getElementById('token').value.trim();

  if (!token) {
    alert("Por favor, pega tu token Token.");
    return;
  }

  chrome.cookies.set({
    url: "https://spotify.com",
    name: "sp_dc",
    value: token,
    domain: ".spotify.com",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "no_restriction"
  }, async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes("spotify.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => location.reload()
      });
    }
    alert("Token guardado correctamente.");
  });
});
