interface SectionHeaderProps {
    title: string,
    accion: string
}

export function SectionHeader({ title = "", accion = "" }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base text-festiva-midnight-blue">
                {title}
            </h2>

            <a href="" className="text-sm text-festiva-euphoric-pink font-semibold">
                {accion}
            </a>
        </div>
    );
}

export default SectionHeader;