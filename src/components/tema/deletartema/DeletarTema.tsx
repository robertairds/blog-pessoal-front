import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {
    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Tema apagado com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar o tema.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    return (
        /* Fundo escuro cobrindo toda a tela e centralizando o card */
        <div className='flex flex-col items-center justify-center bg-[#2c1417] min-h-[calc(100vh-5rem)] py-8 text-[#d6c7cb] w-full px-4'>
            <div className='w-full max-w-md mx-auto flex flex-col my-auto'>
                <h1 className='text-4xl text-center my-4 text-[#f5eaec] font-bold'>Deletar tema</h1>

                <p className='text-center font-semibold mb-6 text-[#bdaab0]'>
                    Você tem certeza de que deseja apagar o tema a seguir?
                </p>

                <div className='border border-[#522a2e] bg-[#231b1f] flex flex-col rounded-2xl overflow-hidden justify-between shadow-2xl'>
                    <header
                        className='py-3 px-6 bg-[#422125] text-[#f0afbf] font-bold text-2xl border-b border-[#522a2e] tracking-wide'
                    >
                        Tema
                    </header>

                    <p className='p-8 text-3xl bg-[#201013] text-[#e8dbdf] h-full text-center break-all font-semibold'>
                        {tema.descricao}
                    </p>

                    <div className="flex border-t border-[#522a2e]">
                        <button
                            className='text-slate-100 bg-[#4a262c] hover:bg-[#66313a] w-full py-3 font-semibold transition-colors'
                            onClick={retornar}
                        >
                            Não
                        </button>

                        <button
                            className='w-full text-slate-100 bg-[#522a2e] hover:bg-[#6e373d] flex items-center justify-center py-3 font-semibold transition-colors border-l border-[#522a2e]'
                            onClick={deletarTema}
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                <span>Sim</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema;