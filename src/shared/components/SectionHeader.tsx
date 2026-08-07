interface SectionHeaderProps {
    title: string;
    accion: string;
    href?: string;
}

export function SectionHeader({ title = "", accion = ""}: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base text-festiva-midnight-blue">
                {title}
            </h2>

            <span className="text-sm text-festiva-euphoric-pink font-semibold cursor-pointer">
                {accion}
            </span>
            {/** 
            <Link href={href} className="text-sm text-festiva-euphoric-pink font-semibold">
                {accion}
            </Link>
            */}
        </div>
    );
}

export default SectionHeader;