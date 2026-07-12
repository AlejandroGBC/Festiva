
export default function layoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return(
      <div className="p-7 h-full">
          {children}
      </div>
    )
}