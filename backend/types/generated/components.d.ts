import type { Schema, Struct } from "@strapi/strapi";

export interface UiImage extends Struct.ComponentSchema {
  collectionName: "components_ui_images";
  info: {
    displayName: "Image";
    icon: "picture";
  };
  attributes: {
    altText: Schema.Attribute.Text;
    height: Schema.Attribute.String;
    image: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    mimeType: Schema.Attribute.String;
    width: Schema.Attribute.String;
  };
}

export interface UiLink extends Struct.ComponentSchema {
  collectionName: "components_ui_links";
  info: {
    displayName: "Link";
    icon: "link";
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "ui.image": UiImage;
      "ui.link": UiLink;
    }
  }
}
