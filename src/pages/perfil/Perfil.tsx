import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center items-center bg-[#2c1417] min-h-[calc(100vh-5rem)] py-8 text-[#d6c7cb] w-full px-4">
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-[#231b1f] border border-[#522a2e] shadow-2xl flex flex-col my-auto">
                {/* Capa com tamanho intermediário agradável */}
                <img
                    className="w-full h-52 object-cover border-b-4 border-[#422125] filter brightness-90"
                    src="capa.jpg"
                    alt="Capa do Perfil"
                />

                {/* Foto de Perfil Centralizada com fallback para padrao.png */}
                <img
                    className="rounded-full w-40 h-40 object-cover mx-auto mt-[-5rem] border-4 border-[#2c1417] relative z-10 shadow-lg"
                    src={usuario.foto && usuario.foto.trim() !== "" ? usuario.foto : "/padrao.png"}
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                {/* Informações Básicas */}
                <div className="pt-2 pb-5 flex flex-col bg-[#422125] text-[#f5eaec] items-center justify-center gap-1 border-t border-[#522a2e] w-full">
                    <p className="font-bold text-2xl text-[#f0afbf]">{usuario.nome}</p>
                    <p className="text-sm text-[#bdaab0]">{usuario.usuario}</p>
                    
                    <div className="flex gap-3 mt-2">
                        <a href="https://www.linkedin.com/in/robertarodrigues2" target="_blank" rel="noopener noreferrer" className="hover:text-[#f0afbf] transition-colors">
                            <LinkedinLogo size={26} weight="bold" />
                        </a>
                        <a href="https://github.com/robertairds" target="_blank" rel="noopener noreferrer" className="hover:text-[#f0afbf] transition-colors">
                            <GithubLogo size={26} weight="bold" />
                        </a>
                    </div>
                </div>

                {/* Seção Sobre Mim e Habilidades proporcional */}
                <div className="bg-[#231b1f] p-10 flex flex-col gap-6 w-full border-t border-[#3d2c33]">
                    <div>
                        <h2 className="text-lg font-bold text-[#f5eaec] mb-2 border-b border-[#522a2e] pb-1">Sobre Mim</h2>
                        <p className="text-base text-[#e6d5db] leading-relaxed">
                            Desenvolvedora em constante evolução, apaixonada por tecnologia e por transformar ideias em códigos limpos e funcionais. 
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#f5eaec] mb-3 border-b border-[#522a2e] pb-1">Minhas Tecnologias</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">Git</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">MySQL</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">Spring</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">Java</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">HTML</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">CSS</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">React</span>
                            <span className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d]">JavaScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil;