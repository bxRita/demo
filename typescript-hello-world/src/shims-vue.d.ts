import Vue, { ComponentOptions } from "vue";
import Vuetify from "vuetify/lib";

declare module "*.vue" {
  export default Vue;
}

declare module "vue/types/options" {
  interface ComponentOptions <V extends Vue> {
    // This adds the `middleware` property to the existing `vue/types/options/ComponentOptions` type
    vuetify?: any
  }
}
