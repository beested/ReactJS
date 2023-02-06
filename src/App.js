import logo from './logo.svg'
import './App.css'

import { useState, useEffect } from 'react'
import { BsTrash, BiEdit, BsPencil } from 'react-icons/bs'
import axios from 'axios'

const API = 'https://windelweb.windel.com.br:3000'

function App() {
  const [nome, setNome] = useState('')
  const [valorVenda, setValorVenda] = useState('')
  const [referencia, setReferencia] = useState('')
  const [unidadeMedida, setUnidadeMedida] = useState('')
  const [fabricante, setFabricante] = useState('')
  const [estoque, setEstoque] = useState('')
  const [imagemProduto, setImagemProduto] = useState('')
  const [produtos, setProduto] = useState([])
  const [loading, setLoading] = useState(false)

  //loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      const res = await axios
        .get(API + '/teste-front')
        .then(res => res.data)
        .catch(err => console.log(err))

      setLoading(false)
      setProduto(res)
    }
    loadData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const todo = {
      nome,
      valorVenda: parseFloat(valorVenda),
      referencia,
      unidadeMedida,
      fabricante,
      estoque: parseFloat(estoque),
      imagemProduto
    }
    //Envio para a API

    console.log(todo)
    await axios
      .post(API + '/teste-front', todo)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    setProduto(prevState => [...prevState, todo])

    setNome('')
    setValorVenda('')
    setReferencia('')
    setUnidadeMedida('')
    setFabricante('')
    setEstoque('')
    setImagemProduto('')
  }

  const limpCampos = () => {
    setNome('')
    setValorVenda('')
    setReferencia('')
    setUnidadeMedida('')
    setFabricante('')
    setEstoque('')
    setImagemProduto('')
  }

  //delete da API
  const handleDelete = async id => {
    await axios
      .delete(API + '/teste-front/' + id)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    setProduto(prevState => prevState.filter(todo => todo.id !== id))
  }

  if (loading) {
    return (
      <div>
        <p className="loading">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <main id="form">
        <form onSubmit={handleSubmit} id="form1">
          <h1 id="new__register">Novo Registro</h1>
          <div className="register">
            <label htmlFor="descricao" className="cad__descricao">
              <span>Descrição</span>
              <input
                name="descricao"
                type="text"
                className="input"
                onChange={e => setNome(e.target.value)}
                id="descricao"
                value={nome || ''}
                required
              />
            </label>
            <label htmlFor="vlrvenda" className="cad__vlrvenda">
              <span>Valor Venda</span>
              <input
                name="vlrvenda"
                type="number"
                pattern="[0-9]*"
                onChange={e => setValorVenda(e.target.value)}
                className="input"
                id="vlrvenda"
                value={valorVenda || ''}
                required
              />
            </label>
            <label htmlFor="referencia" className="cad__referencia">
              <span>Referencia</span>
              <input
                name="referencia"
                onChange={e => setReferencia(e.target.value)}
                type="text"
                className="input"
                required
                id="referencia"
                value={referencia || ''}
              />
            </label>
            <label htmlFor="unidade" className="cad__un">
              <span>Unidade de Medida</span>
              <input
                type="text"
                className="input"
                id="unidade"
                onChange={e => setUnidadeMedida(e.target.value)}
                required
                value={unidadeMedida || ''}
              />
            </label>
            <label htmlFor="fabricante" className="cad__marca">
              <span>Marca</span>
              <input
                type="text"
                className="input"
                id="marca"
                onChange={e => setFabricante(e.target.value)}
                required
                value={fabricante || ''}
              />
            </label>
            <label htmlFor="estoque" className="cad__estoque">
              <span>Estoque</span>
              <input
                type="text"
                className="input"
                id="estoque"
                pattern="[0-9]*"
                onChange={e => setEstoque(e.target.value)}
                required
                value={estoque || ''}
              />
            </label>
            <label className="cad__image" type="image">
              <span>Imagem do Produto</span>
              <div className="upload__button">
                <input
                  type="text"
                  className="input"
                  id="image"
                  onChange={e => setImagemProduto(e.target.value)}
                  value={imagemProduto || ''}
                />
              </div>
            </label>
            <div className="buttons">
              <button
                className="button__delete"
                id="limpProd"
                onClick={limpCampos}
              >
                Limpar dados
              </button>
              <button className="button__cadastrar" id="save">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </main>
      <div className="consulta">
        <div className="tableProduto">
          <button className="filter" id="buttonImage">
            Imagem
          </button>
          <button className="filter nomeprod" id="buttonDescricao">
            Nome do produto
          </button>
          <button className="filter" id="buttonReferencia">
            Referencia
          </button>
          <button className="filter" id="buttonVlrVenda">
            Valor de venda
          </button>
          <button className="filter" id="buttonMarca">
            Marca
          </button>
          <button className="filter" id="buttonEstoque">
            Estoque
          </button>
          <button className="filter" id="buttonUnidade">
            Unidade
          </button>
          <button className="filter" id="buttonUnidade">
            Ação
          </button>
        </div>
        <div className="produtos">
          {produtos.length === 0 && <p>Não há Produtos!</p>}
          {produtos.map(produtos => (
            <div className="Produtos" key={produtos.id}>
              <div className="prod imagem">
                <img
                  src={produtos.imagemProduto}
                  alt=""
                  className="prod_imagem"
                />
              </div>

              <div className="prod nome">{produtos.nome}</div>
              <div className="prod referencia">{produtos.referencia}</div>
              <div className="prod valorVenda">{produtos.valorVenda}</div>
              <div className="prod fabricante">{produtos.fabricante}</div>
              <div
                className={
                  produtos.estoque === 0
                    ? 'prod_estoque_esgotado'
                    : 'prod estoque'
                }
              >
                {produtos.estoque === 0 ? 'Esgotado' : produtos.estoque}
              </div>
              <div className="prod unidade">{produtos.unidadeMedida}</div>
              <span className="svg">
                <BsTrash
                  className="delete"
                  onClick={() => handleDelete(produtos.id)}
                />
                <BsPencil className="edit" />
              </span>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <h3>Teste para programação Web em React</h3>
        <p>&copy; Bruno Paim</p>
      </footer>
    </div>
  )
}

export default App
