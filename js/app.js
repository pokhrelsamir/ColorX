/**
 * ColorX
 * Main Application
 */


/* ================= STATE ================= */

let currentPalette = [];

let lockedColors = [
    false,
    false,
    false,
    false,
    false
];


/* ================= DOM ================= */

const paletteElement =
    document.getElementById("palette");

const generateButton =
    document.getElementById("generateBtn");

const savePaletteButton =
    document.getElementById("savePaletteBtn");

const copyPaletteButton =
    document.getElementById("copyPaletteBtn");

const savedPalettesElement =
    document.getElementById("savedPalettes");

const emptyState =
    document.getElementById("emptyState");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        generateNewPalette();

        renderSavedPalettes();

    }
);


/* ================= GENERATE ================= */

function generateNewPalette() {

    currentPalette =
        generatePalette(
            currentPalette,
            lockedColors
        );

    renderPalette();
}


/* ================= RENDER PALETTE ================= */

function renderPalette() {

    paletteElement.innerHTML = "";


    currentPalette.forEach(
        (color, index) => {

            const card =
                document.createElement("div");

            card.className =
                "color-card";


            card.style.backgroundColor =
                color;


            card.innerHTML = `

                <div class="color-info">

                    <span class="color-code">
                        ${color}
                    </span>

                    <button
                        class="lock-btn ${
                            lockedColors[index]
                                ? "locked"
                                : ""
                        }"
                        type="button"
                        aria-label="${
                            lockedColors[index]
                                ? "Unlock color"
                                : "Lock color"
                        }"
                    >
                        ${
                            lockedColors[index]
                                ? "🔒"
                                : "🔓"
                        }
                    </button>

                </div>

            `;


            /* Copy color */

            card.addEventListener(
                "click",
                () => {

                    copyToClipboard(color);

                }
            );


            /* Lock / unlock */

            const lockButton =
                card.querySelector(
                    ".lock-btn"
                );


            lockButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    lockedColors[index] =
                        !lockedColors[index];

                    renderPalette();

                }
            );


            paletteElement.appendChild(card);

        }
    );
}


/* ================= COPY COLOR ================= */

async function copyToClipboard(color) {

    try {

        await navigator.clipboard.writeText(
            color
        );

        showToast(
            `${color} copied to clipboard`
        );

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

        showToast(
            "Unable to copy color"
        );

    }
}


/* ================= COPY PALETTE ================= */

async function copyCurrentPalette() {

    const text =
        currentPalette.join("\n");


    try {

        await navigator.clipboard.writeText(
            text
        );

        showToast(
            "Palette copied to clipboard"
        );

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

        showToast(
            "Unable to copy palette"
        );

    }
}


/* ================= SAVE ================= */

function saveCurrentPalette() {

    savePalette(
        currentPalette
    );

    renderSavedPalettes();

    showToast(
        "Palette saved"
    );
}


/* ================= RENDER SAVED ================= */

function renderSavedPalettes() {

    const palettes =
        getSavedPalettes();


    if (palettes.length === 0) {

        savedPalettesElement.innerHTML = "";

        savedPalettesElement.appendChild(
            emptyState
        );

        return;
    }


    savedPalettesElement.innerHTML = "";


    palettes.forEach(
        palette => {

            const element =
                document.createElement("article");


            element.className =
                "saved-palette";


            const colors =
                palette.colors
                    .map(
                        color => `
                            <div
                                class="saved-color"
                                style="background-color: ${color}"
                                title="${color}"
                            ></div>
                        `
                    )
                    .join("");


            element.innerHTML = `

                <div class="saved-colors">
                    ${colors}
                </div>

                <div class="saved-info">

                    <span class="saved-date">
                        ${formatDate(
                            palette.createdAt
                        )}
                    </span>

                    <button
                        class="delete-btn"
                        type="button"
                        aria-label="Delete palette"
                    >
                        ✕
                    </button>

                </div>

            `;


            const deleteButton =
                element.querySelector(
                    ".delete-btn"
                );


            deleteButton.addEventListener(
                "click",
                () => {

                    deletePalette(
                        palette.id
                    );

                    renderSavedPalettes();

                    showToast(
                        "Palette deleted"
                    );

                }
            );


            savedPalettesElement.appendChild(
                element
            );

        }
    );
}


/* ================= DATE ================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* ================= EVENTS ================= */

generateButton.addEventListener(
    "click",
    generateNewPalette
);


savePaletteButton.addEventListener(
    "click",
    saveCurrentPalette
);


copyPaletteButton.addEventListener(
    "click",
    copyCurrentPalette
);