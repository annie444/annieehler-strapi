import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export function Blocks({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // You can use the default components to set class names...
        paragraph: ({ children }) => (
          <p className="max-w-prose text-neutral-900 dark:text-neutral-50">
            {children}
          </p>
        ),
        // ...or point to a design system
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-4xl">{children}</h1>;
            case 2:
              return <h2 className="text-3xl">{children}</h2>;
            case 3:
              return <h3 className="text-2xl">{children}</h3>;
            case 4:
              return <h4 className="text-xl">{children}</h4>;
            case 5:
              return <h5 className="text-lg font-bold">{children}</h5>;
            case 6:
              return <h6 className="text-lg font-semibold">{children}</h6>;
            default:
              return <header>{children}</header>;
          }
        },
        // For links, you may want to use the component from your router or framework
        link: ({ children, url }) => <a href={url}>{children}</a>,
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className="italic">{children}</span>,
        code: ({ children }) => (
          <code className="font-jetbrains">{children}</code>
        ),
      }}
    />
  );
}
