export default function Link({ text, href }: { text: string, href: string }) {

    return (
        <>
            <div className="my-2">
                <a target="_blank" href={href} className="p-2 rounded bg-blue-400 hover:text-black hover:cursor-pointer hover:border-black hover:border">👉{text}</a>
            </div>
        </>
    )
}