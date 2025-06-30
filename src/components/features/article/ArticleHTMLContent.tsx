import { truncateHTML } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";

type ArticleHTMLContentProps = {
    content: string;
    isPreview?: boolean;
};

export function ArticleHTMLContent({ content, isPreview = false }: ArticleHTMLContentProps) {
    const clean = DOMPurify.sanitize(content);
    const cleanHTML = isPreview ? truncateHTML(clean, 300) : clean; 
    
    return (
        <div
            className="prose prose-neutral max-w-none"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe, aleady sanitize by isomorphic-dompurify
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    );
}