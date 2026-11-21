# Nikah invitation: Sayed Iftekhar Ali & Sagufta Anjum

React + TypeScript + Vite. Animated entrance doors, drawing geometric rosette, swinging lanterns, live countdown,
Mehndi and Nikah timeline, illustrated dulha and dulhan, venue map, photo gallery, poem, family section,
add-to-calendar, music, and an RSVP form that saves into a Google Form.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript check
npm run build      # outputs dist/, upload that folder to Netlify, Vercel or GitHub Pages
```

## What to edit

Everything is in `src/config.ts`: names, parents, event times, venue, poem, family, contact numbers, music
and Google Form IDs. Also check the `<title>` and description in `index.html`.

### Please confirm these (they were not on the invitation card)

- **Mehndi time.** The card gives only the date (Tuesday 22 December). The page says "Evening". Edit
  `timeLabel` in `events` if you have a time.
- **Nikah clock time.** The card says "after Namaz-e-Zohar", and that is what guests see. For the countdown and
  the calendar file I used 1:00 PM IST. Change `startISO` in `nikah` to match the family's plan.
- **Venue for the Mehndi.** I took "same place" to mean the Mehndi is at the same venue. The venue note says so.
  Edit `venue.note` if that is wrong.
- **Arrival time slots** in `RSVP.arrivalSlots` are guesses built around a Zohar Nikah.
- The card also lists "Sahin Mirza (Brother's wife)" under Sisters. That name was not in the text you sent, so
  it is not on the site. Add it to `family.groups` if you want it.

## Venue photos

Save photos of Woodland Odisha Restaurant & Convention in `public/photos/` as `venue-1.jpg` to `venue-6.jpg`.
They appear in the "Around the venue" section automatically. Missing files are skipped, and the section stays
hidden until at least one exists. Use photos you took, photos the venue sent you, or ones the venue says you may
use.

## Music

The music is a YouTube video, set by `MUSIC.youtubeId` in `src/config.ts` (currently `BzmgZfwuA50`). It plays
through YouTube's own embedded player, hidden off-screen, when the guest taps **Open invitation** (browsers only
allow sound after a tap). A round button (bottom right) pauses or resumes it.

Things to know:

- **Check it before sending.** Open the deployed site on a phone and tap Open invitation. Some videos block
  embedding, and some music videos are removed or blocked in certain countries. If YouTube can't play it, the page
  falls back to `public/audio/nasheed.mp3` if that file exists, and otherwise to a soft synthesized drone.
- **It will not play from a double-clicked `index.html` file.** YouTube refuses embeds with no web address. It works
  on `npm run dev` and on the deployed https site.
- **Ads and links.** YouTube may show an ad before the track on some videos, and the video stays under YouTube's
  terms and the owner's rights. For a fully controlled version, use your own licensed audio: set `youtubeId` to `''`
  and save the file as `public/audio/nasheed.mp3`.
- A vocals-only nasheed, or one with a duff (frame drum), is the usual choice, so ask the family.

## Google Form (events, veg / non-veg, arrival time)

1. Create a Google Form with these questions:

   | Question | Type | Options (type them exactly) | Required |
   | --- | --- | --- | --- |
   | Name | Short answer | | Yes |
   | Can you come? | Multiple choice | `Yes`, `No` | Yes |
   | Number of guests | Short answer | | No |
   | Which events will you attend? | **Checkboxes** | `Mehndi, Tuesday 22 December`, `Nikah and lunch, Wednesday 23 December` | **No** |
   | Meal | Multiple choice | `Veg`, `Non-veg` | **No** |
   | Arrival time on 23 December | Multiple choice | the four labels in `RSVP.arrivalSlots` | **No** |
   | Message | Paragraph | | No |

   Guests, events, meal and arrival must stay optional. Guests who say No skip them, and Google drops the reply
   silently if a required question is empty.

2. Settings: turn **off** "Limit to 1 response" and "Require sign-in", or guests will be rejected.
3. Form ID: open the form's **Send** link. In `https://docs.google.com/forms/d/e/<FORM_ID>/viewform`, copy
   `<FORM_ID>` into `RSVP.formId`.
4. Field IDs: in the form editor, click the three dots, then **Get pre-filled link**. Tick one option in every
   question, press **Get link**, and copy it. It looks like `...&entry.1234567=Imran&entry.7654321=Yes...`.
   Paste each `entry.NNN` into `RSVP.entries` next to the matching field.
5. Test: open the invitation, send a reply, and check the form's **Responses** tab.

Until `formId` is filled in, the form runs in demo mode (it shows a success screen but saves nothing).

The page only asks for arrival time when a guest ticks the Nikah, because arrival is for 23 December.

**Counting meals for the caterer:** in Responses, click **Link to Sheets**, then use
`=SUMIFS(C:C, E:E, "Veg")` and `=SUMIFS(C:C, E:E, "Non-veg")` (adjust the column letters to your sheet) to
total guests by meal, and a `COUNTIF` on the events column to count each day.

## Notes

- Respects `prefers-reduced-motion`: everything shows, nothing moves.
- Fonts (Amiri and Jost) load from Google Fonts, so a connection is needed for the intended look.
- Google does not tell other websites whether a form submission succeeded, so the page treats a successful
  network request as sent. Always run the test in step 5.
- The phone numbers appear on the public page as call and WhatsApp links, as on the printed card.
