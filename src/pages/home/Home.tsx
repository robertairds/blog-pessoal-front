import ListaPostagens from "../../components/postagem/listapostagem/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
    return (
        <div className="bg-[#2c1417] min-h-screen text-[#d6c7cb]">
            {/* Cor exata do fundo da imagem gerada */}
            <div className="bg-[#422125] flex justify-center py-8">
                <div className='container grid grid-cols-2 text-white items-center mx-8'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold text-[#f5eaec]'>
                            Seja Bem-Vindo!
                        </h2>
                        <p className='text-xl text-[#bdaab0]'>
                            Expresse aqui seus pensamentos e opiniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="/home.png"
                            alt="Imagem Página Home"
                            className='w-2/3 drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]'
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </div>
    )
}

export default Home;