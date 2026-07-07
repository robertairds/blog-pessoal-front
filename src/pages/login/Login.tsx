import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#2c1417] text-[#d6c7cb]">
            {/* Formulário à esquerda com paleta gótica e vinho escuro */}
            <form className="flex justify-center items-center flex-col w-3/4 lg:w-1/2 gap-4 bg-[#422125] p-10 rounded-2xl border border-[#522a2e] shadow-2xl" 
                onSubmit={login}>

                <h2 className="text-[#f5eaec] text-5xl tracking-wide mb-2">Entrar</h2>
                
                <div className="flex flex-col w-full">
                    <label htmlFor="usuario" className="text-[#c4b3b8] mb-1">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuario"
                        className="border-2 border-[#522a2e] bg-[#2c1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#8c424a] transition-colors"
                        value={usuarioLogin.usuario}
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
                        className="border-2 border-[#522a2e] bg-[#2c1417] text-[#f0e6e8] rounded p-2 focus:outline-none focus:border-[#8c424a] transition-colors"
                        value={usuarioLogin.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <button 
                    type='submit' 
                    className="rounded bg-[#522a2e] flex justify-center hover:bg-[#6e373d] text-[#f0e6e8] w-1/2 py-3 mt-2 transition-colors border border-[#6e373d]">
                    { isLoading ? 
                        <ClipLoader 
                            color="#ffffff" 
                            size={24}
                        /> : 
                        <span>Entrar</span>
                    }
                </button>

                <hr className="border-[#522a2e] w-full my-2" />

                <p className="text-[#bdaab0]">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-[#f0afbf] hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>

            {/* Imagem de fundo à direita usando a imagem local padrão */}
            <div 
                className="bg-[url('/home.png')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center filter brightness-95"
            ></div>
        </div>
    );
}

export default Login;