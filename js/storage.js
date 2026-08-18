/**
 * ColorX
 * Local Storage Manager
 */


const STORAGE_KEY = "colorx_saved_palettes";


/**
 * Get all saved palettes.
 *
 * @returns {Array}
 */
function getSavedPalettes() {

    try {

        const stored =
            localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return [];
        }

        return JSON.parse(stored);

    } catch (error) {

        console.error(
            "Unable to load saved palettes:",
            error
        );

        return [];
    }
}


/**
 * Save a palette.
 *
 * @param {Array} colors
 */
function savePalette(colors) {

    const palettes =
        getSavedPalettes();

    const newPalette = {

        id: Date.now(),

        colors: [...colors],

        createdAt:
            new Date().toISOString()
    };


    palettes.unshift(newPalette);


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(palettes)
    );
}


/**
 * Delete a saved palette.
 *
 * @param {number} id
 */
function deletePalette(id) {

    const palettes =
        getSavedPalettes().filter(
            palette => palette.id !== id
        );


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(palettes)
    );
}