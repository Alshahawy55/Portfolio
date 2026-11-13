# Ahmed Alshahawy — Curiosity at work

A responsive, buildless portfolio using plain HTML, CSS, and JavaScript. Blue, green, warm white, self-hosted DM Sans, and a little personality. Content is based on the CV supplied on 13 November 2026.

## Open it locally

Extract the ZIP and open `index.html` in your browser. Both pages, local fonts, images, CV download, skill buttons, and the email draft builder work without installing dependencies. For a local server, optionally run `python3 -m http.server 8000` in this folder, then visit `http://localhost:8000`.

## Replace the existing GitHub portfolio

1. Keep a backup or branch of the old repository if you want to retain the original design.
2. Copy **the contents of this folder** into the root of `Alshahawy55/Portfolio`, replacing `index.html` and adding the other files and folders. Do not upload the ZIP itself or put everything inside an extra nested folder.
3. Commit and push the files to the branch used by GitHub Pages.
4. If Pages is not configured, open the repository's **Settings → Pages**, choose **Deploy from a branch**, then choose the appropriate branch (usually `main`) and **/ (root)**. Save.
5. Use the published address displayed by GitHub Pages for your CV and LinkedIn. Publication may take a few minutes.

If the repository already uses a custom GitHub Actions Pages workflow, point that workflow at these static files or switch to branch deployment. There is no npm install or build step.

All site links use relative paths, so the pages work under a GitHub project subpath such as `/Portfolio/`, at a domain root, and directly from disk. The files in this package are the same website files used in the preview; the README is supplementary. Old `css.css` and `images/` files are no longer referenced and can be retained or removed at your discretion.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Main portfolio: introduction, outcomes, all five roles, skills, future projects, education, courses, professional skills |
| `contact.html` | LinkedIn link, email address, copy button, and email draft builder |
| `styles.css` | Complete design, responsive layouts, reduced-motion support, print styles |
| `script.js` | Mobile menu, five skill panels, copy actions, email draft builder, footer year |
| `assets/ahmed.png` | Original portrait from your repository |
| `assets/Ahmed-Alshahawy-CV.pdf` | The uploaded CV, unchanged |
| `assets/favicon.svg` | Custom monogram icon |
| `assets/fonts/` | DM Sans fonts and their SIL Open Font License |
| `.nojekyll` | Keeps GitHub Pages from processing the site with Jekyll |

## What the contact box does

It validates the visitor's name, email, and message, then opens a `mailto:` draft addressed to **alshahawy55@gmail.com**, containing the chosen subject and message. The visitor reviews and sends it in their email application. The website does **not** send email directly, store submissions, or report a message as sent.

If the visitor has no email handler configured, they can use **Copy message instead** and paste into their preferred email service. A separate **Copy** button copies your address. Clipboard restrictions vary by browser; manual-copy guidance is shown if copying fails. The form's fields are not saved to local storage.

For direct in-page delivery in the future, connect a real form service or server endpoint and replace the draft handler. A production email API secret must live on a server, never in this public repository. No third-party form service is configured or required by this version.

## Updating content

- **Experience, education, courses, and project plans:** edit `index.html`.
- **Technical skills:** edit the `skills` object in `script.js`; keep the initial SQL panel and the no-JavaScript summary in `index.html` in sync.
- **Contact details:** update both HTML pages and the `CONTACT_EMAIL` constant in `script.js`.
- **CV:** replace `assets/Ahmed-Alshahawy-CV.pdf` with the updated PDF using the same filename.
- **Colours:** edit the CSS variables at the beginning of `styles.css`.
- **Fonts:** DM Sans is included locally. Helvetica Neue, Helvetica, and Arial are fallbacks.

## Adding real projects later

The three cards in `#lab` are explicitly labelled as future work, not live applications. They deliberately have no fake demo buttons.

When a project is ready:

1. Put a short GIF, poster image, or MP4 into `assets/projects/` (create the folder).
2. Replace one `article.project-card` with a real title, the question it answers, your approach, verified findings, and tools used.
3. Replace its decorative `.project-art` illustration with an accessible image or video, for example:

```html
<div class="project-art">
  <video controls playsinline preload="metadata"
    poster="assets/projects/dashboard-poster.jpg"
    style="width:100%;height:100%;object-fit:cover"
    aria-label="Walkthrough of the customer support dashboard">
    <source src="assets/projects/dashboard-walkthrough.mp4" type="video/mp4">
    Your browser does not support embedded video.
  </video>
</div>
```

4. Add real links to its repository or live application. Use `target="_blank" rel="noopener noreferrer"` for new-tab links.
5. Update the section introduction, status labels, and footnote so they accurately describe what is published versus planned.

Use permissioned or anonymised demonstration data for publicly shared dashboards. Embedded BI reports must be deliberately configured for their intended audience; a static website cannot change a report's access controls.

## Accessibility and responsiveness

The layout adapts for desktop, tablet, and phone widths, including 320px screens. It includes semantic headings, native expandable experience entries, keyboard-operable controls, explicit form labels, visible focus styles, a skip link, responsive navigation, and reduced-motion preferences. Most portfolio content remains readable without JavaScript; the skill switcher, mobile menu, and enhanced contact actions use JavaScript.

There are no analytics, cookies, trackers, external font requests, framework dependencies, or paid services in this version.
