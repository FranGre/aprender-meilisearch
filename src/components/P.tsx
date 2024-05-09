import { ReactNode } from "react"

export default function P({ children }: { children: ReactNode }) {
    return (
        <p className="py-1">{children}</p>
    )
}