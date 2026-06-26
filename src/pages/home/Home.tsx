function Home() {  
  return (  
    <>  
      <div className="bg-indigo-900 flex justify-center">  
        <div className='container grid grid-cols-2 text-white'>  
          
          {/* COLUNA 1: Textos E o Botão juntos */}
          <div className="flex flex-col gap-4 items-center justify-center py-4">  
            <h2 className='text-5xl font-bold'>  
              Seja Bem Vinde!  
            </h2>  
            <p className='text-xl'>  
              Expresse aqui seus pensamentos e opiniões  
            </p> 
            {/* O botão agora fica aqui dentro, logo abaixo do texto */}
            <div className='flex justify-around gap-4'>
              <div className='rounded text-white border-white border-solid border-2 py-2 px-4 cursor-pointer hover:bg-white hover:text-indigo-900 transition-all'>  
                Nova Postagem  
              </div>  
            </div>
          </div>  

          {/* COLUNA 2: Apenas a Imagem */}
          <div className="flex justify-center items-center">  
            <img  
              src="https://i.imgur.com/fyfri1v.png"  
              alt="Imagem Página Home"  
              className='w-2/3'  
            />  
          </div>  

        </div>  
      </div>  
    </>  
  )  
}  
  
export default Home