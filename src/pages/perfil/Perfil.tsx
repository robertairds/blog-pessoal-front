import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { GithubLogo, LinkedinLogo, PencilSimple, Plus } from "@phosphor-icons/react"

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    // Estados locais para edição
    const [editandoFoto, setEditandoFoto] = useState(false)
    const [novaFoto, setNovaFoto] = useState(usuario.foto || "")

    const [editandoLinks, setEditandoLinks] = useState(false)
    const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/robertarodrigues2")
    const [github, setGithub] = useState("https://github.com/robertairds")

    const [editandoSobre, setEditandoSobre] = useState(false)
    const [sobreMim, setSobreMim] = useState("Desenvolvedora em constante evolução, apaixonada por tecnologia e por transformar ideias em códigos limpos e funcionais.")

    const [editandoTechs, setEditandoTechs] = useState(false)
    const [tecnologias, setTecnologias] = useState<string[]>([
        "Git", "MySQL", "Spring", "Java", "HTML", "CSS", "React", "JavaScript"
    ])
    const [novaTech, setNovaTech] = useState("")

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        }
    }, [usuario.token])

    function salvarFoto(e: React.FormEvent) {
        e.preventDefault()
        usuario.foto = novaFoto
        ToastAlerta("Foto de perfil atualizada com sucesso!", "sucesso")
        setEditandoFoto(false)
    }

    function salvarLinks(e: React.FormEvent) {
        e.preventDefault()
        ToastAlerta("Links de redes sociais atualizados!", "sucesso")
        setEditandoLinks(false)
    }

    function salvarSobre(e: React.FormEvent) {
        e.preventDefault()
        ToastAlerta("Seção 'Sobre Mim' atualizada!", "sucesso")
        setEditandoSobre(false)
    }

    function adicionarTecnologia(e: React.FormEvent) {
        e.preventDefault()
        if (novaTech.trim() !== "" && !tecnologias.includes(novaTech.trim())) {
            setTecnologias([...tecnologias, novaTech.trim()])
            setNovaTech("")
            ToastAlerta("Tecnologia adicionada!", "sucesso")
        }
    }

    function removerTecnologia(techParaRemover: string) {
        setTecnologias(tecnologias.filter(tech => tech !== techParaRemover))
        ToastAlerta("Tecnologia removida!", "info")
    }

    return (
        <div className="flex justify-center items-center bg-[#2c1417] min-h-[calc(100vh-5rem)] py-8 text-[#d6c7cb] w-full px-4">
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-[#231b1f] border border-[#522a2e] shadow-2xl flex flex-col my-auto">
                {/* Capa */}
                <img
                    className="w-full h-52 object-cover border-b-4 border-[#422125] filter brightness-90"
                    src="capa.jpg"
                    alt="Capa do Perfil"
                />

                {/* Foto de Perfil Centralizada com Botão de Editar */}
                <div className="relative mx-auto mt-[-5rem] z-10">
                    <img
                        className="rounded-full w-40 h-40 object-cover border-4 border-[#2c1417] shadow-lg"
                        src={usuario.foto && usuario.foto.trim() !== "" ? usuario.foto : "/padrao.png"}
                        alt={`Foto de perfil de ${usuario.nome}`}
                    />
                    <button
                        onClick={() => setEditandoFoto(!editandoFoto)}
                        className="absolute bottom-1 right-1 bg-[#6e373d] text-[#f5eaec] p-2.5 rounded-full border-2 border-[#2c1417] hover:bg-[#8c424a] transition-colors shadow-md"
                        title="Editar foto de perfil"
                    >
                        <PencilSimple size={20} weight="bold" />
                    </button>
                </div>

                {/* Caixa de Input para Editar a Foto */}
                {editandoFoto && (
                    <form onSubmit={salvarFoto} className="bg-[#32171c] px-6 py-4 border-b border-[#522a2e] flex flex-col gap-2 w-full max-w-md mx-auto mt-2 rounded-xl">
                        <label className="text-xs font-semibold text-[#f0afbf]">Cole o link (URL) da sua nova foto:</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={novaFoto}
                                onChange={(e) => setNovaFoto(e.target.value)}
                                placeholder="https://exemplo.com/sua-foto.jpg"
                                className="flex-1 bg-[#231b1f] border border-[#522a2e] text-[#f5eaec] text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#f0afbf]"
                            />
                            <button type="submit" className="bg-[#6e373d] text-[#f5eaec] text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#8c424a] transition-colors">
                                Salvar
                            </button>
                        </div>
                    </form>
                )}

                {/* Informações Básicas com Botão de Editar Redes */}
                <div className="pt-2 pb-5 flex flex-col bg-[#422125] text-[#f5eaec] items-center justify-center gap-1 border-t border-[#522a2e] w-full mt-4 relative">
                    <button 
                        onClick={() => setEditandoLinks(!editandoLinks)} 
                        className="absolute top-3 right-4 text-[#f0afbf] hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold"
                        title="Editar redes sociais"
                    >
                        <PencilSimple size={16} weight="bold" /> Editar Links
                    </button>

                    <p className="font-bold text-2xl text-[#f0afbf]">{usuario.nome}</p>
                    <p className="text-sm text-[#bdaab0]">{usuario.usuario}</p>
                    
                    <div className="flex gap-3 mt-2">
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#f0afbf] transition-colors">
                            <LinkedinLogo size={26} weight="bold" />
                        </a>
                        <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-[#f0afbf] transition-colors">
                            <GithubLogo size={26} weight="bold" />
                        </a>
                    </div>
                </div>

                {/* Caixa de Input para Editar os Links do LinkedIn e GitHub */}
                {editandoLinks && (
                    <form onSubmit={salvarLinks} className="bg-[#32171c] px-6 py-4 border-b border-[#522a2e] flex flex-col gap-3 w-full max-w-md mx-auto rounded-xl my-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#f0afbf]">Link do LinkedIn:</label>
                            <input
                                type="text"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                className="w-full bg-[#231b1f] border border-[#522a2e] text-[#f5eaec] text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#f0afbf]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#f0afbf]">Link do GitHub:</label>
                            <input
                                type="text"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                className="w-full bg-[#231b1f] border border-[#522a2e] text-[#f5eaec] text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#f0afbf]"
                            />
                        </div>
                        <button type="submit" className="self-end bg-[#6e373d] text-[#f5eaec] text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#8c424a] transition-colors mt-1">
                            Salvar Links
                        </button>
                    </form>
                )}

                {/* Seção Sobre Mim e Habilidades */}
                <div className="bg-[#231b1f] p-10 flex flex-col gap-8 w-full border-t border-[#3d2c33]">
                    {/* Sobre Mim */}
                    <div>
                        <div className="flex justify-between items-center mb-2 border-b border-[#522a2e] pb-1">
                            <h2 className="text-lg font-bold text-[#f5eaec]">Sobre Mim</h2>
                            <button onClick={() => setEditandoSobre(!editandoSobre)} className="text-[#f0afbf] hover:text-[#f5eaec] transition-colors flex items-center gap-1 text-xs font-semibold">
                                <PencilSimple size={16} weight="bold" /> Editar
                            </button>
                        </div>

                        {editandoSobre ? (
                            <form onSubmit={salvarSobre} className="flex flex-col gap-2 mt-2">
                                <textarea
                                    value={sobreMim}
                                    onChange={(e) => setSobreMim(e.target.value)}
                                    rows={3}
                                    className="w-full bg-[#2c1417] border border-[#522a2e] text-[#f5eaec] text-sm p-3 rounded-xl focus:outline-none focus:border-[#f0afbf] leading-relaxed"
                                />
                                <button type="submit" className="self-end bg-[#6e373d] text-[#f5eaec] text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#8c424a] transition-colors">
                                    Salvar Sobre Mim
                                </button>
                            </form>
                        ) : (
                            <p className="text-base text-[#e6d5db] leading-relaxed">{sobreMim}</p>
                        )}
                    </div>

                    {/* Tecnologias */}
                    <div>
                        <div className="flex justify-between items-center mb-3 border-b border-[#522a2e] pb-1">
                            <h2 className="text-lg font-bold text-[#f5eaec]">Minhas Tecnologias</h2>
                            <button onClick={() => setEditandoTechs(!editandoTechs)} className="text-[#f0afbf] hover:text-[#f5eaec] transition-colors flex items-center gap-1 text-xs font-semibold">
                                <PencilSimple size={16} weight="bold" /> Gerenciar
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tecnologias.map((tech) => (
                                <span key={tech} className="bg-[#522a2e] text-[#f5eaec] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#6e373d] flex items-center gap-2">
                                    {tech}
                                    {editandoTechs && (
                                        <button onClick={() => removerTecnologia(tech)} className="text-[#f0afbf] hover:text-white font-bold ml-1">
                                            ×
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>

                        {editandoTechs && (
                            <form onSubmit={adicionarTecnologia} className="flex gap-2 mt-4 max-w-sm">
                                <input
                                    type="text"
                                    value={novaTech}
                                    onChange={(e) => setNovaTech(e.target.value)}
                                    placeholder="Nova tecnologia..."
                                    className="flex-1 bg-[#2c1417] border border-[#522a2e] text-[#f5eaec] text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#f0afbf]"
                                />
                                <button type="submit" className="bg-[#6e373d] text-[#f5eaec] text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#8c424a] transition-colors flex items-center gap-1">
                                    <Plus size={16} weight="bold" /> Adicionar
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil;