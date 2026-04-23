import type { ClassModule } from "@/lib/class-module";
import TitleLayout from "./layouts/title";
import ContentLayout from "./layouts/content";

const module_: ClassModule = {
  layouts: {
    title: TitleLayout,
    section: ContentLayout,
    content: ContentLayout,
  },
};

export default module_;
