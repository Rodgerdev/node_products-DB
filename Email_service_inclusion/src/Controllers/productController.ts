import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import mssql from 'mssql';
import { poolPromise } from '../Config';
import { Product } from '../Models/product';

export const addProduct = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const { Price, CategoryId } = req.body;
    const Id = uid();
    await pool.request()
      .input('Id', mssql.VarChar, Id)
      .input('Price', mssql.Int, Price)
      .input('CategoryId', mssql.VarChar, CategoryId)
      .execute('addProduct');
    res.status(201).json({ message: 'Product created successfully', product: { Id, Price, CategoryId } });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('getProducts');
    res.status(200).json(result.recordset);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
      const pool = await poolPromise;
      const { id } = req.params;
      const result = await pool.request()
        .input('Id', mssql.VarChar, id)
        .execute('getProduct'); //my stored procedure is named getProduct
      if (result.recordset.length === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(200).json(result.recordset[0]);
      }
    } catch (err) {
        const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  };

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const { Id, Price, CategoryId } = req.body;
    await pool.request()
      .input('Id', mssql.VarChar, Id)
      .input('Price', mssql.Int, Price)
      .input('CategoryId', mssql.VarChar, CategoryId)
      .execute('updateProduct');
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const { Id } = req.params;
    await pool.request()
      .input('Id', mssql.VarChar, Id)
      .execute('deleteProduct');
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
