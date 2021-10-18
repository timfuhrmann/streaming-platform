import { css } from "styled-components";

export const reset = css`
    // This is adapted from normalize.css but specialized for the specific needs of Becklyn Studios
    // http://necolas.github.io/normalize.css/

    // ---------------------------------------------------------------------------------------------------------
    // Document
    // ---------------------------------------------------------------------------------------------------------

    html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
        // use px here, as IE 11 has SVG rendering issues, when using rem as height with %-based font-size on the html element
        font-size: 10px;
    }

    * {
        padding: 0;
        margin: 0;
    }

    *,
    ::before,
    ::after {
        box-sizing: inherit;
    }

    body {
        font: 1.6rem / 1.2 sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Grouping content
    // ---------------------------------------------------------------------------------------------------------

    main {
        display: block;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: inherit;
        font-weight: inherit;
        font-style: inherit;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Text level semantics
    // ---------------------------------------------------------------------------------------------------------

    b,
    strong {
        font-weight: 700;
    }

    a {
        color: inherit;
        text-decoration: none;
        background-color: transparent;
    }

    code,
    kbd {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    small {
        font-size: 80%;
    }

    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Embedded content
    // ---------------------------------------------------------------------------------------------------------

    audio,
    video {
        display: block;
    }

    audio:not([controls]) {
        display: none;
        height: 0;
    }

    img {
        border-style: none;
        max-width: 100%;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Forms
    // ---------------------------------------------------------------------------------------------------------

    // Don't forget to style the focus state as well!
    button {
        color: inherit;
        border: 0;
        border-radius: 0;
        -webkit-font-smoothing: inherit;
        letter-spacing: inherit;
        background: none transparent;
        cursor: pointer;
        -webkit-appearance: button;
        outline: 0;
    }

    button,
    input {
        overflow: visible;
    }

    button,
    input,
    textarea {
        font: inherit;
        text-align: inherit;
    }

    input:disabled,
    textarea:disabled {
        color: inherit;
    }

    button,
    select {
        text-transform: none;
    }

    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }

    [type="checkbox"],
    [type="radio"] {
        box-sizing: border-box;
        padding: 0;
    }

    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }

    :focus {
        outline: 0;
    }

    ::-moz-focus-inner {
        padding: 0;
        border: 0;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Tables
    // ---------------------------------------------------------------------------------------------------------

    table {
        border-collapse: collapse;
    }

    th {
        text-align: left;
        font-weight: inherit;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Interactive
    // ---------------------------------------------------------------------------------------------------------

    details,
    menu {
        display: block;
    }

    summary {
        display: list-item;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Scripting
    // ---------------------------------------------------------------------------------------------------------

    template {
        display: none;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Hidden
    // ---------------------------------------------------------------------------------------------------------

    [hidden] {
        display: none;
    }

    // ---------------------------------------------------------------------------------------------------------
    // SVG
    // ---------------------------------------------------------------------------------------------------------

    svg {
        // By default IE11 renders SVGs with overflow enabled, which can caused weird rendering issues
        overflow: hidden;
        display: inline-block;
    }

    // ---------------------------------------------------------------------------------------------------------
    // Lists
    // ---------------------------------------------------------------------------------------------------------

    // Disable list styling on lists by default, as the styling should be set
    // explicitly in the \`.content\` class (already done in the \`content()\` mixin.
    ul,
    ol {
        list-style: none;
    }
`;
