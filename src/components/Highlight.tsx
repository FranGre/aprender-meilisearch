import { ReactNode } from "react"

export default function Highlight({ backgroundColor, children }: { backgroundColor: string, children: ReactNode }) {
    const classname = backgroundColor + ' py-1'

    return (
        <strong className={classname}>{children}</strong>
    )
}