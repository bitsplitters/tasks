"""Draws the progress bar the bot shows under every task list: public/bar/00.png ... public/bar/100.png.

21 states, one every 5%. 1200x24 px, transparent background, a semi-transparent grey rail that reads on both the
light and the dark theme, the fill in the bot's green (30,199,133), rounded ends. No text: the image is the same in
every language. Drawn 4x larger and scaled down, so the rounded ends are smooth.

    python scripts/bar/generate.py            # writes public/bar/
    python scripts/bar/generate.py <folder>   # writes somewhere else, to compare before replacing

After a new drawing, bump BARRA's ?v= in the bot (EmbedDellaLista): Discord's media proxy keeps its copy.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw

WIDTH, HEIGHT = 1200, 24
SCALE = 4
RAIL = (128, 132, 142, 100)
FILL = (30, 199, 133, 255)
STEP = 5


def bar(percent: int) -> Image.Image:
    w, h = WIDTH * SCALE, HEIGHT * SCALE
    image = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    radius = h // 2
    draw.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=RAIL)
    if percent > 0:
        # Never narrower than the bar is tall: 5% is still a pill, not a squashed dot.
        filled = max(h, round(w * percent / 100))
        draw.rounded_rectangle((0, 0, filled - 1, h - 1), radius=radius, fill=FILL)
    return image.resize((WIDTH, HEIGHT), Image.LANCZOS)


def main() -> None:
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / 'public' / 'bar'
    out.mkdir(parents=True, exist_ok=True)
    for percent in range(0, 101, STEP):
        bar(percent).save(out / f'{percent:02d}.png', optimize=True)
    print(f'{100 // STEP + 1} images in {out}')


if __name__ == '__main__':
    main()
