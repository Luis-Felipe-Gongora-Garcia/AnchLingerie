import path from 'path';
import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListSets {
  id: number;
  nome: string;
  descricaoAbrev: string;
  tamanhos: string;
  preco: string;
}

export interface IDetailSets {
  id: number;
  nome: string;
  descricao: string;
  tamanhos: string;
  preco: string;
}

type TListSets = {
  data: IListSets[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filterName = ''
): Promise<TListSets | Error> => {
  try {
    const urlRelativa = `/conjuntos?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filterName}`;
    const { data, headers } = await Api.get(urlRelativa);
    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error('Erro ao listar as peças.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar as peças.'
    );
  }
};

const getById = async (id: number): Promise<IDetailSets | Error> => {
  try {
    const { data } = await Api.get(`/conjuntos/${id}`);
    if (data) {
      return data;
    }
    return new Error('Erro ao consultar a peça.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar a peça.'
    );
  }
};

const create = async (
  dados: Omit<IDetailSets, 'id'>
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailSets>('/conjuntos', dados);
    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar a peça.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar a peça.'
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetailSets
): Promise<void | Error> => {
  try {
    await Api.put(`/conjuntos/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar a peça.'
    );
  }
};

const deleteById = async (id: number): Promise<any> => {
  try {
    await Api.delete(`/conjuntos/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao deletar a peça.'
    );
  }
};

export const ConjuntosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
