import { CarouselComponent } from "./CarouselComponent";
import { useTranslations } from "next-intl";

const Salons = () => {
    const t = useTranslations("Salons");

    return (
        <div className="container mx-auto my-16">
            <CarouselComponent title={t("title")} description={t("description")} />
        </div>
    );
};

export default Salons;
