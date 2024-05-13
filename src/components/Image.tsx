export default function Image({ src, alt }: { src: string, alt: string }) {

    return (
        <img src={src} alt={alt} className="rounded my-2 shadow-sm border-2" />
    )
}