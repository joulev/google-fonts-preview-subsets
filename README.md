A small playground showcasing a performant font selector where each font item is rendered in the font it represents.

The fonts are subsetted in such a way that it only has the necessary glyphs to render the font name itself. We do that to get a very small subsetted version that is still good to render the font dropdown without eating too much network data.

You can use the subsetted fonts as well. The URL is `https://google-fonts-preview-subsets.joulev.dev/v1/<font-name>`, where `<font-name>` is the Google Fonts name of the font (correct capitalisation is important!), with the spaces changed to `+`. For example, to get the subsetted font file of **ADLaM Display**, the URL is `https://google-fonts-preview-subsets.joulev.dev/v1/ADLaM+Display`.
