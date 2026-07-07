import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
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

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    
    return (
        <div className='flex flex-col mx-auto items-center justify-center min-h-screen bg-[#2c1417] text-[#d6c7cb] py-8 w-full px-4'>
            <h1 className='text-4xl text-center my-4 text-[#f5eaec]'>Deletar Postagem</h1>

            <p className='text-center font-semibold mb-4 text-[#bdaab0]'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='border w-full max-w-lg border-[#522a2e] bg-[#2c1417] flex flex-col rounded-2xl overflow-hidden justify-between shadow-2xl'>
                <header 
                    className='py-3 px-6 bg-[#422125] text-[#f0afbf] font-bold text-2xl border-b border-[#522a2e] tracking-wide'>
                    Postagem
                </header>
                <div className="p-6 bg-[#2c1417] text-[#e8dbdf] h-full">
                    <p className='text-xl h-full font-semibold text-[#f5eaec] mb-2'>{postagem.titulo}</p>
                    <p className='text-[#d6c7cb]'>{postagem.texto}</p>
                </div>
                <div className="flex border-t border-[#522a2e]">
                    <button 
                        className='text-slate-100 bg-[#4a262c] hover:bg-[#66313a] w-full py-3 font-semibold transition-colors'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-[#522a2e] hover:bg-[#6e373d] 
                        flex items-center justify-center py-3 font-semibold transition-colors border-l border-[#522a2e]'
                        onClick={deletarPostagem}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem;