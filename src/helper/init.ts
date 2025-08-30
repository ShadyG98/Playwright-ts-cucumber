import fs from "fs-extra";

export async function initTestResults() {
    try {
        await fs.ensureDir("test-results");
        await fs.emptyDir("test-results");
        await fs.ensureDir("test-results/screenshots");
    } catch (error) {
        console.log("Folder not created! " + error);
    }
}

initTestResults();
