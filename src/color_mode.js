// @ts-check

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

/*!
 * This script is based on the original script by the Bootstrap Authors,
 * and has been modified by FairWind Platform Development Team.
 * The script is typed using JSDoc, and may be type-checked on VSCode.
 */

(() => {
    ("use strict");

    /**
     * Get the stored theme from the local storage.
     * @returns {"auto" | "dark" | "light" | null} The stored theme.
     */
    const getStoredTheme = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "auto" || theme === "dark" || theme === "light") {
            return theme;
        } else {
            return "auto";
        }
    };

    /**
     *
     * @param {"auto" | "dark" | "light"} theme The theme to store.
     * @returns {void}
     */
    const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

    /**
     * Get the preferred theme from the user's system settings.
     * @returns {"auto" | "dark" | "light"} The preferred theme.
     */
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    /**
     * Set the theme on the document element.
     * @param {"auto" | "dark" | "light"} theme The theme to set.
     */
    const setTheme = (theme) => {
        if (
            theme === "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    };

    setTheme(getPreferredTheme());

    /**
     * Show the active theme on the theme switcher.
     * @param {"auto" | "dark" | "light"} theme The theme currently active.
     * @param {boolean} focus Whether to focus the theme switcher.
     * @returns {void}
     */
    const showActiveTheme = (theme, focus = false) => {
        /**
         * @type {HTMLButtonElement | null}
         */
        const themeSwitcher = document.querySelector("#bd-theme");

        if (!themeSwitcher) {
            return;
        }

        const themeSwitcherText = document.querySelector("#bd-theme-text");
        const activeThemeIcon = document.querySelector(
            "#bd-theme i[data-bs-icon]",
        );

        /**
         * @type {HTMLButtonElement | null}
         */
        const btnToActive = document.querySelector(
            `[data-bs-theme-value="${theme}"]`,
        );

        if (!btnToActive || !activeThemeIcon || !themeSwitcherText) {
            return;
        }
        const btnToActiveIcon = btnToActive.querySelector("i");
        if (!btnToActiveIcon) {
            return;
        }

        const svgOfActiveBtn = btnToActiveIcon.getAttribute("data-bs-icon");

        document
            .querySelectorAll("[data-bs-theme-value]")
            .forEach((element) => {
                element.classList.remove("active");
                element.setAttribute("aria-pressed", "false");
            });

        btnToActive.classList.add("active");
        btnToActive.setAttribute("aria-pressed", "true");
        activeThemeIcon.classList.replace(
            activeThemeIcon.getAttribute("data-bs-icon") || "",
            svgOfActiveBtn || "",
        );
        activeThemeIcon.setAttribute("data-bs-icon", svgOfActiveBtn || "");
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

        if (focus) {
            themeSwitcher.focus();
        }
    };

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            const storedTheme = getStoredTheme();
            if (storedTheme !== "light" && storedTheme !== "dark") {
                setTheme(getPreferredTheme());
            }
        });

    window.addEventListener("DOMContentLoaded", () => {
        showActiveTheme(getPreferredTheme());

        document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const theme = toggle.getAttribute("data-bs-theme-value");
                if (theme !== "auto" && theme !== "dark" && theme !== "light") {
                    return;
                }
                setStoredTheme(theme);
                setTheme(theme);
                showActiveTheme(theme, true);
            });
        });
    });
})();
