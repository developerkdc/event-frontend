import { LAYOUT_CONTAINER_STYLES } from "@jumbo/utils/constants/layout";
import { mainTheme } from "../themes/main/default";
import { headerTheme } from "../themes/header/default";
import { sidebarTheme } from "../themes/sidebar/default";
import { footerTheme } from "../themes/footer/default";
import LAYOUT_NAMES from "../layouts/layouts";
import { createJumboTheme } from "@jumbo/utils";
import jwtAuthAxios, { Axios } from "app/services/config";
import {getCurrentUser} from "app/services/config";

const config = {
  authSetting: {
    axiosObject: Axios,
    fallbackPath: "/login",
    getAuthUserService: getCurrentUser,
    redirectNotAuthenticatedPath: "/",
  },

  // defaultLayout: LAYOUT_NAMES.VERTICAL_DEFAULT,
  defaultLayout: LAYOUT_NAMES.SOLO_PAGE,
  containerStyle: LAYOUT_CONTAINER_STYLES.FLUID,

  theme: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
};

export { config };
