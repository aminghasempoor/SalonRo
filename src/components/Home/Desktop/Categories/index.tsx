import { CarouselComponent } from "./CarouselComponent";
import { useTranslations } from "next-intl";

const Categories = () => {
    const t = useTranslations("Categories");

    return (
        <div className="container mx-auto my-16">
            <CarouselComponent title={t("title")} description={t("description")} />
        </div>
    );
};

export default Categories;
