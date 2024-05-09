import { SiGithub } from "react-icons/si"
import { SiGmail } from "react-icons/si"
import { SiLinkedin } from "react-icons/si"

export default function Footer() {
    return (
        <footer className="justify-center py-6 mt-24">
            <div className="flex justify-center">
                <a href="https://github.com/FranGre" className="p-3">
                    <SiGithub />
                </a>
                <a href="mailto:frangregori61@gmail.com" className="p-3">
                    <SiGmail />
                </a>
                <a href="https://www.linkedin.com/in/fran-gregori-849409279/" className="p-3">
                    <SiLinkedin />
                </a>
            </div>
            <p>Fran Gregori Tandazo</p>
        </footer>
    )
}