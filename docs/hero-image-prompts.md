# Generated hero photographs

The white-couple, Latino-couple, and Black-couple photographs were generated with the built-in image-generation tool at 1536 x 1024 pixels. They appear in the Home, Tests & Services, and How It Works slideshow. Rotation advances every 3 seconds without visible controls; reduced-motion and hidden-tab behavior are retained.

A fourth slide, `same-sex.jpeg`, was supplied separately (not generated here) and sits third in the rotation.
It is 1408 x 768 (aspect 1.83) against the other slides' 1.50, so the couple reads slightly smaller and further
back than the other three; a tighter crop would even that out if the difference becomes distracting.

## black-couple

Saved asset: public/assets/satellite/black-couple.png

Generated with the built-in image-generation tool on 2026-10-20 at 1536 x 1024 pixels. Replaces the original client-deck Black couple crop in the shared Home, Tests & Services, and How It Works carousel. The original home.png artwork is retained. The new photograph uses the same proportional sizing and blurred edge blending as the other slides.

Prompt:

Use case: photorealistic-natural. Generate one new photorealistic lifestyle photograph for a healthcare website hero carousel, landscape 1536x1024. It must match a cohesive photographic series showing white, Latino, and same-sex adult couples seated together in bright modern homes: soft natural window daylight, airy cream and pale-gray interiors, muted sage clothing accents, gently blurred green houseplants, warm welcoming smiles, natural editorial photography. Subject: a happy adult Black couple, woman and man in their early thirties, seated close together on a light cream sofa. The woman has shoulder-length natural dark curls and wears a muted sage-green knit sweater; the man has short neatly shaped natural black hair, a subtle trimmed beard, and a cream linen casual shirt. Both have natural dark brown skin with realistic skin texture, fully clothed, warm relaxed smiles toward the camera; his arm rests naturally around her shoulders. Waist-up portrait with both complete heads, necks and shoulders visible, ample headroom, faces centered within the middle 55 percent of the frame, breathing room at both sides. Eye-level camera, natural proportions and hands, believable everyday detail. Bright softly out-of-focus modern home with large white-framed windows and restrained leafy greenery. Gentle low-contrast light, accurate skin tones, cream, white and soft sage palette. Produce only the seamless photograph, no design layout, text, letters, logos, watermarks, frame, medical equipment, split panels, vignette, or baked-in edge blur; the website applies its own soft blending. Do not imitate any specific existing person's identity.

## white-couple

Saved asset: public/assets/satellite/white-couple.png

Prompt:

Generate one photorealistic natural lifestyle photograph for a healthcare website hero, landscape 1536x1024. A happy adult white couple, woman and man in their early thirties, sitting close together on a light cream sofa in a bright contemporary home. The woman has shoulder-length softly waved light brown hair, a muted sage-green knit sweater; the man has short dark blond hair, subtle stubble, a cream casual shirt. Both fully clothed, natural warm smiles at the camera, affectionate relaxed posture with his arm gently around her shoulders. Waist-up composition with complete heads and shoulders, both faces within the central 55 percent of the frame, ample headroom and some breathing room at both edges so responsive cropping works. Soft out-of-focus pale white interior, subtle green houseplant, large window daylight. Natural human skin texture and realistic proportions, premium friendly editorial healthcare photography. Light airy off-white and very pale gray background, soft even light, low contrast, restrained sage accents. Single seamless photo only. No words, no letters, no logos, no watermarks, no UI, no frames, no panels, no medical equipment.

## latino-couple

Saved asset: public/assets/satellite/latino-couple.png

Prompt:

Generate one photorealistic natural lifestyle photograph for a healthcare website hero, landscape 1536x1024. A happy adult Latino couple, woman and man in their early thirties, sitting close together on a light cream sofa in a bright contemporary home. The woman has shoulder-length dark brown gently wavy hair, a cream knit sweater; the man has short dark brown hair, subtle stubble, a muted sage-green casual shirt. Both fully clothed, natural warm smiles at the camera, affectionate relaxed posture with his arm gently around her shoulders. Waist-up composition with complete heads and shoulders, both faces within the central 55 percent of the frame, ample headroom and some breathing room at both edges so responsive cropping works. Soft out-of-focus pale white interior, subtle green houseplant, large window daylight. Natural human skin texture and realistic proportions, premium friendly editorial healthcare photography. Light airy off-white and very pale gray background, soft even light, low contrast, restrained sage accents. Single seamless photo only. No words, no letters, no logos, no watermarks, no UI, no frames, no panels, no medical equipment.

## resources-hero

Saved asset: public/assets/satellite/resources-hero.png

Status: **not generated — currently the contact photograph.** The Resources hero
now shows the headset support photograph lifted from the contact artwork
(`contact.png`, box `865 92 525 288`), which means the same person appears on
both the Contact and Resources pages. Replacing this one file with a generated
image completes the original swap; the `box`/`width`/`height` in
`heroArtwork.resources` must be updated to the new file's dimensions.

Note that `resources.png` must stay where it is: the four Featured Resources
thumbnails in `src/Components/Marketing/Resources.js` still crop their artwork
out of that same mockup.

Prompt:

Generate one photorealistic natural lifestyle photograph for a healthcare website hero, square 1024x1024. A happy adult Black woman in her late twenties, with voluminous shoulder-length natural dark brown curls, wearing a soft sage-green knit sweater, holding a white ceramic mug with both hands near her chest. Fully clothed, warm genuine smile, head tilted slightly, gaze directed just off camera to her right, relaxed and content. Waist-up composition with complete head and shoulders, her face within the central 55 percent of the frame, ample headroom and some breathing room at both edges so responsive cropping works. Soft out-of-focus bright contemporary home interior, green houseplant behind her, large window daylight. Natural human skin texture and realistic proportions, premium friendly editorial healthcare photography. Light airy off-white and very pale gray background, soft even light, low contrast, restrained sage accents. Single seamless photo only. No words, no letters, no logos, no watermarks, no UI, no frames, no panels, no medical equipment.
