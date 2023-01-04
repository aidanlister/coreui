---
layout: docs
title: Bootstrap progress
description: Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.
group: components
toc: true
other_frameworks: progress
---

## How it works

{{< callout info >}}
**New markup in v5.0.0 —** We've deprecated the previous HTML structure for progress bars and replaced it with a more accessible one. The previous structure will continue to work until v6. [See what's changed in our migration guide.]({{< docsref "/migration#improved-markup-for-progress-bars" >}})
{{< /callout >}}

Progress components are built with two HTML elements, some CSS to set the width, and a few attributes. We don't use [the HTML5 `<progress>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), ensuring you can stack progress bars, animate them, and place text labels over them.

- We use the `.progress` as a wrapper to indicate the max value of the progress bar. The `.progress` wrapper also requires a `role="progress"` and `aria` attributes to make it accessible, including an accessible name (using `aria-label`, `aria-labelledby`, or similar).
- We use the inner `.progress-bar` to indicate the progress so far.
- The `.progress-bar` requires an inline style, utility class, or custom CSS to set their width.
- The `.progress-bar` requires an inline style, utility class, or custom CSS to set its width.
- We provide a special `.progress-stacked` class to create multiple/stacked progress bars.

Put that all together, and you have the following examples.

{{< example >}}
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 0%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 25%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 50%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 75%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 100%"></div>
</div>
{{< /example >}}

## Labels

Add labels to your progress bars by placing text within the `.progress-bar`.

{{< example >}}
<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 25%">25%</div>
</div>
{{< /example >}}

## Width

Bootstrap provides a handful of [utilities for setting width]({{< docsref "/utilities/sizing" >}}). Depending on your needs, these may help with quickly configuring progress.

{{< example >}}
<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar w-75"></div>
</div>
{{< /example >}}

## Height

We only set a `height` value on the `.progress`, so if you change that value the inner `.progress-bar` will automatically resize accordingly.

{{< example >}}
<div class="progress"  role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 1px">
  <div class="progress-bar" style="width: 25%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
  <div class="progress-bar" style="width: 25%"></div>
</div>
{{< /example >}}

## Backgrounds

Use background utility classes to change the appearance of individual progress bars.

{{< example >}}
<div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar bg-success" style="width: 25%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar bg-info" style="width: 50%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar bg-warning" style="width: 75%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar bg-danger" style="width: 100%"></div>
</div>
{{< /example >}}

## Multiple bars

You can include multiple progress components inside a container with `.progress-stacked` to create a single stacked progress bar. Note that in this case, the styling to set the visual width of the progress bar *must* be applied to the `.progress` elements, rather than the `.progress-bar`s.

{{< example >}}
<div class="progress-stacked">
  <div class="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 15%">
    <div class="progress-bar"></div>
  </div>
  <div class="progress" role="progressbar" aria-label="Segment two" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%">
    <div class="progress-bar bg-success"></div>
  </div>
  <div class="progress" role="progressbar" aria-label="Segment three" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
    <div class="progress-bar bg-info"></div>
  </div>
</div>
{{< /example >}}

## Striped

Add `.progress-bar-striped` to any `.progress-bar` to apply a stripe via CSS gradient over the progress bar's background color.

{{< example >}}
<div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped" style="width: 10%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped bg-success" style="width: 25%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped bg-info" style="width: 50%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Warning striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped bg-warning" style="width: 75%"></div>
</div>
<div class="progress" role="progressbar" aria-label="Danger striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped bg-danger" style="width: 100%"></div>
</div>
{{< /example >}}

## Animated stripes

The striped gradient can also be animated. Add `.progress-bar-animated` to `.progress-bar` to animate the stripes right to left via CSS3 animations.

{{< example >}}
<div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
</div>
{{< /example >}}

## Progress group

{{< example >}}
<div class="d-flex mb-4">
  <div class="w-25 text-body text-opacity-75 small text-truncate">
    Title
  </div>
  <div class="w-75">
    <div class="progress" role="progressbar"  aria-valuenow="34" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-info"style="width: 34%"></div>
    </div>
    <div class="progress" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-danger" style="width: 78%"></div>
    </div>
  </div>
</div>
<div class="d-flex mb-4">
  <div class="w-25 text-body text-opacity-75 small text-truncate">
    Title
  </div>
  <div class="w-75">
    <div class="progress" role="progressbar" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-info" style="width: 56%" ></div>
    </div>
    <div class="progress" role="progressbar" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-danger" style="width: 94%"></div>
    </div>
    <div class="progress" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-success" style="width: 67%"></div>
    </div>
  </div>
</div>
<div class="d-flex mb-4">
  <div class="w-25 text-body text-opacity-75 small text-truncate">
    Title
  </div>
  <div class="w-75">
    <div class="progress" role="progressbar" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-info" style="width: 56%"></div>
    </div>
    <div class="progress" role="progressbar" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-danger" style="width: 94%"></div>
    </div>
    <div class="progress" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-success" style="width: 67%"></div>
    </div>
    <div class="progress" role="progressbar" aria-valuenow="17" aria-valuemin="0" aria-valuemax="100" style="--cui-progress-height: 4px; margin-bottom: 2px">
      <div class="progress-bar bg-warning" style="width: 17%"></div>
    </div>
  </div>
</div>
{{< /example >}}

{{< example >}}
<div>
  <div class="d-flex align-items-center">
    <i class="cil-user icon icon-lg me-2"></i>
    <div>Male</div>
    <div class="ms-auto font-weight-semibold">43%</div>
  </div>
  <div>
    <div class="progress" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" role="progressbar" style="--cui-progress-height: 4px;"§>
      <div class="progress-bar bg-warning" style="width: 43%"></div>
    </div>
  </div>
</div>
{{< /example >}}

{{< example >}}
<div>
  <div class="d-flex align-items-center">
    <i class="cil-globe-alt icon icon-lg me-2"></i>
    <div>Organic Search</div>
    <div class="ms-auto font-weight-semibold me-2">191.235</div>
    <div class="text-muted small">(56%)</div>
  </div>
  <div>
    <div class="progress" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" role="progressbar" style="--cui-progress-height: 4px;"§>
      <div class="progress-bar bg-success" style="width: 43%"></div>
    </div>
  </div>
</div>
{{< /example >}}

## Customizing

### CSS variables

Progress bars use local CSS variables on `.progress` for enhanced real-time customization. Values for the CSS variables are set via SASS, so Sass customization is still supported, too.

{{< scss-docs name="progress-css-vars" file="scss/_progress.scss" >}}

### SASS variables

{{< scss-docs name="progress-variables" file="scss/_variables.scss" >}}

### Keyframes

Used for creating the CSS animations for `.progress-bar-animated`. Included in `scss/_progress-bar.scss`.

{{< scss-docs name="progress-keyframes" file="scss/_progress.scss" >}}

