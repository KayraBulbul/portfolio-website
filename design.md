# Design: Kayra Bulbul portfolio

A clean, text-first personal site for a backend and infrastructure engineer.
The audience is recruiters and other developers. The site's job is to show real
work quickly, surface recent writing, and make contact easy.

## Principles

- **One bold moment.** The large intro on the homepage is the only
  display-size type. The first sentence is set larger in ink and the rest is
  smaller in muted grey. Its inline links (projects, devlog, get in touch) are the
  primary navigation. Everything else stays quiet.
- **Orange is the only colour.** It marks interactivity: link underlines,
  hover states, focus rings, the current nav item, and selected filters. It is
  never used for decoration.
- **Lists, not cards.** Projects and posts are rows separated by 1px rules.
  The whole row is the link, and hovering turns the title orange.
- **Structure only where it carries meaning.** No numbered markers, no
  all-caps labels, no mono labels, and no arrows appended to link text. The
  back link on detail pages is the one arrow, because it shows direction.
- **Motion answers the user.** Only colour transitions on hover. Reduced
  motion disables them.

## Tokens

Canonical values live in `tokens.css`.

| Role        | Light     | Dark      |
| ----------- | --------- | --------- |
| Paper       | `#fcfcfb` | `#15171a` |
| Ink         | `#1d2024` | `#e9eaec` |
| Muted       | `#62676f` | `#9aa0a8` |
| Rule        | `#e3e5e8` | `#2b2f34` |
| Accent      | `#f2711c` | `#ff8a3d` |
| Accent text | `#c2410c` | `#ff9a55` |

`--color-accent` is for fills and underlines. `--color-accent-text` is for
orange text, because it meets 4.5:1 contrast on the paper colour.

## Type

- **Atkinson Hyperlegible Next** for everything. It was designed by the Braille
  Institute for legibility, which fits a site whose headline project (Legible)
  is about readable web pages.
- **Atkinson Hyperlegible Mono** for code only.
- Scale: 14 / 17 / 20 / 24 / 32px, plus a fluid 24–34px intro.
- Body text measure is capped at 38rem.

## Layout and flow

- A single 44rem column, left-aligned and centred on the page.
- Header: name (home), Projects, Devlog, Resume (PDF), and a theme toggle. It
  fits on mobile without a menu.
- Home: intro, then Projects (homepage projects, without stacks), Devlog
  (latest 5), and About with skills.
- The footer is the contact section on every page: a short pitch, the email
  address as a large link, then social links.
- Archives (`/projects`, `/devlog`): title search plus a dropdown checklist of
  technologies or tags, with its own search so it scales as tags grow.
  Matching is "any selected tag".
- Detail pages: back link, title, lede, facts (stack, links), then
  prose. Figures break out to the full column width.

## Theme

With no stored preference, the site follows `prefers-color-scheme`. The
toggle stores an explicit choice in `localStorage.theme`, and a script in
`index.html` applies the `.dark` class before first paint.
