/** Choose the family the lesson paintings show. Each choice is a painting, so nobody has to read to pick. */

import { useT } from "../i18n/I18nContext";
import { artFor } from "../lib/lessonArt";
import { PICTURE_SETS } from "../lib/pictures";
import { usePictures } from "../lib/PicturesContext";

export default function PictureChoice() {
  const { set, choose } = usePictures();
  const t = useT();
  return (
    <section className="card panel grid gap-2">
      <h2 className="panel-title">{t("pictures.title")}</h2>
      <div className="picture-sets" role="group" aria-label={t("pictures.title")}>
        {PICTURE_SETS.map((s) => (
          <button key={s.key} type="button" className={s.key === set ? "picture-set picture-set-on" : "picture-set"} aria-pressed={s.key === set} onClick={() => choose(s.key)}>
            <img src={artFor("earn-it", s.key)} alt="" width={960} height={644} />
            <span>{t(`pictures.${s.key}`)}</span>
          </button>
        ))}
      </div>
      <p className="muted text-sm">{t("pictures.says")}</p>
    </section>
  );
}
