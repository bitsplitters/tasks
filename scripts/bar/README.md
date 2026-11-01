# Progress bar images

The bot shows a thin progress bar under every task list: the image of the last embed, taken from
`https://tasks.bitsplitters.app/bar/NN.png?v=1`. This site hosts the images, in `public/bar/`.

- **21 states**, one every 5%: `00.png`, `05.png` … `95.png`, `100.png`. The bot rounds down to 5%, shows 5% as
  soon as one box is ticked and 95% until the last one is.
- **1200×24 px**, transparent background, a semi-transparent grey rail that reads on the light and the dark theme,
  the fill in the bot's green (30,199,133), rounded ends. Discord shows it at about 400×8 in an embed on the web.
- **No text** in the image: the list stays text, translated and searchable, and the image is the same in every
  language.

## Regenerate

```sh
pip install pillow
python scripts/bar/generate.py            # writes public/bar/
python scripts/bar/generate.py /tmp/bar   # writes elsewhere, to compare first
```

## After a new drawing

Discord's media proxy ignores `Cache-Control` and keeps its copy for a long time, so changing the files is not
enough: bump the `v` in the bot's `BARRA` constant (`team-tasks-manager`,
`src/main/java/com/bitsplitters/ui/createlist/EmbedDellaLista.java`) and release the bot **after** the site is
deployed. Lists get the new URL the next time they are redrawn.

Never rename or remove an image: lists already posted keep pointing at it.
