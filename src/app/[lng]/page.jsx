import { useTranslation } from "@/app/i18n/index";

export default async function Page({ params }) {
  const { lng } = await params;
  const { t } = await useTranslation(lng);

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        {/* Click a {lng} note on the left to view something! 🥺 */}
        {t("initText")}
      </span>
    </div>
  );
}
