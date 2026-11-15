/** Choose the family the lesson paintings show. Each choice is a painting, so nobody has to read to pick. */

import { artFor } from "../lib/lessonArt";
import { PICTURE_SETS } from "../lib/pictures";
import { usePictures } from "../lib/PicturesContext";

export default function PictureChoice() {
  const { set, choose } = usePictures();
  return (
    <section className="card panel grid gap-2">
      <h2 className="panel-title">Pictures that look like your family</h2>
      <div className="picture-sets" role="group" aria-label="Pictures that look like your family">
        {PICTURE_SETS.map((s) => (
          <button key={s.key} type="button" className={s.key === set ? "picture-set picture-set-on" : "picture-set"} aria-pressed={s.key === set} onClick={() => choose(s.key)}>
            <img src={artFor("earn-it", s.key)} alt="" width={960} height={644} />
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <p className="muted text-sm">This changes the paintings on Learn. The choice stays on this device.</p>
    </section>
  );
}
