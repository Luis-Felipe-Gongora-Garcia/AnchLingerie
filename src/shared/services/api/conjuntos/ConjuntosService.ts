import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListSweaters {
  id: number;
  nome: string;
  foto: string;
  descricaoAbrev: string;
  tamanhos: string;
}

interface IDetailSweaters {
  id: number;
  nome: string;
  foto: string;
  descricao: string;
  tamanhos: string;
}

const getAll = async (
  page = 1,
  filter = ''
): Promise<IListSweaters | Error> => {
  try {
    const urlRelativa = `/conjuntos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
    const { data } = await Api.get(urlRelativa);
    if (data) {
      return data;
    }
    return new Error('Erro ao listar as peças.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar as peças.'
    );
  }
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const ConjuntosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
