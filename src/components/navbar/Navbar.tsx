import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info');
        navigate('/');
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className='w-full flex justify-center py-4 bg-[#422125] text-[#f5eaec] border-b border-[#522a2e]'>
                <div className="container flex justify-between text-lg mx-8 items-center">
                    <Link to='/home' className="text-2xl font-bold tracking-wider text-[#f5eaec] hover:text-[#f0afbf] transition-colors">Blog Pessoal</Link>

                    <div className='flex gap-6 items-center'>
                        <Link to='/postagens' className='hover:text-[#f0afbf] transition-colors'>Postagens</Link>
                        <Link to='/temas' className='hover:text-[#f0afbf] transition-colors'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:text-[#f0afbf] transition-colors'>Cadastrar tema</Link>
                        
                        {/* Texto "Usuario" com cor neutra mais suave (#d6c7cb) */}
                        <Link to='/perfil' className='flex items-center gap-2.5 hover:text-[#f0afbf] transition-colors'>
                            <span className="text-[#d6c7cb]">Usuario</span>
                        </Link>

                        <Link to='' onClick={logout} className='hover:text-[#f0afbf] transition-colors'>Sair</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Navbar;