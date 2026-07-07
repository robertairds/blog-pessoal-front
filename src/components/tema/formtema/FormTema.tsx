import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);

    const [_isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
      try {
        await buscar(`/temas/${id}`, setTema, {
          headers: { Authorization: token }
        });
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        }
      }
    }

    useEffect(() => {
      if (token === '') {
        ToastAlerta('Você precisa estar logado!', 'info');
        navigate('/');
      }
    }, [token]);

    useEffect(() => {
      if (id !== undefined) {
        buscarPorId(id);
      }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setTema({
        ...tema,
        [e.target.name]: e.target.value
      });
    }

    function retornar() {
      navigate("/temas");
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsLoading(true);

      if (id !== undefined) {
        try {
          await atualizar(`/temas`, tema, setTema, {
            headers: { 'Authorization': token }
          });

          ToastAlerta('O Tema foi atualizado com sucesso!', 'sucesso');
        } catch (error: any) {
          if (error.toString().includes('401')) {
            handleLogout();
          } else {
            ToastAlerta('Erro ao atualizar o tema.', 'erro');
          }
        }
      } else {
        try {
          await cadastrar(`/temas`, tema, setTema, {
            headers: { 'Authorization': token }
          });

          ToastAlerta('O Tema foi cadastrado com sucesso!', 'sucesso');
        } catch (error: any) {
          if (error.toString().includes('401')) {
            handleLogout();
          } else {
            ToastAlerta('Erro ao cadastrar o tema.', 'erro');
          }
        }
      }

      setIsLoading(false);
      retornar();
    }

    return (
        /* Adicionada a classe min-h-screen e bg-[#2c1417] para remover o fundo branco da tela inteira */
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#2c1417] text-[#d6c7cb] py-8 mx-auto w-full">
            <h1 className="text-4xl text-center my-8 text-[#f5eaec]">
                {id === undefined ? 'Cadastrar Tema': 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4 bg-[#231b1f] p-8 rounded-2xl border border-[#3d2c33] shadow-2xl"
                onSubmit={gerarNovoTema} >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="text-[#c4b3b8]">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-[#522a2e] bg-[#2c1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#8c424a] transition-colors"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <button
                    className="rounded text-slate-100 bg-[#522a2e]
                               hover:bg-[#6e373d] w-1/2 py-3 mx-auto flex justify-center font-semibold transition-colors mt-2 border border-[#6e373d]"
                    type="submit">

                    { _isLoading ?
                        <ClipLoader
                           color="#ffffff"
                           size={24}
                        /> :
                    <span>{id === undefined ? 'Cadastrar' : 'Atualizar'} </span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;