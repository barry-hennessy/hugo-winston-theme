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
