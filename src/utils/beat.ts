/**
 * Live loudness of the music, 0 to 1. useMusic writes it; the sparkles canvas reads it.
 * The same value is also published as the CSS variable --beat for glows and pulses.
 */
export const beat = { value: 0 };
