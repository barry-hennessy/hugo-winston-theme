# Hugo Winston Theme

Hugo Winston is a bold minimal blogging theme.

[Live Demo](https://hugo-winston.netlify.app/) |
[Zerostatic Themes](https://www.zerostatic.io/)

![Hugo Winston Theme screenshot](https://www.zerostatic.io/theme/hugo-winston/hugo-winston-screenshot.png)

## Theme features

- Posts (Markdown)
- Basic Page (Markdown)
- SCSS (Hugo Pipelines)
- Responsive design
- 100/100 Google Lighthouse speed score
- 100/100 Google Lighthouse SEO score
- 100/100 Google Lighthouse accessibility score
- Google analytics configured in `config.toml`
- Configure GID using env variable HUGO_GOOGLE_ANALYTICS_ID, compatible with Netlify.
- Title, meta description and meta tags automatically generated for every page
- OG Meta data for Facebook and Twitter
- Semantic HTML document structure

## Installation

**1. Install Hugo**

To use this theme you will first need to have Hugo installed. Please follow the official [installation guide](https://gohugo.io/getting-started/installing/)

> ⚠️ **Note:** Check your Hugo version - **Hugo Extended** is required!

This theme uses [Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/) to compile SCSS and minify assets which means if you are not using the Hugo extended version this theme will not work. To check your version of Hugo, run `hugo version`. Make sure you see **/extended** after the version number, for example _Hugo Static Site Generator v0.51/extended darwin/amd64 BuildDate: unknown_ You do not need to use version v0.51 specifically, it just needs to have the _/extended_ part.

**2. Create a new Hugo site**

This will create a fresh Hugo site in the folder `mynewsite`.

```
hugo new site mynewsite
```

**3. Install the theme**

Download or git clone this theme into the sites themes folder `mynewsite/themes`. You should end up with the following folder structure `mynewsite/themes/hugo-winston-theme`

```
cd mynewsite
git clone https://github.com/zerostaticthemes/hugo-winston-theme.git themes/hugo-winston-theme
```

**4. Copy the example content**

Copy the entire contents of the `mynewsite/themes/hugo-winston-theme/exampleSite/` folder to root folder of your Hugo site, ie `mynewsite/`. To copy the files using terminal, make sure you are still in the projects root, ie the `mynewsite` folder.

```
cp -a themes/hugo-winston-theme/exampleSite/. .
```

**6. Run Hugo**

After installing the theme for the first time, generate the Hugo site.

You run this command from the root folder of your Hugo site ie `mynewsite`

```
hugo
```

For local development run Hugo's built-in local server.

```
hugo server
```

Now enter [`localhost:1313`](http://localhost:1313) in the address bar of your browser.

# Configuration

### Config options

```toml
# config.toml
[params]
  google_analytics_id = ""
  twitter_handle = "@zerostaticio"
  showAuthorOnHomepage = true
  showAuthorOnPosts = false
  showPostsOnHomepage = false
  showPostedDate = true
  addDot = true
  addFrame = true
  highlightColor = '#7b16ff'
  baseColor = "#ffffff"
  baseOffsetColor = "#eaeaea"
  highlightColor = "#7b16ff"
  dotColor = "#7b16ff"
  headingColor = "#1c1b1d"
  textColor = "#4e5157"
  # Optional: the rest of the palette (these are the defaults).
  surfaceColor = "#eaeaea"     # cards and panels; defaults to baseOffsetColor
  deepColor = "#f4f4f6"        # a band set deeper than the page
  mutedColor = "#6b6f76"       # secondary text: dates, labels
  emphasisColor = "#1c1b1d"    # text that must stand out; defaults to headingColor
  ruleColor = "#d9d9de"        # quiet rules and borders
  ruleStrongColor = "#b9bcc4"  # stronger rules and borders
```

Every colour is a CSS custom property on `:root` (`--base-color`,
`--surface-color`, `--dot-color`, ...), next to the type scale, spacing,
reading measure and radii tokens: see the top of `assets/scss/style.scss`.

### Header and menu

The header shows the site's title, the `main` menu and, when the site sets
one, a call to action as a button. Below 992px the menu and the button are
behind a hamburger that opens them over the whole screen.

```toml
# config.toml
[[menus.main]]
  name = "Services"
  pageRef = "/services"   # not url: the menu then knows the entry's page
  weight = 10

[params.cta]
  label = "Book a call"
  url = "/call-me/"
```

The link to the page being shown is marked `aria-current="page"`, and the
link to the section it is in `aria-current="true"`; both are underlined.

### Footer

The footer says whose site it is, "© Name · Place", and links to the site's
profiles elsewhere and to the pages of the `footer` menu.

```toml
# config.toml
[params.footer]
  name = "Jo Bloggs"   # defaults to the site's title
  place = "Berlin"     # optional

# Profiles: github, gitlab, codeberg, linkedin, mastodon, bluesky, x and
# youtube, shown in that order. Leave out the ones you don't have.
[params.social]
  github = "https://github.com/jo"
  mastodon = "https://mastodon.social/@jo"

[[menus.footer]]
  name = "Impressum"
  pageRef = "/impressum"
  weight = 10
[[menus.footer]]
  name = "Privacy"
  pageRef = "/privacy"   # left out until the page exists
  weight = 20
```

A footer menu entry whose `pageRef` finds no page is left out, so it can be
set before the page is written.

### Framed pages and pages of bands

A page is laid out in one of two ways, chosen by its layout:

- **framed** (the default): the page sits in a 1000px column, with the
  site's frame around the window when `addFrame` is set.
- **bands**: the page runs to the edges of the window, as a stack of
  sections (see "Sections" below), each with its own background and its
  content at the content's width (`--content-width`). The header and
  footer run the full width too, their content at the same width. There is
  no frame.

A layout chooses bands by defining the `page_layout` block:

```go-html-template
{{ define "page_layout" }}bands{{ end }}

{{ define "main" }}
<main id="main">
  {{ partial "hero.html" (dict "page" . "title" .Title) }}
  ...
</main>
{{ end }}
```

`baseof.html` sets `layout-framed` or `layout-bands` on the `body`. A site
with its own `baseof.html` adds the block to its `body` the same way; until
it does, every page stays framed.

### Sections

The parts a page of bands is built from. Each is a partial called with a
dict of its content and options, and holds no copy of its own; the
comment at the top of each partial lists its arguments. Text arguments
marked Markdown are rendered inline.

**Section** (`section.html`): a band the full width of the window, with
the shared padding (`--section-padding`) and its content at the content's
width. `background` is `default`, `deep` (`--deep-color`) or `highlight`
(`--highlight-color`, with the text in the ground's colour). It can open
with an eyebrow, a heading (with its closing mark) and a lead paragraph,
and is then labelled by the heading. Its `content` is HTML, usually
another partial's output:

```go-html-template
{{ partial "section.html" (dict
     "id" "steps" "background" "deep" "heading" "How it works"
     "content" (partial "rule-list.html" (dict "items" .Params.steps "numbered" true "grid" "steps"))) }}
```

`lead_beside` sets the lead beside the heading, level with its foot,
when there is room; `size` `small` sets a smaller heading
(`heading-subsection`), for a section that is one of a pair.
`narrow` holds the content to `--narrow-width`; the class
`section--flush-top` drops the padding above, for a section that follows
one on the same ground. The colour schemes are classes too:
`scheme-highlight` for text on the highlight colour, `scheme-default` for
a box on such a band that keeps the page's colours.

**Eyebrow** (`eyebrow.html`): a small label above a heading, in capitals
in the accent, or `mono` for monospace as written; `muted` for the muted
colour.

**Grids**: classes for a list or a `div` whose children are laid out in
equal columns, one column on phones. `trio`: 3 across from the medium
breakpoint, or from the small one with `trio--from-small`, for short
items. `quartet`: 4 from the medium breakpoint. `quad`: 4 from the
medium breakpoint, 2 × 2 from the small one. `steps`: 5 from the medium
breakpoint. `duo`: 2 from the small breakpoint. `facts`: 3 from the
medium breakpoint, 2 from the small one. A group of three never wraps to
two and one: a `quad` or `facts` grid of exactly three goes from three
across to one column.

**Fact strip** (`fact-strip.html`): short facts in a row of cells, each a
label over a value (price, size, where), wrapping onto more rows; a
`highlight`ed value is in the accent. **Facts list** (`facts-list.html`):
terms and what they are, as a `dl` in the `facts` grid.

**Picture** (`picture.html`): an image with its `width` and `height`, and
optionally a second image for phones (`wide`, below 767px) in its own
shape, never a crop. An image is looked for as a resource of the `page`,
then as a global resource (`assets/`); a raster image found so gives its
own size and a `srcset` of smaller copies. An SVG, a file in `static/` or
a URL is used as given, with the `width` and `height` passed. With no
`alt` the image is decoration (`alt=""`).

**Actions** (`actions.html`): a row of calls to action, each `label`,
`url` and `style` (`primary`, `on-pink`, `outline`, or `link` for a
`cta-link`), with an optional `note` beside them. `new_tab` opens an
item in a new tab (`rel="noopener"`), for a page on another site; say so
in its label or the note.

**Hero** (`hero.html`): the top of a page of bands: an eyebrow, the h1
with its closing mark, a lead paragraph, an optional fact strip and the
calls to action, with a picture beside them. From 767px to 1199px the
picture takes about a third of the width beside the text, without
wrapping; from 1200px the two share the width; below 767px the picture
runs the full width under the text, as the phone image (`image_wide`)
when there is one. `breadcrumb` shows where the page is above it.

```go-html-template
{{ partial "hero.html" (dict "page" . "title" .Title "lead" .Params.lead
     "image" .Params.image "image_wide" .Params.image_wide "image_alt" .Params.image_alt
     "actions" (slice (dict "label" "Book a call" "url" "/call-me/")
                      (dict "label" "Prices →" "url" "#prices" "style" "link"))) }}
```

**Story card** (`story-card.html`): a picture, a title and a line, one of
a `trio`. From 767px to 991px, where the trio is one column, the picture
sits on the left of the text. With a `url` the whole card is a link
through its title.

**Offer card** (`offer-card.html`): one way to work together, one of a
`trio`: a numbered label, the title, a price with its terms set smaller
("from €4.5k · fixed price"), a line and a call to action. The
`highlight`ed card (usually the first) is edged in the accent on the
surface colour, with a button; the others are outlined quietly, with a
text link. The calls to action of a row line up along the bottom. From
767px to 991px, where the trio is one column, the label, title and price
sit on the left of the line.

**Engagement row** (`engagement.html`): one way to work together, in
detail, one of a list of rows under a rule each: on the left its label,
name, price and call to action, on the right its `details`, labelled
parts ("What you get", "How it runs", "Good for") as a `dl`, three
across from 992px. The `highlight`ed row's rule is in the accent; the
last row closes the list with a rule.

**Rule list** (`rule-list.html`): items each under a rule along the top,
with a small label, a title and a line: method steps, what happens next,
sizes, ways to go. The `highlight`ed item's rule is solid in the accent;
the others' are quiet, `rule` `solid` or `dashed`. `numbered` numbers
them (`true`: 1, 2; `"padded"`: 01, 02); `grid` lays them out with a grid
class (`steps`, `trio`, `quad`). `boxed` sets each item in a box on the
surface colour instead, the highlighted one edged in the accent: what
you get, as four boxes.

**The fork** (`fork.html`): the ways out of a decision, side by side as
`paths` (a dashed rule list), the `highlight`ed one ruled in the accent,
with a line in the accent dropping from it to the `group` it leads to:
a heading ruled in the accent (`label`, `heading`, `text`) over the
`content`, e.g. a row of offer cards, and an optional `note` in
monospace under it all. Set after a panel in the same section, it keeps
its distance. Below 992px there is no line, no
highlighted path and no labels; the other paths sit side by side from
767px and one under the other on phones, and the group keeps its rule.

```go-html-template
{{ partial "fork.html" (dict "heading" "Three ways out" "paths" .Params.paths
     "group" (dict "label" "With me" "heading" "Three ways to work together")
     "content" $offers) }}
```

**Panel** (`panel.html`): two cells side by side from 767px, such as
goals and non-goals, or a good fit and not a fit. Each has a label (a
heading) over a list of `items` or a `text`; the `highlight`ed cell (the
first, unless one is marked) has a rule in the accent along its top, the
other a quiet one.

**Call-to-action band** (`cta-band.html`): a rounded box in the highlight
colour at the content's width, with a heading and a line in the ground's
colour and buttons in the ground's colour (`on-pink`), side by side and
wrapping. An `aside` (e.g. the subscribe box) takes the buttons' place
beside the text, and the buttons go under the text.

**Feature** (`feature.html`): one story told short, such as a case
study: a picture on the left of an eyebrow, the title with its closing
mark, a few paragraphs, a `quote` (as `quote.html` takes) and a link to
the whole story (`action`). The picture sits beside the text as in the
hero, and above it on phones. Pass its title's `id` as the section's
`labelledby`.

**Text block** (`text-block.html`): a smaller heading with its closing
mark over a few paragraphs or a list, in Markdown: one of a pair in a
`duo`.

**Quote** (`quote.html`): a quotation set on its own, with who said it:
a `figure` holding a `blockquote` and a `figcaption` ("— Name, Role").
The quotation marks are the text's own.

**FAQ** (`faq.html`): questions and answers as `details` and `summary`,
without JavaScript; `open_first` shows the first answer.

### Subscribe

`subscribe.html` is a box for signing up to new posts by email: a heading
and a line beside a form of one labelled email field and a button. It is
the same wherever it is used, and keeps the page's colours on a band of
another. The form posts to the site's email provider, from the params;
with no `action`, nothing is rendered:

```toml
# config.toml
[params.subscribe]
  action = "https://provider.example/subscribe"  # where the form posts
  method = "post"                  # optional; "post"
  field = "email"                  # the email field's name; "email"
  heading = "New posts by email"   # optional; this
  text = "A few a year."           # optional
  label = "Email address"          # the field's label; this
  button = "Subscribe"             # the button's text; this
  placeholder = "you@example.com"  # optional
  # Hidden fields the provider needs; a list, as Hugo lowercases the
  # keys of a table.
  hidden = [{ name = "listId", value = "1234" }]
```

`heading` and `text` can also be passed to the partial, with an `id` when
the box is on a page more than once.

A page's `showPostedDate` overrides the site's for that page's summary.
To hide the dates of all the pages of a section, set it in the section's `cascade`:

```yaml
# content/projects/_index.md
cascade:
  showPostedDate: false
```

### Google Analytics

Add your google analytics ID to the `config.toml`

```toml
# config.toml
[params]
  google_analytics_id="UA-132398315-1"
```

### Plausible Analytics

Add your plausible analytics domain to the `config.toml`.
This is `data-domain` in your [tracking script code](https://plausible.io/docs/plausible-script).

```
// config.toml
[params]
  plausible_analytics_domain = "barryhennessy.com"
```

# Deploying to Netlify

Use Netlify to deploy this theme. This theme contains a valid and tested `netlify.toml` - Feel free to use the 1-click deploy below.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zerostaticthemes/hugo-winston-theme)

This theme includes a `netlify.toml` which is configured to deploy to Netlify from the `exampleSite` folder. See this discussion on how to deploy your site on Netlify from the `exampleSite` folder - https://discourse.gohugo.io/t/deploy-your-theme-to-netlify/15508

Most likely if you are deploying to Netlify and created a new Hugo site or added this theme to an existing Hugo site then you are not deploying from the `exampleSite` directory and you can delete the `netlify.toml` file.

### Other Hugo Themes by Zerostatic

- [Hugo Whisper](https://github.com/zerostaticthemes/hugo-whisper-theme)
- [Hugo Serif](https://github.com/zerostaticthemes/hugo-serif-theme)
- [Hugo Winston](https://github.com/zerostaticthemes/hugo-winston-theme)
- [Hugo Advance](https://www.zerostatic.io/theme/hugo-advance/)
- [Hugo Paradigm](https://www.zerostatic.io/theme/hugo-paradigm/)

🇦🇺 **Made in Australia** by Robert Austin - leave a star mate!
