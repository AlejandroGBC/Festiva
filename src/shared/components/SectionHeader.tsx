import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    accion: string;
    href?: string;
    onClick?: () => void;
}

export function SectionHeader({ title, accion, href, onClick }: SectionHeaderProps) {
    const actionElement = href ? (
        <Link href={href} className="text-sm text-festiva-euphoric-pink font-semibold cursor-pointer">
            {accion}
        </Link>
    ) : (
        <span
            className="text-sm text-festiva-euphoric-pink font-semibold cursor-pointer"
            onClick={onClick}
        >
            {accion}
        </span>
    );

    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base text-festiva-midnight-blue">
                {title}
            </h2>
            {actionElement}
        </div>
    );
}

export default SectionHeader;