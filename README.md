# Backgrounder

**Takes logos and tries to make em’ blend in!**

![](http://media.giphy.com/media/Adqe9XUP3x9LO/giphy.gif)

[![](http://cl.ly/ZLmh/Screen%20Shot%202015-01-17%20at%203.07.24%20PM.png)](https://github.com/dubli/backgrounder/tree/example)

<hr>

- [Example](https://github.com/dubli/backgrounder/tree/example)
- [Params](https://github.com/dubli/backgrounder/blob/master/index.js#L6-L15)
- [Preview](http://dubli.github.io/backgrounder/)

## How?

Currently it takes a 4 pixel square 2 pixels from the upper-left corner and averages the color space. Those averages are turned into RGB spec for CSS coloring.

## Roadmap

Where to go if this needs more work

- Take a sample from the outer-most corner to get the background or border color. A border in our sample data is never white, so white can be assumed to be the correct background color if at least 2 of 4 are white.
- Another sample 3 pixels in should be taken from each corner. If the border wasn’t white, then this will provide the meaningful background color of the logo and ignore the designers attempt to box in the logo.
- Samples should be taken at the 50% marks on the walls to confirm something. Needs hypothesis.
- Outermost 2 pixes [should be trimmed](https://github.com/dubli/backgrounder/blob/beta/index.js#L24-L36) off of all sides and that should be the logo that is presented. If conditional, then based on findings above `if has border`.
