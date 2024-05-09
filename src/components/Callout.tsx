export default function Callout({ text }: { text: string }) {
    return (
        <div className="flex my-6 py-5 px-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg text-black dark:text-stone-50">
            <p>💡</p>
            <p className="px-4">{text}</p>
        </div>
    )
}