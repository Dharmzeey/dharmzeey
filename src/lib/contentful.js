import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

const renderOptions = {
    renderMark: {
        [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
        [MARKS.ITALIC]: (text) => `<em>${text}</em>`,
        [MARKS.UNDERLINE]: (text) => `<u>${text}</u>`,
        [MARKS.CODE]: (text) => `<code>${text}</code>`,
    },
    renderNode: {
        [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
        [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
        [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
        [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
        [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
        [BLOCKS.PARAGRAPH]: (node, next) => {
            const isCodeBlock = node.content.length > 0 && node.content.every(
                child => child.nodeType === 'text' && child.marks?.some(m => m.type === 'code')
            );
            if (isCodeBlock) {
                const raw = node.content.map(c => c.value || '').join('');
                const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<div class="code-block"><button class="copy-btn" type="button">Copy</button><pre><code>${escaped}</code></pre></div>`;
            }
            return `<p>${next(node.content)}</p>`;
        },
        [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
        [BLOCKS.QUOTE]: (node, next) => `<blockquote>${next(node.content)}</blockquote>`,
        [BLOCKS.HR]: (_node) => `<hr />`,
        [BLOCKS.TABLE]: (node, next) => `<div class="table-wrap"><table>${next(node.content)}</table></div>`,
        [BLOCKS.TABLE_ROW]: (node, next) => `<tr>${next(node.content)}</tr>`,
        [BLOCKS.TABLE_HEADER_CELL]: (node, next) => `<th>${next(node.content)}</th>`,
        [BLOCKS.TABLE_CELL]: (node, next) => `<td>${next(node.content)}</td>`,
        [INLINES.HYPERLINK]: (node, next) => `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`,
        [INLINES.EMBEDDED_ENTRY]: (_node) => '',
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const file = node.data?.target?.fields?.file;
            const title = node.data?.target?.fields?.title || '';
            if (!file?.url) return '';
            const url = `https:${file.url}`;
            if (file.contentType?.startsWith('image/')) {
                return `<figure><img src="${url}" alt="${title}" />${title ? `<figcaption>${title}</figcaption>` : ''}</figure>`;
            }
            return `<a href="${url}" target="_blank">${title || 'Download'}</a>`;
        },
    },
};


const client = createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN
});

export async function getAllPosts() {
    const entries = await client.getEntries({ content_type: 'pageBlogPost' });

    return entries.items.map(item => {

        const content = item.fields?.content ? documentToHtmlString(item.fields.content, renderOptions) : '';

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
