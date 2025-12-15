import { createClient } from 'contentful';

function renderRichTextContent(content) {
    return content
        .map((node) => {
            // 1️⃣ Handle paragraph text
            if (node.nodeType === "paragraph") {
                const text = node.content
                    .map((child) => child.value || "")
                    .join("");
                return `<p class="text-gray-300 leading-8 mb-4">${text}</p>`;
            }

            // 2️⃣ Handle embedded entries (usually images, quotes, etc.)
            if (node.nodeType === "embedded-entry-block") {
                const entry = node.data?.target?.fields;

                // If the embedded entry contains an image field
                if (entry?.image?.fields?.file?.url) {
                    const imageUrl = `https:${entry.image.fields.file.url}`;
                    const caption = entry.image.fields.title || "";
                    return `
            <figure class="my-6 text-center">
              <img src="${imageUrl}" alt="${caption}" class="rounded-xl mx-auto shadow-md max-w-full h-auto" />
              ${caption ? `<figcaption class="text-gray-500 mt-2">${caption}</figcaption>` : ""}
            </figure>`;
                }

                // If the embedded entry contains a video, quote, or something else
                if (entry?.quote) {
                    return `<blockquote class="italic border-l-4 border-gray-500 pl-4 text-gray-300 my-4">${entry.quote}</blockquote>`;
                }

                // fallback
                return `<div class="my-4 text-gray-400">[Embedded content]</div>`;
            }

            // 3️⃣ Default fallback for unknown node types
            return "";
        })
        .join("");
}


const client = createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN
});

export async function getAllPosts() {
    const entries = await client.getEntries({ content_type: 'pageBlogPost' });

    return entries.items.map(item => {

        const nodes = item.fields?.content?.content || [];
        const content = renderRichTextContent(nodes);

        return {
            title: item.fields?.title || 'Untitled',
            slug: item.fields?.slug || '',
            image: item.fields?.featuredImage?.fields?.file?.url,
            date: item.fields?.publishedDate,
            author: item.fields?.author?.fields?.name || 'Anonymous',
            content: content,
        }
    });
}

export async function getSinglePost(slug) {
    const entries = await client.getEntries({
        content_type: 'pageBlogPost',
        'fields.slug': slug
    });
    return entries.items[0];
}
