export default function Link({ text, href }: { text: string, href: string }) {

    return (
        <>
            <div className="my-2">
                <a target="_blank" href={href} className="p-2 rounded bg-blue-400 dark:text-black dark:hover:border-slate-100 hover:cursor-pointer hover:text-black  hover:border-black hover:border">👉{text}</a>
            </div>
        </>
    )
}