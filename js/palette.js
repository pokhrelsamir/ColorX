/**
 * ColorX
 * Color Palette Generator
 */


/* ================= CONSTANTS ================= */

const PALETTE_SIZE = 5;


/* ================= COLOR GENERATION ================= */

/**
 * Generate a random HEX color.
 *
 * @returns {string}
 */
function generateColor() {

    const characters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {

        const index = Math.floor(
            Math.random() * characters.length
        );

        color += characters[index];
    }

    return color;
}


/**
 * Generate a complete palette.
 *
 * Locked colors are preserved.
 *
 * @param {Array} currentPalette
 * @param {Array} lockedColors
 * @returns {Array}
 */
function generatePalette(currentPalette = [], lockedColors = []) {

    const palette = [];

    for (let i = 0; i < PALETTE_SIZE; i++) {

        if (
            currentPalette[i] &&
            lockedColors[i]
        ) {
            palette.push(currentPalette[i]);
        } else {
            palette.push(generateColor());
        }

    }

    return palette;
}