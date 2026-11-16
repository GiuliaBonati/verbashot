
/*
 * VerbaShot — Screenshot Capture
 * Version: 0.1.0
 */

// Get elements from the popup
const captureButton = document.getElementById("capture-btn");
const statusMessage = document.getElementById("status");

// Listen for a click on the capture button
captureButton.addEventListener("click", async () => {
  captureButton.disabled = true;
  statusMessage.textContent = "Capturing screenshot...";

  try {
    // Capture the visible area of the current Chrome tab
    const imageDataUrl = await chrome.tabs.captureVisibleTab(
      undefined,
      { format: "png" }
    );

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `VerbaShot_${timestamp}.png`;

    // Download the screenshot
    await chrome.downloads.download({
      url: imageDataUrl,
      filename: filename,
      saveAs: false
    });

    statusMessage.textContent = "Screenshot saved successfully!";

  } catch (error) {
    console.error("Screenshot error:", error);
    statusMessage.textContent = `Error: ${error.message}`;

  } finally {
    captureButton.disabled = false;
  }
});
