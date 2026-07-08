interface HeroBannerProps {
    title: string;
    description: string;
    topContent?: React.ReactNode;
    children?: React.ReactNode;
}

export function HeroBanner({
    title,
    description,
    topContent,
    children
}: HeroBannerProps) {
    return (
        <div className="bg-festiva-midnight-blue px-5 py-[1.375rem] my-7 rounded-[1.75rem]">
            {topContent && (
                <div className="mb-2">
                    {topContent}
                </div>
            )}
            <div className="">
                <h1 className="text-white text-xl text-left font-bold mb-2 w-52">
                    {title}
                </h1>
                <p className="text-white/60 text-sm">
                    {description}
                </p>
            </div>
            {children && (
                <div className="mt-5">
                    {children}
                </div>
            )}

        </div>
    );
}

export default HeroBanner;