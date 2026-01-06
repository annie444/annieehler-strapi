import type { Schema, Struct } from "@strapi/strapi";

export interface HeroCompetency extends Struct.ComponentSchema {
  collectionName: "components_hero_competencies";
  info: {
    description: "A skill or competency with optional icon and category";
    displayName: "Competency";
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ["languages", "frameworks", "tools", "practices"]
    > &
      Schema.Attribute.DefaultTo<"tools">;
    icon: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeroSocialLink extends Struct.ComponentSchema {
  collectionName: "components_hero_social_links";
  info: {
    description: "A social media or external profile link";
    displayName: "Social Link";
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      "hero.competency": HeroCompetency;
      "hero.social-link": HeroSocialLink;
      "ui.image": UiImage;
      "ui.link": UiLink;
    }
  }
}
