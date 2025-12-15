import type { Schema, Struct } from "@strapi/strapi";

export interface MediaImage extends Struct.ComponentSchema {
  collectionName: "components_media_images";
  info: {
    displayName: "Image";
    icon: "picture";
  };
  attributes: {
    altText: Schema.Attribute.String & Schema.Attribute.Required;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
  };
}

export interface PagesContentBlock extends Struct.ComponentSchema {
  collectionName: "components_pages_content_blocks";
  info: {
    displayName: "ContentBlock";
    icon: "italic";
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    media: Schema.Attribute.Media<"images" | "videos">;
  };
}

export interface PagesHeroBanner extends Struct.ComponentSchema {
  collectionName: "components_pages_hero_banners";
  info: {
    displayName: "HeroBanner";
    icon: "chartBubble";
  };
  attributes: {
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<"plugin::color-picker.color">;
    backgroundMedia: Schema.Attribute.Media<"images" | "files" | "videos">;
    backgroundType: Schema.Attribute.Enumeration<
      ["none", "image", "video", "file"]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"none">;
    cta: Schema.Attribute.Component<"seo.call-to-action", true>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    showScrollIndicator: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    subheadline: Schema.Attribute.Blocks & Schema.Attribute.Required;
    textAlign: Schema.Attribute.Enumeration<["left", "right", "center"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"left">;
    textColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<"plugin::color-picker.color">;
  };
}

export interface PagesImageGallery extends Struct.ComponentSchema {
  collectionName: "components_pages_image_galleries";
  info: {
    displayName: "ImageGallery";
    icon: "landscape";
  };
  attributes: {
    caption: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Component<"media.image", true>;
  };
}

export interface PagesTextSection extends Struct.ComponentSchema {
  collectionName: "components_pages_text_sections";
  info: {
    displayName: "TextSection";
    icon: "information";
  };
  attributes: {
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.CustomField<"plugin::color-picker.color">;
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    cta: Schema.Attribute.Component<"seo.call-to-action", true>;
    customCssClass: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    media: Schema.Attribute.Media<"images">;
    mediaPosition: Schema.Attribute.Enumeration<
      ["left", "right", "top", "bottom"]
    > &
      Schema.Attribute.DefaultTo<"right">;
    textAlign: Schema.Attribute.Enumeration<["left", "right", "center"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"left">;
  };
}

export interface SeoCallToAction extends Struct.ComponentSchema {
  collectionName: "components_seo_call_to_actions";
  info: {
    displayName: "CallToAction";
    icon: "check";
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<["primary", "secondary", "outline"]> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"primary">;
  };
}

export interface SeoContactInfo extends Struct.ComponentSchema {
  collectionName: "components_seo_contact_infos";
  info: {
    displayName: "ContactInfo";
    icon: "envelop";
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ["email", "phone", "address", "social"]
    > &
      Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: "components_seo_seos";
  info: {
    displayName: "SEO";
    icon: "connector";
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    openGraphImage: Schema.Attribute.Media<"images">;
  };
}

export interface SocialsSocialLinks extends Struct.ComponentSchema {
  collectionName: "components_socials_social_links";
  info: {
    displayName: "socialLinks";
    icon: "hashtag";
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      [
        "Facebook",
        "Instagram",
        "LinkedIn",
        "Twitter (X)",
        "BlueSky",
        "Mastodon",
        "Matrix",
        "Reddit",
        "Medium",
        "Substack",
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "media.image": MediaImage;
      "pages.content-block": PagesContentBlock;
      "pages.hero-banner": PagesHeroBanner;
      "pages.image-gallery": PagesImageGallery;
      "pages.text-section": PagesTextSection;
      "seo.call-to-action": SeoCallToAction;
      "seo.contact-info": SeoContactInfo;
      "seo.seo": SeoSeo;
      "socials.social-links": SocialsSocialLinks;
    }
  }
}
