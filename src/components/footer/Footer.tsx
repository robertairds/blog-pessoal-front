import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className="flex justify-center bg-[#422125] text-[#f5eaec] border-t border-[#522a2e]">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Blog Pessoal - Roberta Rodrigues | Copyright: {data}
                    </p>
                    <p className='text-lg'>Acesse minhas redes sociais</p>
                    <div className='flex gap-4 mt-2'>
                        <a href="https://www.linkedin.com/in/robertarodrigues2" target="_blank" rel="noopener noreferrer" className="hover:text-[#f0afbf] transition-colors">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://github.com/robertairds" target="_blank" rel="noopener noreferrer" className="hover:text-[#f0afbf] transition-colors">
                            <GithubLogoIcon size={48} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer