import { ReactNode } from "react"

export default function Article({ children }: { children: ReactNode }) {
    return (
        <article className="block text-left lg:px-40 md:px-12">{children}</article>
    )
}