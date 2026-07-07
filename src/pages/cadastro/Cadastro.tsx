import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate()

const [isLoading, setIsLoading] = useState<boolean>(false)
const [confirmarSenha, setConfirmarSenha] = useState<string>('')

const [usuario, setUsuario] = useState<Usuario>({
  id: 0,
  nome: '',
  usuario: '',
  senha: '',
  foto: ''
})

useEffect(() => {
  if (usuario.id !== 0) {
    retornar()
  }
}, [usuario])

function retornar(){
  navigate('/login')
}

function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
  setUsuario({
    ...usuario,
    [e.target.name]: e.target.value
  })
}

function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
  setConfirmarSenha(e.target.value)
}

async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
  e.preventDefault()

  if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){
    setIsLoading(true)

    try{
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
      ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
    }catch(error){
      alert('Erro ao cadastrar o usuário!')
    }
  }else{
    ToastAlerta("Os dados do Usuário são inconsistentes! Verifique as informações.", "erro");
    setUsuario({...usuario, senha: '' })
    setConfirmarSenha('')
  }

  setIsLoading(false)
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full bg-[#1b1417] text-[#d6c7cb]">
      {/* Imagem à esquerda alterada para a nova imagem com tons góticos */}
      <div
        className="bg-[url('/login-bg.jpg')] lg:block hidden bg-no-repeat w-full h-full bg-cover bg-center filter brightness-90"
      ></div>

      {/* Container limitador e centralizador do formulário */}
      <div className="flex justify-center items-center w-full py-6 px-8 bg-[#1b1417]">
        <form className="flex justify-center items-center flex-col w-full max-w-md gap-4 bg-[#231b1f] p-10 rounded-2xl border border-[#3d2c33] shadow-2xl"
          onSubmit={cadastrarNovoUsuario}>
          
          <h2 className="text-[#f5eaec] text-5xl font-bold mb-2 tracking-wide">Cadastrar</h2>
          
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-[#c4b3b8] mb-1">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-[#523d45] bg-[#1b1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#b8869b] transition-colors"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-[#c4b3b8] mb-1">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border-2 border-[#523d45] bg-[#1b1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#b8869b] transition-colors"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-[#c4b3b8] mb-1">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="URL da Foto"
              className="border-2 border-[#523d45] bg-[#1b1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#b8869b] transition-colors"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-[#c4b3b8] mb-1">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-[#523d45] bg-[#1b1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#b8869b] transition-colors"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-[#c4b3b8] mb-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-[#523d45] bg-[#1b1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#b8869b] transition-colors"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex justify-around w-full gap-4 mt-2">
            <button
              type="reset"
              className="rounded text-white bg-[#4a262c] hover:bg-[#66313a] w-1/2 py-2.5 font-semibold transition-colors"
              onClick={retornar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded text-white bg-[#522a2e] hover:bg-[#6e373d] w-1/2 py-2.5 flex justify-center font-semibold transition-colors border border-[#6e373d]"
            >
            { isLoading ?
              <ClipLoader
               color="#ffffff"
               size={24}
              />:
              <span>Cadastrar</span>}
              
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Cadastro;