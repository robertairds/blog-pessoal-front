import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface FormPostagemProps {
    isModal?: boolean; // Prop opcional para saber se está dentro do modal
}

function FormPostagem({ isModal = false }: FormPostagemProps) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Postagem atualizada com sucesso', 'sucesso')

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a Postagem', 'erro')
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Postagem', 'erro');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        /* Se for modal, tira o min-h-screen e usa um py menor; se não for, ocupa a tela inteira */
        <div className={`flex flex-col mx-auto items-center justify-center bg-[#2c1417] text-[#d6c7cb] w-full px-4 ${isModal ? 'py-2' : 'min-h-screen py-8'}`}>
            <h1 className={`text-3xl text-center text-[#f5eaec] ${isModal ? 'my-2 text-2xl' : 'my-6 text-4xl'}`}>
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-full max-w-lg gap-3 bg-[#231b1f] p-6 rounded-2xl border border-[#3d2c33] shadow-2xl"
                onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="titulo" className="text-[#c4b3b8]">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-[#522a2e] bg-[#2c1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#8c424a] transition-colors"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="texto" className="text-[#c4b3b8]">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-[#522a2e] bg-[#2c1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#8c424a] transition-colors"
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <p className="text-[#c4b3b8]">Tema da Postagem</p>
                    <select name="tema" id="tema" className='border-2 p-2 border-[#522a2e] bg-[#2c1417] text-[#f0e6e8] rounded focus:outline-none focus:border-[#8c424a] transition-colors'
                          onChange={(e) => buscarTemaPorId(e.currentTarget.value)} 
                          >
                        <option value="" selected disabled>Selecione um Tema</option>

                        {temas.map((temaItem) => (
                            <option key={temaItem.id} value={temaItem.id}>{temaItem.descricao}</option>
                        ))}

                    </select>
                </div>

                <button
                    type='submit'
                    className='rounded disabled:bg-[#201013] disabled:text-[#7d5f64] bg-[#522a2e] hover:bg-[#6e373d]
                                text-white font-bold w-1/2 mx-auto py-2.5 flex justify-center transition-colors mt-1 border border-[#6e373d]'
                            disabled={carregandoTema}
                >
                    { isLoading ?
                        <ClipLoader  
                           color="#ffffff"
                           size={22}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;